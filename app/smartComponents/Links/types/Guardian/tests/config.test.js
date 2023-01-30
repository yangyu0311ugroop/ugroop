import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_0, CONFIG_2, CONFIG_3 } from '../config';

describe('Guardian/CONFIG_0', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0.value).toBe('object');
    });
  });
});

describe('Guardian/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONGIF.value.linkIdsWithNextNodeIds', () => {
    it('should have keyPath', () => {
      const linkIds = [1];
      expect(CONFIG.value.linkIdsWithNextNodeIds.keyPath({ linkIds })).toEqual(
        linkIds.map(linkId => [NODE_STORE, 'links', linkId, 'nextNodeId']),
      );
    });
    it('should have keyPath if no linkIds', () => {
      expect(CONFIG.value.linkIdsWithNextNodeIds.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const linkIds = [1];
      expect(CONFIG.value.linkIdsWithNextNodeIds.cacheKey({ linkIds })).toEqual(
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${linkIds.toString()}`,
      );
    });
    it('should have cacheKey if no linkIds', () => {
      expect(CONFIG.value.linkIdsWithNextNodeIds.cacheKey({})).toEqual(
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${null}`,
      );
    });
    it('should have props', () => {
      const linkIds = [1];
      expect(CONFIG.value.linkIdsWithNextNodeIds.props({ linkIds })).toEqual({
        linkIds: [1],
      });
    });
    it('should have props without linkIds', () => {
      expect(CONFIG.value.linkIdsWithNextNodeIds.props({})).toEqual({
        linkIds: [],
      });
    });
    it('should have getter', () => {
      const args = [1, { linkIds: [2] }];
      expect(CONFIG.value.linkIdsWithNextNodeIds.getter(...args)).toEqual([
        [2, 1],
      ]);
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(
        CONFIG_3.setValue.calculatedParticipants({ templateId: 1 }),
      ).toEqual(NODE_STORE_SELECTORS.calculatedParticipants({ id: 1 }));
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});

describe('CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('selectableFollowers', () => {
      describe('getters', () => {
        it('should return filtered interestedPeople', () => {
          const nextNodeIds = [1];
          const interestedPeople = [1, 2, 3];
          const oldFollowerId = 3;

          expect(
            CONFIG_2.value.selectableFollowers.getter({
              nextNodeIds,
              interestedPeople,
              oldFollowerId,
            }),
          ).toEqual([2]);
        });
      });
    });

    describe('participantLinkIds', () => {
      it('should have keyPath', () => {
        const linkIdsWithNextNodeIds = [[1, 2]];
        expect(
          CONFIG_2.value.participantLinkIds.keyPath({ linkIdsWithNextNodeIds }),
        ).toEqual(
          linkIdsWithNextNodeIds.map(item => [
            NODE_STORE,
            'links',
            item[0],
            'prevNodeId',
          ]),
        );
      });
      it('should have keyPath with linkIdsWithNextNodeIds', () => {
        expect(CONFIG_2.value.participantLinkIds.keyPath({})).toEqual([]);
      });
      it('should have cacheKey', () => {
        const linkIdsWithNextNodeIds = [[1, 2]];
        expect(
          CONFIG_2.value.participantLinkIds.cacheKey({
            linkIdsWithNextNodeIds,
          }),
        ).toEqual(
          `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${linkIdsWithNextNodeIds.toString()}`,
        );
      });
      it('should have cacheKey with null', () => {
        expect(CONFIG_2.value.participantLinkIds.cacheKey({})).toEqual(
          `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${null}`,
        );
      });
      it('should have props', () => {
        const linkIdsWithNextNodeIds = [1];
        const nextNodeId = 2;
        expect(
          CONFIG_2.value.participantLinkIds.props({
            linkIdsWithNextNodeIds,
            nextNodeId,
          }),
        ).toEqual({
          linkIdsWithNextNodeIds,
          nextNodeId,
        });
      });
      it('should have props without linkIdsWithNextNodeIds', () => {
        const nextNodeId = 2;
        expect(
          CONFIG_2.value.participantLinkIds.props({
            nextNodeId,
          }),
        ).toEqual({
          linkIdsWithNextNodeIds: [],
          nextNodeId,
        });
      });
      it('should have getter', () => {
        const args = [
          18174,
          {
            linkIdsWithNextNodeIds: [[5062, 1994]],
            nextNodeId: 1994,
          },
        ];
        expect(CONFIG_2.value.participantLinkIds.getter(...args)).toEqual([
          [18174, 5062, 1994],
        ]);
      });
    });
  });
});

describe('CONFIG_3', () => {
  describe('value.participantFollowers', () => {
    it('should have keyPath', () => {
      const participantLinkIds = [[1, 2]];
      expect(
        CONFIG_3.value.participantFollowers.keyPath({ participantLinkIds }),
      ).toEqual(
        participantLinkIds.map(item => [
          NODE_STORE,
          'nodes',
          item[0],
          'followers',
        ]),
      );
    });
    it('should have keyPath if there is no participantLinkIds', () => {
      expect(CONFIG_3.value.participantFollowers.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const participantLinkIds = [[1, 2]];
      expect(
        CONFIG_3.value.participantFollowers.cacheKey({ participantLinkIds }),
      ).toEqual(
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${participantLinkIds.toString()}`,
      );
    });
    it('should have cacheKey if no participantLinkIds', () => {
      expect(CONFIG_3.value.participantFollowers.cacheKey({})).toEqual(
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${null}`,
      );
    });
    it('should have props', () => {
      const participantLinkIds = [1];
      expect(
        CONFIG_3.value.participantFollowers.props({ participantLinkIds }),
      ).toEqual([1]);
    });
    it('should have props if no participantLinkIds', () => {
      expect(CONFIG_3.value.participantFollowers.props({})).toEqual([]);
    });
    it('should have getter', () => {
      const args = [[5062], [[18174, 5062, 1994]]];
      expect(CONFIG_3.value.participantFollowers.getter(...args)).toEqual([
        { followers: [5062], link: 5062, participantId: 18174 },
      ]);
    });
  });
});
