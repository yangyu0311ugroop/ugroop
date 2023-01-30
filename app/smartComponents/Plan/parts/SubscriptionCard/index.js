import React from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import _ from 'lodash';
import {
  CARD,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_FREE_PLANS,
} from 'appConstants';
import { H5 } from 'viewComponents/Typography';
import { CardElement } from '@stripe/react-stripe-js';
import PaymentMethods from 'smartComponents/Customer/components/PaymentMethods';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { usePlanContext } from '../../context/planStateContext';

function SubscriptionCard(props) {
  const { type, orgId, userId, listPlanNames } = props;
  const [planState, dispatchPlanState] = usePlanContext();
  const cardChange = () => {
    if (!isEmptyString(planState.stripeError)) {
      dispatchPlanState.setStripeError('');
    }
  };
  const {
    customerId,
    currentPaymentSource,
  } = useSelectorCurrentSubscriptionData(props);
  const freePlanId = planState && planState.freePlanId;
  const selectPlanId = planState && planState.selectPlanId;
  const showCards = () => (
    <>
      <GridItem>
        <H5 subtitle weight="bold" transform="uppercase">
          Credit Card
        </H5>
      </GridItem>
      <GridItem>
        <CardElement hidePostalCode onChange={cardChange} />
      </GridItem>
    </>
  );

  const renderCardsBasedOnTourSeatConditions = () => {
    if (planState.selectQuantity === 0 && isEmptyString(currentPaymentSource)) {
      return null;
    }
    if (isEmptyString(currentPaymentSource) || planState.updatingCustomer) {
      return showCards();
    }
    return (
      <>
        <GridItem>
          <H5 subtitle weight="bold" transform="uppercase">
            Billing Information
          </H5>
        </GridItem>
        <PaymentMethods
          orgId={orgId}
          userId={userId}
          id={customerId}
          currentPaymentSource={currentPaymentSource}
          variant={CARD}
        />
      </>
    );
  };

  const renderCardsBasedOnChangeDurationConditions = () => {
    const hasFree = _.intersection(listPlanNames, SUBSCRIPTION_FREE_PLANS);
    if (hasFree.length > 0 && isEmptyString(currentPaymentSource)) {
      return null;
    }
    if (hasFree.length === 0 && isEmptyString(currentPaymentSource)) {
      return showCards();
    }
    return (
      <>
        <GridItem>
          <H5 subtitle weight="bold" transform="uppercase">
            Billing Information
          </H5>
        </GridItem>
        <PaymentMethods
          orgId={orgId}
          userId={userId}
          id={customerId}
          currentPaymentSource={currentPaymentSource}
          variant={CARD}
        />
      </>
    );
  };

  const renderCardsInGeneralConditions = () => {
    if (freePlanId === selectPlanId) {
      return null;
    }

    let showCardElement = false;

    if (isEmptyString(currentPaymentSource) && !isEmptyString(selectPlanId)) {
      showCardElement = true;
    }
    // still show card component, if is still updating the payment source.
    if (showCardElement || planState.updatingCustomer) {
      return showCards();
    }
    return (
      <>
        <GridItem>
          <H5 subtitle weight="bold" transform="uppercase">
            Billing Information
          </H5>
        </GridItem>
        <PaymentMethods
          orgId={orgId}
          userId={userId}
          id={customerId}
          currentPaymentSource={currentPaymentSource}
          variant={CARD}
        />
      </>
    );
  };

  const renderCards = () => {
    let cardsComponent;
    if (Array.isArray(type)) {
      cardsComponent = renderCardsBasedOnChangeDurationConditions();
    } else if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
      cardsComponent = renderCardsBasedOnTourSeatConditions();
    } else {
      cardsComponent = renderCardsInGeneralConditions();
    }
    if (cardsComponent === null) return null;
    return <>{cardsComponent}</>;
  };

  return renderCards();
}

SubscriptionCard.propTypes = {
  type: PropTypes.any,
  orgId: PropTypes.number,
  userId: PropTypes.number,
  freePlanId: PropTypes.string,
  selectPlanId: PropTypes.string,
  currentPaymentSource: PropTypes.string,
  customerId: PropTypes.string,
  listPlanNames: PropTypes.array,
};

export default SubscriptionCard;
