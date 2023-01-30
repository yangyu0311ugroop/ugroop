/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/EndAttendance/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.formType).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.type }),
      );
      expect(CONFIG.value.formSubtype).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
    });
  });
});
