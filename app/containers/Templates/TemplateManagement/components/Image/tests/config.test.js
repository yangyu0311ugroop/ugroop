import { CONFIG } from '../config';

describe('Image/config.js', () => {
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

    describe('content', () => {
      it('should return a particular array shape given the props provided', () => {
        expect(CONFIG.value.content({ photoId: 7 })).toMatchSnapshot();
      });
    });

    describe('metaInfo', () => {
      describe('keyPath', () => {
        it('should return a particular array shape given the props provided', () => {
          expect(CONFIG.value.metaInfo({ photoId: 7 })).toMatchSnapshot();
        });
      });
    });
  });
});
