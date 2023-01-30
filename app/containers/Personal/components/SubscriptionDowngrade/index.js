import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import SubscriptionDowngradeCommon from '../../../../smartComponents/Subscription/SubscriptionDowngradeCommon';
import { SUBSCRIPTION_INDIVIDUAL, EXPANDED } from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useDowngradeProtection from '../../../../hooks/useDowngradeProtection';

function SubscriptionDowngrade(props) {
  const { userId, resaga } = props;
  const data = useDowngradeProtection({
    userId,
    resaga,
  });

  if (!data.isPass) {
    return <div />;
  }
  return (
    <PlanProvider>
      <Helmet
        title="Downgrade | Subscription"
        meta={[
          {
            name: 'description',
            content: 'Downgrade subscription',
          },
        ]}
      />
      <SubscriptionDowngradeCommon
        variant={EXPANDED}
        type={SUBSCRIPTION_INDIVIDUAL}
        userId={userId}
        isDowngrade
        subscriptionItemIndex={0}
      />
    </PlanProvider>
  );
}

SubscriptionDowngrade.propTypes = {
  userId: PropTypes.number,
  resaga: PropTypes.object,
};

SubscriptionDowngrade.defaultProps = {};

export default React.memo(SubscriptionDowngrade);
