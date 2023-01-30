import React from 'react';
import PropTypes from 'prop-types';
import {
  ORG_SEAT_RENDER,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import SubscriptionUpgradeCommon from '../../../../smartComponents/Subscription/SubscriptionUpgradeCommon';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useUpgradeProtectionHook from '../../../../hooks/useUpgradeProtectionHook';
function SubscriptionAddSeat(props) {
  const { userId, orgId, resaga } = props;
  const canUpdate = useUpgradeProtectionHook({
    orgId,
    type: SUBSCRIPTION_PLAN_TYPE.ORG_SEAT,
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
  if (canUpdate.isPass) {
    return (
      <PlanProvider>
        <SubscriptionUpgradeCommon
          orgId={orgId}
          userId={userId}
          variant={ORG_SEAT_RENDER}
          previewUpcomingInvoiceSuccess={getUpComingInvoiceSuccess}
          previewUpcomingInvoiceFail={getUpcomingInvoiceFail}
          type={SUBSCRIPTION_ENTERPRISE}
          isUpgrade
          subscriptionItemIndex={canUpdate.index}
        />
      </PlanProvider>
    );
  }
  return <div />;
}

SubscriptionAddSeat.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  resaga: PropTypes.object,
};

SubscriptionAddSeat.defaultProps = {};

export default SubscriptionAddSeat;
