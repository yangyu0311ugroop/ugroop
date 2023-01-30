import { CONFIG, FILE_CONFIG } from '../config';

describe('Photo/config.js CONFIG', () => {
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
  });
});

describe('Photo/config.js FILE_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof FILE_CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof FILE_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof FILE_CONFIG.value).toBe('object');
    });

    describe('photo', () => {
      it('should return specific array shape', () => {
        expect(FILE_CONFIG.value.photo({ photo: 1 })).toMatchSnapshot();
      });
    });

    describe('metaInfo', () => {
      describe('keyPath', () => {
        it('should return specific array shape', () => {
          expect(
            FILE_CONFIG.value.metaInfo.keyPath({ photo: 1 }),
          ).toMatchSnapshot();
        });
      });
    });
  });
});
