import { INVITATION_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('TourRole/tests/config.test.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(CONFIG.setValue).toBeDefined();
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toBeDefined();
    });

    describe('status', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.status).toBe('function');
        expect(CONFIG.value.status({ token: 999 })).toEqual([
          INVITATION_STORE,
          'shares',
          999,
          'status',
        ]);
      });
    });
    describe('role', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.role.keyPath({ token: 1 })).toBe('object');
        expect(CONFIG.value.role.getter('admin', { role: 'owner' })).toEqual(
          'owner',
        );
      });
      it('should exists', () => {
        expect(CONFIG.value.role.getter('admin', {})).toEqual('admin');
      });
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
