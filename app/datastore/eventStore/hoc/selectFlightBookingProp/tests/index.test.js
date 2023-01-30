/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import selectFlightBookingProp from '..';

describe('datastore/eventStore/hoc/selectFlightBookingProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 'dataId' };
      const { value } = selectFlightBookingProp({ r: jest.fn(args => args) });
      expect(value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.flightBookingProp({
          id: props.dataId,
          path: 'type',
        }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectFlightBookingProp({})()).toMatchSnapshot();
    });
  });
});
