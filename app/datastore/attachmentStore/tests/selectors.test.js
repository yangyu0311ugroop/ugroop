import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';

describe('ATTACHMENT_STORE_SELECTORS', () => {
  describe('attachmentProp()', () => {
    it('returns correct keyPath', () => {
      const id = 1;
      const path = 'path';
      expect(
        ATTACHMENT_STORE_SELECTORS.attachmentProp({ id, path }),
      ).toMatchSnapshot();
    });
  });

  describe('name', () => {
    it('should return a particular array shape', () => {
      expect(ATTACHMENT_STORE_SELECTORS.name({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('description', () => {
    it('should return a particular array shape', () => {
      expect(
        ATTACHMENT_STORE_SELECTORS.description({ id: 1 }),
      ).toMatchSnapshot();
    });
  });

  describe('url', () => {
    it('should return a particular array shape', () => {
      expect(ATTACHMENT_STORE_SELECTORS.url({ id: 1 })).toMatchSnapshot();
    });
  });

  describe('fileSize', () => {
    it('should return a particular array shape', () => {
      expect(ATTACHMENT_STORE_SELECTORS.fileSize({ id: 1 })).toMatchSnapshot();
    });
  });
  describe('fileSize', () => {
    it('should return a particular array shape', () => {
      expect(
        ATTACHMENT_STORE_SELECTORS.attachment({ id: 1 }),
      ).toMatchSnapshot();
    });
  });
});
