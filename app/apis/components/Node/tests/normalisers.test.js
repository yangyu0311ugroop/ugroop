import { DATASTORE_UTILS } from 'datastore';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import {
  CHECKGROUP,
  CHECKLIST,
  EVENTS,
  GROUP,
  PARTICIPANT,
  PARTICIPANTS,
  SEATS,
  TEMPLATE,
} from 'utils/modelConstants';
import NodeNormaliser, {
  recentActivityIds,
  mapItems,
  removeStoreChildren,
} from '../normalisers';

describe('NodeNormaliser', () => {
  const { upsertObject } = DATASTORE_UTILS;
  const { upsertArray } = DATASTORE_UTILS;

  afterEach(() => {
    DATASTORE_UTILS.upsertObject = upsertObject;
    DATASTORE_UTILS.upsertArray = upsertArray;
  });

  describe('getNode', () => {
    it('shall return if !childKey', () => {
      expect(NodeNormaliser.getNode(1, {})).toMatchSnapshot();
    });

    it('shall get right result', () => {
      const value = NodeNormaliser.getNode(1, { childKey: 'some node' });
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });
  });

  describe('createNode', () => {
    it('shall get right result if result is array', () => {
      const value = NodeNormaliser.createNode([{ id: 1 }, { id: 2 }], {
        keyPath: ['nodes'],
        node: [{ customData: { node: 1 } }, { customData: { node: 2 } }],
      });

      expect(value).toMatchSnapshot();
      expect(value.nodes({ nodes: {} })).toMatchSnapshot();
    });

    it('should call upsert object/array', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 2: 'upsertArray' }));

      const nodePayload = {
        customData: { location: 'Manila', description: 'description' },
      };

      const value = NodeNormaliser.createNode(
        { id: 123, content: 'some node' },
        { keyPath: ['key', 'path'], node: nodePayload },
      );
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
    });
    it('should call upsert object/array if there is customData', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 2: 'upsertArray' }));

      const node = {
        customData: [1],
        children: [1],
        id: 123,
        content: 'some node',
      };

      const value = NodeNormaliser.createNode(node, {
        keyPath: ['key', 'path'],
      });
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
    });
  });

  describe('createNextNode', () => {
    it('should call upsert object', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 2: 'upsertArray' }));

      const payload = { id: 1 };
      const parent = {
        templateId: 2,
        nodeId: 1,
        node: {
          customData: {
            description: 'test',
          },
        },
      };

      const value = NodeNormaliser.createNextNode(payload, parent);

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
    });
    it('should call upsertObject if there is no templateId', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 2: 'upsertArray' }));

      const payload = { id: 1 };
      const parent = {
        nodeId: 1,
        node: {
          customData: {
            description: 'test',
          },
        },
      };

      const value = NodeNormaliser.createNextNode(payload, parent);

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateNode', () => {
    it('should handle array', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'utils.upsertObject');

      expect(
        NodeNormaliser.updateNode([{ id: 1 }, { id: 2 }]),
      ).toMatchSnapshot();

      TEST_HELPERS.expectCalled(DATASTORE_UTILS.upsertObject);
    });

    it('should call upsert object', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
        type: 'activity',
      };

      const payload = {
        nodeId: 1,
        node: {
          id: 1,
          customData: {
            photo: 'photo',
          },
        },
      };

      expect(NodeNormaliser.updateNode(node, payload)).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
    it('should call upsert object if there is an attachment and photo', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
        type: 'folder',
      };

      const payload = {
        nodeId: 1,
        node: {
          id: 1,
          customData: {
            photo: 'photo',
            attachment: {
              description: 'description',
            },
          },
          attachment: 'attachment',
        },
      };

      expect(NodeNormaliser.updateNode(node, payload)).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
    it('should upsertObject if there is only a photo', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
        type: 'template',
      };

      const payload = {
        nodeId: 1,
        node: {
          id: 1,
          customData: {
            attachment: {
              description: 'description',
            },
          },
          attachment: 'attachment',
        },
      };

      expect(NodeNormaliser.updateNode(node, payload)).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
    it('should upsert object if there is no payload', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
      };

      const payload = {
        nodeId: 1,
        node: {
          id: 1,
          customData: {
            photo: null,
          },
        },
      };

      expect(NodeNormaliser.updateNode(node, payload)).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
    it('should upsert object if participant', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
        type: 'participant',
        moveNode: true,
      };

      const payload = {
        nodeId: 1,
        moveNode: true,
        node: {
          type: 'participant',
          moveNode: true,
          id: 1,
          customData: {
            photo: null,
          },
        },
      };

      expect(NodeNormaliser.updateNode(node, payload)).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
  });

  describe('insertNode', () => {
    it('should upsertObject if insertLocation is after', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
      };

      const payload = {
        id: 1,
        parentId: 2,
        node: {
          id: 123,
          content: 'some node',
        },
        insertLocation: 'after',
      };

      expect(NodeNormaliser.insertNode(node, payload)).toMatchSnapshot();
    });
    it('should upsertObject if insertLocation is after', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const node = {
        id: 123,
        content: 'some node',
      };

      const payload = {
        id: 1,
        parentId: 2,
        node: {
          id: 123,
          content: 'some node',
        },
        insertLocation: 'before',
      };

      const value = NodeNormaliser.insertNode(node, payload);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(NodeNormaliser.insertNode(node, payload)).toMatchSnapshot();
    });
  });

  describe('createPhoto', () => {
    it('should upsertObject/Array', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 1: 'upsertArray' }));

      const file = {
        content: 'content',
        photo: 'photo',
      };
      const nodeId = {
        id: 1,
        content: 'content',
      };

      const value = NodeNormaliser.createPhoto(file, nodeId);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();

      expect(NodeNormaliser.createPhoto(file, nodeId)).toMatchSnapshot();
    });
  });

  describe('updateAttachment', () => {
    it('updateAttribute if description is empty and url is null', () => {
      DATASTORE_UTILS.updateAttribute = jest.fn(() => () => ({
        1: 'updateAttribute',
      }));
      const file = {
        description: '',
        url: null,
      };

      const value = NodeNormaliser.updateAttachment(file);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();
    });
    it('upsertObject if url is null', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      const file = {
        description: 'description',
        attachmentId: 1,
        url: null,
      };

      const value = NodeNormaliser.updateAttachment(file);
      expect(value).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();
    });
    it('upsertObject if url is not null and description is not an empty string', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      const file = {
        description: 'description',
        attachmentId: 1,
        url: 'url',
      };

      const value = NodeNormaliser.updateAttachment(file);
      expect(value).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();
    });
  });

  describe('createAttachment', () => {
    it('should upsertObject and updateAttribute', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.updateAttribute = jest.fn(() => () => ({
        1: 'updateAttribute',
      }));

      const file = {
        nodeId: 1,
        url: 'url',
      };

      const value = NodeNormaliser.createAttachment(file);
      expect(value).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });
  });

  describe('getAttachment', () => {
    it('should upsertObject and updateAttribute', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.updateAttribute = jest.fn(() => () => ({
        1: 'updateAttribute',
      }));

      const file = {
        nodeId: 1,
        url: 'url',
      };

      const value = NodeNormaliser.getAttachment(file);
      expect(value).toMatchSnapshot();
      expect(value.attachments()).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
    });
  });

  describe('updatePhoto', () => {
    it('should upsertObject/Array', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 1: 'upsertArray' }));
      const file = {
        content: 'content',
        photo: 'photo',
        nodeId: 1,
        oldPhoto: 'oldPhoto',
      };

      const value = NodeNormaliser.updatePhoto(file);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();

      expect(NodeNormaliser.updatePhoto(file)).toMatchSnapshot();
    });
    it('should return if content and oldPhoto are equal', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 1: 'upsertArray' }));
      const file = {
        content: 'content',
        photo: 'photo',
        nodeId: 1,
        oldPhoto: 'content',
      };

      const value = NodeNormaliser.updatePhoto(file);
      expect(value).toMatchSnapshot();

      expect(NodeNormaliser.updatePhoto(file)).toMatchSnapshot();
    });
    it('should update if metaInfo is not equal', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));
      const file = {
        content: 'content',
        photo: 'photo',
        nodeId: 1,
        oldPhoto: 'content',
        metaInfo: {
          x: 1,
          y: 1,
        },
        oldMetaInfo: {
          x: 2,
          y: 2,
        },
      };

      const value = NodeNormaliser.updatePhoto(file);
      expect(value).toMatchSnapshot();

      expect(NodeNormaliser.updatePhoto(file)).toMatchSnapshot();
    });
  });

  describe('deletePhoto', () => {
    it('should be called onSuccess', () => {
      const value = NodeNormaliser.deletePhoto(null, {});
      expect(value).toMatchSnapshot();

      expect(NodeNormaliser.deletePhoto(null, {})).toMatchSnapshot();
    });
  });

  describe('batchMove', () => {
    it('should updateAttribute and upsertArray', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 1: 'upsertArray' }));
      DATASTORE_UTILS.updateAttribute = jest.fn(() => () => ({
        1: 'upsertArray',
      }));

      const payload = {
        movedDayIds: [1, 2, 3],
        movedSectionIds: [3, 4, 5],
        id: 1,
      };

      const value = NodeNormaliser.batchMove(payload, payload);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(NodeNormaliser.batchMove(payload, payload)).toMatchSnapshot();
    });
  });

  describe('shareNode', () => {
    it('should normalize', () => {
      const shares = [{ id: 1, notificationToken: 'token' }];
      expect(NodeNormaliser.shareNode(shares)).toMatchSnapshot();
    });
  });

  describe('getTree', () => {
    it('should normalize', () => {
      const nodes = [{ id: 1 }, { id: 2, type: EVENTS[2] }, { id: 3 }];
      expect(NodeNormaliser.getTree(nodes)).toMatchSnapshot();
    });
  });

  describe('deleteNode', () => {
    it('should call upsert object', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const value = NodeNormaliser.deleteNode(0, {
        keyPath: ['key', 'path'],
        nodeId: 123,
      });
      expect(value).toMatchSnapshot();
      expect(value.nodes({ key: { path: 1 } })).toMatchSnapshot();
    });

    it('should delete dependent seat on the node if a seat exist', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const value = NodeNormaliser.deleteNode(0, {
        keyPath: ['key', 'path'],
        nodeId: 123,
        type: PARTICIPANT,
      });
      expect(value).toMatchSnapshot();
      expect(
        value.nodes({ 123: { seats: [124] }, 124: { participants: [123] } }),
      ).toMatchSnapshot();
    });

    it('should not crash if seat does not exist', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const value = NodeNormaliser.deleteNode(0, {
        keyPath: ['key', 'path'],
        nodeId: 123,
        type: PARTICIPANT,
      });
      expect(value).toMatchSnapshot();
      expect(
        value.nodes({ 123: {}, 124: { participants: [123] } }),
      ).toMatchSnapshot();
    });

    it('should delete dependent participants of group on the node if participants exist', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const value = NodeNormaliser.deleteNode(0, {
        keyPath: ['key', 'path'],
        nodeId: 1,
        type: GROUP,
        dependentIds: [2, 3],
        dependentLinkIds: [1, 2],
      });
      expect(value).toMatchSnapshot();
      expect(
        value.nodes({
          1: { participants: [1, 2] },
          2: { groups: [1] },
          3: { groups: [2] },
        }),
      ).toMatchSnapshot();
    });
  });

  describe('mapItems', () => {
    it('should return item id if item is an object', () => {
      expect(mapItems({ id: 1 })).toEqual(1);
    });
    it('should return item id if item is not an object', () => {
      expect(mapItems(1)).toEqual(1);
    });
  });

  describe('moveNode', () => {
    it('should call upsertArray and removeItemsArray util if type is template', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({
        1: 'upsertArray ',
      }));
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemArray',
      }));

      const value = NodeNormaliser.moveNode(
        { 1: { id: 1 } },
        {
          id: 1,
          keyPath: '1.children',
          initialPath: '1.children',
          type: 'template',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
      expect(DATASTORE_UTILS.removeItemsArray).toBeCalled();
      expect(DATASTORE_UTILS.removeItemsArray.mock.calls).toMatchSnapshot();
    });
    it('should call upsertArray and removeItemsArray util if type is not template or folder', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({
        1: 'upsertArray ',
      }));
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemArray',
      }));

      const value = NodeNormaliser.moveNode(
        { 1: { id: 1 } },
        {
          id: 1,
          keyPath: '1.children',
          initialPath: '1.children',
          type: 'checkitem',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
      expect(DATASTORE_UTILS.removeItemsArray).toBeCalled();
      expect(DATASTORE_UTILS.removeItemsArray.mock.calls).toMatchSnapshot();
    });
  });

  describe('copyNode', () => {
    it('should call upsertObject and upsertArray', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({
        1: 'upsertArray ',
      }));
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => ({
        1: 'upsertObject',
      }));

      const value = NodeNormaliser.copyNode(
        { cloneId: 1 },
        {
          keyPath: '1.children',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertArray).toBeCalled();
      expect(DATASTORE_UTILS.upsertArray.mock.calls).toMatchSnapshot();
      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
  });

  describe('batchDeleteNode', () => {
    it('should call removeItemsArray 1', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemsArray ',
      }));

      const value = NodeNormaliser.batchDeleteNode(
        { 1: { id: 1 } },
        {
          items: [{ id: 1 }, { id: 2 }],
          keyPath: '1.children',
          sortedIdsKeyPath: '1.sortedChildren',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.removeItemsArray).toBeCalled();
      expect(DATASTORE_UTILS.removeItemsArray.mock.calls).toMatchSnapshot();
    });

    it('should call removeItemsArray 2', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemsArray ',
      }));

      const value = NodeNormaliser.batchDeleteNode(
        { 1: { id: 1 } },
        {
          items: [{ id: 1 }, { id: 2 }],
          keyPath: '1.children',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.removeItemsArray).toBeCalled();
      expect(DATASTORE_UTILS.removeItemsArray.mock.calls).toMatchSnapshot();
    });

    it('should return the store if items is not an array', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemsArray ',
      }));

      const value = NodeNormaliser.batchDeleteNode(
        { 1: { id: 1 } },
        {
          items: null,
          keyPath: '1.children',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.removeItemsArray).not.toBeCalled();
    });
  });

  describe('removeAttachment', () => {
    it('should remove attachment', () => {
      DATASTORE_UTILS.removeObjectById = jest.fn(() => () => ({
        1: 'removeObjectById ',
      }));
      DATASTORE_UTILS.updateAttribute = jest.fn(() => () => ({
        1: 'updateAttribute ',
      }));
      const payload = {
        attachmentId: '123',
        id: 1,
      };

      const value = NodeNormaliser.removeAttachment({}, payload);
      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();
      expect(value.files()).toMatchSnapshot();
    });
  });

  describe('insertNode', () => {
    it('inserts node before', () => {
      const id = 1;
      const otherId = 2;
      const parentId = 3;
      const node = {
        id,
        customData: 'customData',
        children: 'children',
      };
      const obj = {
        id: otherId,
        parentId,
        node: { x: 1 },
        editingAfterCreate: true,
      };
      const nodes = { [otherId]: {}, [parentId]: { children: [otherId] } };
      expect(
        NodeNormaliser.insertNode(node, obj).nodes(nodes),
      ).toMatchSnapshot();
    });

    it('inserts node after', () => {
      const id = 1;
      const otherId = 2;
      const parentId = 3;
      const node = { id };
      const obj = {
        id: otherId,
        parentId,
        node: { x: 1 },
        insertLocation: 'after',
      };
      const nodes = { [otherId]: {}, [parentId]: { children: [otherId] } };
      expect(
        NodeNormaliser.insertNode(node, obj).nodes(nodes),
      ).toMatchSnapshot();
    });
  });

  describe('getTree', () => {
    it('normalises tree', () => {
      const nodes = { id: 1 };
      expect(NodeNormaliser.getTree(nodes)).toEqual({
        eventNodes: {},
        node: { [nodes.id]: nodes },
      });
    });
  });

  describe('updateChild', () => {
    it('should return a particular object shape for setValue in resaga', () => {
      const result = {
        id: 1,
        content: 'child',
      };
      expect(NodeNormaliser.updateChild(result)).toMatchSnapshot();
    });
  });

  describe('getChildren', () => {
    it('should return a particular object shape for setValue in resaga', () => {
      const result = [
        {
          id: 2,
          content: 'child',
          parentNodeId: 1,
        },
      ];
      expect(NodeNormaliser.getChildren(result)).toMatchSnapshot();
    });
  });
  describe('createTemplateSettings', () => {
    it('should return a particular object shape', () => {
      const result = [
        {
          id: 2,
          content: 'child',
          parentNodeId: 1,
        },
      ];
      const templates = {
        1: { templatesettings: { value: true, customData: {} } },
      };
      expect(
        NodeNormaliser.createTemplateSettings(result, templates),
      ).toMatchSnapshot();
    });
  });
  describe('initTemplateSettings', () => {
    it('should return a particular object shape', () => {
      const result = [
        {
          id: 2,
          content: 'child',
          parentNodeId: 1,
        },
      ];
      const templatesettings = { value: true, customData: {} };
      expect(
        NodeNormaliser.initTemplateSettings(result, templatesettings),
      ).toMatchSnapshot();
    });
    it('should not fail if empty', () => {
      expect(NodeNormaliser.initTemplateSettings()).toMatchSnapshot();
    });
  });

  describe('recentActivityIds', () => {
    it('should remove from recentActivityIds', () => {
      expect(recentActivityIds(2)([1, 2, 3])).toEqual([1, 3]);
    });
    it('should not remove recentActivityIds', () => {
      expect(recentActivityIds(4)([1, 2, 3])).toEqual([1, 2, 3]);
    });
    it('should not remove recentActivityIds 2', () => {
      expect(recentActivityIds(4)()).toEqual([]);
    });
  });

  describe('createLink', () => {
    it('should add nextNodeId to the node.id.childKey and node.id to node.nextNodeId.childKey', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => 'upsertArray');
      const payload = {
        id: 1,
        data: {
          nextNodeId: 2,
        },
        prevNodeChildKey: PARTICIPANTS,
        nextNodeChildKey: SEATS,
        upsertLinkId: true,
      };

      const result = NodeNormaliser.createLink(null, payload);

      expect(result).toMatchSnapshot();
      expect(result.nodes()).toEqual('upsertArray');
    });

    it('should do a different operation if action exist in the payload', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => () => 'upsertArray');
      DATASTORE_UTILS.upsertObject = jest.fn(() => () => 'upsertObject');
      const payload = {
        id: 1,
        data: {
          action: 'reaction',
          nextNodeId: 2,
        },
        prevNodeChildKey: PARTICIPANTS,
        nextNodeChildKey: SEATS,
      };

      const result = NodeNormaliser.createLink({ id: 1 }, payload);

      expect(result).toMatchSnapshot();
      expect(result.nodes()).toEqual('upsertObject');
    });
  });

  describe('updateLink', () => {
    it('should remove item and add the new link to the new connection', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => args =>
        `${args}+upsertArray`,
      );
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => args =>
        `${args}+removeItemsArray`,
      );
      const payload = {
        id: 1,
        fk: 2,
        data: {
          nextNodeId: 2,
        },
        prevNodeChildKey: PARTICIPANTS,
        nextNodeChildKey: SEATS,
      };

      const result = NodeNormaliser.updateLink({ id: 1 }, payload);

      expect(result).toMatchSnapshot();
      expect(result.nodes()).toEqual(
        'undefined+removeItemsArray+removeItemsArray+upsertArray+upsertArray',
      );
    });
  });

  describe('unlink', () => {
    it('should remove items to participant keys of particular node', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => args =>
        `${args}+removeItemsArray`,
      );
      const mockPayload = {
        id: 1,
        fk: 2,
        linkKey: 3,
      };

      const result = NodeNormaliser.unlink(null, mockPayload);

      expect(result.nodes()).toEqual(
        'undefined+removeItemsArray+removeItemsArray',
      );
    });
  });

  describe('deleteNodeAndLinks', () => {
    it('should do the following operations to achieve the result needed', () => {
      const payload = {
        id: 1,
        fk: 2,
        childKey: PARTICIPANTS,
        nextNodeChildKey: SEATS,
      };
      DATASTORE_UTILS.removeObjectById = jest.fn(() => args =>
        `${args}+removeObjectById`,
      );
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => args =>
        `${args}+removeItemsArray`,
      );

      const result = NodeNormaliser.deleteNodeAndLinks(null, payload);

      expect(result.nodes()).toEqual(
        'undefined+removeItemsArray+removeItemsArray+removeObjectById',
      );
    });
  });

  describe('unlinkOldNode', () => {
    it('should remove the items inside the childKey to empty array', () => {
      const nodes = {
        1: {
          id: 1,
          participants: [2],
        },
        2: {
          id: 2,
          seats: [1],
        },
      };

      const expectedNodes = {
        1: {
          id: 1,
          participants: [],
        },
        2: {
          id: 2,
          seats: [],
        },
      };

      const result = NodeNormaliser.unlinkOldNode(1)(nodes);
      expect(result).toEqual(expectedNodes);
    });

    it('should leave as is the nodes if participants of the parent is empty', () => {
      const nodes = {
        1: {
          id: 1,
          participants: [],
        },
        2: {
          id: 2,
          seats: [1],
        },
      };

      const expectedNodes = {
        1: {
          id: 1,
          participants: [],
        },
        2: {
          id: 2,
          seats: [1],
        },
      };

      const result = NodeNormaliser.unlinkOldNode(1)(nodes);
      expect(result).toEqual(expectedNodes);
    });
  });

  describe('upsertTemplateSettings', () => {
    it('should a deep merge', () => {
      expect(
        NodeNormaliser.upsertTemplateSettings([{ id: 99 }], {
          values: [{ data: { customData: { key: 'key', value: 'value' } } }],
        }),
      ).toBeDefined();
    });
  });
  describe('upsertTemplateSetting', () => {
    it('should a deep merge and construct the key value type in store', () => {
      const mockResult = { id: 1, parentNodeId: 2 };
      const mockData = {
        data: {
          customData: {
            key: 'Sample',
            value: 1,
          },
        },
      };

      const setter = NodeNormaliser.upsertTemplateSetting(mockResult, mockData);
      const result = setter.nodeSettings({});

      expect(result).toEqual({
        2: {
          Sample: {
            id: 1,
            value: 1,
          },
        },
      });
    });
  });

  describe('batchDeleteNodeChildren', () => {
    it('should call removeItemsArray', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemsArray ',
      }));

      const value = NodeNormaliser.batchDeleteNodeChildren(
        { 1: { id: 1 } },
        {
          items: [{ id: 1 }, { id: 2 }],
          keyPath: '1.children',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.removeItemsArray).toBeCalled();
      expect(DATASTORE_UTILS.removeItemsArray.mock.calls).toMatchSnapshot();
    });
    it('should return the store if items is not an array', () => {
      DATASTORE_UTILS.removeItemsArray = jest.fn(() => () => ({
        1: 'removeItemsArray ',
      }));

      const value = NodeNormaliser.batchDeleteNodeChildren(
        { 1: { id: 1 } },
        {
          items: null,
          keyPath: '1.children',
        },
      );

      expect(value).toMatchSnapshot();
      expect(value.nodes()).toMatchSnapshot();

      expect(DATASTORE_UTILS.removeItemsArray).not.toBeCalled();
    });
  });
});

describe('transferNode', () => {
  it('should return the store if items', () => {
    const value = NodeNormaliser.transferNode(
      [{ nodeTransfer: { id: 1 }, notifications: {} }],
      {
        id: 1,
      },
    );
    expect(value).toMatchSnapshot();
  });
  it('Shoul return empty object', () => {
    const value = NodeNormaliser.transferNode(
      [{ nodeTransfer: null, notifications: {} }],
      {
        id: 1,
      },
    );
    expect(value).toEqual({});
  });
});
describe('getTransferNode', () => {
  it('should return the store if items', () => {
    const nodeTransferViewModel = {
      status: 'pending',
      notificationToken: '1',
      transferToUserId: 1,
      transferFrom: 1,
      id: 1,
      nodeId: 1,
    };
    const value = NodeNormaliser.getTransferNode(
      { nodeTransferViewModel },
      {
        id: 1,
      },
    );
    expect(value).toMatchSnapshot();
  });
  it('should return the store if items', () => {
    const nodeTransferViewModel = {
      status: 'pending',
      notificationToken: '1',
      transferToUserId: 1,
      transferFrom: 2,
      id: 1,
      nodeId: 1,
    };
    const value = NodeNormaliser.getTransferNode(
      { nodeTransferViewModel },
      {
        id: 1,
        myUserId: 2,
      },
    );
    expect(value).toMatchSnapshot();
  });
  it('should return the store if items if status is pending', () => {
    const value = NodeNormaliser.getTransferNode(
      { nodeTransferViewModel: { id: 1, status: 'pending' } },
      {
        id: 1,
      },
    );
    expect(value).toMatchSnapshot();
  });
  it('Shoul return empty object', () => {
    const value = NodeNormaliser.getTransferNode(
      {},
      {
        id: 1,
      },
    );
    expect(value).toMatchSnapshot();
  });
});

describe('handleNode', () => {
  it('should return the store if items', () => {
    const value = NodeNormaliser.handleNode('pending', 1, {})({ 1: {} });
    expect(value).toMatchSnapshot();
  });
});
describe('removeStoreChildren', () => {
  it('should return the items left', () => {
    const value = removeStoreChildren('1.children', [1])({
      1: { children: [1, 2] },
    });
    expect(value).toMatchSnapshot();
  });
  it('should return the store if items is is null', () => {
    const value = removeStoreChildren('1.children')({
      1: { children: [1, 2] },
    });
    expect(value).toMatchSnapshot();
  });
  it('should not break if the store is empty', () => {
    const value = removeStoreChildren('1.children')();
    expect(value).toMatchSnapshot();
  });
});
describe('getNodes', () => {
  it('should return the store if items', () => {
    DATASTORE_UTILS.upsertObject = jest.fn().mockImplementation(o => o);
    const value = NodeNormaliser.getNodes({});
    expect(value).toBeNull();
    const value2 = NodeNormaliser.getNodes({
      nodes: [
        {
          id: 1,
          type: CHECKGROUP,
          checklists: [{ type: CHECKLIST, name: 'checklist', id: 2 }],
        },
        {
          id: 3,
          type: TEMPLATE,
          children: [{ type: CHECKLIST, name: 'checklist', id: 4 }],
        },
      ],
    });
    expect(value2).toMatchSnapshot();
  });
});
