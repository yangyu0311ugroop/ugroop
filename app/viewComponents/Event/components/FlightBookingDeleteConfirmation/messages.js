/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.Event.components.FlightBookingDeleteConfirmation.title',
    defaultMessage: 'Delete Flight Itinerary',
  },
  headlineWithBookingNumber: {
    id:
      'app.Event.components.FlightBookingDeleteConfirmation.headlineWithBookingNumber',
    defaultMessage: 'You are about to delete:',
  },
  headlineWithoutBookingNumber: {
    id:
      'app.Event.components.FlightBookingDeleteConfirmation.headlineWithoutBookingNumber',
    defaultMessage: 'You are about to delete an itinerary',
  },
  text: {
    id: 'app.Event.components.FlightBookingDeleteConfirmation.text',
    defaultMessage: 'Are you sure you want to delete this flight itinerary?',
  },
});
