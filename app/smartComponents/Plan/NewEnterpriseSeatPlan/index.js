import React, { forwardRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  DEFAULT,
  FREE_ORG_SEATS_THRESHOLD,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  COUPON_MODE,
  UPGRADE,
  ORG_SEAT_RENDER,
  SUBSCRIPTION_PLAN_TYPE,
  URL_HELPERS,
} from 'appConstants';
import { Elements } from '@stripe/react-stripe-js';
import { makeStyles } from 'components/material-ui';
import { H3, H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { useImmer } from 'use-immer';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewOrgPreviewDue from '../components/NewOrgPreviewDue/newOrgPreviewDue';
import SubscriptionCard from '../parts/SubscriptionCard';
import SubscriptionPlan from '../parts/SubscriptionPlanHooks';
import { StripeContext } from '../../../lib/stripe';
import { isEmptyString } from '../../../utils/stringAdditions';
import Container from '../../../components/Container';
import { ORG_DATASTORE_RESELECTORS } from '../../../datastore/orgStore/selectorsViaConnect';
import RenderCustomerInfo from '../components/RenderCustomerInfo';
import RenderSubscriptionSubmitButton from '../components/RenderSubscriptionSubmitButton';
import RenderDurationSwitch from '../components/RenderDurationSwitch';
import { getDisplayText } from '../components/Utility/SubscriptionUtility';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { useDetectSubscriptionProcess } from '../hooks/detectSubscriptionProcessHook';
import ApplyCoupon from '../parts/ApplyCoupon';
import { usePlanContext } from '../context/planStateContext';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import OrgSeatPreviewDue from '../components/NewOrgSeatPreviewDue';
import { LOGIC_HELPERS } from '../../../utils/helpers/logic';
import SubscriptionSeats from '../parts/SubscriptionSeats';
import { PLAN_RESELECTOR } from '../../../datastore/planDataImmerStore/selectors';
import { INVOICE_RESELECTOR } from '../../../datastore/invoiceImmerStore/selectors';
import JText from '../../../components/JText';
import Button from '../../../viewComponents/Button';
import { VARIANTS } from '../../../variantsConstants';
import { historyPushWithState } from '../../../utils/routeUtility';
const styles = () => ({
  grow: {
    flex: 1,
  },
  info: {
    paddingTop: 32,
    paddingRight: 16,
  },
  total: {
    textAlign: 'right',
  },
  summary: {
    paddingTop: 32,
    paddingLeft: 16,
  },
  seats: {
    paddingTop: 0,
    maxWidth: 1140,
    margin: '0 auto',
  },
  seatPadding: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    maxWidth: 780,
  },
  padding: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  paddingBottom: {
    paddingBottom: 16,
  },
});
const useStyles = makeStyles(styles);
function NewEnterpriseSeatPlan(props) {
  const classes = useStyles();
  const {
    userId,
    orgId,
    loading,
    onSubmit,
    hideInnerSubmitButton,
    myForwardedRef,
    subscriptionItemIndex,
    previewUpcomingInvoice,
    type,
    showDurationSwitch,
    applyCoupon,
  } = props;

  const stripe = useContext(StripeContext);
  const [planState] = usePlanContext();
  const history = useHistory();
  useDetectSubscriptionProcess(props);
  const [state, setState] = useImmer({
    intervalState: 'month',
    firstTime: false,
  });
  const customerId = useSelector(store =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(store, {
      orgId,
      userId,
    }),
  );
  const currentSubscriptionId = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(store, {
      customerId,
    }),
  );

  const currentPaymentSource = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId,
      attribute: 'default_source',
    }),
  );
  const subscriptionItemId = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionItem)(store, {
      subscriptionId: currentSubscriptionId,
      subscriptionItemIndex,
    }),
  );

  const currentPlanId = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute)(
      store,
      {
        subscriptionItemId,
        attribute: `plan`,
      },
    ),
  );

  const currentPlanFirstPurchase = useSelector(store =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(store, {
      id: currentPlanId,
      attribute: 'metadata.firstPurchase',
    }),
  );

  const currentSubscriptionQuantity = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute)(
      store,
      {
        subscriptionItemId,
        attribute: 'quantity',
      },
    ),
  );

  const existedCoupon = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.coupon.id',
    }),
  );

  const existedCouponEnd = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.end',
    }),
  );

  const existedCouponMode = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.coupon.duration',
    }),
  );

  const currentPlanInterval = useSelector(store =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(store, {
      id: currentPlanId,
      attribute: 'interval',
    }),
  );

  useEffect(() => {
    if (isEmptyString(customerId)) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.firstTime = true;
      });
    }
  }, [customerId]);

  useEffect(() => {
    if (currentPlanInterval) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.intervalState = currentPlanInterval;
      });
    }
  }, [currentPlanInterval]);
  const orgSeats = useSelector(store =>
    ORG_DATASTORE_RESELECTORS.getOrganisationSeats(store, {
      id: orgId,
    }),
  );
  const handleInterval = ev => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.intervalState = ev.target.value;
    });
  };

  const renderSubscription = () => {
    const { intervalState } = state;
    return (
      <GridItem className={classes.grow}>
        <SubscriptionPlan
          planBundle={SUBSCRIPTION_ENTERPRISE_TOUR}
          type={type}
          ref={myForwardedRef}
          interval={intervalState}
          previewUpcomingInvoice={previewUpcomingInvoice}
          orgSeats={orgSeats}
          orgId={orgId}
          subscriptionItemIndex={subscriptionItemIndex}
        />
      </GridItem>
    );
  };

  const renderDue = () => {
    const { intervalState } = state;
    return (
      <NewOrgPreviewDue
        intervalState={intervalState}
        orgSeats={orgSeats - FREE_ORG_SEATS_THRESHOLD}
        type={type}
        userId={userId}
        orgId={orgId}
        subscriptionItemIndex={subscriptionItemIndex}
      />
    );
  };

  const renderCard = () => {
    const cardProps = {
      orgId,
      userId,
    };
    return (
      <GridItem>
        <SubscriptionCard {...cardProps} type={type} />
      </GridItem>
    );
  };

  const yearlyPromotion = underLine => {
    if (state.intervalState === 'month') {
      return (
        <JText
          underline={underLine}
          link={underLine}
          noUnderlined={!underLine}
          blue
        >
          Change to yearly plan and save up to 20%
        </JText>
      );
    }
    return null;
  };

  // This is used in upgrade expanded view

  const clickPromoteYearPlan = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionDurationChangeUpgrade(orgId),
      state: { userActions: true, orgId },
    });
  };

  const renderInfo = () => (
    <GridContainer direction="column" spacing={1}>
      <RenderCustomerInfo
        userId={userId}
        orgId={orgId}
        subscriptionItemIndex={subscriptionItemIndex}
      />
      <GridItem>
        <GridContainer justify="space-between" alignitems="center">
          <GridItem>
            <H5 dense subtitle weight="bold" transform="uppercase">
              {state.intervalState}ly {getDisplayText()} To
            </H5>
          </GridItem>
          <GridItem>
            <Button
              noMargin
              noPadding
              variant={VARIANTS.INLINE}
              onClick={clickPromoteYearPlan}
            >
              {yearlyPromotion(true)}
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>{renderSubscription()}</GridItem>
    </GridContainer>
  );

  const renderCoupon = () => {
    let showCoupon = true;
    const now = Date.now() / 1000;
    if (
      !isEmptyString(existedCoupon) &&
      (existedCouponMode === COUPON_MODE.FOREVER ||
        existedCouponMode === COUPON_MODE.ONCE ||
        (existedCouponMode === COUPON_MODE.REPEATING &&
          existedCouponEnd >= now))
    ) {
      showCoupon = false;
    }
    if (
      !isEmptyString(customerId) &&
      showCoupon &&
      planState.subscriptionProcess === UPGRADE
    ) {
      return (
        <GridItem>
          <ApplyCoupon onSubmit={applyCoupon} />
        </GridItem>
      );
    }
    return <div />;
  };

  const renderSummary = () => (
    <GridContainer direction="column" spacing={2} className={classes.grow}>
      <GridItem>
        <H3 dense weight="bold" className={classes.paddingBottom}>
          {getDisplayText()} Summary
        </H3>
      </GridItem>
      <RenderDurationSwitch
        showDurationSwitch={showDurationSwitch}
        handleInterval={handleInterval}
        intervalState={state.intervalState}
      />
      {renderDue()}
      {renderCoupon()}
      {renderCard()}
      <GridItem>
        <GridContainer direction="column">
          <RenderSubscriptionSubmitButton
            firstTime={state.firstTime}
            onSubmit={onSubmit}
            hideInnerSubmitButton={hideInnerSubmitButton}
            loading={loading}
            type={type}
          />
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  const renderSubscriptionPlans = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <GridContainer justify="space-between" alignitems="center">
          <GridItem>
            <H5 dense subtitle weight="bold" transform="uppercase">
              {_.startCase(state.intervalState)}ly {getDisplayText()} To
            </H5>
          </GridItem>
          <GridItem>{yearlyPromotion(false)}</GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>{renderSubscription()}</GridItem>
    </GridContainer>
  );

  const renderDefaultView = () => (
    <GridContainer direction="column" spacing={1} className={classes.grow}>
      <GridItem>
        <H3 dense weight="bold">
          {getDisplayText()} Summary
        </H3>
      </GridItem>
      <RenderDurationSwitch
        showDurationSwitch
        handleInterval={handleInterval}
        intervalState={state.intervalState}
      />
      <GridItem>
        <GridContainer direction="column" spacing={1}>
          <GridItem>{renderSubscriptionPlans()}</GridItem>
          {renderDue()}
          {renderCoupon()}
          {renderCard()}
        </GridContainer>
      </GridItem>
      <GridItem>
        <GridContainer direction="column">
          <RenderSubscriptionSubmitButton {...props} />
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  const renderExpandedView = () => (
    <Container padding>
      <GridContainer className={classes.grow} spacing={0}>
        <GridItem sm={12} md={6} className={classes.padding}>
          {renderInfo()}
        </GridItem>
        <GridItem sm={12} md={6} className={classes.padding}>
          {renderSummary()}
        </GridItem>
      </GridContainer>
    </Container>
  );

  const generateSeatOptions = seats => {
    const result = [];
    for (let i = 1; i <= seats; i += 1) {
      result.push({
        children: `${i}`,
        value: i,
      });
    }
    return result;
  };
  const renderSeatComponent = () => {
    let options;
    if (orgSeats > currentPlanFirstPurchase) {
      options = generateSeatOptions(
        currentSubscriptionQuantity + FREE_ORG_SEATS_THRESHOLD - orgSeats,
      );
    } else {
      options = generateSeatOptions(
        currentSubscriptionQuantity - currentPlanFirstPurchase,
      );
    }
    const validation = LOGIC_HELPERS.ifElse(
      planState.subscriptionProcess === UPGRADE,
      { min: 1, makeEmptyZero: true },
      { options },
    );

    return (
      <SubscriptionSeats
        currentPlanId={currentPlanId}
        currentPaymentSource={currentPaymentSource}
        ref={myForwardedRef}
        inputValidation={validation}
        planType={SUBSCRIPTION_PLAN_TYPE.ORG_SEAT}
        type={type}
        customerId={customerId}
        previewUpcomingInvoice={previewUpcomingInvoice}
      />
    );
  };

  const renderSeats = () => (
    <GridContainer className={classes.seats} spacing={0}>
      <GridItem sm={12} className={classes.seatPadding}>
        <OrgSeatPreviewDue
          customerId={customerId}
          orgId={orgId}
          type={type}
          orgSeats={orgSeats}
          subscriptionItemIndex={subscriptionItemIndex}
          renderSeatComponent={renderSeatComponent}
          previewUpcomingInvoice={previewUpcomingInvoice}
        />
      </GridItem>
      <GridItem sm={12} className={classes.seatPadding}>
        <GridContainer direction="column">
          {RenderSubscriptionSubmitButton({
            firstTime: state.firstTime,
            onSubmit,
            hideInnerSubmitButton,
            loading,
            type,
            variant: props.variant,
          })}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
  const renderView = () => {
    if (props.variant === DEFAULT) {
      return renderDefaultView();
    }
    if (props.variant === ORG_SEAT_RENDER) {
      return renderSeats();
    }
    return renderExpandedView();
  };

  return <Elements stripe={stripe}>{renderView()}</Elements>;
}

NewEnterpriseSeatPlan.propTypes = {
  // parent props
  type: PropTypes.string,
  onSubmit: PropTypes.func,
  variant: PropTypes.string,
  myForwardedRef: PropTypes.object,
  orgId: PropTypes.any,
  userId: PropTypes.number,
  previewUpcomingInvoice: PropTypes.func,
  hideInnerSubmitButton: PropTypes.bool,
  showDurationSwitch: PropTypes.bool,
  applyCoupon: PropTypes.func,
  subscriptionItemIndex: PropTypes.number,
  loading: PropTypes.bool,
};

NewEnterpriseSeatPlan.defaultProps = {
  variant: DEFAULT,
  hideInnerSubmitButton: false,
  showDurationSwitch: false,
  loading: false,
};

const WrappedComponent = React.memo(NewEnterpriseSeatPlan);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
