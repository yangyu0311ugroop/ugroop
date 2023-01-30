import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
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

    describe('name', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.name).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.name({ id: 123 })).toEqual([
          ATTACHMENT_DATASTORE,
          'attachments',
          123,
          'name',
        ]);
      });
    });

    describe('attachmentURL', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentURL).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.attachmentURL({ id: 123 })).toEqual([
          ATTACHMENT_DATASTORE,
          'attachments',
          123,
          'url',
        ]);
      });
    });

    describe('fileSize', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.fileSize).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.fileSize({ id: 123 })).toEqual([
          ATTACHMENT_DATASTORE,
          'attachments',
          123,
          'fileSize',
        ]);
      });
    });

    describe('description', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.description).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.description({ id: 123 })).toEqual([
          ATTACHMENT_DATASTORE,
          'attachments',
          123,
          'description',
        ]);
      });
    });

    describe('node', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.node).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.node({ sectionId: 123 })).toEqual(
          NODE_STORE_SELECTORS.node({ id: 123 }),
        );
      });
    });

    describe('attachmentDescription', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentDescription).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.attachmentDescription({ sectionId: 123 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          123,
          'attachmentDescription',
        ]);
      });
    });
  });
});
