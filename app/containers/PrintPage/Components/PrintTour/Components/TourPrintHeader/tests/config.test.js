import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { CONFIG, METAINFO_CONFIG } from '../config';

describe('PrintTour/TourPrintHeader/Config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('#value', () => {
    it('Title: Getter/KeyPath', () => {
      expect(CONFIG.value.title({ templateId: 222 })).toEqual(
        NODE_STORE_SELECTORS.content({ id: 222 }),
      );
    });
    it('Decription: Getter/KeyPath', () => {
      expect(CONFIG.value.description({ templateId: 222 })).toEqual(
        NODE_STORE_SELECTORS.description({ id: 222 }),
      );
    });
    it('knownAs: Getter/KeyPath', () => {
      expect(CONFIG.value.knownAs({ createdById: 1 })).toEqual([
        'userDataStore',
        'people',
        1,
        'knownAs',
      ]);
    });
  });
  describe('templatePhotoUrl', () => {
    it('templatePhotoUrl: Getter/KeyPath', () => {
      expect(CONFIG.value.templatePhotoUrl({ templateId: 222 })).toEqual([
        NODE_STORE,
        'nodes',
        222,
        'photos',
        0,
      ]);
    });
  });
  describe('templateMetaInfo', () => {
    describe('getter', () => {
      it('should the url of photo which is in the content of the photo object', () => {
        expect(
          METAINFO_CONFIG.value.templateMetaInfo({
            templatePhotoUrl: 'templatePhotoUrl',
          }),
        ).toEqual(
          FILE_STORE_SELECTORS.templateMetaInfo({ id: 'templatePhotoUrl' }),
        );
      });
    });
  });
});
