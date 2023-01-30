import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, RadioGroup } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import _ from 'lodash';
import { SUBSCRIPTION_FREE_PLANS } from 'appConstants';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PlanItem from '../Item';
import { parseStringJson } from '../../../../../utils/stringAdditions';
import { usePlanContext } from '../../../context/planStateContext';

function Content(props) {
  const {
    calculatedPlanIds,
    currentPaymentSource,
    type,
    mforwardRef,
    subscriptionPlanQuantityList,
    customerId,
    equalNames,
    currentSubscriptionPlans,
  } = props;
  const [, dispatch] = usePlanContext();
  const stripe = useStripe();
  const elements = useElements();

  function collectPreviewInfo() {
    return {
      currentPaymentSource,
      listPlanIds: calculatedPlanIds,
      subscriptionPlanQuantityList,
      type,
      customerId,
      equalNames,
    };
  }

  async function collectPaymentInfo() {
    let stripeData;
    const hasInterSection = _.intersection(equalNames, SUBSCRIPTION_FREE_PLANS);
    if (currentPaymentSource == null && hasInterSection.length === 0) {
      const cardElement = elements.getElement(CardElement);
      stripeData = await stripe.createToken(cardElement);
      if (stripeData.error) {
        dispatch.setStripeError(stripeData.error.message);
      } else {
        dispatch.setStripeError('');
      }
    }
    return {
      stripeData,
      currentPaymentSource,
      listPlanIds: calculatedPlanIds,
      subscriptionPlanQuantityList,
      equalNames,
    };
  }

  mforwardRef.current = {
    collectPreviewInfo,
    collectPaymentInfo,
  };

  const renderItems = () => {
    const data = parseStringJson(currentSubscriptionPlans);
    const sortedData = data.sort((a, b) => (a.type > b.type ? 1 : -1));
    const sortedIds = sortedData.map(o => o.equalPlanId);
    const sortedQuantity = sortedData.map(o => o.quantity);
    const upgradablePlans = sortedIds.map((id, index) => (
      <PlanItem key={id} id={id} quantity={sortedQuantity[index]} />
    ));
    return (
      <FormControl component="fieldset">
        <RadioGroup name="subscription" value="1" aria-label="subscription">
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
  type: PropTypes.string,
  calculatedPlanIds: PropTypes.array,
  customerId: PropTypes.string,
  mforwardRef: PropTypes.object,
  currentPaymentSource: PropTypes.string,
  subscriptionPlanQuantityList: PropTypes.array,
  equalNames: PropTypes.array,
  currentSubscriptionPlans: PropTypes.string,
};

Content.defaultProps = {
  calculatedPlanIds: [],
};

const MemoContent = React.memo(Content);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <MemoContent {...props} mforwardRef={ref} />
));
