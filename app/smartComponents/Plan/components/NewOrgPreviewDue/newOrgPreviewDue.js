import React from 'react';
import PropTypes from 'prop-types';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { isEmptyString } from '../../../../utils/stringAdditions';
import FirstTimeSubscriptionPreviewDue from '../FirstTimeSubscriptionPreviewDue';
import OrgPlanModifiedPreviewDue from './orgPlanModifiedPreviewDue';

function NewOrgPreviewDue(props) {
  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const { customerId } = currentSubscriptionData;
  const { intervalState, type, orgSeats } = props;
  if (isEmptyString(customerId)) {
    return (
      <FirstTimeSubscriptionPreviewDue
        interval={intervalState}
        quantity={1}
        type={type}
      />
    );
  }
  return (
    <OrgPlanModifiedPreviewDue
      type={type}
      interval={intervalState}
      orgId={props.orgId}
      userId={props.userId}
      subscriptionItemIndex={props.subscriptionItemIndex}
      orgSeats={orgSeats}
    />
  );
}

NewOrgPreviewDue.propTypes = {
  type: PropTypes.string,
  orgId: PropTypes.number,
  userId: PropTypes.number,
  subscriptionItemIndex: PropTypes.number,
  intervalState: PropTypes.string,
  orgSeats: PropTypes.number,
};

export default NewOrgPreviewDue;
