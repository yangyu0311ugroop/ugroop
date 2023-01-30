import { EVENT_ATTACHMENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('Thumbnail/config.js', () => {
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

    describe('name', () => {
      it('should exists', () => {
        expect(CONFIG.value.name({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.name,
          }),
        );
      });
    });

    describe('type', () => {
      it('should exists', () => {
        expect(CONFIG.value.type({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.type,
          }),
        );
      });
    });

    describe('size', () => {
      it('should exists', () => {
        expect(CONFIG.value.size({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.size,
          }),
        );
      });
    });

    describe('link', () => {
      it('should exists', () => {
        expect(CONFIG.value.link({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.link,
          }),
        );
      });
    });

    describe('description', () => {
      it('should exists', () => {
        expect(CONFIG.value.description({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.description,
          }),
        );
      });
    });

    describe('isDeleted', () => {
      it('should exists', () => {
        expect(CONFIG.value.isDeleted({ dataId: 112 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
            id: 112,
            path: EVENT_ATTACHMENT_PATHS.isDeleted,
          }),
        );
      });
    });
  });
});
