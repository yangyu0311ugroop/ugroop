import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Node/parts/InterestLevel/config', () => {
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
      expect(CONFIG.value.value(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.interestLevel,
        }),
      );
    });
  });
});
