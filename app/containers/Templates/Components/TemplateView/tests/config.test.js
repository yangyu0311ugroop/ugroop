import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  CONFIG,
  RELATED_IDS_CONFIG,
  TYPE_CONFIG,
  getFirstItem,
} from '../config';
import { FOLDER } from '../../../../../utils/modelConstants';

describe('TemplateView/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof TYPE_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof TYPE_CONFIG.value).toBe('object');
    });
    describe('sortedIds', () => {
      it('should return something', () => {
        expect(CONFIG.value.sortedIds({ folderId: 1 })).toEqual(
          NODE_STORE_SELECTORS.sortedIds({ id: 1 }),
        );
      });
    });

    describe('folderName', () => {
      it('should return a particular selector shape given the folderId props', () => {
        expect(CONFIG.value.folderName({ folderId: 1 })).toEqual(
          NODE_STORE_SELECTORS.content({ id: 1 }),
        );
      });
    });

    describe('folderType', () => {
      it('should return a particular selector shape given the folderId props', () => {
        expect(CONFIG.value.folderType({ folderId: 1 })).toEqual(
          NODE_STORE_SELECTORS.type({ id: 1 }),
        );
      });
    });

    describe('folderParentId', () => {
      it('should return a particular selector shape given the folderId props', () => {
        expect(CONFIG.value.folderParentId({ folderId: 1 })).toEqual(
          NODE_STORE_SELECTORS.parentNodeId({ id: 1 }),
        );
      });
    });

    describe('CONFIG relatedIds', () => {
      it('should exists', () => {
        expect(typeof RELATED_IDS_CONFIG.value).toBe('object');
      });

      describe('relatedIds', () => {
        describe('keyPath', () => {
          it('should return userNodeIds mapped', () => {
            const sortedIds = [1, 2, 3];
            expect(
              RELATED_IDS_CONFIG.value.relatedIds.keyPath({ sortedIds }),
            ).toEqual(
              Array.isArray(sortedIds)
                ? sortedIds.map(id => NODE_STORE_SELECTORS.type({ id }))
                : [],
            );
          });
          it('should return empty if there are no userNodeIds', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.keyPath({});
            expect(result).toEqual([]);
          });
          it('should return empty if sortedIds is not an array', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.keyPath({
              sortedIds: 'string',
            });
            expect(result).toEqual([]);
          });
        });

        describe('cacheKey', () => {
          it('should return a specific cacheKey if all props are available', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.cacheKey({
              sortedIds: [1, 2, 3],
              cacheKey: 'caching',
              folderId: 1,
            });
            expect(result).toBe('templateViewIdTypeRelation.1.caching.1,2,3');
          });

          it('should return a specific cacheKey if ids are undefined', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.cacheKey({
              cacheKey: 'caching',
              folderId: 1,
            });
            expect(result).toBe('templateViewIdTypeRelation.1.caching.null');
          });
        });

        describe('props', () => {
          it('should return the ids prop', () => {
            expect(
              RELATED_IDS_CONFIG.value.relatedIds.props({ sortedIds: [] }),
            ).toEqual([]);
          });
        });

        describe('getter', () => {
          it('should return array of ids with its related id', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.getter(
              1,
              2,
              3,
              4,
              [[1], [2], [3], [4]],
            );
            expect(result).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
          });

          it('should pair if ids are just primitive value', () => {
            const result = RELATED_IDS_CONFIG.value.relatedIds.getter(1, 2, [
              1,
              2,
            ]);
            const expected = [[1, 1], [2, 2]];
            expect(result).toEqual(expected);
          });
        });
      });
    });

    describe('TYPE_CONFIG > value > folderIds', () => {
      it('should have getter', () => {
        const relatedIds = [1, 2];
        expect(TYPE_CONFIG.value.folderIds.getter({ relatedIds })).toEqual(
          relatedIds.filter(pair => pair[1] === FOLDER).map(getFirstItem),
        );
      });
      it('should return empty if relatedIds is not array', () => {
        expect(TYPE_CONFIG.value.folderIds.getter({})).toEqual([]);
      });
    });

    describe('getFirstItem', () => {
      it('should return first item', () => {
        expect(getFirstItem([1, 2])).toEqual(1);
      });
    });
  });
});
