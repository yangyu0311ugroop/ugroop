import { CONFIG } from '../config';

describe('Map/config.js', () => {
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

    describe('eventDistance', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.setValue.eventDistance({ dataId: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('eventPickup', () => {
      it('should return particular array shape', () => {
        expect(CONFIG.value.eventPickup({ dataId: 1 })).toMatchSnapshot();
      });
    });

    describe('eventDropoff', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.eventDropoff({ dataId: 1 })).toMatchSnapshot();
      });
    });
  });
});
