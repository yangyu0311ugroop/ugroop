import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Templates/Modals/Participant/Create/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { parentNodeId: 'parentNodeId' };
      expect(CONFIG.value.firstName(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.parentNodeId,
          path: NODE_PATHS.firstName,
        }),
      );
    });
  });

  describe('setValue', () => {
    it('should be a selector', () => {
      expect(CONFIG.setValue.calculatedParticipants({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedParticipants({ id: 1 }),
      );
    });
  });
});
