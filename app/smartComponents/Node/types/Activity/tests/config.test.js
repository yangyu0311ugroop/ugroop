import { CONFIG, USER_USERS_CONFIG } from '../config';

describe('Activity/config.js', () => {
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
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.parentType({ parentNodeId: 1 })).toMatchSnapshot();
      });
    });

    describe('parentIndex', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.parentIndex({ parentNodeId: 1 })).toMatchSnapshot();
      });
    });
  });
});

describe('Activity/USER_USERS_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof USER_USERS_CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof USER_USERS_CONFIG.value).toBe('object');
    });

    describe('orgId', () => {
      it('should return a particular shape of array', () => {
        expect(USER_USERS_CONFIG.value.orgId({ userId: 1 })).toMatchSnapshot();
      });
    });
  });
});
