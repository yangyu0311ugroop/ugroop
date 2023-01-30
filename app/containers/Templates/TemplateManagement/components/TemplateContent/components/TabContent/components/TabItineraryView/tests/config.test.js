import { CONFIG } from '../config';

describe('TabItineraryView/config.js', () => {
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

    describe('tabChildren', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.tabChildren({ tabId: 1 })).toMatchSnapshot();
      });
    });
  });
});
