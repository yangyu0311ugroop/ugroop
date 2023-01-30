import { DEFAULT_TAX_GST, SUBSCRIPTION_ENTERPRISE } from 'appConstants';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H3, H4 } from 'viewComponents/Typography';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import { isNumber } from '../../../../utils/numberAdditions';
import { makeStyles } from '../../../../components/material-ui';
import { usePlanContext } from '../../context/planStateContext';
import { useSelectorPlanData } from '../../hooks/useSelectorPlanData';

const styles = {
  grow: {
    flex: 1,
  },
  total: {
    textAlign: 'right',
  },
  seatInput: {
    display: 'flex',
    alignItems: 'center',
  },
  arrow: {
    padding: '0 16px',
  },
  hr: {
    marginBottom: 0,
  },
};

const useStyles = makeStyles(styles);
function FirstTimeSubscriptionPreviewDue(props) {
  const { tax, quantity, type } = props;
  const currency = 'AU';
  const [planState] = usePlanContext();
  const classes = useStyles();

  const {
    PlanAmount: amount,
    PlanTierAmount: firstTier,
    PlanSecondTierAmount: secondTier,
    PlanFirstPurchase: selectPlanFirstPurchase,
  } = useSelectorPlanData({
    planId: planState && planState.selectPlanId,
  });

  const renderPayNow = () => {
    let q = 1;
    if (type === SUBSCRIPTION_ENTERPRISE) {
      if (isNumber(firstTier)) {
        const firstPurchaseQuantity = selectPlanFirstPurchase;
        if (quantity > parseInt(firstPurchaseQuantity, 10)) {
          q = quantity - parseInt(firstPurchaseQuantity, 10);
        } else {
          q = 0;
        }
      }
    }
    return (
      <PriceDisplay
        Component={H3}
        showTax
        currency={currency}
        amount={amount / 100}
        tierPrice={firstTier / 100}
        secondTierPrice={secondTier / 100}
        tax={tax || DEFAULT_TAX_GST}
        textAlign="right"
        quantity={q}
      />
    );
  };

  const dueDate = 'Today';
  return (
    <>
      <GridItem>
        <GridContainer>
          <GridItem className={classes.grow}>
            <H4 dense weight="bold">
              Due {dueDate}
            </H4>
          </GridItem>
          <GridItem>{renderPayNow()}</GridItem>
        </GridContainer>
        <hr className={classes.hr} />
      </GridItem>
    </>
  );
}

FirstTimeSubscriptionPreviewDue.propTypes = {
  quantity: PropTypes.number,
  tax: PropTypes.number,
  type: PropTypes.string,
};

FirstTimeSubscriptionPreviewDue.defaultProps = {};

export default FirstTimeSubscriptionPreviewDue;
