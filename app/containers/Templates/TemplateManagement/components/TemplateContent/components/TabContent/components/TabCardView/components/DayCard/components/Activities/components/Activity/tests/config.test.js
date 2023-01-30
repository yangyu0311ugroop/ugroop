import { CONFIG } from '../config';

describe('Activity/config.js', () => {
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
      it('should return a particular array shape given the props', () => {
        expect(CONFIG.value.content({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('location', () => {
      it('should return a particular array shape given the props', () => {
        expect(CONFIG.value.location({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('photoId', () => {
      it('should return a particular array shape given the props', () => {
        expect(CONFIG.value.photoId({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('attachmentId', () => {
      it('should return a particular array shape given the props', () => {
        expect(CONFIG.value.attachmentId({ id: 1 })).toMatchSnapshot();
      });
    });
  });
});
