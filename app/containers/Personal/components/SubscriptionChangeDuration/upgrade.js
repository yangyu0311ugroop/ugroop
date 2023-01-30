import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import SubscriptionUpgradeCommon from '../../../../smartComponents/Subscription/SubscriptionUpgradeCommon';
import { EXPANDED, SUBSCRIPTION_INDIVIDUAL } from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useUpgradeProtectionHook from '../../../../hooks/useUpgradeProtectionHook';

export const ChangeDurationUpgrade = props => {
  const data = useUpgradeProtectionHook({
    userId: props.userId,
    resaga: props.resaga,
  });
  if (data.isPass) {
    return (
      <PlanProvider>
        <Helmet
          title="Change Duration (Upgrade) | subscription"
          meta={[
            {
              name: 'description',
              content: 'Change Duration (Upgrade)',
            },
          ]}
        />
        <>
          <SubscriptionUpgradeCommon
            isChangeDuration
            isUpgrade
            userId={props.userId}
            variant={EXPANDED}
            type={SUBSCRIPTION_INDIVIDUAL}
            subscriptionItemIndex={0}
          />
        </>
      </PlanProvider>
    );
  }
  return <div />;
};

ChangeDurationUpgrade.propTypes = {
  userId: PropTypes.number,
  resaga: PropTypes.object,
};

ChangeDurationUpgrade.defaultProps = {};

export default ChangeDurationUpgrade;
