import React from 'react';
import PropTypes from 'prop-types';
import Content from 'smartComponents/Plan/parts/SubscriptionPlanHooks/Content';

const PlanWrapper = React.forwardRef(({ calculatedPlanIds, ...rest }, ref) => (
  <Content calculatedPlanIds={calculatedPlanIds} forwardRef={ref} {...rest} />
));

PlanWrapper.propTypes = {
  calculatedPlanIds: PropTypes.array,
};

export default PlanWrapper;
