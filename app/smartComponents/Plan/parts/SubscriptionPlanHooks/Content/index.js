import { DO_NOTHING_FUNC, FREE_ORG_SEATS_THRESHOLD } from 'appConstants';
import { findIndex } from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, RadioGroup } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import PlanItem from '../Item';
import { isNumber } from '../../../../../utils/numberAdditions';
import { usePlanContext } from '../../../context/planStateContext';
import { makeSingleSelect } from '../../../../../datastore/selectUtility';
import { selectPlanAttribute } from '../../../../../datastore/planDataImmerStore/selectors';
/* eslint-disable no-param-reassign */

function Content(props) {
  const [planState, dispatch] = usePlanContext();
  const { freePlanId } = props;
  const {
    calculatedPlanIds,
    currentPaymentSource,
    orgSeats,
    type,
    currentSubscriptionQuantity,
    forwardRef,
    subscriptionItems,
    ...rest
  } = props;

  useEffect(() => {
    if (calculatedPlanIds && calculatedPlanIds.length > 0) {
      initialSelectPlan(calculatedPlanIds, props.freePlanId);
    }
  }, [JSON.stringify(calculatedPlanIds), props.freePlanId]);

  const planFirstPurchase = useSelector(state =>
    makeSingleSelect([selectPlanAttribute])(state, {
      id: planState.selectPlanId,
      attribute: 'metadata.firstPurchase',
    }),
  );

  useEffect(() => {
    dispatch.setPlanFirstPurchase(planFirstPurchase);
  }, [planFirstPurchase]);

  forwardRef.current = {
    collectPreviewInfo,
    collectPaymentInfo,
  };
  const stripe = useStripe();
  const elements = useElements();

  const initialSelectPlan = (planIds, fPlanId) => {
    if (planIds && planIds.length > 0) {
      const index = findIndex(planIds, o => o === fPlanId);
      if (index >= 0) {
        dispatch.setSelectPlanId(fPlanId);
      } else {
        dispatch.setSelectPlanId(planIds[0]);
      }
    }
  };

  function collectPreviewInfo() {
    const { selectPlanId } = planState;
    const planId = selectPlanId;
    const { handleLineAmount, myForwardedRef, ...filterProps } = rest;
    return {
      planId,
      freePlanId,
      currentPaymentSource,
      planFirstPurchase: planState.planFirstPurchase,
      ...filterProps,
    };
  }

  async function collectPaymentInfo() {
    let stripeData;
    const { selectPlanId } = planState;
    const planId = selectPlanId;
    if (
      currentPaymentSource == null &&
      selectPlanId !== '' &&
      selectPlanId !== props.freePlanId
    ) {
      const cardElement = elements.getElement(CardElement);
      stripeData = await stripe.createToken(cardElement);
      if (stripeData.error) {
        dispatch.setStripeError(stripeData.error.message);
      } else {
        dispatch.setStripeError('');
      }
    }
    // eslint-disable-next-line no-unused-vars
    const { handleLineAmount, ...filterProps } = rest;
    return {
      planId,
      stripeData,
      freePlanId: props.freePlanId,
      currentPaymentSource,
      planAmount: planState.selectAmount,
      planInterval: planState.selectInterval,
      planFirstPurchase: planState.planFirstPurchase,
      bundlePlanId: props.bundlePlanId,
      ...filterProps,
    };
  }

  const handleChange = (
    lineTotal,
    id,
    planFirstPurchaseValue,
    selectBundleName,
  ) => event => {
    dispatch.setSelectAmount(lineTotal);
    dispatch.setSelectPlanId(event.target.value);
    dispatch.setPlanFirstPurchase(planFirstPurchaseValue);
    dispatch.setSelectPlanBundleName(selectBundleName);
  };

  const renderItems = () => {
    const { selectPlanId } = planState;

    const upgradablePlans = calculatedPlanIds.map(id => (
      <PlanItem
        key={id}
        id={id}
        selectedId={selectPlanId}
        handleChange={handleChange}
        orgSeats={orgSeats}
        type={type}
        quantity={
          isNumber(currentSubscriptionQuantity)
            ? currentSubscriptionQuantity
            : orgSeats - FREE_ORG_SEATS_THRESHOLD
        }
      />
    ));
    return (
      <FormControl component="fieldset">
        <RadioGroup
          name="subscription"
          value={selectPlanId}
          aria-label="subscription"
        >
          {upgradablePlans}
        </RadioGroup>
      </FormControl>
    );
  };

  if (calculatedPlanIds && calculatedPlanIds.length > 0) {
    return (
      <GridContainer spacing={0} direction="column">
        {renderItems()}
      </GridContainer>
    );
  }
  return null;
}

Content.propTypes = {
  // parent props
  calculatedPlanIds: PropTypes.array,
  freePlanId: PropTypes.string,
  currentPlanAmount: PropTypes.number,
  currentSubscriptionId: PropTypes.string,
  currentSubscriptionItem: PropTypes.string,
  currentPaymentSource: PropTypes.string,
  currentPlanId: PropTypes.string,
  customerId: PropTypes.string,
  currentPhaseStart: PropTypes.number,
  currentPhaseEnd: PropTypes.number,
  currentActiveScheduleId: PropTypes.string,
  handleFreePlanId: PropTypes.func,
  handleLineAmount: PropTypes.func,
  handleSelectPlanId: PropTypes.func,
  type: PropTypes.string,
  orgSeats: PropTypes.number,
  forwardRef: PropTypes.object,
  firstItemInUpgradablePlanInterval: PropTypes.string,
  firstItemInUpgradablePlanAmount: PropTypes.number,
  firstItemInUpgradablePlanFirstTierAmount: PropTypes.number,
  currentSubscriptionQuantity: PropTypes.number,
  bundlePlanId: PropTypes.string,
  subscriptionItems: PropTypes.array,
};

Content.defaultProps = {
  handleFreePlanId: DO_NOTHING_FUNC,
  calculatedPlanIds: [],
  freePlanId: '',
  bundlePlanId: '',
};

export default Content;
