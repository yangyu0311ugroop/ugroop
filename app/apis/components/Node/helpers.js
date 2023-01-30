import {
  NODE_API,
  GET_NODE,
  CREATE_CHILD,
  CREATE_NEXT_NODE,
  UPDATE_NODE,
  DELETE_CHILDREN,
  GET_TIMES,
  GET_TREE,
  INSERT_AFTER,
  INSERT_BEFORE,
  DELETE_TEMP_NODE,
  SHARE_NODE,
  CREATE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  REMOVE_ATTACHMENT,
  MOVE_AFTER,
  UNLINK_NEXT_NODE,
} from 'apis/constants';
import { DO_NOTHING, EMPTY_RTE } from 'appConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { CONSOLE_HELPERS, MISSING_REQUIRED_PROPS } from 'utils/helpers/console';
import { DATASTORE_UTILS } from 'datastore';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { requests } from 'utils/request';

/**
 * Gets type-checked node based on id.
 * Use this if you need customData.
 * @param obj
 *  id: node id
 *  type: node type
 *  childKey: specify to automatically update parent node's id array
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const getNode = (obj, props) => {
  const { id, type, updateParent = true, childKey, ...rest } = obj;

  props.resaga.dispatchTo(NODE_API, GET_NODE, {
    payload: {
      id,
      type,
      childKey: LOGIC_HELPERS.ifElse(updateParent, childKey || 'children'),
    },
    ...rest,
  });
};

// call this function to either create child or next node
const createNode = (
  {
    node,
    parentNodeId,
    childKey = 'children',
    onSuccess,
    onError,
    lastNodeId,
    fetchCalculated,
    insertLocation = '',
  },
  ownProps,
) => {
  // required props
  if (!parentNodeId) {
    return CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 'parentNodeId');
  }

  const { resaga } = ownProps;

  const handleSuccess = fetchCalculated
    ? ({ node: responseNode }) => {
        NODE_API_HELPERS.getTimes(
          {
            id: responseNode.id,
            ids: [responseNode.id],
            onSuccess,
            onError,
          },
          ownProps,
        );
      }
    : onSuccess;

  if (!lastNodeId) {
    return resaga.dispatchTo(NODE_API, CREATE_CHILD, {
      payload: {
        keyPath: `${parentNodeId}.${childKey}`,
        nodeId: parentNodeId,
        parentNodeId,
        node,
      },
      onSuccess: handleSuccess,
      onError,
    });
  }

  if (insertLocation === 'after') {
    return resaga.dispatchTo(NODE_API, INSERT_AFTER, {
      payload: {
        id: lastNodeId,
        parentId: parentNodeId,
        insertLocation: 'after',
        node,
        type: childKey,
      },
      onSuccess: handleSuccess,
      onError,
    });
  }

  if (insertLocation === 'before') {
    return resaga.dispatchTo(NODE_API, INSERT_BEFORE, {
      payload: {
        id: lastNodeId,
        parentId: parentNodeId,
        insertLocation: 'before',
        node,
        type: childKey,
      },
      onSuccess: handleSuccess,
      onError,
    });
  }

  return resaga.dispatchTo(NODE_API, CREATE_NEXT_NODE, {
    payload: {
      keyPath: `${parentNodeId}.${childKey}`,
      nodeId: lastNodeId,
      parentNodeId,
      node,
    },
    onSuccess: handleSuccess,
    onError,
  });
};

const updateNode = ({ nodeId, node, onSuccess, onError }, props) => {
  const { resaga } = props;
  return resaga.dispatchTo(NODE_API, UPDATE_NODE, {
    payload: { nodeId, node },
    onSuccess,
    onError,
  });
};

const deleteNode = (
  {
    nodeId,
    dependentIds,
    dependentLinkIds,
    childKey = 'children',
    parent,
    type,
    onSuccess,
    onError,
  },
  props,
) => {
  const { parentNodeId: parentProp, resaga } = props;
  const parentNodeId = parent || parentProp;

  // required props
  if (!nodeId) {
    return CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 'nodeId');
  }
  if (!parentNodeId) {
    return CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 'parentNodeId');
  }

  return resaga.dispatchTo(NODE_API, DELETE_CHILDREN, {
    payload: {
      keyPath: `${parentNodeId}.${childKey}`,
      nodeId,
      type,
      dependentIds,
      dependentLinkIds,
    },
    onSuccess,
    onError,
  });
};

const deleteTempNode = (
  { nodeId, childKey = 'children', parent, onSuccess, onError },
  props,
) => {
  const { parentNodeId: parentProp, resaga } = props;
  const parentNodeId = parent || parentProp;

  // required props
  if (!nodeId) {
    return CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 'nodeId');
  }
  if (!parentNodeId) {
    return CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 'parentNodeId');
  }

  return resaga.dispatchTo(NODE_API, DELETE_TEMP_NODE, {
    payload: {
      keyPath: `${parentNodeId}.${childKey}`,
      nodeId,
    },
    onSuccess,
    onError,
  });
};

const convertNextNode = ({ nextNodeId, childKey = 'children' }, props) => {
  if (!nextNodeId) {
    return DO_NOTHING;
  }

  const { resaga } = props;

  return resaga.setValue({
    [childKey]: NODE_STORE_HELPERS.concatIfNotExist(nextNodeId), // add nextNodeId to childKey
    nextNodes: NODE_STORE_HELPERS.deleteIfExist(nextNodeId), // delete nextNodeId from nextNodes
  });
};

/**
 * @param obj
 *  id: node id for permission check
 *  ids: one or more node ids for which to get times
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const getTimes = (obj, props) => {
  const { id, ids, onSuccess, onError } = obj;
  return props.resaga.dispatchTo(NODE_API, GET_TIMES, {
    payload: { id, ids },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  id: node id
 *  idUpsertMode: array upsert method (append by default)
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const getTree = (obj, props) => {
  const { id, idUpsertMode, onSuccess, onError } = obj;
  props.resaga.dispatchTo(NODE_API, GET_TREE, {
    payload: { id, idUpsertMode },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  id: node id
 *  idUpsertMode: array upsert method (append by default)
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const getTreeAndTimes = (obj, props) => {
  const { id, idUpsertMode, onSuccess, onError } = obj;

  if (!id) return null;

  // TODO: Combine in one api call?
  return props.resaga.dispatchTo(NODE_API, GET_TREE, {
    payload: { id, idUpsertMode },
    onSuccess: ({ node, eventNodes }) => {
      const ids = [
        ...DATASTORE_UTILS.getObjectIds(node),
        ...DATASTORE_UTILS.getObjectIds(eventNodes),
      ];
      NODE_API_HELPERS.getTimes(
        {
          id: ids[0],
          ids,
          onSuccess,
          onError,
        },
        props,
      );
    },
    onError,
  });
};

/**
 *
 * @param obj
 *  id: node id
 *  role: new invitee role
 *  shareTo: invitee address
 *  shareToUserId: invitee user id (optional)
 *  content: message to invitee (optional)
 *  inviteToOrganisation: whether to also invite to node's org (optional)
 *  subNodes: extra {nodeId, role}'s to include in invitation (optional)
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const shareNode = (obj, props) => {
  const {
    id,
    role,
    shareTo,
    shareToUserId,
    content,
    inviteToOrganisation = false,
    subNodes,
    fullName,
    ...rest
  } = obj;

  const payload = {
    id,
    payload: {
      role,
      content: content === EMPTY_RTE ? '' : content,
      shareTo,
      fullName,
      roleName: TOUR_ROLES[role],
      inviteToOrganisation,
      subNodes: ARRAY_HELPERS.arrayIfNot(subNodes),
    },
    shareToUserId,
  };

  props.resaga.dispatchTo(NODE_API, SHARE_NODE, { payload, ...rest });
};

/**
 * @param obj
 *  id: node id
 *  file: { name, url, size }
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const createAttachment = (obj, props) => {
  const {
    id,
    file: { name, url, size, fileSize, description },
    ...rest
  } = obj;

  props.resaga.dispatchTo(NODE_API, CREATE_ATTACHMENT, {
    payload: {
      id,
      name,
      fileSize: size || fileSize,
      description,
      url,
      isSection: true, // TODO: Properly rename isSection to isNode?
    },
    ...rest,
  });
};

/**
 * @param obj
 *  id: node id,
 *  attachmentId,
 *  name: name of file,
 *  url: path to file,
 *  fileSize: size of file,
 *  description: description of file,
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const updateAttachment = (obj, props) => {
  const { id, attachmentId, name, url, fileSize, description, ...rest } = obj;
  props.resaga.dispatchTo(NODE_API, UPDATE_ATTACHMENT, {
    payload: {
      id,
      attachmentId,
      name,
      url,
      fileSize,
      description,
      isSection: true, // TODO: Properly rename isSection to isNode?
    },
    ...rest,
  });
};

/**
 * @param obj
 *  id: node id,
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const removeAttachment = (obj, props) => {
  const { id, ...rest } = obj;
  props.resaga.dispatchTo(NODE_API, REMOVE_ATTACHMENT, {
    payload: { id, isSection: true }, // TODO: Properly rename isSection to isNode?
    ...rest,
  });
};

/**
 * @param obj
 *  node: { type, content, ... }
 *  parentNodeId
 *  childKey
 *  file: { name, url, size }
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const createNodeAndAttachment = (obj, props) => {
  // TODO: Combine in one api call?
  NODE_API_HELPERS.createNode(
    {
      ...obj,
      onSuccess: ({ node: { id } }) =>
        NODE_API_HELPERS.createAttachment({ ...obj, id }, props),
    },
    props,
  );
};

/**
 * @param obj
 *  nodeId: node id
 *  node: { type, content, ... }
 *  attachmentId
 *  attachment: { name, url, fileSize, description }
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const updateNodeAndAttachment = (
  { nodeId, node, attachmentId, attachment, ...rest },
  props,
) => {
  // TODO: Combine in one api call?
  NODE_API_HELPERS.updateNode(
    {
      nodeId,
      node,
      onSuccess: () =>
        NODE_API_HELPERS.updateAttachment(
          {
            ...attachment,
            attachmentId,
            id: nodeId,
            ...rest,
          },
          props,
        ),
    },
    props,
  );
};

const moveNodeAfter = (
  { nodeId, nodeIdToBeMoved, removeParentNode = true, onSuccess, onError },
  props,
) => {
  props.resaga.dispatchTo(NODE_API, MOVE_AFTER, {
    payload: {
      id: nodeId,
      toBeMovedId: nodeIdToBeMoved,
      removeParentNode,
    },
    onSuccess,
    onError,
  });
};

const unlinkNextNode = (
  { nodeId, nodeToBeUnlinkedId, path, onSuccess, onError },
  props,
) => {
  props.resaga.dispatchTo(NODE_API, UNLINK_NEXT_NODE, {
    payload: {
      id: nodeId,
      fk: nodeToBeUnlinkedId,
      path,
    },
    onSuccess,
    onError,
  });
};

const dispatchUpdateNode = node =>
  requests.fetchWithAuthorisation('patch', `/${NODE_API}/${node.id}`, node);

const batchUpdateNode = ({ nodeId, node }) => {
  if (Array.isArray(node)) {
    return Promise.all(node.map(NODE_API_HELPERS.dispatchUpdateNode));
  }

  return NODE_API_HELPERS.dispatchUpdateNode({ ...node, id: nodeId });
};

export const NODE_API_HELPERS = {
  getNode,
  createNode,
  updateNode,
  batchUpdateNode,
  deleteNode,
  deleteTempNode,
  convertNextNode,
  getTimes,
  getTree,
  getTreeAndTimes,
  shareNode,
  createAttachment,
  updateAttachment,
  removeAttachment,
  createNodeAndAttachment,
  updateNodeAndAttachment,
  moveNodeAfter,
  unlinkNextNode,
  dispatchUpdateNode,
};
