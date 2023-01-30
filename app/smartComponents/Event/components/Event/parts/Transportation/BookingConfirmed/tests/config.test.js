/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG_DATA } from '../config';

describe('smartComponents/Event/parts/Flight/BookingConfirmed/config', () => {
  describe('CONFIG_DATA', () => {
    it('exists', () => {
      expect(CONFIG_DATA).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 'dataId' };
        expect(CONFIG_DATA.value.value(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.transportationDetailBookingNumber,
          }),
        );
      });
    });
  });
});
