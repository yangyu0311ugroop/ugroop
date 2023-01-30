import { INVITATION_STORE } from 'appConstants';
import { CONFIG } from '../config';

const props = {
  id: 1,
  token: '0426777',
};

describe('role/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('inviteStatus()', () => {
      expect(CONFIG.value.inviteStatus(props)).toEqual([
        INVITATION_STORE,
        'organisationShares',
        '0426777',
        'status',
      ]);
    });
    it('inviteStatus()', () => {
      expect(CONFIG.value.inviteRole(props)).toEqual([
        INVITATION_STORE,
        'organisationShares',
        '0426777',
        'role',
      ]);
    });
  });
  describe('updatedAt', () => {
    it('should return correct values', () => {
      expect(CONFIG.setValue.updatedAt({ token: '1' })).toEqual([
        'invitationStore',
        'shares',
        '1',
        'updatedAt',
      ]);
    });
  });
});
