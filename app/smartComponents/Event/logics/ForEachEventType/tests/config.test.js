/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/logics/ForEachEventType/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 1 };

      expect(CONFIG.value.storeType(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.type,
        }),
      );
      expect(CONFIG.value.storeType({})).toBeUndefined();

      expect(CONFIG.value.storeSubtype(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.subtype,
        }),
      );
      expect(CONFIG.value.storeSubtype({})).toBeUndefined();
    });
  });
});
