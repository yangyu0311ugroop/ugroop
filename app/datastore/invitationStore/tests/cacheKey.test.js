import { TOUR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { INVITATION_STORE_CACHE_KEYS } from '../cacheKey';

describe('INVITATION_STORE_CACHE_KEYS', () => {
  describe('filterSharesByShareToUserId()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const shareToUserIds = 'shareToUserIds';
      const props = {
        [ids]: [1, 2],
        [shareToUserIds]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByShareToUserId({
          ids,
          shareToUserIds,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByShareToUserId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterSharesByNodeId()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const nodeIds = 'nodeIds';
      const props = {
        [ids]: [1, 2],
        [nodeIds]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByNodeId({
          ids,
          nodeIds,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByNodeId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterSharesByRole()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const roles = 'roles';
      const props = {
        [ids]: [1, 2],
        [roles]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByRole({
          ids,
          roles,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByRole({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterSharesByStatus()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const statuses = 'statuses';
      const props = {
        [ids]: [1, 2],
        [statuses]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByStatus({
          ids,
          statuses,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterSharesByStatus({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('shareSubNodeShareTokens()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const props = {
        [ids]: [1, 2],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.shareSubNodeShareTokens({
          ids,
        })(props),
      ).toMatchSnapshot();
    });
  });

  describe('filterShareSubNodesByNodeId()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const nodeIds = 'nodeIds';
      const props = {
        [ids]: [1, 2],
        [nodeIds]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByNodeId({
          ids,
          nodeIds,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByNodeId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterShareSubNodesByRole()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const roles = 'roles';
      const props = {
        [ids]: [1, 2],
        [roles]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByRole({
          ids,
          roles,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByRole({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('userNodeUserIds()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const props = {
        [ids]: [1, 2],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.userNodeUserIds({
          ids,
        })(props),
      ).toMatchSnapshot();
    });
  });

  describe('filterUserNodesByUserId()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const userIds = 'userIds';
      const props = {
        [ids]: [1, 2],
        [userIds]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByUserId({
          ids,
          userIds,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByUserId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterUserNodesByNodeId()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const nodeIds = 'nodeIds';
      const props = {
        [ids]: [1, 2],
        [nodeIds]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByNodeId({
          ids,
          nodeIds,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByNodeId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('filterUserNodesByRole()', () => {
    it('returns correct key', () => {
      const ids = 'ids';
      const roles = 'roles';
      const props = {
        [ids]: [1, 2],
        [roles]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole({
          ids,
          roles,
        })(props),
      ).toMatchSnapshot();
    });

    it('should use static roles than roles', () => {
      const ids = 'ids';
      const roles = TOUR_ROLE_TYPES;
      const props = {
        [ids]: [1, 2],
        [roles]: [3, 4],
      };
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole({
          ids,
          roles,
        })(props),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole({})({}),
      ).toMatchSnapshot();
    });
  });
});
