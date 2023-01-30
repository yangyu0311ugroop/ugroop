import { CONFIG } from '../config';

describe('Locations/config.js', () => {
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

    describe('eventPickup', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.setValue.eventPickup({ dataId: 1 })).toMatchSnapshot();
      });
    });

    describe('eventDropoff', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.setValue.eventDropoff({ dataId: 1 })).toMatchSnapshot();
      });
    });
  });
});
