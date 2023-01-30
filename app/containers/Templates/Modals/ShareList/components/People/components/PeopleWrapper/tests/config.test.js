import { CONFIG } from '../config';

describe('Peoplewrapper/config.js', () => {
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

    describe('orgPeopleIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.orgPeopleIds({ orgId: 1 })).toBe('object');
      });
    });
    describe('orgPendingIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.orgPendingIds({ orgId: 1 })).toBe('object');
      });
    });
    describe('ownOrgRole', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.ownOrgRole({ me: 1 })).toBe('object');
      });
    });
    describe('pendingUserIds', () => {
      it('keyPath', () => {
        expect(
          CONFIG.value.pendingUserIds.keyPath({ pendingTokenIds: [1] }),
        ).toEqual([['invitationStore', 'shares', 1, 'shareToUserId']]);
        expect(CONFIG.value.pendingUserIds.keyPath({})).toEqual([]);
      });
      it('cacheKey', () => {
        expect(
          CONFIG.value.pendingUserIds.cacheKey({
            pendingTokenIds: [1],
            cacheKey: 'pendingInvite',
            orgId: 1,
          }),
        ).toEqual('people.wrapper.1.pendingInvite.1');
        expect(CONFIG.value.pendingUserIds.keyPath({})).toEqual([]);
        expect(CONFIG.value.pendingUserIds.cacheKey({})).toEqual(
          'people.wrapper.undefined.pendingInvite.null',
        );
        expect(CONFIG.value.pendingUserIds.keyPath({})).toEqual([]);
      });
      it('getter', () => {
        expect(CONFIG.value.pendingUserIds.getter([[1], 2])).toEqual([]);
      });
    });
  });
});
