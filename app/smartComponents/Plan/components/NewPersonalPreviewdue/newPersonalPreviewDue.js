import React from 'react';
import PropTypes from 'prop-types';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { isEmptyString } from '../../../../utils/stringAdditions';
import FirstTimeSubscriptionPreviewDue from '../FirstTimeSubscriptionPreviewDue';
import DurationPreviewDue from '../DurationPreviewDue';
import PersonPlanModifiedPreviewDue from './planModifiedPreviewDue';

function NewPersonalPreviewDue(props) {
  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const { customerId, currentPlanInterval } = currentSubscriptionData;
  const { intervalState, type } = props;
  if (isEmptyString(customerId)) {
    return (
      <FirstTimeSubscriptionPreviewDue
        interval={intervalState}
        quantity={1}
        type={type}
      />
    );
  }
  if (currentPlanInterval !== intervalState) {
    return (
      <DurationPreviewDue
        interval={intervalState}
        userId={props.userId}
        subscriptionItemIndex={props.subscriptionItemIndex}
      />
    );
  }
  return (
    <PersonPlanModifiedPreviewDue
      type={type}
      interval={intervalState}
      userId={props.userId}
      subscriptionItemIndex={props.subscriptionItemIndex}
    />
  );
}

NewPersonalPreviewDue.propTypes = {
  type: PropTypes.string,
  userId: PropTypes.number,
  subscriptionItemIndex: PropTypes.number,
  intervalState: PropTypes.string,
};

export default NewPersonalPreviewDue;
