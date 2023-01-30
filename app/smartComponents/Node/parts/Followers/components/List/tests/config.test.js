import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_1, CONFIG_3, CONFIG_2 } from '../config';

describe('List/config.js', () => {
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
  });

  describe('CONFIG_1/value/nextNodeIds', () => {
    it('should have keyPath', () => {
      const followers = [1];
      expect(CONFIG_1.value.nextNodeIds.keyPath({ followers })).toEqual(
        followers.map(followerId =>
          NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id: followerId }),
        ),
      );
    });
    it('should have keyPath with no followers', () => {
      expect(CONFIG_1.value.nextNodeIds.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const followers = [1];
      expect(CONFIG_1.value.nextNodeIds.cacheKey({ followers })).toEqual(
        `app.smartComponents.Node.parts.Followers.components.List.nextNodeIds.${followers.toString()}`,
      );
    });
    it('should have cacheKey', () => {
      const followers = [];
      expect(CONFIG_1.value.nextNodeIds.cacheKey({})).toEqual(
        `app.smartComponents.Node.parts.Followers.components.List.nextNodeIds.${followers.toString()}`,
      );
    });
    it('should have props', () => {
      expect(CONFIG_1.value.nextNodeIds.props()).toEqual(null);
    });
    it('should have args', () => {
      const args = [1];
      expect(CONFIG_1.value.nextNodeIds.getter(...args)).toEqual([1]);
    });
  });

  describe('CONFIG_2/value/nextNodeNodeIds', () => {
    it('should have keyPath', () => {
      const nextNodeIds = [1];
      expect(CONFIG_2.value.nextNodeNodeIds.keyPath({ nextNodeIds })).toEqual(
        nextNodeIds.map(nextNodeId =>
          NODE_STORE_SELECTORS.id({ id: nextNodeId }),
        ),
      );
    });
    it('should have keyPath with no nextNodeIds', () => {
      expect(CONFIG_2.value.nextNodeNodeIds.keyPath({})).toEqual([]);
    });
    it('should have props', () => {
      expect(CONFIG_2.value.nextNodeNodeIds.props()).toEqual(null);
    });
    it('should have getter', () => {
      const args = [1];
      expect(CONFIG_2.value.nextNodeNodeIds.getter(...args)).toEqual([1]);
    });
  });

  describe('CONFIG_3/value/filteredFollowers', () => {
    it('should have getter', () => {
      const followers = [1];
      const nextNodeNodeIds = [2];
      expect(
        CONFIG_3.value.filteredFollowers.getter({
          followers,
          nextNodeNodeIds,
        }),
      ).toEqual(followers.filter((follower, index) => nextNodeNodeIds[index]));
    });
  });
});
