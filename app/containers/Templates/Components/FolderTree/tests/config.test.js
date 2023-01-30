import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG, KNOWNAS_CONFIG, CONFIG_ORG_MEMBERS } from '../config';

describe('FolderTree/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof KNOWNAS_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('CONFILvalue.currentOrgRootNodeId', () => {
    it('keypath', () => {
      expect(CONFIG.value.currentOrgRootNodeId.keyPath({ id: 1 })).toEqual(
        ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 1 }),
      );
    });
    it('keypath when id is null', () => {
      expect(CONFIG.value.currentOrgRootNodeId.keyPath({})).toEqual(
        ORGANISATION_STORE_SELECTORS.rootNodeId({ id: -1 }),
      );
    });
    it('getter return orgnodeid value', () => {
      expect(
        CONFIG.value.currentOrgRootNodeId.getter(1, { rootParentNodeId: 1 }),
      ).toEqual(1);
    });
    it('getter return parent node id value', () => {
      expect(
        CONFIG.value.currentOrgRootNodeId.getter(null, { rootParentNodeId: 2 }),
      ).toEqual(2);
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

  describe('KNOWN_AS CONFIG value', () => {
    describe('value.orgNodeIds', () => {
      describe('keyPath', () => {
        it('should return array of selectors based on userOrg values', () => {
          const result = KNOWNAS_CONFIG.value.orgNodeIds.keyPath({
            userOrgs: [1, 2, 3],
          });
          expect(result).toEqual([
            ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 1 }),
            ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 2 }),
            ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 3 }),
          ]);
        });
        it('should return blank array if userOrg is not array', () => {
          const result = KNOWNAS_CONFIG.value.orgNodeIds.keyPath({
            userOrgs: null,
          });
          expect(result).toEqual([]);
        });
      });

      describe('props', () => {
        it('should return null', () => {
          expect(KNOWNAS_CONFIG.value.orgNodeIds.props()).toBe(null);
        });
      });

      describe('getter', () => {
        it('should filter null or undefined values', () => {
          expect(KNOWNAS_CONFIG.value.orgNodeIds.getter(1, 2, 3, null)).toEqual(
            [1, 2, 3],
          );
        });
      });
    });
    describe('value.knownAsValue', () => {
      it('should have keyPath if there are memberIds', () => {
        const memberIds = [1, 2, 3];
        expect(
          KNOWNAS_CONFIG.value.knownAsValues.keyPath({ memberIds }),
        ).toEqual(
          memberIds.map(memberId =>
            ORGANISATION_STORE_SELECTORS.knownAs({ id: memberId }),
          ),
        );
      });
      it('should have keyPath if there are no memberIds', () => {
        const memberIds = null;
        expect(
          KNOWNAS_CONFIG.value.knownAsValues.keyPath({ memberIds }),
        ).toEqual([]);
      });
      it('should have cacheKey', () => {
        const memberIds = [1, 2, 3];
        expect(
          KNOWNAS_CONFIG.value.knownAsValues.cacheKey({ memberIds }),
        ).toEqual(
          `templateManagementPage.moveTour.${memberIds.toString()}.knownAsValues`,
        );
      });
      it('should have cacheKey will null memberIds', () => {
        const memberIds = null;
        expect(
          KNOWNAS_CONFIG.value.knownAsValues.cacheKey({ memberIds }),
        ).toEqual('templateManagementPage.moveTour.null.knownAsValues');
      });
      it('should have props', () => {
        const memberIds = [1];
        expect(KNOWNAS_CONFIG.value.knownAsValues.props({ memberIds })).toEqual(
          memberIds,
        );
      });
      it('should have props if there are no memberIds', () => {
        const memberIds = null;
        expect(KNOWNAS_CONFIG.value.knownAsValues.props({ memberIds })).toEqual(
          [],
        );
      });
      it('should have getter', () => {
        const args = ['Elijah', [1]];
        expect(KNOWNAS_CONFIG.value.knownAsValues.getter(...args)).toEqual([
          [1, 'Elijah'],
        ]);
      });
      it('should have getter that returns empty array if there are no memberIds', () => {
        const args = ['Elijah', []];
        expect(KNOWNAS_CONFIG.value.knownAsValues.getter(...args)).toEqual([]);
      });
      it('should have getter that returns empty array if there are no args', () => {
        expect(KNOWNAS_CONFIG.value.knownAsValues.getter()).toEqual([]);
      });
    });
  });
});
