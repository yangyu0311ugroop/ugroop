import { FILE_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Attachment/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
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
          FILE_DATA_STORE,
          'files',
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
          FILE_DATA_STORE,
          'files',
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
          FILE_DATA_STORE,
          'files',
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
          FILE_DATA_STORE,
          'files',
          123,
          'description',
        ]);
      });
    });
  });
});
