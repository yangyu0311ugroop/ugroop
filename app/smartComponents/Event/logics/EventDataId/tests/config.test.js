/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/logics/EventDataId/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { id: 1 };
      expect(CONFIG.value.dataId(props)).toEqual(
        NODE_STORE_SELECTORS.eventDataId({ id: props.id }),
      );
    });
  });
});
