import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionUpgradeCommon from 'smartComponents/Subscription/SubscriptionUpgradeCommon';
import { Helmet } from 'react-helmet';
import { EXPANDED, SUBSCRIPTION_INDIVIDUAL } from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useUpgradeProtectionHook from '../../../../hooks/useUpgradeProtectionHook';

function SubscriptionUpgrade(props) {
  const { userId, resaga } = props;
  const data = useUpgradeProtectionHook({
    userId,
    resaga,
  });
  if (data.isPass) {
    return (
      <PlanProvider>
        <Helmet
          title="Upgrade | Subscription"
          meta={[
            {
              name: 'description',
              content: 'Upgrade subscription',
            },
          ]}
        />
        <SubscriptionUpgradeCommon
          variant={EXPANDED}
          type={SUBSCRIPTION_INDIVIDUAL}
          userId={userId}
          subscriptionItemIndex={0}
          isUpgrade
          previewUpcomingInvoiceFail={() => {}}
          previewUpcomingInvoiceSuccess={() => () => {}}
        />
      </PlanProvider>
    );
  }
  return <div />;
}

SubscriptionUpgrade.propTypes = {
  userId: PropTypes.number,
  resaga: PropTypes.object,
};

SubscriptionUpgrade.defaultProps = {};

export default SubscriptionUpgrade;
