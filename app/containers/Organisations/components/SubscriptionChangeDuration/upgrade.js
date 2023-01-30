import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionUpgradeCommon from '../../../../smartComponents/Subscription/SubscriptionUpgradeCommon';
import {
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
} from '../../../../appConstants';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useUpgradeProtectionHook from '../../../../hooks/useUpgradeProtectionHook';

export const ChangeDurationUpgrade = props => {
  const { resaga } = props;
  const upgrade = useUpgradeProtectionHook({
    orgId: props.orgId,
    resaga,
  });

  const getUpComingInvoiceSuccess = data => () => {
    if (data) {
      data.onSuccess();
    }
  };

  const getUpcomingInvoiceFail = data => () => {
    if (data) {
      data.onFailure();
    }
  };

  if (!upgrade.isPass) {
    return <div />;
  }
  return (
    <PlanProvider>
      <SubscriptionUpgradeCommon
        isChangeDuration
        isUpgrade
        userId={props.userId}
        orgId={props.orgId}
        variant={EXPANDED}
        type={[SUBSCRIPTION_ENTERPRISE, SUBSCRIPTION_ENTERPRISE_TOUR]}
        previewUpcomingInvoiceFail={getUpComingInvoiceSuccess}
        previewUpcomingInvoiceSuccess={getUpcomingInvoiceFail}
      />
    </PlanProvider>
  );
};

ChangeDurationUpgrade.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  resaga: PropTypes.object,
};

ChangeDurationUpgrade.defaultProps = {};

export default ChangeDurationUpgrade;
