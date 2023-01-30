import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_INDIVIDUAL,
  SUBSCRIPTION_ENTERPRISE_TOUR,
} from 'appConstants';
import EnterpriseSeatPlan from 'smartComponents/Plan/NewEnterpriseSeatPlan';
import IndividualSeatPlan from 'smartComponents/Plan/NewIndividualSeatPlan';
import EnterpriseTourSeatPlan from 'smartComponents/Plan/NewEnterpriseTourSeatPlan';
import EnterpriseChangeDurationPlan from 'smartComponents/Plan/NewEnterpriseChangeDurationPlan';

function Plan(props) {
  const { type, myForwardedRef } = props;
  if (Array.isArray(type)) {
    return <EnterpriseChangeDurationPlan ref={myForwardedRef} {...props} />;
  }
  if (type === SUBSCRIPTION_ENTERPRISE) {
    return <EnterpriseSeatPlan ref={myForwardedRef} {...props} />;
  }
  if (type === SUBSCRIPTION_INDIVIDUAL) {
    return <IndividualSeatPlan ref={myForwardedRef} {...props} />;
  }
  if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
    return <EnterpriseTourSeatPlan ref={myForwardedRef} {...props} />;
  }

  return <div />;
}

Plan.propTypes = {
  // parent props
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  myForwardedRef: PropTypes.object,
};

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <Plan {...props} myForwardedRef={ref} />
));
