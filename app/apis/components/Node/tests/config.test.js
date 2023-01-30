import {
  BATCH_DELETE,
  BATCH_DELETE_CHILDREN,
  BATCH_MOVE,
  COPY,
  CREATE_CHILD,
  CREATE_CLONE,
  CREATE_NEXT_NODE,
  CREATE_NODE,
  DELETE_CHILDREN,
  MOVE,
  MOVE_AFTER,
  MOVE_BEFORE,
  SHARE_NODE,
  UPDATE_NODE,
  REMOVE_NODE,
  REMOVE_PHOTO,
  GET_CHILDREN,
  UPDATE_CHILD,
  INSERT_AFTER,
  INSERT_BEFORE,
  UPDATE_PHOTO,
  GET_ATTACHMENT,
  UPDATE_ATTACHMENT,
  REMOVE_ATTACHMENT,
  CREATE_PHOTO,
  CREATE_ATTACHMENT,
  GET_TIMES,
  GET_TREE,
  GET_PHOTOS,
  DELETE_TEMP_NODE,
  INSERT_TEMP_BEFORE,
  INSERT_TEMP_AFTER,
  MOVE_NODE_AFTER,
  MOVE_NODE_BEFORE,
  GET_NODE,
  CREATE_LINK,
  DELETE_LINK,
  UPDATE_LINK,
  REMOVE_NODE_AND_LINKS,
  TRANSFER_NODE,
  GET_TRANSFER_NODE,
  PATCH_TRANSFER_NODE,
  BATCH_CREATE_CLONE,
  GET_NODES_VIA_FILTER,
  FIND_PARTICIPANT,
  MOVE_NODE_CHILD,
  CLONE_PARTICIPANT,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('apis/Node/config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#requests', () => {
    it('still matches snapshot', () => {
      requests.fetchWithAuthorisation = jest.fn();
      const batchDeletePayload = { items: [{ id: 1 }, { id: 2 }] };

      CONFIG.requests[CREATE_CHILD]({
        nodeId: 123,
        node: { content: 'some node' },
      });
      CONFIG.requests[CREATE_CHILD]({
        nodeId: 123,
        node: [{ content: 'some node' }, { content: 'some node 2' }],
      });
      CONFIG.requests[CREATE_NEXT_NODE]({
        nodeId: 123,
        node: { content: 'some node' },
      });
      CONFIG.requests[DELETE_CHILDREN]({ nodeId: 123 });
      CONFIG.requests[BATCH_DELETE_CHILDREN](batchDeletePayload);

      CONFIG.requests[BATCH_MOVE]({ id: 123, operations: ['operations'] });
      CONFIG.requests[MOVE_BEFORE]({ id: 123, toBeMovedId: 456 });
      CONFIG.requests[MOVE_AFTER]({ id: 123, toBeMovedId: 456 });
      CONFIG.requests[SHARE_NODE]({ id: 123, payload: { some: 'thing' } });
      CONFIG.requests[CREATE_NODE]({
        node: { parentNodeId: 1, content: 'YO' },
      });
      CONFIG.requests[REMOVE_NODE]({ nodeId: 1 });
      CONFIG.requests[REMOVE_NODE]({ nodeId: 1, newParentId: 2 });
      CONFIG.requests[UPDATE_NODE]({
        nodeId: 1,
        node: { id: 1, content: 'YO', type: 'folder' },
      });
      CONFIG.requests[BATCH_DELETE]({
        items: [{ id: 2 }, { id: 3 }, { id: 4 }],
      });
      CONFIG.requests[BATCH_DELETE]({
        items: [2, 3, 4],
      });
      CONFIG.requests[COPY]({ id: 1, body: { parentNodeId: 2 } });
      CONFIG.requests[MOVE]({ id: 1, body: { parentNodeId: 2 } });
      CONFIG.requests[CREATE_CLONE]({ id: 123, data: { some: 'props' } });
      CONFIG.requests[REMOVE_PHOTO]({ id: 1, fk: 1 });
      CONFIG.requests[GET_TIMES]({});
      CONFIG.requests[GET_TIMES]({ ids: 1 });
      CONFIG.requests[GET_TIMES]({ ids: [1, 2] });
      CONFIG.requests[GET_CHILDREN]({ id: 123 });
      CONFIG.requests[UPDATE_CHILD]({
        id: 123,
        fk: 1,
        payload: { some: 'thing' },
      });
      CONFIG.requests[INSERT_BEFORE]({
        id: 1,
        node: { id: 1, content: 'hello', type: 'folder' },
      });
      CONFIG.requests[INSERT_AFTER]({
        id: 1,
        node: { id: 1, content: 'hello', type: 'folder' },
      });
      CONFIG.requests[UPDATE_PHOTO]({
        id: 1,
        fk: 1,
        payload: { id: 1, content: 'hello', type: 'folder' },
      });
      CONFIG.requests[UPDATE_ATTACHMENT]({
        id: 1,
        fk: 1,
        payload: { id: 1, content: 'hello', type: 'attachment' },
      });
      CONFIG.requests[GET_ATTACHMENT]({ id: 1 });
      CONFIG.requests[REMOVE_ATTACHMENT]({ id: 1 });
      CONFIG.requests[CREATE_PHOTO]({
        id: 1,
        payload: { id: 1, content: 'hello', type: 'photo' },
      });
      CONFIG.requests[CREATE_ATTACHMENT]({
        id: 1,
        payload: { id: 1, content: 'hello', type: 'photo' },
      });
      CONFIG.requests[GET_TREE]({ id: 1 });
      CONFIG.requests[GET_PHOTOS]({ id: 1 });
      CONFIG.requests[INSERT_TEMP_AFTER]({
        id: 1,
        node: { id: 1 },
        parentId: 2,
        insertLocation: 'after',
      });
      CONFIG.requests[INSERT_TEMP_BEFORE]({
        id: 1,
        node: { id: 1 },
        parentId: 2,
        insertLocation: 'before',
      });
      CONFIG.requests[DELETE_TEMP_NODE]();
      CONFIG.requests[MOVE_NODE_BEFORE]({ id: 1, toBeMovedId: 2 });
      CONFIG.requests[MOVE_NODE_AFTER]({ id: 1, toBeMovedId: 2 });
      CONFIG.requests[GET_NODE]({ id: 1, type: 'ABCD' });
      CONFIG.requests[CREATE_LINK]({ id: 1, data: {} });
      CONFIG.requests[DELETE_LINK]({ id: 1, fk: 2 });
      CONFIG.requests[UPDATE_LINK]({ id: 1, fk: 2, data: {} });
      CONFIG.requests[REMOVE_NODE_AND_LINKS]({ id: 1 });
      CONFIG.requests[TRANSFER_NODE]({ id: 1, data: { nodeId: 1 } });
      CONFIG.requests[GET_TRANSFER_NODE]({ id: 1 });
      CONFIG.requests[PATCH_TRANSFER_NODE]({ id: 1, data: { nodeId: 1 } });
      CONFIG.requests[GET_NODES_VIA_FILTER]({ where: { id: 1 } });
      CONFIG.requests[FIND_PARTICIPANT]({ id: 1 });
      CONFIG.requests[CLONE_PARTICIPANT]({ id: 1, data: { nodeId: 1 } });
      CONFIG.requests[MOVE_NODE_CHILD]({ id: 1, toBeMovedId: 2 });
      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });

    it('BATCH_DELETE_CHILDREN', () => {
      requests.fetchWithAuthorisation = jest.fn();
      const batchDeletePayload = { items: [1, 2] };
      CONFIG.requests[BATCH_DELETE_CHILDREN](batchDeletePayload);

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
    it('BATCH_CREATE_CLONE', () => {
      requests.fetchWithAuthorisation = jest.fn();
      const node = [1, 2];
      CONFIG.requests[BATCH_CREATE_CLONE]({ node, data: {} });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
    it('BATCH_CREATE_CLONE', () => {
      requests.fetchWithAuthorisation = jest.fn();
      const node = null;
      CONFIG.requests[BATCH_CREATE_CLONE]({ node, data: {} });

      expect(requests.fetchWithAuthorisation).not.toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
  });
});
