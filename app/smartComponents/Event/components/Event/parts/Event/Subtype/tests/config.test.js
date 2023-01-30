/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/Subtype/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        dataId: 'dataId',
      };

      expect(CONFIG.value.type(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.type,
        }),
      );
      expect(CONFIG.value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.subtype,
        }),
      );
      expect(CONFIG.value.formValue).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
    });
  });
});
