import { CONFIG, USER_USERS_CONFIG, SETTER_CONFIG } from '../config';

describe('Checklist/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('parentType', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.parentType({ parentNodeId: 1 })).toMatchSnapshot();
      });
    });
  });
});

describe('Checklist/USER_USERS_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(USER_USERS_CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('orgId', () => {
      it('should return a particular shape of array', () => {
        expect(USER_USERS_CONFIG.value.orgId({ userId: 1 })).toMatchSnapshot();
      });
    });
  });
});

describe('Checklist/SETTER_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(SETTER_CONFIG).toMatchSnapshot();
    });
  });
});
