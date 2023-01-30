/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import _ from 'lodash';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import P from 'viewComponents/Typography';
import FlightBooking from 'smartComponents/Event/components/FlightBooking/layouts';

export const EMPTY = '0';
export const CREATE_NEW = 'new';

const findBookingId = (bookingIds, id) => {
  const idNumber = Number.parseInt(id, 10);
  return _.find(bookingIds, currentId => idNumber === currentId);
};

const renderBooking = dataId => (
  <FlightBooking dataId={dataId} variant={EVENT_CONSTANTS.VARIANTS.option} />
);

const renderBookingOptions = (bookingIds, hideAddNew) => {
  const options = [];
  const push = (id, children) => {
    options.push({ value: id.toString(), children });
  };

  push(EMPTY, <P noMargin>No flight itinerary</P>);

  if (bookingIds) {
    bookingIds.forEach(id => {
      push(id, renderBooking(id));
    });
  }

  if (hideAddNew) return options;

  push(
    CREATE_NEW,
    <P noMargin weight="bold">
      Add new itinerary
    </P>,
  );

  return options;
};

export default {
  findBookingId,
  renderBooking,
  renderBookingOptions,
};
