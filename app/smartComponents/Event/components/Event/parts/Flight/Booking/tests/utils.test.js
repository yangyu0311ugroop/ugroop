/**
 * Created by stephenkarpinskyj on 4/11/18.
 */

import flightBookingUtils from '../utils';

describe('smartComponents/Event/parts/Subtype/utils', () => {
  describe('#findBookingId()', () => {
    it('find booking id', () => {
      const bookingIds = [1];
      const id = '1';
      expect(flightBookingUtils.findBookingId(bookingIds, id)).toEqual(
        bookingIds[0],
      );
    });
  });

  describe('#renderBookingOptions()', () => {
    it('still matches snapshot', () => {
      const bookingIds = [1];
      expect(
        flightBookingUtils.renderBookingOptions(bookingIds),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if hideAddNew', () => {
      const bookingIds = [1];
      expect(
        flightBookingUtils.renderBookingOptions(bookingIds, true),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if no bookingIds', () => {
      const bookingIds = null;
      expect(
        flightBookingUtils.renderBookingOptions(bookingIds),
      ).toMatchSnapshot();
    });
  });
});
