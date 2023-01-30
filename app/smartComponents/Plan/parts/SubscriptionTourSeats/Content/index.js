import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, RadioGroup } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { useImmer } from 'use-immer';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Item from '../Item';
import { SubscriptionCalculationUtility } from '../../../../../utils/subscriptionCalculation';
import { isEmptyString } from '../../../../../utils/stringAdditions';
import { usePlanContext } from '../../../context/planStateContext';
import { DOWNGRADE, UPGRADE } from '../../../../../appConstants';

function Content(props) {
  // const classes = useStyles();
  const [state, setState] = useImmer({
    selectIndex: '',
  });
  const [planState, planStateDispatch] = usePlanContext();
  const {
    currentPlanId,
    currentSubscriptionQuantity,
    currentPlanInterval,
    currentPaymentSource,
    previewUpcomingInvoice,
    myForwardedRef,
    type,
  } = props;

  myForwardedRef.current = {
    collectPreviewInfo,
    collectPaymentInfo,
  };
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const index = SubscriptionCalculationUtility.convertQuantityIntoTierIndex(
      currentSubscriptionQuantity,
    );
    let offset = 0;
    if (planState.subscriptionProcess === UPGRADE) {
      offset = 1;
    } else if (planState.subscriptionProcess === DOWNGRADE) {
      offset = -1;
    }
    setState(draft => {
      const number = index + offset;
      // eslint-disable-next-line no-param-reassign
      draft.selectIndex = `${number}`;
    });
  }, [
    currentSubscriptionQuantity,
    currentPlanInterval,
    planState.subscriptionProcess,
  ]);

  useEffect(() => {
    if (!isEmptyString(state.selectIndex)) {
      const index = state.selectIndex;
      const price = SubscriptionCalculationUtility.convertIndexToAmount(
        index,
        currentPlanInterval,
      );
      const quantity = SubscriptionCalculationUtility.convertIndexToQuantity(
        index,
      );
      planStateDispatch.setPlanQuantity(quantity);
      planStateDispatch.setSelectAmount(price);
      planStateDispatch.setLineAmount(price);
      if (previewUpcomingInvoice) {
        previewUpcomingInvoice();
      }
    }
  }, [state.selectIndex]);

  function collectPreviewInfo() {
    const planId = currentPlanId;
    return {
      planId,
      selectIndex: parseInt(state.selectIndex, 10),
      currentPaymentSource,
      type,
    };
  }

  async function collectPaymentInfo() {
    let stripeData;
    let index = 0;
    if (!isEmptyString(state.selectIndex)) {
      index = parseInt(state.selectIndex, 10);
    }
    if (isEmptyString(currentPaymentSource) && index !== 0) {
      const cardElement = elements.getElement(CardElement);
      stripeData = await stripe.createToken(cardElement);
      if (stripeData.error) {
        planStateDispatch.setStripeError(stripeData.error.message);
      } else {
        planStateDispatch.setStripeError('');
      }
    }
    return {
      type,
      selectQuantity: SubscriptionCalculationUtility.convertIndexToQuantity(
        state.selectIndex,
      ),
      currentPlanId,
      planId: currentPlanId,
      stripeData,
      currentPaymentSource,
      planAmount: planState.selectAmount,
      planInterval: planState.selectInterval,
    };
  }

  const handleChange = event => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.selectIndex = event.target.value;
    });
  };

  const renderItems = () => {
    let lists = [];
    if (planState.subscriptionProcess === UPGRADE) {
      lists = SubscriptionCalculationUtility.upgradeTierIndexArray(
        currentSubscriptionQuantity,
      );
    } else if (planState.subscriptionProcess === DOWNGRADE) {
      lists = SubscriptionCalculationUtility.downgradeTierIndexArray(
        currentSubscriptionQuantity,
      );
    }
    const plans = lists.map(id => (
      <Item key={id} index={id} id={currentPlanId} />
    ));
    return (
      <FormControl component="fieldset">
        <RadioGroup
          name="subscription"
          value={`${state.selectIndex}`}
          aria-label="subscription"
          onChange={handleChange}
        >
          {plans}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <GridContainer spacing={0} direction="column">
      {renderItems()}
    </GridContainer>
  );
}

Content.propTypes = {
  currentPlanInterval: PropTypes.string,
  currentPaymentSource: PropTypes.string,
  currentPlanId: PropTypes.string,
  previewUpcomingInvoice: PropTypes.func,
  type: PropTypes.string,
  myForwardedRef: PropTypes.object,
  currentSubscriptionQuantity: PropTypes.number,
};

Content.defaultProps = {};

export default forwardRef((props, ref) => (
  <Content {...props} myForwardedRef={ref} />
));
