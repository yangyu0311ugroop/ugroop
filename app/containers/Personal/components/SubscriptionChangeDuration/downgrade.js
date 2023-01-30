import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import SubscriptionDowngradeCommon from '../../../../smartComponents/Subscription/SubscriptionDowngradeCommon';
import { EXPANDED, SUBSCRIPTION_INDIVIDUAL } from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useDowngradeProtection from '../../../../hooks/useDowngradeProtection';

export const ChangeDurationDowngrade = props => {
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
        title="Change Duration (Downgrade) | subscription"
        meta={[
          {
            name: 'description',
            content: 'Change Duration (Downgrade)',
          },
        ]}
      />
      <SubscriptionDowngradeCommon
        isChangeDuration
        userId={props.userId}
        variant={EXPANDED}
        type={SUBSCRIPTION_INDIVIDUAL}
        isDowngrade
        subscriptionItemIndex={0}
      />
    </PlanProvider>
  );
};

ChangeDurationDowngrade.propTypes = {
  userId: PropTypes.number,
  resaga: PropTypes.object,
};

ChangeDurationDowngrade.defaultProps = {};

export default React.memo(ChangeDurationDowngrade);
