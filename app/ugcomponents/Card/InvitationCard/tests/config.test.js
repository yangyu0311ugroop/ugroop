import { CONFIG } from '../config';

describe('InvitationCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should match snapshot', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('setValue', () => {});

  describe('value', () => {});
  describe('open', () => {
    it('should return a particular keypath shape', () => {
      expect(CONFIG.value.open.keyPath({ userId: 1 })).toMatchSnapshot();
    });
    it('should return a particular getter shape', () => {
      expect(CONFIG.value.open.getter('')).toMatchSnapshot();
    });
    it('should return default value a particular getter shape', () => {
      expect(CONFIG.value.open.getter()).toMatchSnapshot();
    });
  });
});
