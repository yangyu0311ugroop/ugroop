import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG, GET_LINKS } from '../config';

describe('GET_LINKS', () => {
  describe('value', () => {
    describe('links', () => {
      it('should return keyPath for participantLinks', () => {
        const props = { id: 1 };

        expect(GET_LINKS.value.links(props)).toMatchSnapshot();
      });
    });
  });
});

describe('smartComponents/Node/parts/Participants/config', () => {
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
          path: NODE_PATHS.participants,
        }),
      );
      expect(CONFIG.value.status(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.status,
        }),
      );
    });

    describe('prevNodeIds', () => {
      describe('keyPath', () => {
        it('should not break even if links is not existing', () => {
          const props = {};

          expect(CONFIG.value.prevNodeIds.keyPath(props)).toEqual([]);
        });

        it('should match snapshot', () => {
          const props = { links: [1, 2, 3] };

          expect(CONFIG.value.prevNodeIds.keyPath(props)).toMatchSnapshot();
        });
      });

      describe('cacheKey', () => {
        it('should not break even if links does not exist', () => {
          const props = {};

          expect(CONFIG.value.prevNodeIds.cacheKey(props)).toBe(
            'Participants.links.null.prevNodeIds',
          );
        });

        it('should return legit cacheKey', () => {
          const props = { links: 1 };

          expect(CONFIG.value.prevNodeIds.cacheKey(props)).toBe(
            'Participants.links.1.prevNodeIds',
          );
        });
      });

      describe('props', () => {
        it('should return null', () => {
          expect(CONFIG.value.prevNodeIds.props()).toEqual(null);
        });
      });

      describe('getter', () => {
        it('should return all prevNodeIds not 0', () => {
          const args = [1, 2, 3, 0, 5];

          expect(CONFIG.value.prevNodeIds.getter(...args)).toEqual([1, 2, 3]);
        });
      });
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.participantCreateOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
      );
      expect(CONFIG.setValue.participantCreateParentNodeId).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
      );
    });
  });
});
