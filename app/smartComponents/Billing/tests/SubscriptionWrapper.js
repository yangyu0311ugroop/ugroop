import resagaHOC from 'resaga';
import React from 'react';
import SubscriptionUpgrade from '../../../containers/Organisations/components/SubscriptionUpgrade';
function SubscriptionWrapper(props) {
  // eslint-disable-next-line react/prop-types
  const { id, planType, resaga } = props;
  return <SubscriptionUpgrade orgId={id} planType={planType} resaga={resaga} />;
}

export default resagaHOC()(SubscriptionWrapper);
