import React from 'react';
import PropTypes from 'prop-types';
import {
  ORG_SEAT_RENDER,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import SubscriptionDowngradeCommon from '../../../../smartComponents/Subscription/SubscriptionDowngradeCommon';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useDowngradeProtection from '../../../../hooks/useDowngradeProtection';

function SubscriptionRemoveSeat(props) {
  const { userId, orgId, resaga } = props;
  const downgradeProtection = useDowngradeProtection({
    orgId,
    userId,
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

  if (!downgradeProtection.isPass) {
    return <div />;
  }
  return (
    <PlanProvider>
      <SubscriptionDowngradeCommon
        orgId={orgId}
        userId={userId}
        variant={ORG_SEAT_RENDER}
        type={SUBSCRIPTION_ENTERPRISE}
        isDowngrade
        previewUpcomingInvoiceSuccess={getUpComingInvoiceSuccess}
        previewUpcomingInvoiceFail={getUpcomingInvoiceFail}
        subscriptionItemIndex={downgradeProtection.index}
      />
    </PlanProvider>
  );
}

SubscriptionRemoveSeat.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  resaga: PropTypes.object,
};

SubscriptionRemoveSeat.defaultProps = {};

export default React.memo(SubscriptionRemoveSeat);
