import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { UPGRADE } from 'appConstants';
import { H6 } from 'viewComponents/Typography';
import { Collapse, makeStyles } from 'components/material-ui';
import { pluralizeText } from 'utils/stringAdditions';
import { isNumber } from 'utils/numberAdditions';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import _ from 'lodash';
import Item from '../Item';
import withApplyCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyCouponLogic';
import { usePlanContext } from '../../../../context/planStateContext';
import { useSelectorPlanData } from '../../../../hooks/useSelectorPlanData';

const styles = {
  root: {
    flex: 1,
    borderRadius: 4,
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
  },
  hidden: {
    opacity: 0,
    padding: '0 !important', // override grid spacing
  },
};
const useStyles = makeStyles(styles);
function OrgPlanSeatSeeDetails(props) {
  const classes = useStyles();
  const [planState] = usePlanContext();
  const {
    tax,
    currency,
    selectPlanAmount,
    quantity,
    upcomingInvoiceStartBalance,
    payNow,
    open,
    prorateAmount,
    totalInvoiceAmount,
    otherSubscriptionTotalAmount,
    upcomingInvoiceEndBalance,
    applyCoupon,
    applyCouponLabel,
    selectPlanId,
  } = props;

  const {
    PlanTierAmount: firstTierAmount,
    PlanSecondTierAmount: secondTierAmount,
    PlanFirstPurchase: firstPurchase,
  } = useSelectorPlanData({
    planId: selectPlanId,
  });

  const renderInitialSeat = () => {
    const description = `Initial cost for ${firstPurchase} ${pluralizeText(
      'seat',
      parseInt(firstPurchase, 10),
    )}`;

    return (
      <Item
        Component={H6}
        TitleComponent={H6}
        currency={currency}
        amount={
          firstPurchase === '1' ? selectPlanAmount : firstTierAmount / 100
        }
        description={description}
        tax={tax}
        showTax
      />
    );
  };

  const renderAdditionalSeats = () => {
    if (!secondTierAmount || !isNumber(secondTierAmount)) {
      return null;
    }
    const additionalSeatQuantity = quantity - parseInt(firstPurchase, 10); // minus the initial seat

    if (additionalSeatQuantity <= 0) {
      return null;
    }
    const totalAmount = secondTierAmount * additionalSeatQuantity;
    const seat = pluralizeText('seat', additionalSeatQuantity);

    const description = (
      <>{`Additional cost for ${additionalSeatQuantity} ${seat} capacity`}</>
    );

    return (
      <Item
        Component={H6}
        TitleComponent={H6}
        currency={currency}
        description={description}
        amount={totalAmount / 100}
        tax={tax}
        showTax
      />
    );
  };

  const appliedAccountBalance = priceAmount => {
    let p = priceAmount;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + tax) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      let leftOver = 0;
      if (planState.subscriptionProcess === UPGRADE) {
        leftOver = payNow + stripeTaxUpcomingInvoiceStartBalance / 100;
      } else {
        leftOver = stripeTaxUpcomingInvoiceStartBalance / 100;
      }
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const renderCredits = () => {
    const otherLineItem = totalInvoiceAmount - prorateAmount;
    let priceAmount = 0;
    if (otherLineItem + otherSubscriptionTotalAmount >= 0) {
      priceAmount =
        prorateAmount / 100 + selectPlanAmount + otherLineItem / 100;
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
    priceAmount = applyCoupon(priceAmount);
    const accountBalance = appliedAccountBalance(priceAmount);
    let credits = 0;
    if (selectPlanAmount >= accountBalance) {
      credits = -(selectPlanAmount - accountBalance);
    }
    if (Math.abs(credits) > selectPlanAmount) {
      credits = -selectPlanAmount;
    }
    let description = <>Applied Credits</>;
    if (applyCouponLabel()) {
      description = <>Applied Credits ({applyCouponLabel()})</>;
    }
    let subtitle = null;
    if (upcomingInvoiceEndBalance < 0) {
      // has overall credits
      subtitle = (
        <>(Remained credits ${_.round(-upcomingInvoiceEndBalance / 100, 2)})</>
      );
    }
    return (
      <Item
        Component={H6}
        TitleComponent={H6}
        currency={currency}
        description={description}
        amount={credits * ((100 + tax) / 100)}
        showTax={false}
        excludeTax
        subtitle={subtitle}
      />
    );
  };

  if (planState.previewLoading) {
    return null;
  }

  return (
    <GridItem
      className={classnames({
        [classes.root]: open,
        [classes.hidden]: !open,
      })}
    >
      <Collapse in={open} transitionduration="auto" unmountOnExit>
        <GridContainer direction="column">
          {renderInitialSeat()}
          {renderAdditionalSeats()}
          {renderCredits()}
        </GridContainer>
      </Collapse>
    </GridItem>
  );
}

OrgPlanSeatSeeDetails.propTypes = {
  open: PropTypes.bool,
  currency: PropTypes.string,
  quantity: PropTypes.number,
  tax: PropTypes.number,
  selectPlanAmount: PropTypes.number,
  prorateAmount: PropTypes.number,
  upcomingInvoiceEndBalance: PropTypes.number,
  otherSubscriptionTotalAmount: PropTypes.number,
  totalInvoiceAmount: PropTypes.number,
  upcomingInvoiceStartBalance: PropTypes.number,
  payNow: PropTypes.number,
  applyCoupon: PropTypes.func,
  applyCouponLabel: PropTypes.func,
  selectPlanId: PropTypes.string,
};

export default compose(withApplyCouponLogic)(React.memo(OrgPlanSeatSeeDetails));
