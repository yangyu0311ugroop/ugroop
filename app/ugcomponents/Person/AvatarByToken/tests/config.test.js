import { INVITATION_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('AvatarByToken/tests/config.test.js', () => {
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

    describe('userId', () => {
      it('should exists', () => {
        expect(CONFIG.value.userId.keyPath({ token: 'that token' })).toEqual([
          INVITATION_STORE,
          'shares',
          'that token',
          'shareToUserId',
        ]);

        expect(CONFIG.value.userId.getter(123, { userId: 456 })).toBe(456);
        expect(CONFIG.value.userId.getter(123, {})).toBe(123);
      });
    });
  });
});
