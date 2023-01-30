import { CONFIG } from '../config';

describe('Header/config.js', () => {
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
    describe('folderName', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.folderName({ folderId: 1 })).toMatchSnapshot();
      });
    });
    describe('folderName', () => {
      it('should return a particular shape of array', () => {
        expect(
          CONFIG.value.organisationName({ organisationId: 1 }),
        ).toMatchSnapshot();
      });
    });
  });
});
