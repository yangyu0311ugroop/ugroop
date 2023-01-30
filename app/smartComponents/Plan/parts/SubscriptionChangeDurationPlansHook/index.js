import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

function SubscriptionChangeDurationPlansHook(props) {
  const {
    interval,
    types,
    myForwardedRef,
    calculatedIds,
    subscriptionPlanQuantityList,
    currentPaymentSource,
    customerId,
    equalNames,
    currentSubscriptionPlans,
  } = props;

  return (
    <>
      <Content
        type={types}
        calculatedPlanIds={calculatedIds}
        ref={myForwardedRef}
        interval={interval}
        subscriptionPlanQuantityList={subscriptionPlanQuantityList}
        currentPaymentSource={currentPaymentSource}
        customerId={customerId}
        equalNames={equalNames}
        currentSubscriptionPlans={currentSubscriptionPlans}
      />
    </>
  );
}

SubscriptionChangeDurationPlansHook.propTypes = {
  interval: PropTypes.string,
  types: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  myForwardedRef: PropTypes.object,
  calculatedIds: PropTypes.array,
  subscriptionPlanQuantityList: PropTypes.array,
  currentPaymentSource: PropTypes.string,
  customerId: PropTypes.string,
  equalNames: PropTypes.array,
  currentSubscriptionPlans: PropTypes.string,
};

SubscriptionChangeDurationPlansHook.defaultProps = {};

const ComposeSubscriptionPlans = React.memo(
  SubscriptionChangeDurationPlansHook,
);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <ComposeSubscriptionPlans {...props} myForwardedRef={ref} />
));
