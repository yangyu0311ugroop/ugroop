import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { USER_NODES_CONFIG, USER_ID_CONFIG, ROLES_CONFIG } from '../config';

describe('Header/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof USER_NODES_CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof USER_ID_CONFIG.setValue).toBe('object');
    });

    describe('layout', () => {
      it('should exists', () => {
        expect(USER_ID_CONFIG.setValue.layout({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof USER_NODES_CONFIG.value).toBe('object');
    });

    describe('tabIds', () => {
      it('should exists', () => {
        expect(typeof USER_NODES_CONFIG.value.tabIds).toBe('object');
      });
    });
    describe('tabType', () => {
      it('should exist', () => {
        expect(typeof USER_NODES_CONFIG.value.tabType).toBe('function');
        expect(USER_NODES_CONFIG.value.tabType({ tabId: 1 })).toEqual(
          NODE_STORE_SELECTORS.type({ id: 1 }),
        );
      });
    });
    describe('getter', () => {
      it('should exists', () => {
        const templates = { 1: { content: 'string' } };
        expect(
          typeof USER_NODES_CONFIG.value.title.getter(templates, {
            templateId: 1,
          }),
        ).toEqual('string');
      });
    });
    describe('layout', () => {
      it('should exists', () => {
        expect(USER_NODES_CONFIG.value.layout({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1 }),
        );
      });
    });

    describe('roleRelatedIds', () => {
      describe('keyPath', () => {
        it('should return mapped userNodeIds if it is passed', () => {
          const userNodeIds = [1];
          expect(
            ROLES_CONFIG.value.roleRelatedIds.keyPath({ userNodeIds }),
          ).toEqual(
            userNodeIds.map(id =>
              INVITATION_STORE_SELECTORS.userNodeRole({ id }),
            ),
          );
        });
        it('should return empty array if none is passed', () => {
          expect(ROLES_CONFIG.value.roleRelatedIds.keyPath({})).toEqual([]);
        });
      });
      describe('cacheKey', () => {
        it('should return a specific cacheKey if all props are available', () => {
          const result = ROLES_CONFIG.value.roleRelatedIds.cacheKey({
            userNodeIds: [1, 2, 3],
            cacheKey: 'caching',
            accountId: 1,
          });
          expect(result).toBe(
            'tabHeader.userNodeRoleRelatedIds.1.caching.1,2,3',
          );
        });

        it('should return a specific cacheKey if ids are undefined', () => {
          const result = ROLES_CONFIG.value.roleRelatedIds.cacheKey({
            cacheKey: 'caching',
            accountId: 1,
          });
          expect(result).toBe(
            'tabHeader.userNodeRoleRelatedIds.1.caching.null',
          );
        });
      });

      describe('props', () => {
        it('should return the ids prop', () => {
          expect(
            ROLES_CONFIG.value.roleRelatedIds.props({ userNodeIds: [] }),
          ).toEqual([]);
        });
      });

      describe('getter', () => {
        it('should return array of ids with its related id', () => {
          const result = ROLES_CONFIG.value.roleRelatedIds.getter(1, 2, 3, 4, [
            [1],
            [2],
            [3],
            [4],
          ]);
          expect(result).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
        });

        it('should pair if ids are just primitive value', () => {
          const result = ROLES_CONFIG.value.roleRelatedIds.getter(1, 2, [1, 2]);
          const expected = [[1, 1], [2, 2]];
          expect(result).toEqual(expected);
        });
      });
    });

    describe('userIdRelatedIds', () => {
      describe('keyPath', () => {
        it('should return mapped userNodeIds if it is passed', () => {
          const roleRelatedIds = [[1, 2]];
          expect(
            USER_ID_CONFIG.value.userIdRelatedIds.keyPath({ roleRelatedIds }),
          ).toEqual(
            roleRelatedIds.map(id =>
              INVITATION_STORE_SELECTORS.userNodeUserId({ id: id[0] }),
            ),
          );
        });
        it('should return empty array if none is passed', () => {
          expect(USER_ID_CONFIG.value.userIdRelatedIds.keyPath({})).toEqual([]);
        });
      });
      describe('cacheKey', () => {
        it('should return a specific cacheKey if all props are available', () => {
          const result = USER_ID_CONFIG.value.userIdRelatedIds.cacheKey({
            roleRelatedIds: [1, 2, 3],
            cacheKey: 'caching',
            accountId: 1,
          });
          expect(result).toBe(
            'tabHeader.userNodeUserIdRelatedIds.1.caching.1,2,3',
          );
        });

        it('should return a specific cacheKey if ids are undefined', () => {
          const result = USER_ID_CONFIG.value.userIdRelatedIds.cacheKey({
            cacheKey: 'caching',
            accountId: 1,
          });
          expect(result).toBe(
            'tabHeader.userNodeUserIdRelatedIds.1.caching.null',
          );
        });
      });

      describe('props', () => {
        it('should return the ids prop', () => {
          expect(
            USER_ID_CONFIG.value.userIdRelatedIds.props({ roleRelatedIds: [] }),
          ).toEqual([]);
        });
      });

      describe('getter', () => {
        it('should return array of ids with its related id', () => {
          const result = USER_ID_CONFIG.value.userIdRelatedIds.getter(
            1,
            2,
            3,
            4,
            [[1], [2], [3], [4]],
          );
          expect(result).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
        });

        it('should pair if ids are just primitive value', () => {
          const result = USER_ID_CONFIG.value.userIdRelatedIds.getter(1, 2, [
            1,
            2,
          ]);
          const expected = [[1, 1], [2, 2]];
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
