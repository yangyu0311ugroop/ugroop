import { DO_NOTHING } from 'appConstants';
import { GET_NODE, NODE_API } from 'apis/constants';
import { CONSOLE_HELPERS } from 'utils/helpers/console';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { requests } from 'utils/request';
import { NODE_API_HELPERS } from '../helpers';

describe('<NODE_API_HELPERS />', () => {
  const node = { content: 'some node' };
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(typeof NODE_API_HELPERS).toBe('object');
  });

  describe('createNode', () => {
    it('should check required props', () => {
      CONSOLE_HELPERS.error = jest.fn();

      NODE_API_HELPERS.createNode({});

      expect(CONSOLE_HELPERS.error).toBeCalled();
      expect(CONSOLE_HELPERS.error.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo', () => {
      // create child
      NODE_API_HELPERS.createNode(
        {
          parentNodeId: 99222,
          lastNodeId: 0,
          node,
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );

      // create next node
      NODE_API_HELPERS.createNode(
        { parentNodeId: 99222, lastNodeId: 2, node },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('dispatchTo still matches snapshot if fetchCalculated', () => {
      NODE_API_HELPERS.createNode(
        {
          parentNodeId: 99222,
          lastNodeId: 0,
          node,
          onSuccess: 1,
          onError: 2,
          fetchCalculated: true,
        },
        { resaga },
      );

      // Get times
      resaga.dispatchTo.mock.calls[0][2].onSuccess({
        node: { 1: null, 2: null },
      });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo if insertLocation is after', () => {
      NODE_API_HELPERS.createNode(
        {
          parentNodeId: 999,
          lastNodeId: 1,
          node,
          onSuccess: 1,
          onError: 2,
          fetchCalculated: true,
          insertLocation: 'after',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
    });

    it('should call dispatchTo if insertLocation is before', () => {
      NODE_API_HELPERS.createNode(
        {
          parentNodeId: 999,
          lastNodeId: 1,
          node,
          onSuccess: 1,
          onError: 2,
          fetchCalculated: true,
          insertLocation: 'before',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('updateNode', () => {
    it('dispatchTo still matches snapshot', () => {
      NODE_API_HELPERS.updateNode(
        {
          nodeId: 99222,
          node,
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('deleteNode', () => {
    it('should check required props', () => {
      CONSOLE_HELPERS.error = jest.fn();

      NODE_API_HELPERS.deleteNode({}, {});
      NODE_API_HELPERS.deleteNode({ nodeId: 123 }, {});

      expect(CONSOLE_HELPERS.error).toBeCalled();
      expect(CONSOLE_HELPERS.error).toMatchSnapshot();
    });

    it('should call dispatchTo', () => {
      // delete node from ownProps + edge case: index === 0 should work
      NODE_API_HELPERS.deleteNode(
        { nodeId: 123 },
        { parentNodeId: 99222, resaga },
      );
      // delete node from params
      NODE_API_HELPERS.deleteNode(
        { nodeId: 123, parent: 99333 },
        { parentNodeId: 99222, resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('deleteTempNode', () => {
    it('should check required props', () => {
      CONSOLE_HELPERS.error = jest.fn();

      NODE_API_HELPERS.deleteTempNode({}, {});
      NODE_API_HELPERS.deleteTempNode({ nodeId: 123 }, {});

      expect(CONSOLE_HELPERS.error).toBeCalled();
      expect(CONSOLE_HELPERS.error).toMatchSnapshot();
    });

    it('should call dispatchTo', () => {
      NODE_API_HELPERS.deleteTempNode(
        { nodeId: 123 },
        { parentNodeId: 99222, resaga },
      );

      NODE_API_HELPERS.deleteTempNode(
        { nodeId: 123, parent: 99333 },
        { parentNodeId: 99222, resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('convertNextNode', () => {
    it('should DO_NOTHING', () => {
      expect(NODE_API_HELPERS.convertNextNode({}, {})).toBe(DO_NOTHING);
    });

    it('should call setValue', () => {
      // delete node from ownProps
      NODE_API_HELPERS.convertNextNode({ nextNodeId: 123 }, { resaga });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('getTimes', () => {
    it('should call dispatchTo', () => {
      NODE_API_HELPERS.getTimes(
        {
          id: 1,
          ids: [2, 3],
          onSuccess: 'onSuccess',
          onError: 'onError',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('getTree', () => {
    it('should call dispatchTo', () => {
      NODE_API_HELPERS.getTree(
        {
          id: 1,
          onSuccess: 'onSuccess',
          onError: 'onError',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('getTreeAndTimes', () => {
    it('should return null', () => {
      expect(NODE_API_HELPERS.getTreeAndTimes({ id: 0 })).toBe(null);
    });

    it('should call dispatchTo', () => {
      NODE_API_HELPERS.getTreeAndTimes(
        {
          id: 1,
          onSuccess: 'onSuccess',
          onError: 'onError',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();

      // Get times
      resaga.dispatchTo.mock.calls[0][2].onSuccess({
        node: { 1: null, 2: null },
      });

      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
  describe('getNode()', () => {
    it('shall dispatch a request', () => {
      NODE_API_HELPERS.getNode({ id: 1, type: 'participant' }, { resaga });
      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, GET_NODE, {
        payload: { id: 1, type: 'participant', childKey: 'children' },
      });
    });
  });
  describe('shareNode', () => {
    it('should call dispatchTo', () => {
      NODE_API_HELPERS.shareNode(
        {
          id: 4,
          payload: {
            content: '',
            fullName: 'Nancy Bina',
            inviteToOrganisation: false,
            role: 'tour_participant',
            roleName: 'Participant',
            shareTo: 'marcy_dizon@gmail.com',
            subNodes: [{ nodeId: 28, role: 'participant_linkee' }],
          },
          shareToUserId: null,
        },
        { resaga },
      );

      // Get times
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('createAttachment()', () => {
    it('should createAttachment', () => {
      NODE_API_HELPERS.createAttachment(
        {
          id: 2233,
          file: {
            name: 'file name',
            url: 'url',
            fileSize: 3322,
            description: 'description',
          },
        },
        { resaga },
      );

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('updateAttachment()', () => {
    it('should updateAttachment', () => {
      NODE_API_HELPERS.updateAttachment(
        {
          id: 2233,
          attachmentId: 123,
          name: 'file name',
          url: 'url',
          fileSize: 3322,
          description: 'description',
        },
        { resaga },
      );

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('removeAttachment()', () => {
    it('should removeAttachment', () => {
      NODE_API_HELPERS.removeAttachment({ id: 2233 }, { resaga });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('createNodeAndAttachment()', () => {
    it('should createNodeAndAttachment', () => {
      NODE_API_HELPERS.createNode = jest.fn(({ onSuccess }) =>
        onSuccess({ node: { id: 123 } }),
      );
      NODE_API_HELPERS.createAttachment = jest.fn();

      NODE_API_HELPERS.createNodeAndAttachment({ id: 2233 }, { resaga });

      TEST_HELPERS.expectCalledAndMatchSnapshot(NODE_API_HELPERS.createNode);
      TEST_HELPERS.expectCalledAndMatchSnapshot(
        NODE_API_HELPERS.createAttachment,
      );
    });
  });

  describe('updateNodeAndAttachment()', () => {
    it('should updateNodeAndAttachment', () => {
      NODE_API_HELPERS.updateNode = jest.fn(({ onSuccess }) => onSuccess());
      NODE_API_HELPERS.updateAttachment = jest.fn();

      NODE_API_HELPERS.updateNodeAndAttachment({ nodeId: 2233 }, { resaga });

      TEST_HELPERS.expectCalledAndMatchSnapshot(NODE_API_HELPERS.updateNode);
      TEST_HELPERS.expectCalledAndMatchSnapshot(
        NODE_API_HELPERS.updateAttachment,
      );
    });
  });

  describe('moveNodeAfter()', () => {
    it('should moveNodeAfter()', () => {
      NODE_API_HELPERS.moveNodeAfter({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('unlinkNextNode()', () => {
    it('should unlinkNextNode()', () => {
      NODE_API_HELPERS.unlinkNextNode({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('dispatchUpdateNode()', () => {
    it('should dispatchUpdateNode()', () => {
      requests.fetchWithAuthorisation = jest.fn();

      NODE_API_HELPERS.dispatchUpdateNode({});

      TEST_HELPERS.expectCalled(requests.fetchWithAuthorisation);
    });
  });

  describe('batchUpdateNode()', () => {
    it('should batchUpdateNode() array', () => {
      NODE_API_HELPERS.dispatchUpdateNode = jest.fn();

      NODE_API_HELPERS.batchUpdateNode({ node: [{}] });

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.dispatchUpdateNode);
    });

    it('should batchUpdateNode() object', () => {
      NODE_API_HELPERS.dispatchUpdateNode = jest.fn();

      NODE_API_HELPERS.batchUpdateNode({ node: {} });

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.dispatchUpdateNode);
    });
  });
});
