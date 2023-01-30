/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/BatchCreate/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.formBatchCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: EVENT_PATHS.batchCreate,
        }),
      );
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.formBatchCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: EVENT_PATHS.batchCreate,
        }),
      );
    });
  });
});
