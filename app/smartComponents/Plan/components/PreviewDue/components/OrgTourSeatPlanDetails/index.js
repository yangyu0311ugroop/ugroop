import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { H6 } from 'viewComponents/Typography';
import { Collapse, makeStyles } from 'components/material-ui';
import { pluralizeText } from 'utils/stringAdditions';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import _ from 'lodash';
import Item from '../Item';
import { isNumber } from '../../../../../../utils/numberAdditions';
import withApplyCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyCouponLogic';
import { usePlanContext } from '../../../../context/planStateContext';

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
function SeeDetails(props) {
  const {
    tax,
    currency,
    selectPlanAmount,
    selectPlanQuantity,
    upcomingInvoiceStartBalance,
    otherSubscriptionTotalAmount,
    applyCoupon,
    open,
    prorateAmount,
    upcomingInvoiceEndBalance,
    totalInvoiceAmount,
    applyCouponLabel,
  } = props;
  const classes = useStyles();
  const [planState] = usePlanContext();
  const renderInitialSeat = () => {
    const description = `${selectPlanQuantity} tour ${pluralizeText(
      'seat',
      parseInt(selectPlanQuantity, 10),
    )}`;
    return (
      <Item
        Component={H6}
        TitleComponent={H6}
        currency={currency}
        amount={selectPlanAmount}
        description={description}
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
      const leftOver =
        (stripeTaxUpcomingInvoiceStartBalance + otherSubscriptionTotalAmount) /
        100;
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const renderCredits = () => {
    let subtitle = null;
    let credits = 0;
    let description = <>Applied Credits</>;
    if (applyCouponLabel()) {
      description = <>Applied Credits ({applyCouponLabel()})</>;
    }
    const otherLineItem = totalInvoiceAmount - prorateAmount;
    let priceAmount = 0;
    if (otherLineItem + otherSubscriptionTotalAmount >= 0) {
      priceAmount = prorateAmount / 100 + selectPlanAmount;
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

    if (selectPlanAmount >= accountBalance) {
      credits = -(selectPlanAmount - accountBalance);
    }
    if (Math.abs(credits) > selectPlanAmount) {
      credits = -selectPlanAmount;
    }
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
          {renderCredits()}
        </GridContainer>
      </Collapse>
    </GridItem>
  );
}

SeeDetails.propTypes = {
  open: PropTypes.bool,
  currency: PropTypes.string,
  tax: PropTypes.number,
  selectPlanAmount: PropTypes.number,
  prorateAmount: PropTypes.number,
  upcomingInvoiceEndBalance: PropTypes.number,
  otherSubscriptionTotalAmount: PropTypes.number,
  totalInvoiceAmount: PropTypes.number,
  upcomingInvoiceStartBalance: PropTypes.number,
  selectPlanQuantity: PropTypes.number,
  applyCoupon: PropTypes.func,
  applyCouponLabel: PropTypes.func,
};

export default compose(withApplyCouponLogic)(React.memo(SeeDetails));
