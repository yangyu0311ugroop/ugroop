import { CONFIG, USER_USERS_CONFIG } from '../config';

describe('Day/config.js', () => {
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

    describe('parentType', () => {
      it('should return a particular keypath shape', () => {
        expect(CONFIG.value.parentType({ parentNodeId: 1 })).toMatchSnapshot();
      });
    });
  });
});

describe('Day/USER_USERS_CONFIG', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof USER_USERS_CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof USER_USERS_CONFIG.value).toBe('object');
    });

    describe('parentType', () => {
      it('should return a particular keypath shape', () => {
        expect(USER_USERS_CONFIG.value.orgId({ userId: 1 })).toMatchSnapshot();
      });
    });
  });
});
