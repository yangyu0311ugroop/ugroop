import React from 'react';
import PropTypes from 'prop-types';
import {
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import SubscriptionDowngradeCommon from '../../../../smartComponents/Subscription/SubscriptionDowngradeCommon';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useDowngradeProtection from '../../../../hooks/useDowngradeProtection';

function ChangeDurationDowngrade(props) {
  const { userId, orgId, resaga } = props;
  const downgrade = useDowngradeProtection({
    userId,
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
  if (!downgrade.isPass) {
    return <div />;
  }

  return (
    <PlanProvider>
      <SubscriptionDowngradeCommon
        variant={EXPANDED}
        type={[SUBSCRIPTION_ENTERPRISE, SUBSCRIPTION_ENTERPRISE_TOUR]}
        userId={userId}
        orgId={orgId}
        isChangeDuration
        isDowngrade
        previewUpcomingInvoiceFail={getUpComingInvoiceSuccess}
        previewUpcomingInvoiceSuccess={getUpcomingInvoiceFail}
      />
    </PlanProvider>
  );
}

ChangeDurationDowngrade.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  resaga: PropTypes.object,
};

ChangeDurationDowngrade.defaultProps = {};

export default React.memo(ChangeDurationDowngrade);
