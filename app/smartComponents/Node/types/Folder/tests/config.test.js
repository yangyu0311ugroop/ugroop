import { FOLDER, TEMPLATE } from 'utils/modelConstants';
import { ABILITY_DATA_STORE, APP_DATA_CACHE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import {
  USER_ID_CONFIG,
  CONFIG,
  PHOTO_METAINFO_CONFIG,
  ITEMS_CONTENT_CONFIG,
  getFirstItem,
} from '../config';

describe('config', () => {
  describe('getFirstItem', () => {
    it('should return first item of array', () => {
      expect(getFirstItem([1, 2])).toEqual(1);
    });
  });
  describe('USER_ID_CONFIG', () => {
    it('should have userId', () => {
      expect(USER_ID_CONFIG.value.userId).toEqual(
        COGNITO_STORE_SELECTOR.userId.value,
      );
    });
    it('should have content', () => {
      expect(USER_ID_CONFIG.value.content).toEqual(
        NODE_STORE_SELECTORS.content,
      );
    });
    it('should have children', () => {
      expect(USER_ID_CONFIG.value.ids({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.children({ id: 1 }),
      );
    });
    it('should have isEditable', () => {
      expect(USER_ID_CONFIG.value.isEditable).toEqual(
        NODE_STORE_SELECTORS.isEditable,
      );
    });
    it('should have cardImageUrl', () => {
      expect(USER_ID_CONFIG.value.cardImageUrl({ id: 1 })).toEqual([
        APP_DATA_CACHE,
        'cardImageList',
        1,
      ]);
    });
  });

  describe('CONFIG.childrenContent', () => {
    it('should have keyPath', () => {
      const ids = [1];
      expect(CONFIG.value.childrenContent.keyPath({ ids })).toEqual(
        ids.map(id => NODE_STORE_SELECTORS.content({ id })),
      );
    });
    it('should have keyPath with empty array', () => {
      expect(CONFIG.value.childrenContent.keyPath({})).toEqual([]);
    });
    it('should have cacheKey with ids', () => {
      expect(CONFIG.value.childrenContent.cacheKey({ ids: [1] })).toEqual(
        `smartComponents.Node.types.Folder.childrenContent.1`,
      );
    });
    it('should have cacheKey with null', () => {
      expect(CONFIG.value.childrenContent.cacheKey({})).toEqual(
        `smartComponents.Node.types.Folder.childrenContent.null`,
      );
    });
    it('should have props', () => {
      expect(CONFIG.value.childrenContent.props({ ids: [1] })).toEqual([1]);
    });
    it('should have getter that returns content', () => {
      const args = ['content', 'content2', null];
      expect(CONFIG.value.childrenContent.getter(...args)).toEqual([
        'content',
        'content2',
      ]);
    });
    it('should return null', () => {
      const args = [null, null];
      expect(CONFIG.value.childrenContent.getter(...args)).toEqual(null);
    });
    it('should return something if content is not empty', () => {
      const args = ['content', null];
      expect(CONFIG.value.childrenContent.getter(...args)).toEqual(['content']);
    });
  });

  describe('CONFIG relatedIds', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('relatedIds', () => {
      describe('keyPath', () => {
        it('should return userNodeIds mapped', () => {
          const ids = [1, 2, 3];
          expect(CONFIG.value.relatedIds.keyPath({ ids })).toEqual(
            ids.map(id => NODE_STORE_SELECTORS.type({ id })),
          );
        });
        it('should return empty if there are no userNodeIds', () => {
          const result = CONFIG.value.relatedIds.keyPath({});
          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a specific cacheKey if all props are available', () => {
          const result = CONFIG.value.relatedIds.cacheKey({
            ids: [1, 2, 3],
            cacheKey: 'caching',
            id: 1,
          });
          expect(result).toBe('folderIdTypeRelation.1.caching.1,2,3');
        });

        it('should return a specific cacheKey if ids are undefined', () => {
          const result = CONFIG.value.relatedIds.cacheKey({
            cacheKey: 'caching',
            id: 1,
          });
          expect(result).toBe('folderIdTypeRelation.1.caching.null');
        });
      });

      describe('props', () => {
        it('should return the ids prop', () => {
          expect(CONFIG.value.relatedIds.props({ ids: [] })).toEqual([]);
        });
      });

      describe('getter', () => {
        it('should return array of ids with its related id', () => {
          const result = CONFIG.value.relatedIds.getter(1, 2, 3, 4, [
            [1],
            [2],
            [3],
            [4],
          ]);
          expect(result).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
        });

        it('should pair if ids are just primitive value', () => {
          const result = CONFIG.value.relatedIds.getter(1, 2, [1, 2]);
          const expected = [[1, 1], [2, 2]];
          expect(result).toEqual(expected);
        });
      });
    });
  });

  describe('CONFIG tourOwnerAbilities', () => {
    it('should exist', () => {
      expect(CONFIG.value.tourOwnerAbilities).toEqual([
        ABILITY_DATA_STORE,
        'definitions',
        'tour',
        'tour_owner',
      ]);
    });
  });

  describe('PHOTO_METAINFO_CONFIG', () => {
    it('should have userMetaInfo keyPath', () => {
      expect(
        PHOTO_METAINFO_CONFIG.value.userMetaInfo.keyPath({
          userProfilePhotoUrl: 'url',
        }),
      ).toEqual(FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: 'url' }));
    });
    it('should have templateIds', () => {
      const relatedIds = [[1, 2], [2, 3]];
      expect(
        PHOTO_METAINFO_CONFIG.value.templateIds.getter({ relatedIds }),
      ).toEqual(
        relatedIds.filter(pair => pair[1] === TEMPLATE).map(pair => pair[0]),
      );
    });
    it('should return empty if there are no relatedIds', () => {
      const result = PHOTO_METAINFO_CONFIG.value.templateIds.getter({});
      expect(result).toEqual([]);
    });
    it('should have folderIds', () => {
      const relatedIds = [[1, 2], [2, 3]];
      expect(
        PHOTO_METAINFO_CONFIG.value.folderIds.getter({ relatedIds }),
      ).toEqual(
        relatedIds.filter(pair => pair[1] === FOLDER).map(pair => pair[0]),
      );
    });
    it('should return empty if there are no relatedIds', () => {
      const result = PHOTO_METAINFO_CONFIG.value.folderIds.getter({});
      expect(result).toEqual([]);
    });
  });

  describe('ITEMS_CONTENT_CONFIG', () => {
    describe('value templateContent', () => {
      it('should have keyPath', () => {
        const templateIds = [1];
        expect(
          ITEMS_CONTENT_CONFIG.value.templateContent.keyPath({ templateIds }),
        ).toEqual(
          templateIds.map(template =>
            NODE_STORE_SELECTORS.content({ id: template }),
          ),
        );
      });
      it('should have cacheKey if templateIds is not empty', () => {
        const templateIds = [1];
        expect(
          ITEMS_CONTENT_CONFIG.value.templateContent.cacheKey({ templateIds }),
        ).toEqual(
          `templateView.content.${templateIds.toString()}.templateContents`,
        );
      });
      it('should have cacheKey if templateIds is empty', () => {
        const templateIds = null;
        expect(
          ITEMS_CONTENT_CONFIG.value.templateContent.cacheKey({ templateIds }),
        ).toEqual(`templateView.content.${null}.templateContents`);
      });
      it('should have getter', () => {
        const args = [];
        expect(
          ITEMS_CONTENT_CONFIG.value.templateContent.getter(...args),
        ).toEqual(args);
      });
    });

    describe('value folderContent', () => {
      it('should have keyPath', () => {
        const folderIds = [1];
        expect(
          ITEMS_CONTENT_CONFIG.value.folderContent.keyPath({ folderIds }),
        ).toEqual(
          folderIds.map(folder => NODE_STORE_SELECTORS.content({ id: folder })),
        );
      });
      it('should have cacheKey if templateIds is not empty', () => {
        const folderIds = [1];
        expect(
          ITEMS_CONTENT_CONFIG.value.folderContent.cacheKey({ folderIds }),
        ).toEqual(
          `templateView.content.${folderIds.toString()}.folderContents`,
        );
      });
      it('should have cacheKey if templateIds is empty', () => {
        const folderIds = null;
        expect(
          ITEMS_CONTENT_CONFIG.value.folderContent.cacheKey({ folderIds }),
        ).toEqual(`templateView.content.${null}.folderContents`);
      });
      it('should have getter', () => {
        const args = [];
        expect(
          ITEMS_CONTENT_CONFIG.value.folderContent.getter(...args),
        ).toEqual(args);
      });
    });
  });
});
