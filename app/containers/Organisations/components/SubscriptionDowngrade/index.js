import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionDowngradeCommon from '../../../../smartComponents/Subscription/SubscriptionDowngradeCommon';
import {
  SUBSCRIPTION_ENTERPRISE,
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useDowngradeProtection from '../../../../hooks/useDowngradeProtection';
function SubscriptionDowngrade(props) {
  const { planType, userId, orgId, resaga } = props;
  const downgradeProtection = useDowngradeProtection({
    userId,
    orgId,
    type: planType,
    resaga,
  });
  let type;
  if (planType === SUBSCRIPTION_PLAN_TYPE.ORG_SEAT) {
    type = SUBSCRIPTION_ENTERPRISE;
  } else {
    type = SUBSCRIPTION_ENTERPRISE_TOUR;
  }
  if (!downgradeProtection.isPass) {
    return <div />;
  }

  return (
    <PlanProvider>
      <SubscriptionDowngradeCommon
        variant={EXPANDED}
        type={type}
        userId={userId}
        orgId={orgId}
        isDowngrade
        subscriptionItemIndex={downgradeProtection.index}
      />
    </PlanProvider>
  );
}

SubscriptionDowngrade.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  planType: PropTypes.string,
  resaga: PropTypes.object,
};

SubscriptionDowngrade.defaultProps = {};

export default SubscriptionDowngrade;
