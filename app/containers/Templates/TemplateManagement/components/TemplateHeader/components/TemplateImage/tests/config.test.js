import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    describe('templatePhotoId', () => {
      describe('getter', () => {
        it('should return the very recently added photo', () => {
          const mockTemplates = {
            1: {
              photos: [5, 7],
            },
          };
          const expectedResult = 7;
          const actualResult = CONFIG.value.templatePhotoId.getter(
            mockTemplates,
            { id: 1 },
          );
          expect(actualResult).toBe(expectedResult);
        });
        it('should return -1 if there are no item in photos', () => {
          const mockTemplates = {
            1: {
              photos: [],
            },
          };
          const expectedResult = -1;
          const actualResult = CONFIG.value.templatePhotoId.getter(
            mockTemplates,
            { id: 1 },
          );
          expect(actualResult).toBe(expectedResult);
        });
      });
    });
    describe('templatePhotoUrl', () => {
      it('should get templatePhotoUrl', () => {
        const props = { photoId: 1 };
        expect(CONFIG.value.templatePhotoUrl(props)).toEqual(
          FILE_STORE_SELECTORS.templatePhoto({ id: 1 }),
        );
      });
    });
    describe('templateMetaInfo', () => {
      it('should get templateMetaInfo', () => {
        const props = { photoId: 1 };
        expect(CONFIG.value.templateMetaInfo(props)).toEqual(
          FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: 1 }),
        );
      });
    });
    describe('photoMetaInfo', () => {
      it('should get photoMetaInfo', () => {
        const props = { photoId: 1 };
        expect(CONFIG.value.photoMetaInfo(props)).toEqual(
          FILE_STORE_SELECTORS.templateMetaInfo({ id: 1 }),
        );
      });
    });
  });
});
