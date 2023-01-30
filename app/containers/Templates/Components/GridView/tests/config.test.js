import {
  ORGANISATION_STORE_SELECTORS,
  getMemberRootNodeId,
} from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { CONFIG, CONFIG_ORG_MEMBERS, ROOT_NODE_IDS_CONFIG } from '../config';
import { NODE_STORE_SELECTORS } from '../../../../../datastore/nodeStore/selectors';

describe('TemplateList config ', () => {
  describe('value', () => {
    it('should value attribute', () => {
      expect(CONFIG.value.userId).toEqual(COGNITO_STORE_SELECTOR.userId.value);
    });
    it('should call parentNodeId', () => {
      expect(CONFIG.value.parentNodeId({ folderId: 1 })).toEqual(
        NODE_STORE_SELECTORS.parentNodeId({ id: 1 }),
      );
    });
  });

  describe('setValue', () => {
    it('should setValue attribute', () => {
      expect(ROOT_NODE_IDS_CONFIG.setValue).toEqual({});
    });
  });

  describe('CONFIG_ORG_MEMBERS', () => {
    describe('value', () => {
      describe('memberIds', () => {
        describe('keyPath', () => {
          it('should return roleMembersIds selector if userOrgs is array', () => {
            const result = CONFIG_ORG_MEMBERS.value.memberIds.keyPath({
              userOrgs: [1, 2, 3],
            });

            expect(result).toEqual([
              ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: 1 }),
              ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: 2 }),
              ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: 3 }),
            ]);
          });

          it('should return blank array if userOrgs is not array', () => {
            const result = CONFIG_ORG_MEMBERS.value.memberIds.keyPath({
              userOrgs: null,
            });

            expect(result).toEqual([]);
          });
        });

        describe('cacheKey', () => {
          it('should return a particular string if userOrgs is not null', () => {
            expect(
              CONFIG_ORG_MEMBERS.value.memberIds.cacheKey({ userOrgs: [1, 2] }),
            ).toMatchSnapshot();
          });

          it('should return a particular string if userOrgs is null', () => {
            expect(
              CONFIG_ORG_MEMBERS.value.memberIds.cacheKey({ userOrgs: null }),
            ).toMatchSnapshot();
          });
        });

        describe('props', () => {
          it('should return null', () => {
            expect(CONFIG_ORG_MEMBERS.value.memberIds.props()).toBe(null);
          });
        });

        describe('getter', () => {
          it('should filter all null or undefined and flatter the array', () => {
            expect(
              CONFIG_ORG_MEMBERS.value.memberIds.getter(
                [1, 2, 3],
                [4, 5, 1],
                null,
              ),
            ).toEqual([1, 2, 3, 4, 5, 1]);
          });
        });
      });
    });
  });

  describe('ROOT_NODE_IDS_CONFIG', () => {
    describe('value', () => {
      describe('memberIds', () => {
        describe('keyPath', () => {
          it('should return roleMembersIds selector if userOrgs is array', () => {
            const result = ROOT_NODE_IDS_CONFIG.value.rootNodeIds.keyPath({
              memberIds: [1, 2, 3],
            });

            expect(result).toEqual([
              getMemberRootNodeId({ id: 1 }),
              getMemberRootNodeId({ id: 2 }),
              getMemberRootNodeId({ id: 3 }),
            ]);
          });

          it('should return blank array if userOrgs is not array', () => {
            const result = ROOT_NODE_IDS_CONFIG.value.rootNodeIds.keyPath({
              userOrgs: null,
            });

            expect(result).toEqual([]);
          });
        });

        describe('cacheKey', () => {
          it('should return a particular string if userOrgs is not null', () => {
            expect(
              ROOT_NODE_IDS_CONFIG.value.rootNodeIds.cacheKey({
                memberIds: [1, 2],
              }),
            ).toMatchSnapshot();
          });

          it('should return a particular string if userOrgs is null', () => {
            expect(
              ROOT_NODE_IDS_CONFIG.value.rootNodeIds.cacheKey({
                memberIds: null,
              }),
            ).toMatchSnapshot();
          });
        });

        describe('props', () => {
          it('should return null', () => {
            expect(ROOT_NODE_IDS_CONFIG.value.rootNodeIds.props()).toBe(null);
          });
        });

        describe('getter', () => {
          it('should filter all null or undefined and flatter the array', () => {
            expect(
              ROOT_NODE_IDS_CONFIG.value.rootNodeIds.getter(1, 2, null),
            ).toEqual([1, 2]);
          });
        });
      });
    });
  });
});
