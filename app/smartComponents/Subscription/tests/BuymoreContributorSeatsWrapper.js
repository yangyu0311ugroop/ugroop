import React from 'react';
import { compose } from 'redux';
import { BuymoreContributorSeats } from '../BuymoreContributorSeats';
import withCustomerSubscriptionCheck from '../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

function BuymoreContributorSeatsWrapper(props) {
  return <BuymoreContributorSeats {...props} />;
}

export default compose(withCustomerSubscriptionCheck)(
  BuymoreContributorSeatsWrapper,
);
