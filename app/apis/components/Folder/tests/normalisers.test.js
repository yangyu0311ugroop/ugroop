import { FOLDER_FETCH_TYPES } from 'apis/components/Folder/constants';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_NORMALISERS, NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { NODE_TRAIL_NORMALISERS } from 'datastore/nodeTrailsDataStore/schema';
import { normalize } from 'normalizr';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CHECKLIST, DAY, FOLDER } from 'utils/modelConstants';
import FolderNormaliser, { getUnexistingNodesInStore } from '../normalisers';

describe('normalisers.test.js', () => {
  describe('getChecklists', () => {
    it('should process folder checklists', () => {
      NODE_NORMALISERS.normalise = jest.fn(a => ({ node: a }));
      DATASTORE_UTILS.upsertObject = jest.fn(a => a);

      expect(
        FolderNormaliser.getChecklists({
          id: 2233,
          type: FOLDER,
          checklists: [{ id: 12, nextNodes: [{ id: 23 }] }],
        }),
      ).toMatchSnapshot();

      TEST_HELPERS.expectCalledAndMatchSnapshot(DATASTORE_UTILS.upsertObject);
    });

    it('should process checklists', () => {
      NODE_NORMALISERS.normalise = jest.fn(a => ({ node: a }));
      DATASTORE_UTILS.upsertObject = jest.fn(a => a);

      expect(
        FolderNormaliser.getChecklists({
          id: 2233,
          type: CHECKLIST,
          checklists: [{ id: 12, nextNodes: [{ id: 23 }] }],
        }),
      ).toMatchSnapshot();

      TEST_HELPERS.expectCalledAndMatchSnapshot(DATASTORE_UTILS.upsertObject);
    });

    it('should process others', () => {
      NODE_NORMALISERS.normalise = jest.fn(a => ({ node: a }));
      DATASTORE_UTILS.upsertObject = jest.fn(a => a);

      expect(
        FolderNormaliser.getChecklists({
          id: 2233,
          type: DAY,
          checklists: [{ id: 12, nextNodes: [{ id: 23 }] }],
        }),
      ).toMatchSnapshot();

      TEST_HELPERS.expectCalledAndMatchSnapshot(DATASTORE_UTILS.upsertObject);
    });
    it('should process return node', () => {
      NODE_NORMALISERS.normalise = jest.fn(a => ({ node: a }));
      DATASTORE_UTILS.upsertObject = jest.fn(a => a);

      expect(
        FolderNormaliser.getChecklists({
          id: 2233,
          type: DAY,
          checklists: [{ id: 12, nextNodes: [{ id: 23 }] }],
          returnNode: true,
        }),
      ).toMatchSnapshot();

      TEST_HELPERS.expectNotCalled(DATASTORE_UTILS.upsertObject);
    });
  });

  describe('fetchFolderChildren', () => {
    it('should return setValue-shaped object', () => {
      NODE_NORMALISERS.folderNormalise = jest.fn(a => ({
        nodes: a,
        folder: a,
        people: a,
        id: a,
      }));
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        a: 'upsertObject',
      }));

      const value = FolderNormaliser.fetchFolderChildren(1);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });
    it('should return setValue-shaped object with count zero', () => {
      NODE_NORMALISERS.folderNormalise = jest.fn(() => ({}));
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        a: 'upsertObject',
      }));

      const value = FolderNormaliser.fetchFolderChildren(1);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });

    it('should return setValue-shaped object when fetchType is PAGINATION', () => {
      NODE_NORMALISERS.folderNormalise = jest.fn(() => ({}));
      DATASTORE_UTILS.upsertObject = jest.fn(() => param => ({ a: param }));

      const value = FolderNormaliser.fetchFolderChildren(1, {
        fetchType: FOLDER_FETCH_TYPES.PAGINATION,
      });
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });
  });

  describe('fetchFolderParent', () => {
    it('should return setValue-shaped object', () => {
      NODE_TRAIL_NORMALISERS.breadcrumbNormaliser = jest.fn(a => ({
        trail: a,
        breadcrumb: a,
      }));

      const value = FolderNormaliser.fetchFolderParent(1, 1);

      expect(value).toMatchSnapshot();
    });
  });

  describe('mergeFolder', () => {
    const mockStore = {
      1: {
        content: 'Org Tour',
        sortedIds: [1, 2],
      },
    };
    it('should merge the children of old folder with the new children of the folder', () => {
      const newFolder = {
        1: {
          content: 'Org Tour',
          calculated: {
            sortedIds: [3, 4],
          },
          sortedIds: [1, 2],
        },
      };

      const result = FolderNormaliser.mergeFolder(1, newFolder)(mockStore);
      expect(result).toEqual({
        1: {
          calculated: {
            sortedIds: [3, 4],
          },
          content: 'Org Tour',
          sortedIds: [1, 2],
        },
      });
    });

    it('should not repeat the existing children in target folder', () => {
      const newFolder = {
        1: {
          content: 'Org Tour',
          calculated: {
            sortedIds: [1, 2],
          },
        },
      };

      const result = FolderNormaliser.mergeFolder(1, newFolder)(mockStore);
      expect(result).toEqual({
        1: {
          content: 'Org Tour',
          calculated: {
            sortedIds: [1, 2],
          },
          sortedIds: [1, 2],
        },
      });
    });

    it('should just upsert object is store is empty', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() =>
        jest.fn(() => 'upsertObject'),
      );
      const newFolder = {
        1: {
          content: 'Org Tour',
          children: [1, 2],
        },
      };

      const result = FolderNormaliser.mergeFolder(1, newFolder)(undefined);
      expect(result).toEqual('upsertObject');
    });
  });

  describe('batchFetchFolderTree', () => {
    it('should return a particular object shape for setValue', () => {
      const mockResult = [
        {
          id: 1,
          content: 'rootFolder',
          children: [
            {
              id: 2,
              content: 'Folder 1',
              children: [],
            },
            {
              id: 3,
              content: 'Folder 2',
              children: [],
            },
          ],
        },
        {
          id: 4,
          content: 'Organisation Tours',
          children: [
            {
              id: 2,
              content: 'Folder 1',
              children: [],
            },
            {
              id: 3,
              content: 'Folder 2',
              children: [],
            },
          ],
        },
      ];

      const mockNodes = {
        1: {
          id: 1,
          content: 'rootFolder',
          children: [2, 3],
        },
        2: {
          id: 2,
          content: 'Folder 1',
          children: [],
        },
        3: {
          id: 3,
          content: 'Folder 2',
          children: [],
        },
      };

      const result = FolderNormaliser.batchFetchFolderTree(mockResult);
      expect(result).toMatchSnapshot();
      const nodesResult = result.nodes(mockNodes);
      expect(nodesResult).toMatchSnapshot();
    });
  });

  describe('getUnexistingNodesInStore', () => {
    it('should return the nodes that are not yet existing in the node store', () => {
      const mockResult = [
        {
          id: 1,
          content: 'rootFolder',
          status: 'qqq',
          children: [
            {
              id: 2,
              content: 'Folder 1',
              children: [],
              status: 'qqq',
            },
            {
              id: 3,
              content: 'Folder 2',
              children: [],
              status: 'qqq',
            },
          ],
        },
        {
          id: 4,
          content: 'Organisation Tours',
          children: [
            {
              id: 5,
              content: 'Folder 1',
              children: [],
            },
            {
              id: 6,
              content: 'Folder 2',
              children: [],
            },
          ],
        },
      ];

      const mockNodes = {
        1: {
          id: 1,
          content: 'rootFolder',
          children: [2, 3, 7, 8],
        },
        2: {
          id: 2,
          content: 'Folder 1',
          children: [],
        },
        3: {
          id: 3,
          content: 'Folder 2',
          children: [],
        },
        7: {
          id: 7,
          content: 'Folder 7',
          children: [],
        },
        8: {
          id: 8,
          content: 'Folder 8',
          children: [],
        },
      };

      const normalizedResult = normalize(mockResult, NODE_SCHEMA.node);
      const result = getUnexistingNodesInStore(normalizedResult, mockNodes);

      expect(result).toMatchSnapshot();
    });
  });
  describe('handleBatchClone', () => {
    it('should return setValue-shaped object', () => {
      FolderNormaliser.getChecklists = jest.fn(() => [{ id: 1 }]);
      const value = FolderNormaliser.handleBatchClone([
        { id: 1, cloneId: 1, customVal: { type: 1 } },
      ]);

      expect(value).toMatchSnapshot();
    });
    it('should not return setValue-shaped object', () => {
      FolderNormaliser.getChecklists = jest.fn(() => [{ id: 1 }]);
      const value = FolderNormaliser.handleBatchClone();
      expect(value).toMatchSnapshot();
    });
  });
});
