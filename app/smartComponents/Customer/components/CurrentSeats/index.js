import LinearProgress from 'ugcomponents/Progress/LinearProgress';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import Icon from '../../../../ugcomponents/Icon';
import {
  FREE_ORG_SEATS_THRESHOLD,
  ORG_SEAT_LABEL,
  URL_HELPERS,
} from '../../../../appConstants';
import PopoverButton from '../SubscribedPlan/parts/button';
import { VARIANTS } from '../../../../variantsConstants';
import { pluralizeText } from '../../../../utils/stringAdditions';
import Button from '../../../../viewComponents/Button';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { historyPushWithState } from '../../../../utils/routeUtility';
import { makeStyles } from '../../../../components/material-ui';

export const styles = {
  container: {
    width: '180px',
  },
  root: {
    flexGrow: 1,
  },
  frame: {
    width: '100%',
  },
};
const useStyles = makeStyles(styles);
function CurrentSeats(props) {
  const classes = useStyles();
  const history = useHistory();
  const totalSeats = () => {
    if (props.planAmount === 0) {
      return FREE_ORG_SEATS_THRESHOLD + 1;
    }
    return props.quantity + FREE_ORG_SEATS_THRESHOLD;
  };

  const orgSeats = () => props.orgSeats;

  const showAddSeat = () => planCanAddSeat() && !showAddRemoveButton();

  const canRemoveSeat = () =>
    SubscriptionCalculationUtility.isAllowedToRemoveSeat(
      props.orgSeats,
      props.quantity,
      props.planFirstPurchase,
    );

  // Free and Starter Program starts with Quantity 1, those are the plans cannot add seat
  const planCanAddSeat = () => {
    if (props.quantity > 1) {
      return true;
    }
    return false;
  };

  const showAddRemoveButton = () => planCanAddSeat() && canRemoveSeat();

  const redirectOrgMembers = () => {
    const newUrl = _.replace(props.location.pathname, 'settings', 'people');
    history.push(newUrl);
  };

  const currentSeats = () => {
    const menuOptions = `${orgSeats()} ${pluralizeText(
      'member',
      orgSeats(),
    )} / view details`;
    return (
      <GridContainer direction="row" alignItems="center">
        <GridItem>
          <Icon color="black" icon="lnr-users2" />
        </GridItem>
        <GridItem data-testid="availableSeats">
          <PopoverButton
            buttonLabel={`${orgSeats()} of ${totalSeats()} ${pluralizeText(
              ORG_SEAT_LABEL,
              totalSeats(),
            )} taken`}
            options={[menuOptions]}
            size="extraSmall"
            color="normal"
            variant={VARIANTS.INLINE}
            showPopover
            menuClick={redirectOrgMembers}
          />
        </GridItem>
      </GridContainer>
    );
  };

  const currentSeatProgressBar = () => {
    const ratio = (orgSeats() / totalSeats()) * 100;
    return (
      <LinearProgress
        variant="determinate"
        color={ratio === 100 ? 'secondary' : 'primary'}
        value={ratio}
        className={classes.container}
      />
    );
  };

  const addSeats = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionAddSeats(props.orgId),
      state: { userActions: true, orgId: props.orgId },
    });
  };

  const removeSeats = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionRemoveSeats(props.orgId),
      state: { userActions: true, orgId: props.orgId },
    });
  };

  const buttons = () => {
    if (showAddRemoveButton()) {
      return (
        <GridItem md={12} xs={12}>
          <GridContainer direction="row" alignItems="center" spacing={0}>
            <GridItem data-testid="addOrgSeat">
              <Button
                size="extraSmall"
                color="base"
                variant={VARIANTS.INLINE}
                onClick={addSeats}
              >
                Add seats
              </Button>
            </GridItem>
            <GridItem>/</GridItem>
            <GridItem data-testid="removeOrgSeat">
              <Button
                size="extraSmall"
                color="base"
                variant={VARIANTS.INLINE}
                onClick={removeSeats}
              >
                Remove seats
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return null;
  };

  const singleButton = () => {
    if (showAddSeat()) {
      return (
        <GridItem md={12} xs={12}>
          <GridContainer direction="row" alignItems="center">
            <GridItem data-testid="addSeatSingleButton">
              <Button
                size="extraSmall"
                variant={VARIANTS.INLINE}
                color="base"
                onClick={addSeats}
              >
                Add {ORG_SEAT_LABEL}s
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return null;
  };

  return (
    <GridContainer direction="column">
      <GridItem md={12} xs={12}>
        {currentSeats()}
      </GridItem>
      <GridItem md={12} xs={12}>
        {currentSeatProgressBar()}
      </GridItem>
      {buttons()}
      {singleButton()}
    </GridContainer>
  );
}

CurrentSeats.propTypes = {
  orgSeats: PropTypes.number,
  quantity: PropTypes.number,
  orgId: PropTypes.number,
  planAmount: PropTypes.number,
  planFirstPurchase: PropTypes.number,
  location: PropTypes.object,
};

export default CurrentSeats;
