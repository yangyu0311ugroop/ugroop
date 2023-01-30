import { EDIT_HELPERS } from '../helpers';

describe('convertReservation', () => {
  it('should return same object Activity', () => {
    const data = {
      type: 'Activity',
    };

    expect(EDIT_HELPERS.convertReservation(data)).toBe(data);
  });

  it('should convertReservation Activity', () => {
    const data = {
      type: 'Activity',
      detail: {
        detail: {
          common: {
            eventBooking: {
              bookingNumber: '123',
            },
          },
        },
        type: 'Food',
      },
    };

    expect(EDIT_HELPERS.convertReservation(data).detail.bookingNumber).toBe(
      '123',
    );
  });

  it('should convertReservation isTransportation', () => {
    const data = {
      type: 'Transportation',
      detail: {
        bookingNumber: '123',
        type: 'Bus',
      },
    };

    expect(
      EDIT_HELPERS.convertReservation(data).detail.detail.common.eventBooking
        .bookingNumber,
    ).toBe('123');
  });
});
