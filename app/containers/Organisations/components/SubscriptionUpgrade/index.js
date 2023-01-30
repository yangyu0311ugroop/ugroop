import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionUpgradeCommon from 'smartComponents/Subscription/SubscriptionUpgradeCommon';
import {
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useUpgradeProtectionHook from '../../../../hooks/useUpgradeProtectionHook';

function SubscriptionUpgrade(props) {
  const { planType, resaga } = props;
  let type;
  if (props.planType === SUBSCRIPTION_PLAN_TYPE.ORG_SEAT) {
    type = SUBSCRIPTION_ENTERPRISE;
  } else {
    type = SUBSCRIPTION_ENTERPRISE_TOUR;
  }

  const data = useUpgradeProtectionHook({
    type: planType,
    orgId: props.orgId,
    resaga,
  });

  if (data.isPass) {
    return (
      <PlanProvider>
        <SubscriptionUpgradeCommon
          orgId={props.orgId}
          userId={props.userId}
          variant={EXPANDED}
          type={type}
          subscriptionItemIndex={data.index}
          isUpgrade
        />
      </PlanProvider>
    );
  }
  return <div />;
}

SubscriptionUpgrade.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  planType: PropTypes.string,
  resaga: PropTypes.object,
};

SubscriptionUpgrade.defaultProps = {};

export default React.memo(SubscriptionUpgrade);
