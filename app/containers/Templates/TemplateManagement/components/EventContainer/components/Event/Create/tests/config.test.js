/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { CONFIG } from '../config';

describe('EventContainer/Event/Create/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.templateId).toEqual(
        TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
      );
      expect(CONFIG.value.tabId).toEqual(
        TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
      );
      expect(CONFIG.value.formType).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.type }),
      );
      expect(CONFIG.value.formSubtype).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
      expect(CONFIG.value.formBatchCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: EVENT_PATHS.batchCreate,
        }),
      );
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue).toEqual({
        form: EVENT_STORE_VIEW_SELECTORS.eventForm,
        ...SET_VALUE,
      });
    });
  });
});
