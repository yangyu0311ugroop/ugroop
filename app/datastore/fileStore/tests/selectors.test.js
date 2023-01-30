import { FILE_STORE_SELECTORS } from '../selectors';

describe('fileStore/selectors.js', () => {
  describe('selectFileUrl', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.selectFileUrl({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('templatePhoto', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.templatePhoto({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('templateMetaInfo', () => {
    it('should return a particular shape of array', () => {
      expect(
        FILE_STORE_SELECTORS.templateMetaInfo({ id: 1 }),
      ).toMatchSnapshot();
    });
  });
  describe('selectPhoto', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.selectPhoto({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('selectMetaInfo', () => {
    it('should return a particular shape of object', () => {
      const metaInfo = FILE_STORE_SELECTORS.selectMetaInfo();
      expect(metaInfo).toMatchSnapshot();
      expect(metaInfo.keyPath({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('selectFileId', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.selectFileId({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('noSpreadMetaInfo', () => {
    it('should return a particular shape of array', () => {
      expect(
        FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: 1 }),
      ).toMatchSnapshot();
    });
  });
  describe('selectFileName', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.selectFileName({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('selectFileDescription', () => {
    it('should return a particular shape of array', () => {
      expect(
        FILE_STORE_SELECTORS.selectFileDescription({ id: 1 }),
      ).toMatchSnapshot();
    });
  });
  describe('selectFileSize', () => {
    it('should return a particular shape of array', () => {
      expect(FILE_STORE_SELECTORS.selectFileSize({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('type', () => {
    it('should return selector for type', () => {
      expect(FILE_STORE_SELECTORS.type({ id: 1 })).toMatchSnapshot();
    });
  });
});
