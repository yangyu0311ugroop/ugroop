import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Templates/Modals/Participant/View/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    const props = { id: 'id' };
    it('contains required properties', () => {
      expect(CONFIG.value.firstName(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.firstName,
        }),
      );
    });
    it('#value.lastName', () => {
      expect(CONFIG.value.lastName(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.lastName,
        }),
      );
    });
    it('#value.email', () => {
      expect(CONFIG.value.email(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.email,
        }),
      );
    });
    it('#value.ownerId', () => {
      expect(CONFIG.value.ownerId({ templateId: 1 })).toBeDefined();
    });
    it('#value.shareStatus', () => {
      expect(CONFIG.value.shareStatus({ linkedUserToken: 1 })).toBeDefined();
    });
  });
});
