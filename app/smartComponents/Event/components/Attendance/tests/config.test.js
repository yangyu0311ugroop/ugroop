/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/Attendance/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        dataId: 'dataId',
        valuePath: 'value/path',
      };
      expect(CONFIG.value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.valuePath,
        }),
      );
    });
  });
});
