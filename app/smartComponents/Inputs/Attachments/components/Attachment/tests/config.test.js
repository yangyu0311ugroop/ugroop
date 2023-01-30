import { ATTACHMENT_DATASTORE } from 'appConstants';
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
    it('eventAttachment.keyPath should return event store', () => {
      expect(CONFIG.value.eventAttachment.keyPath({ id: 1 })).toEqual([
        'eventStore',
        'attachments',
        1,
      ]);
    });
    it('eventAttachment.keyPath should return node attachment store', () => {
      expect(
        CONFIG.value.eventAttachment.keyPath({
          selector: ATTACHMENT_DATASTORE,
          id: 1,
        }),
      ).toEqual([ATTACHMENT_DATASTORE, 'attachments', 1]);
    });
    it('eventAttachment.keyPath should return node attachment store', () => {
      expect(CONFIG.value.eventAttachment.props({})).toEqual(undefined);
    });
    it('eventAttachment.keyPath should return node attachment store', () => {
      expect(CONFIG.value.eventAttachment.getter(1, 2)).toEqual(2);
      expect(CONFIG.value.eventAttachment.getter(1)).toEqual(1);
    });
  });
});
