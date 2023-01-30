import React from 'react';
import { compose } from 'redux';
import { BuymoreTourSeats } from '../BuymoreTourSeats';
import withCustomerSubscriptionCheck from '../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

function BuymoreTourSeatsWrapper(props) {
  return <BuymoreTourSeats {...props} />;
}

export default compose(withCustomerSubscriptionCheck)(BuymoreTourSeatsWrapper);
