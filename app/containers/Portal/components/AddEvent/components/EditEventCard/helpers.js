import dotProp from 'dot-prop-immutable';
import get from 'lodash/get';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';

export const convertReservation = data => {
  if (!EVENT_VIEW_HELPERS.isTransportation(data)) {
    const eventBooking = get(data, `detail.detail.common.eventBooking`);

    if (!eventBooking) return data;

    return dotProp.merge(data, 'detail', {
      bookingNumber: eventBooking.bookingNumber,
      bookedBy: eventBooking.bookedBy,
      supplier: eventBooking.supplierName,
      supplierPhoneNumber: eventBooking.supplierNumber,
      bookingPersonCount: eventBooking.personCount,
    });
  }

  const detail = get(data, `detail`);

  return dotProp.merge(data, 'detail.detail.common.eventBooking', {
    bookingNumber: detail.bookingNumber,
    bookedBy: detail.bookedBy,
    supplierName: detail.supplier,
    supplierNumber: detail.supplierPhoneNumber,
    personCount: detail.bookingPersonCount,
  });
};

export const EDIT_HELPERS = {
  convertReservation,
};
