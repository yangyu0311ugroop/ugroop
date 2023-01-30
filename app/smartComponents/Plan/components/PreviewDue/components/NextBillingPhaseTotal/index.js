import { DO_NOTHING_FUNC, DOWNGRADE, UPGRADE } from 'appConstants';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import GridItem from '../../../../../../components/GridItem';
import GridContainer from '../../../../../../components/GridContainer';
import { H4, H6 } from '../../../../../../viewComponents/Typography';
import MOMENT_HELPERS from '../../../../../../utils/helpers/moment';
import PriceDisplay from '../../../../../../ugcomponents/PriceDisplay';
import { isNumber } from '../../../../../../utils/numberAdditions';
import withApplyCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyCouponLogic';
import { makeStyles } from '../../../../../../components/material-ui';
import { usePlanContext } from '../../../../context/planStateContext';

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
  seatInpreviewLoadingput: {
    display: 'flex',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);
function NextBillingPhaseTotal(props) {
  const {
    selectPlanAmount,
    totalInvoiceAmount,
    otherSubscriptionTotalAmount,
    interval,
    currentPlanInterval,
    payNow,
    applyCoupon,
    upcomingInvoiceStartBalance,
    newStartPeriod,
    tax,
    showTax,
    currency,
    subscriptionProcess,
    quantity,
  } = props;

  const [planState] = usePlanContext();
  const previewLoading = planState.previewLoading;
  const classes = useStyles();
  const endPeriod = () => {
    if (previewLoading) {
      return '';
    }
    const end = MOMENT_HELPERS.dateFromTimeStamp(newStartPeriod, 'D MMMM YYYY');
    return `Starting ${end}`;
  };

  const appliedAccountBalanceInFuture = (priceAmount, paynow) => {
    let p = priceAmount;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + tax) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      if (subscriptionProcess === UPGRADE) {
        const leftOver = paynow + stripeTaxUpcomingInvoiceStartBalance / 100;
        if (leftOver < 0) p += leftOver;
      } else if (subscriptionProcess === DOWNGRADE) {
        const leftOver = stripeTaxUpcomingInvoiceStartBalance / 100;
        if (leftOver < 0) p += leftOver;
      }
    }
    return p;
  };

  const displayPrice = () => {
    if (previewLoading) {
      return <div />;
    }
    let priceAmount = 0;
    if (currentPlanInterval === interval && totalInvoiceAmount >= 0) {
      priceAmount = selectPlanAmount;
    } else if (totalInvoiceAmount + otherSubscriptionTotalAmount >= 0) {
      priceAmount = selectPlanAmount;
    } else {
      priceAmount = selectPlanAmount + totalInvoiceAmount / 100;
    }
    const total = applyCoupon(priceAmount);
    const finalPayNow = appliedAccountBalanceInFuture(total, payNow);
    let q = quantity;
    if (q === 0) {
      q = 1;
    }
    const price = (
      <PriceDisplay
        amount={finalPayNow > 0 ? finalPayNow : 0}
        currency={currency}
        tax={tax}
        headerSize={4}
        showTax={showTax}
        textAlign="right"
        quantity={Math.abs(q)}
      />
    );

    return (
      <GridContainer direction="column" spacing={0} alignItems="flex-end">
        <GridItem>{price}</GridItem>
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
              <GridItem>
                <H6 dense>{endPeriod()}</H6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>{displayPrice()}</GridItem>
        </GridContainer>
      </GridItem>
    </>
  );
}

NextBillingPhaseTotal.propTypes = {
  newStartPeriod: PropTypes.number,
  currency: PropTypes.string,
  tax: PropTypes.number,
  quantity: PropTypes.number,
  selectPlanAmount: PropTypes.number,
  interval: PropTypes.string,
  showTax: PropTypes.bool,
  totalInvoiceAmount: PropTypes.number,
  otherSubscriptionTotalAmount: PropTypes.number,
  currentPlanInterval: PropTypes.string,
  upcomingInvoiceStartBalance: PropTypes.number,
  payNow: PropTypes.number,
  applyCoupon: PropTypes.func,
  subscriptionProcess: PropTypes.string,
};

NextBillingPhaseTotal.default = {
  showTax: true,
  seeDetails: DO_NOTHING_FUNC,
};

export default compose(withApplyCouponLogic)(NextBillingPhaseTotal);
