import {
  DO_NOTHING_FUNC,
  DOWNGRADE,
  SUBSCRIPTION_ENTERPRISE,
  UPGRADE,
} from 'appConstants';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'viewComponents/Button';
import GridItem from '../../../../../../components/GridItem';
import GridContainer from '../../../../../../components/GridContainer';
import { H4, H6 } from '../../../../../../viewComponents/Typography';
import MOMENT_HELPERS from '../../../../../../utils/helpers/moment';
import PriceDisplay from '../../../../../../ugcomponents/PriceDisplay';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { isNumber } from '../../../../../../utils/numberAdditions';
import withApplyCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyCouponLogic';
import { usePlanContext } from '../../../../context/planStateContext';
import { makeStyles } from '../../../../../../components/material-ui';
const styles = {
  grow: {
    flex: 1,
  },
  total: {
    textAlign: 'right',
  },
  period: {
    marginTop: -16,
  },
  seatInput: {
    display: 'flex',
    alignItems: 'center',
  },
};
const useStyles = makeStyles(styles);
function OrgNextBillingPhaseTotal(props) {
  const [planState] = usePlanContext();
  const {
    upcomingInvoiceStartBalance,
    type,
    tax,
    otherSubscriptionTotalAmount,
    isSeeDetails,
    selectPlanAmount,
    seeDetails,
    totalInvoiceAmount,
    prorateAmount,
    payNow,
    currency,
    applyCoupon,
    newStartPeriod,
    showTax,
    interval,
  } = props;
  const endPeriod = () => {
    if (planState.previewLoading) {
      return '';
    }
    const end = MOMENT_HELPERS.dateFromTimeStamp(newStartPeriod, 'D MMMM YYYY');
    return `Starting ${end}`;
  };
  const classes = useStyles();
  const appliedAccountBalance = priceAmount => {
    let p = priceAmount;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + tax) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      let leftOver = 0;
      if (type !== SUBSCRIPTION_ENTERPRISE) {
        leftOver =
          (stripeTaxUpcomingInvoiceStartBalance +
            otherSubscriptionTotalAmount) /
          100;
      } else if (planState.subscriptionProcess === UPGRADE) {
        leftOver = payNow + stripeTaxUpcomingInvoiceStartBalance / 100;
      } else {
        leftOver = stripeTaxUpcomingInvoiceStartBalance / 100;
      }
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const showSeeDetailsButton = () => {
    const displayText = LOGIC_HELPERS.ifElse(
      isSeeDetails,
      'Hide Details',
      'See Details',
    );
    if (selectPlanAmount !== 0) {
      return (
        <GridItem>
          <Button
            noMargin
            noPadding
            variant="inline"
            size="extraSmall"
            onClick={seeDetails}
          >
            {displayText}
          </Button>
        </GridItem>
      );
    }
    return <GridItem />;
  };

  const calculateMonthPrice = () => {
    let priceAmount = 0;
    const otherLineItem = totalInvoiceAmount - prorateAmount;
    if (planState.subscriptionProcess === UPGRADE) {
      // if (props.totalInvoiceAmount >= 0) {
      //   priceAmount = props.selectPlanAmount;
      // } else if (
      //   props.totalInvoiceAmount + props.otherSubscriptionTotalAmount >=
      //   0
      // ) {
      //   priceAmount = props.selectPlanAmount;
      // } else {
      //   priceAmount =
      //     props.otherSubscriptionTotalAmount / 100 +
      //     props.selectPlanAmount +
      //     props.totalInvoiceAmount / 100;
      // }

      if (otherLineItem + otherSubscriptionTotalAmount >= 0) {
        if (type === SUBSCRIPTION_ENTERPRISE) {
          priceAmount =
            prorateAmount / 100 + selectPlanAmount + otherLineItem / 100;
        } else {
          priceAmount = prorateAmount / 100 + selectPlanAmount;
        }
      } else {
        priceAmount =
          selectPlanAmount +
          prorateAmount / 100 +
          otherLineItem / 100 +
          otherSubscriptionTotalAmount / 100;
      }
      if (priceAmount >= selectPlanAmount) {
        priceAmount = selectPlanAmount;
      }
    } else if (planState.subscriptionProcess === DOWNGRADE) {
      if (isNumber(totalInvoiceAmount)) {
        if (totalInvoiceAmount >= 0) {
          priceAmount = selectPlanAmount;
        } else if (totalInvoiceAmount + otherSubscriptionTotalAmount >= 0) {
          priceAmount = selectPlanAmount;
        } else {
          priceAmount = selectPlanAmount + totalInvoiceAmount / 100;
        }
      }
    }
    return priceAmount;
  };

  const displayPrice = () => {
    if (planState.previewLoading) {
      return <div />;
    }
    let priceAmount;
    priceAmount = calculateMonthPrice();
    priceAmount = applyCoupon(priceAmount);
    const finalPriceAmount = appliedAccountBalance(priceAmount);
    const price = (
      <PriceDisplay
        amount={finalPriceAmount > 0 ? finalPriceAmount : 0}
        currency={currency}
        tax={tax}
        headerSize={4}
        showTax={showTax}
        textAlign="right"
      />
    );

    return (
      <GridContainer direction="column" spacing={0} alignItems="flex-end">
        <GridItem>{price}</GridItem>
        {showSeeDetailsButton()}
      </GridContainer>
    );
  };

  return (
    <>
      <GridItem>
        <GridContainer>
          <GridItem className={classes.grow}>
            <GridContainer spacing={0} direction="column">
              <GridItem>
                <H4 dense weight="bold">
                  New {`${interval}ly`} total
                </H4>
              </GridItem>
              <GridItem data-testid="nextDueDate">
                <H6 dense>{endPeriod()}</H6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem data-testid="nextDueAmount">{displayPrice()}</GridItem>
        </GridContainer>
      </GridItem>
    </>
  );
}

OrgNextBillingPhaseTotal.propTypes = {
  newStartPeriod: PropTypes.number,
  interval: PropTypes.string,
  currency: PropTypes.string,
  tax: PropTypes.number,
  showTax: PropTypes.bool,
  seeDetails: PropTypes.func,
  isSeeDetails: PropTypes.bool,
  selectPlanAmount: PropTypes.number,
  totalInvoiceAmount: PropTypes.number,
  otherSubscriptionTotalAmount: PropTypes.number,
  prorateAmount: PropTypes.number,
  type: PropTypes.string,
  upcomingInvoiceStartBalance: PropTypes.number,
  payNow: PropTypes.number,
  applyCoupon: PropTypes.func,
};

OrgNextBillingPhaseTotal.default = {
  seeDetails: DO_NOTHING_FUNC,
};

export default compose(withApplyCouponLogic)(
  React.memo(OrgNextBillingPhaseTotal),
);
