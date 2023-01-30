import PropTypes from 'prop-types';
import React from 'react';
import BillingWrapper from 'smartComponents/Billing';
import { compose } from 'redux';
import withCustomerSubscriptionCheck from 'ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';
import withScheduleSubscriptionPlanCheck from 'ugcomponents/CustomerSubscriptions/hoc/withScheduleSubscriptionCheck';
import { PAGE_HELMETS } from 'appConstants';
import { Helmet } from 'react-helmet';
export const Billing = ({ userId, id }) => (
  <>
    <Helmet
      title={PAGE_HELMETS.ORGANISATION_BILLING}
      meta={[
        {
          name: 'description',
          content: 'Description of Organisation Billing',
        },
      ]}
    />
    <BillingWrapper userId={userId} orgId={id} />
  </>
);

Billing.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
};

Billing.defaultProps = {};

export default compose(
  withCustomerSubscriptionCheck,
  withScheduleSubscriptionPlanCheck,
)(Billing);
