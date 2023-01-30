/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/Accommodation/Duration/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
      };

      expect(CONFIG.value.startTimeValue(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.calculatedStartTimeValue,
        }),
      );
      expect(CONFIG.value.endTimeValue(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.calculatedEndTimeValue,
        }),
      );
    });
  });
});
