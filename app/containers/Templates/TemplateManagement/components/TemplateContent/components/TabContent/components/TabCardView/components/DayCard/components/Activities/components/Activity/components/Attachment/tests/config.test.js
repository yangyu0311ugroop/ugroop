import { CONFIG } from '../config';

describe('Attachment/config.js', () => {
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

    describe('url', () => {
      it('should return a particular array given the attachmentId props', () => {
        expect(CONFIG.value.url({ attachmentId: 1 })).toMatchSnapshot();
      });
    });

    describe('name', () => {
      it('should return a particular array given the attachmentId props', () => {
        expect(CONFIG.value.name({ attachmentId: 1 })).toMatchSnapshot();
      });
    });

    describe('description', () => {
      it('should return a particular array given the attachmentId props', () => {
        expect(CONFIG.value.description({ attachmentId: 1 })).toMatchSnapshot();
      });
    });
  });
});
