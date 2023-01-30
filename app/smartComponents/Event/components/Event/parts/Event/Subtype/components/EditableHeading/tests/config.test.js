/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/Subtype/EditableHeading/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.formValue).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
      expect(CONFIG.value.formType).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.type }),
      );
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.formValue).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
    });
  });
});
