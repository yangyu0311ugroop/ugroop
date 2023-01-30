import PropTypes from 'prop-types';
import React from 'react';
import BillingWrapper from 'smartComponents/Billing';
import { compose } from 'redux';
import withCustomerSubscriptionCheck from 'ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';
import withScheduleSubscriptionPlanCheck from '../../../../../../../../ugcomponents/CustomerSubscriptions/hoc/withScheduleSubscriptionCheck';

export const Billing = ({ userId }) => (
  <>
    <BillingWrapper userId={userId} />
  </>
);

Billing.propTypes = {
  userId: PropTypes.number,
};

Billing.defaultProps = {};

export default compose(
  withCustomerSubscriptionCheck,
  withScheduleSubscriptionPlanCheck,
)(Billing);
