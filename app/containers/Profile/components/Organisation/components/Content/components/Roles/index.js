import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { AbilityResolver } from 'apis/components/Ability';
import {
  FREE_ORG_SEATS_THRESHOLD,
  ORG_SEAT_LABEL,
  OWNER,
  PAGE_HELMETS,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_FREE_TOUR_PLANS,
  URL_HELPERS,
  HELP_DIALOG_ATTRIBUTES,
  HELP_DIALOG_KEYS,
} from 'appConstants';
import RoleTable from 'smartComponents/Organisation/components/Roles';
import InviteUser from 'smartComponents/Organisation/components/InviteUser';
import PendingInvitation from 'smartComponents/Organisation/components/PendingInvitation';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  SUBSCRIPTION_API,
  UPDATE_SUBSCRIPTION,
  SUBSCRIPTION_SCHEDULE_API,
  RELEASE_SUBSCRIPTION_SCHEDULE,
  UPDATE_SUBSCRIPTION_SCHEDULE,
  LIST_SUBSCRIPTION_SCHEDULE,
} from 'apis/constants';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { Link } from 'react-router-dom';
import { H5 } from 'viewComponents/Typography';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { CONFIG, CONFIG_PEOPLEIDS } from './config';
import Header from './components/Header';
import {
  isEmptyString,
  parseStringJson,
  pluralizeText,
} from '../../../../../../../../utils/stringAdditions';
import HelpOrgRoles from '../../../TabHeader/components/HelpOrgRoles';
import { SORT_HELPERS } from '../../../../../../../../utils/sorter';
import { makeStyles } from '../../../../../../../../components/material-ui';
import { useSelectorCurrentSubscriptionData } from '../../../../../../../../smartComponents/Plan/hooks/useSelectorCurrentSubscriptionData';
import { ORG_DATASTORE_RESELECTORS } from '../../../../../../../../datastore/orgStore/selectorsViaConnect';
import JText from '../../../../../../../../components/JText';

const styles = {
  root: {
    // maxWidth: 700,
    margin: '0 auto',
    padding: '24px 0',
    width: '100%',
  },
  grow: {
    flex: '1',
  },
  roles: {
    margin: '0px 0px 16px 0px',
    background: 'white',
  },
  fullWidth: {
    width: '100%',
  },
  halfFullWidth: {
    width: '50%',
  },
  help: {
    margin: '4px 0 0 0',
    alignSelf: 'center',
  },
  padding: {
    padding: 16,
  },
  offsetGrid: {
    padding: 8,
  },
  left: {
    width: 180,
  },
  textCenter: {
    textAlign: 'center',
  },
  helpBtn: {
    height: 20,
    width: 20,
    background: 'white',
    margin: 0,
    display: 'inline-flex',
    boxShadow: '0px 1px 3px 0px rgb(154 171 179)',
    '&:hover': {
      backgroundColor: '#f6f8fa', // '#f6f8fa50',
    },
  },
  helpIcon: {
    fontWeight: 700,
    color: '#595F6F',
  },
};

const useStyles = makeStyles(styles);
export function Roles(props) {
  const classes = useStyles();
  const [state, setState] = useImmer({
    inviteUserDialog: false,
    PendingInviteDialog: false,
    showHelp: false,
  });

  const {
    roleMemberPendingIds,
    showInactive,
    peopleIds,
    peopleIdsWithActivated,
  } = props;
  const { id, showHeader } = props;
  const {
    customerId,
    currentPhaseStart,
    currentPhaseEnd,
    currentSubscriptionId,
    currentSubscriptionPlans,
    currentActiveScheduleId,
    subscriptionDefaultTax: currentDefaultTax,
    currentPhaseCoupon,
    nextPhaseCoupon,
    nextPhasePlans,
    subscriptionItems,
  } = useSelectorCurrentSubscriptionData({
    orgId: id,
  });

  const orgSeats = useSelector(store =>
    ORG_DATASTORE_RESELECTORS.getOrganisationSeats(store, {
      id,
    }),
  );
  const plans = parseStringJson(currentSubscriptionPlans);
  const nextPlans = parseStringJson(nextPhasePlans);
  const items = parseStringJson(subscriptionItems);
  const toggleHelp = () => () => {
    PORTAL_HELPERS.openHelpDialog(
      { data: HELP_DIALOG_ATTRIBUTES[HELP_DIALOG_KEYS.ORG_ROLE_HELP] },
      props,
    );
  };

  const renderHelp = () => (
    <HelpOrgRoles open={state.showHelp} onClose={toggleHelp(false)} />
  );

  const renderHelperBtn = () => (
    <Button
      icon="question"
      variant="outline"
      className={classes.helpBtn}
      onClick={toggleHelp(true)}
      weight="strong"
      color="gray"
      iconButton
      size="xxs"
      iconClassName={classes.helpIcon}
      data-testid="role-help-btn"
    />
  );

  const isDisabled = () => {
    if (calculateRemainingSeats() === 0 || orgHasDifferentScheduledPlan()) {
      return true;
    }
    return false;
  };

  const onResetEndTime = () => {
    props.resaga.dispatchTo(SUBSCRIPTION_API, UPDATE_SUBSCRIPTION, {
      payload: {
        subscriptionId: currentSubscriptionId,
        data: {
          prorate: false,
          cancel_at_period_end: false,
        },
      },
    });
  };

  const cancelScheduleSubscription = () => {
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      RELEASE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: currentActiveScheduleId,
        },
        onSuccess: onResetEndTime,
      },
    );
  };

  const onUpdateScheduleSubscriptionSuccess = () => {
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      LIST_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          query: JSON.stringify({ customer: customerId }),
        },
      },
    );
  };

  const updateSchedulePhases = () => {
    const endTime = currentPhaseEnd;
    const startTime = currentPhaseStart;
    const subscriptionPlanIds = plans.map(o => o.id);
    const sortedOrder = subscriptionPlanIds;
    const orgPlanIndex = _.findIndex(plans, o => o.type === 'orgseat');
    const quantity = plans[orgPlanIndex].quantity;
    const pObject = items.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    pObject.splice(orgPlanIndex, 1);
    const currentPlan = [
      ...pObject,
      {
        plan: plans[orgPlanIndex].id,
        quantity: quantity > 1 ? quantity : 1,
      },
    ];
    const fpObject = nextPlans.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    fpObject.splice(orgPlanIndex, 1);
    const futurePlan = [
      ...fpObject,
      {
        plan: plans[orgPlanIndex].id,
        quantity: quantity > 1 ? quantity : 1,
      },
    ];
    const sortedCurrentPlan = SORT_HELPERS.sortBasedOnOtherArray(
      sortedOrder,
      currentPlan,
      'plan',
    );
    const sortedFuturePlan = SORT_HELPERS.sortBasedOnOtherArray(
      sortedOrder,
      futurePlan,
      'plan',
    );
    const currentPhrase = {
      start_date: startTime,
      end_date: endTime,
      plans: sortedCurrentPlan,
      default_tax_rates: [currentDefaultTax],
    };
    const nextPhrase = {
      start_date: endTime,
      plans: sortedFuturePlan,
      default_tax_rates: [currentDefaultTax],
    };
    if (!isEmptyString(currentPhaseCoupon)) {
      currentPhrase.coupon = currentPhaseCoupon;
    }
    if (!isEmptyString(nextPhaseCoupon)) {
      nextPhrase.coupon = nextPhaseCoupon;
    }
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      UPDATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: currentActiveScheduleId,
          data: {
            phases: [currentPhrase, nextPhrase],
            renewal_behavior: 'release',
            prorate: false,
          },
        },
        onSuccess: onUpdateScheduleSubscriptionSuccess,
      },
    );
  };

  const onSubmit = () => {
    const nextPhasePlanNames = nextPlans.map(o => o.name);
    const nextPhasePlanIntervals = nextPlans.map(o => o.interval);
    const index = _.findIndex(plans, o => o.type === 'orgseat');
    const hasFreePlan =
      SUBSCRIPTION_FREE_PLANS.some(r => r.includes(nextPhasePlanNames)) ||
      SUBSCRIPTION_FREE_TOUR_PLANS.some(r => r.includes(nextPhasePlanNames));
    const interval = plans[index].interval;
    const sameInterval =
      nextPhasePlanIntervals && nextPhasePlanIntervals.includes(interval);
    const subscriptionPlanIds = items.map(o => o.plan);
    const subscriptionPlanQuantityList = items.map(o => o.quantity);
    // detect quantity, different plan

    const hasPendingOrgPlan =
      subscriptionPlanIds[index] !== nextPlans[index].plan ||
      (subscriptionPlanIds[index] === nextPlans[index].plan &&
        subscriptionPlanQuantityList[index] !== nextPlans[index].quantity);
    if (hasFreePlan === false && sameInterval && hasPendingOrgPlan) {
      updateSchedulePhases();
    } else {
      cancelScheduleSubscription();
    }
  };

  const renderCancelSubscription = () => (
    <Button
      variant={VARIANTS.INLINE}
      size="extraSmall"
      dense
      onClick={onSubmit}
    >
      Cancel pending plan
    </Button>
  );

  const orgHasDifferentScheduledPlan = () => {
    if (currentActiveScheduleId) {
      const subscriptionPlanIds = items.map(o => o.plan);
      const nextPhasePlanIntervals = nextPlans.map(o => o.interval);
      const subscriptionPlanQuantityList = items.map(o => o.quantity);
      const index = _.findIndex(plans, o => o.type === 'orgseat');
      if (index > 0) {
        const interval = plans[index].interval;
        const sameInterval =
          nextPhasePlanIntervals && nextPhasePlanIntervals.includes(interval);
        const hasPendingOrgPlan =
          subscriptionPlanIds[index] !== nextPlans[index].plan ||
          (subscriptionPlanIds[index] === nextPlans[index].plan &&
            subscriptionPlanQuantityList[index] !==
              nextPlans[index].quantity) ||
          !sameInterval;
        return hasPendingOrgPlan;
      }
    }
    return false;
  };

  const renderBuyMore = () => {
    const index = _.findIndex(plans, o => o.type === 'orgseat');
    const quantity = plans && plans.length ? plans[index].quantity : 0;
    const action = LOGIC_HELPERS.ifElse(
      quantity <= 1,
      'Upgrade plan?',
      'Buy more?',
    );
    const link = LOGIC_HELPERS.ifElse(
      quantity <= 1,
      URL_HELPERS.orgSubscriptionUpgrade(props.id),
      URL_HELPERS.orgSubscriptionAddSeats(props.id),
    );

    return (
      <div>
        - &nbsp;
        <Link to={link}>{action}</Link>
      </div>
    );
  };

  const renderAction = () => {
    const { role } = props;
    if (role !== OWNER) {
      return null;
    }
    if (orgHasDifferentScheduledPlan()) {
      return renderCancelSubscription();
    }
    return renderBuyMore();
  };

  const calculateRemainingSeats = () => {
    if (orgHasDifferentScheduledPlan()) {
      const index = _.findIndex(plans, o => o.type === 'orgseat');
      const q = nextPlans[index].quantity;
      const seatsLeft = q - (orgSeats - FREE_ORG_SEATS_THRESHOLD);
      const p = nextPlans[index].plan;
      if (SUBSCRIPTION_FREE_PLANS.includes(p)) {
        // Future Free plan
        return 0;
      }
      if (seatsLeft > 0) {
        return seatsLeft;
      }
      return 0;
    }
    const index = _.findIndex(plans, o => o.type === 'orgseat');
    if (plans[index]) {
      const quantity = plans && plans.length > 0 ? plans[index].quantity : 0;
      const seatsLeft = quantity - (orgSeats - FREE_ORG_SEATS_THRESHOLD);
      const isFreePlan = SUBSCRIPTION_FREE_PLANS.includes(plans[index].name);
      if (isFreePlan) {
        // Free plan
        return 0;
      }
      if (seatsLeft > 0) {
        return seatsLeft;
      }
    }
    return 0;
  };

  const renderSeatsLeft = () => {
    let suffix = '';
    if (orgHasDifferentScheduledPlan()) {
      suffix = ' on pending cycle';
    }

    const seats = calculateRemainingSeats();
    const message = `${seats} ${pluralizeText(
      ORG_SEAT_LABEL,
      seats,
      true,
    )} left${suffix}`;

    return (
      <>
        <GridItem>
          <H5 dense className={classes.seatsLeft}>
            {message}
          </H5>
        </GridItem>
        <GridItem>{renderAction()}</GridItem>
      </>
    );
  };

  const onOpenPendingInviteModal = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.PendingInviteDialog = true;
    });
  };

  const onOpenInviteUserModal = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.inviteUserDialog = true;
    });
  };

  const onCloseModal = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.PendingInviteDialog = false;
      // eslint-disable-next-line no-param-reassign
      draft.inviteUserDialog = false;
    });
  };

  const handleChange = (ob, checked) => {
    if (showInactive !== checked) {
      props.resaga.setValue({
        showInactive: checked,
      });
    }
  };

  const seatsLeft = calculateRemainingSeats();
  const ids = peopleIds.map((item, index) => [
    item[0],
    item[1],
    peopleIdsWithActivated[index][1],
  ]);
  const activatedOnly = ids.filter(item => item[2] === true);
  const itemsToShow = showInactive ? ids : activatedOnly;
  const content = (
    <GridContainer
      spacing={0}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      card
    >
      {
        <GridItem className={classes.fullWidth}>
          {renderHelp()}
          {/*      <GridContainer
            spacing={0}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <GridItem className={classes.halfFullWidth}>
              {showHeader && (
                <Margin bottom="md">
                  <H3 noMargin>Roles</H3>
                </Margin>
              )}
            </GridItem>
          </GridContainer> */}
        </GridItem>
      }
      <GridItem className={classes.fullWidth}>
        <GridContainer
          direction="column"
          alignItems="baseline"
          wrap="nowrap"
          // card={!showHeader}
          className={classes.roles}
        >
          <AbilityResolver orgId={id} style={{ border: '1px solid yellow' }} />
          <Helmet
            title={PAGE_HELMETS.ORGANISATION_ROLES}
            meta={[
              {
                name: 'description',
                content: 'Description of Organisation Roles',
              },
            ]}
          />
          <GridItem item className={classes.fullWidth}>
            <Header
              id={id}
              roleMemberPendingIds={roleMemberPendingIds}
              openPendingInvite={onOpenPendingInviteModal}
              openInviteUser={onOpenInviteUserModal}
              handleChange={handleChange}
              showInactive={showInactive}
              renderSeatsLeft={renderSeatsLeft}
              isDisabled={isDisabled()}
              seatsLeft={seatsLeft}
            />
          </GridItem>
          <GridItem className={classes.fullWidth}>
            <RoleTable id={id} ids={itemsToShow} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <InviteUser
        id={id}
        open={state.inviteUserDialog}
        onClose={onCloseModal}
        disabled={isDisabled()}
      />
      <PendingInvitation
        id={id}
        open={state.PendingInviteDialog}
        onClose={onCloseModal}
      />
    </GridContainer>
  );

  const roleHeader = () => (
    <div className={classes.offsetGrid}>
      <GridContainer direction="column" spacing={4}>
        <GridItem>
          <GridContainer direction="column" spacing={0} alignItems="center">
            <GridItem>
              <JText xl dark>
                Organisation Roles {renderHelperBtn()}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
  return (
    <GridContainer direction="column" spacing={1}>
      <GridItem>{showHeader && roleHeader()}</GridItem>
      <GridItem>{content}</GridItem>
    </GridContainer>
  );
}

Roles.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  role: PropTypes.string,
  roleMemberPendingIds: PropTypes.array,
  showInactive: PropTypes.bool,
  peopleIds: PropTypes.array,
  peopleIdsWithActivated: PropTypes.array,
  showHeader: PropTypes.bool,
};

Roles.defaultProps = {
  id: 0,
  roleMemberPendingIds: [],
  showInactive: false,
  peopleIds: [],
  peopleIdsWithActivated: [],
  showHeader: false,
};

export default compose(
  resaga(CONFIG_PEOPLEIDS),
  resaga(CONFIG),
)(React.memo(Roles));
