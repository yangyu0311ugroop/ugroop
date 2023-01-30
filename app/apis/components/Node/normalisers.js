import { TOUR_SETTINGS, PENDING } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';
import { INVITATION_STORE_SCHEMA } from 'datastore/invitationStore/schema';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import {
  EVENTS,
  FOLDER,
  ACTIVITY,
  PARTICIPANT,
  PARTICIPANTS,
  SEATS,
  TEMPLATE,
  CHECKGROUP,
  GROUP,
} from 'utils/modelConstants';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import tabHelper from 'datastore/templateManagementStore/helpers/tab';
import { DATA_HELPERS } from 'datastore/utils';
import dotProp from 'dot-prop-immutable';
import lodash from 'lodash';
import { normalize, schema } from 'normalizr';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { createNodeData, upsertActivityData } from './utils';

const getNode = (node, { childKey }) => {
  const origin = dotProp.set(node, 'children', arrays.convertNextNodesToArray);

  const { entities } = normalize(origin, NODE_SCHEMA.singleNode);
  if (!childKey) {
    return {
      files: DATASTORE_UTILS.upsertObject(entities.photo),
      nodes: DATASTORE_UTILS.upsertObject(entities.node),
    };
  }

  return {
    nodes: nodes => ({
      ...upsertHelpers.deepMerge(
        {
          [node.id]: node,
          [node.parentNodeId]: { [childKey]: [node.id] },
        },
        ARRAY_MODE.APPEND,
      )(nodes),
    }),
  };
};

const getNodes = result => {
  let nodes = null;
  if (result.nodes && result.nodes.length > 0) {
    nodes = result.nodes.map(n => {
      if (n.type === CHECKGROUP) {
        const data = dotProp.set(n, 'checklists', checklists =>
          checklists.map(checklist =>
            dotProp.set(
              checklist,
              'checklists',
              arrays.convertChecklistsToArray,
            ),
          ),
        );
        return data;
      }
      return n;
    });
    const { entities } = normalize(nodes, NODE_SCHEMA.node);
    return {
      nodes: DATASTORE_UTILS.upsertObject(entities.node),
    };
  }
  return null;
};

const reduceCreateNode = nodePayload => ({ ids, data }, each, index) => ({
  ids: ids.concat(each.id),
  data: DATA_HELPERS.objectUpdate({
    [each.id]: { ...each, customData: nodePayload[index].customData },
  })(data),
});

// pass in keyPath so the parent's id array will be updated automatically
const createNode = (
  result,
  { keyPath, node: nodePayload, isAppendedFirst = false },
) => {
  if (Array.isArray(result) && result.length) {
    const { ids, data } = result.reduce(reduceCreateNode(nodePayload), {
      ids: [],
      data: {},
    });

    return {
      nodes: nodesStore => ({
        ...DATASTORE_UTILS.upsertObject(data)(nodesStore),
        ...DATASTORE_UTILS.upsertArray(keyPath, ids, { isAppendedFirst })(
          nodesStore,
        ),
      }),
      node: result,
      result: ids,
      nodeIds: upsertHelpers.array(ids, ARRAY_MODE.APPEND),
    };
  }

  return {
    nodes: nodesStore => {
      const tempNode = result;
      if (!tempNode.customData) {
        const nodeCustomData = nodePayload.customData;
        tempNode.customData = {
          editing: true,
          ...nodeCustomData,
          content: nodePayload.content,
        };
      }

      if (!tempNode.children) {
        tempNode.children = [];
      }

      return {
        ...DATASTORE_UTILS.upsertObject({
          [tempNode.id]: { ...nodePayload, ...tempNode },
        })(nodesStore),
        ...DATASTORE_UTILS.upsertArray(keyPath, tempNode.id, {
          isAppendedFirst,
        })(nodesStore),
      };
    },
    node: result,
    nodeIds: upsertHelpers.array(result.id, ARRAY_MODE.APPEND),
  };
};

const removeOld = payload => {
  const processPayload = [
    DATASTORE_UTILS.upsertArray(payload.keyPath, payload.movedId),
    DATASTORE_UTILS.removeItemsArray(payload.initialPath, payload.movedId),
  ];

  return processPayload;
};

const updateNode = (node, payload) => {
  if (Array.isArray(node)) {
    const nodes = node.reduce(
      (accu, one) => ({
        ...accu,
        [one.id]: one,
      }),
      {},
    );

    return { nodes: DATASTORE_UTILS.upsertObject(nodes) };
  }

  const hasCustomData = lodash.get(node, 'customData');
  const customData = lodash.get(payload, 'node.customData');

  let processSortedIds = [];
  let processParticipants = [];
  if (node.type === TEMPLATE || node.type === FOLDER) {
    processSortedIds = [
      DATASTORE_UTILS.upsertArray(
        `${node.parentNodeId}.calculated.sortedIds`,
        node.id,
        {
          isAppendedFirst: true,
        },
      ),
    ];
  }

  if (node.type === PARTICIPANT && payload.moveNode) {
    processParticipants = removeOld(payload);
  }

  if (node.type === ACTIVITY) {
    const updateActivityNode = upsertActivityData(
      LOGIC_HELPERS.ifElse(hasCustomData, node, { ...node, customData }),
      payload,
    );
    return updateActivityNode;
  }

  return {
    nodes: compose(
      ...processParticipants,
      DATASTORE_UTILS.upsertObject({
        [node.id]: LOGIC_HELPERS.ifElse(hasCustomData, node, {
          ...node,
          customData,
          lastModifiedBy: { id: node.id },
        }),
      }),
      ...processSortedIds,
    ),
  };
};

// TODO: Improve further so that we can easily include other dependent nodes
const updateOtherDependentNode = nodeId => nodes => {
  const targetNode = lodash.get(nodes, `${nodeId}`, {});

  const seats = targetNode.seats;

  if (!seats) return nodes;

  const result = seats.reduce((acc, seatId) => {
    const participants = lodash.get(acc, `${seatId}.participants`, []);
    const removedParticipant = participants.filter(
      participantId => participantId !== nodeId,
    );
    return dotProp.set(acc, `${seatId}.participants`, removedParticipant);
  }, nodes);

  return result;
};

const updateGroupDependents = (dependentIds, dependentLinkIds) => nodes => {
  const updates = dependentIds.reduce((acc, dependentId) => {
    const participantsGroup = lodash.get(acc, `${dependentId}.groups`, []);
    const filtered = participantsGroup.filter(
      pGroup => !dependentLinkIds.includes(pGroup),
    );
    return lodash.set(acc, `${dependentId}.groups`, filtered);
  }, nodes);

  return updates;
};

// pass in keyPath so the parent's id array will be updated automatically
const deleteNode = (
  _,
  { keyPath, nodeId, type, dependentIds, dependentLinkIds },
) => {
  const operations = [];

  if (type === PARTICIPANT) operations.push(updateOtherDependentNode(nodeId));
  if (type === GROUP)
    operations.push(updateGroupDependents(dependentIds, dependentLinkIds));

  return {
    nodes: compose(
      DATASTORE_UTILS.removeObjectById(nodeId),
      DATASTORE_UTILS.removeItemsArray(keyPath, nodeId),
      ...operations,
    ),
  };
};

/**
 * Moves node to be a children of another node.
 * @param {Object} node
 * @param {Object} payload
 * @param {number} payload.id - id of the node to be moved
 * @param {string} payload.keyPath - target attribute where the id will be added
 * @param {string} payload.initialPath - the initial parent/location of the node to be moved
 * @return {{nodes: function(*=): {}}}
 */
const moveNode = (node, { id, keyPath, initialPath, type, sortedIdsPath }) => {
  let processSortedIds = [];
  if (type === TEMPLATE || type === FOLDER) {
    processSortedIds = [DATASTORE_UTILS.removeItemsArray(sortedIdsPath, id)];
  }
  return {
    nodes: compose(
      DATASTORE_UTILS.upsertArray(keyPath, node.id),
      DATASTORE_UTILS.removeItemsArray(initialPath, id),
      ...processSortedIds,
    ),
  };
};

/**
 * Copy a particular node as a children of another node
 * @param {Object} node - returned cloned tour
 * @param {Object} payload
 * @param {string} payload.type - the type of the node that will be copied
 * @param {string} payload.keyPath - target attribute where the id will be added
 * @return {{nodes: function(*=): {}, node: *}}
 */
const copyNode = (node, { type = TEMPLATE, keyPath, sortedKeyPath }) => {
  const newNode = createNodeData(type, node);
  return {
    nodes: nodes => ({
      ...compose(
        DATASTORE_UTILS.upsertObject(newNode.id, newNode),
        DATASTORE_UTILS.upsertArray(keyPath, newNode.id),
        DATASTORE_UTILS.upsertArray(sortedKeyPath, newNode.id),
      )(nodes),
    }),
    node: createNodeData(type, node),
  };
};

export const recentActivityIds = id => (ids = []) =>
  ids.indexOf(id) !== -1 ? dotProp.delete(ids, ids.indexOf(id)) : ids;

export const mapItems = item =>
  Number(typeof item === 'object' ? item.id : item);

export const removeStoreChildren = (path, items) => (store = {}) =>
  Array.isArray(items) && path
    ? {
        ...DATASTORE_UTILS.removeItemsArray(path, ...items.map(mapItems))(
          store,
        ),
      }
    : store;

const batchDeleteNode = (
  result,
  { id, items, keyPath, sortedIdsKeyPath, orgTourKeypath },
) => {
  const sorted = nodes =>
    sortedIdsKeyPath
      ? DATASTORE_UTILS.removeItemsArray(
          sortedIdsKeyPath,
          ...items.map(mapItems),
        )(nodes)
      : {};

  return {
    nodes: nodes =>
      Array.isArray(items)
        ? {
            ...DATASTORE_UTILS.removeItemsArray(
              keyPath,
              ...items.map(mapItems),
            )(nodes),
            ...sorted(nodes),
          }
        : nodes,
    recentActivityIds: recentActivityIds(id),
    organisationTours: removeStoreChildren(orgTourKeypath, items),
    raw: result,
  };
};

const batchDeleteNodeChildren = (result, { id, items, keyPath }) => ({
  nodes: nodes =>
    Array.isArray(items)
      ? DATASTORE_UTILS.removeItemsArray(keyPath, ...items.map(mapItems))(nodes)
      : nodes,
  recentActivityIds: recentActivityIds(id),
  raw: result,
});

const insertNode = (
  node,
  {
    id,
    hashkey,
    parentId,
    node: nodePayload,
    insertLocation,
    type = 'children',
    editingAfterCreate,
  },
) => {
  let tempNode = node;

  if (typeof editingAfterCreate !== 'undefined') {
    tempNode = dotProp.set(node, 'calculated.editing', editingAfterCreate);
  }

  if (!tempNode.children) {
    tempNode.children = [];
  }

  const nodeId = LOGIC_HELPERS.ifElse(hashkey, hashkey, tempNode.id);

  const insert =
    insertLocation === 'after'
      ? tabHelper.insertChildAfter(parentId, id, nodeId, type)
      : tabHelper.insertChildBefore(parentId, id, nodeId, type);
  const editing = LOGIC_HELPERS.ifElse(hashkey, { editingCheckItem: true }, {});

  return {
    nodes: nodes =>
      compose(
        insert,
        DATASTORE_UTILS.upsertObject({
          [nodeId]: { ...nodePayload, ...tempNode },
        }),
      )(nodes),
    node: tempNode,
    ...editing,
  };
};

const shareNode = shares => ({
  ...normalize(shares, INVITATION_STORE_SCHEMA.nodeShare).entities,
  raw: shares,
});

const getTree = nodes => {
  // TODO: Split nodes + eventNodes via schema
  const { node, ...rest } = normalize(
    ARRAY_HELPERS.arrayIfNot(nodes),
    NODE_SCHEMA.node,
  ).entities;

  const normalized = {
    ...rest,
    node: {},
    eventNodes: {},
  };

  Object.values(node).forEach(n => {
    if (EVENTS.includes(n.type)) {
      normalized.eventNodes[n.id] = n;
    } else {
      normalized.node[n.id] = n;
    }
  }, {});

  return normalized;
};

const createPhoto = (file, nodeId) => {
  const photo = normalize(file, FILE_STORE_SCHEMAS.templatePhoto);
  return {
    files: DATASTORE_UTILS.upsertObject(photo.entities.photo),
    nodes: DATASTORE_UTILS.upsertArray(`${nodeId.id}.photos`, nodeId.content),
  };
};

const updatePhoto = file => {
  if (file.oldPhoto === file.content) {
    if (!lodash.isEqual(file.metaInfo, file.oldMetaInfo)) {
      const photo = normalize(file, FILE_STORE_SCHEMAS.templatePhoto);
      return {
        files: DATASTORE_UTILS.upsertObject(photo.entities.photo),
      };
    }
    return {};
  }

  const photo = normalize(file, FILE_STORE_SCHEMAS.templatePhoto);
  return {
    files: compose(
      DATASTORE_UTILS.upsertObject(photo.entities.photo),
      DATASTORE_UTILS.removeObjectById(file.oldPhoto),
    ),
    nodes: compose(
      DATASTORE_UTILS.removeItemsArray(`${file.nodeId}.photos`, file.oldPhoto),
      DATASTORE_UTILS.upsertArray(`${file.nodeId}.photos`, file.content),
    ),
  };
};

const deletePhoto = (_, { removeNodePhoto, photoId, id }) => {
  if (removeNodePhoto) {
    return {
      nodes: DATASTORE_UTILS.removeItemsArray(`${id}.photos`, photoId),
    };
  }

  return {};
};

const batchMove = (_, payload) => {
  const dayChanges = payload.movedDayIds[payload.id];
  const sections = Object.keys(payload.movedSectionIds).map(key =>
    DATASTORE_UTILS.updateAttribute(
      `${key}.children`,
      payload.movedSectionIds[key],
    ),
  );
  return {
    nodes: compose(
      ...sections,
      DATASTORE_UTILS.upsertArray(`${payload.id}.children`, dayChanges, {
        isAppendedFirst: true,
      }),
    ),
  };
};

const createNextNode = (result, payload) =>
  payload.templateId
    ? {
        nodes: compose(
          DATASTORE_UTILS.upsertObject({
            [result.id]: { customData: payload.node.customData, ...result },
          }),
          DATASTORE_UTILS.upsertArray(`${payload.nodeId}.nextNodes`, result.id),
          DATASTORE_UTILS.upsertArray(
            `${payload.templateId}.children`,
            result.id,
          ),
        ),
        node: result,
      }
    : {
        nodes: compose(
          DATASTORE_UTILS.upsertObject({
            [result.id]: { customData: payload.node.customData, ...result },
          }),
          DATASTORE_UTILS.upsertArray(`${payload.nodeId}.nextNodes`, result.id),
          DATASTORE_UTILS.upsertArray(payload.keyPath, result.id),
        ),
        node: result,
      };

const updateChild = result => ({
  nodes: compose(DATASTORE_UTILS.upsertObject({ [result.id]: result })),
  payload: result,
});

const getChildren = result => ({
  nodes: compose(
    tabHelper.insertChildren(result[0].parentNodeId, result[0].id),
    DATASTORE_UTILS.upsertObject({ [result[0].id]: result[0] }),
  ),
  data: result,
});

const getAttachment = file => {
  const attachment = normalize(file, FILE_STORE_SCHEMAS.attachment);

  return {
    attachments: DATASTORE_UTILS.upsertObject(attachment.entities.attachment),
    nodes: DATASTORE_UTILS.updateAttribute(
      `${file.nodeId}.attachment`,
      attachment.result,
    ),
  };
};

const createAttachment = (file, payload) => {
  const attachment = normalize(file, FILE_STORE_SCHEMAS.attachment);
  const isSection = lodash.get(payload, 'isSection', false);
  const value = LOGIC_HELPERS.ifElse(isSection, attachment.result, file.url);
  const store = LOGIC_HELPERS.ifElse(isSection, 'attachments', 'files');

  return {
    [store]: DATASTORE_UTILS.upsertObject(attachment.entities.attachment),
    nodes: DATASTORE_UTILS.updateAttribute(`${file.nodeId}.attachment`, value),
    fileResult: file,
  };
};

const updateAttachment = (file, payload) => {
  let attachment = normalize(file, FILE_STORE_SCHEMAS.attachment);
  const isSection = lodash.get(payload, 'isSection', false);
  const nodeId = LOGIC_HELPERS.ifElse(isSection, attachment.result, file.url);
  const value = LOGIC_HELPERS.ifElse(isSection, 0, '');
  const store = LOGIC_HELPERS.ifElse(isSection, 'attachments', 'files');

  if (file.description === '' && file.url === null) {
    return {
      [store]: DATASTORE_UTILS.removeObjectById(file.attachmentId),
      nodes: DATASTORE_UTILS.updateAttribute(
        `${file.nodeId}.attachment`,
        value,
      ),
    };
  }
  if (!file.url) {
    const attachmentNullUrlSchema = new schema.Entity(
      'attachment',
      {},
      {
        idAttribute: 'attachmentId',
      },
    );
    attachment = normalize(file, attachmentNullUrlSchema);
    return {
      [store]: compose(
        DATASTORE_UTILS.upsertObject(attachment.entities.attachment),
        DATASTORE_UTILS.removeObjectById(file.attachmentId),
      ),
    };
  }

  return {
    [store]: compose(
      DATASTORE_UTILS.upsertObject(attachment.entities.attachment),
      DATASTORE_UTILS.removeObjectById(nodeId),
    ),
    nodes: DATASTORE_UTILS.updateAttribute(`${file.nodeId}.attachment`, nodeId),
  };
};

const removeAttachment = (_, payload) => {
  const isSection = lodash.get(payload, 'isSection', false);
  const value = LOGIC_HELPERS.ifElse(isSection, 0, '');
  const store = LOGIC_HELPERS.ifElse(isSection, 'attachments', 'files');

  return {
    [store]: DATASTORE_UTILS.removeObjectById(payload.attachmentId),
    nodes: DATASTORE_UTILS.updateAttribute(`${payload.id}.attachment`, value),
  };
};

const createTemplateSettings = (template, { templatesettings }) => {
  const id = lodash.get(template, 'id', 0);
  return { [id]: templatesettings };
};

const initTemplateSettings = (data = [], result) => {
  const customData = {
    [TOUR_SETTINGS.PUSH_NOTIFICATION]: lodash.first(data),
  };
  const id = lodash.get(result, 'id', 0);
  const templateSettings = { [id]: customData };
  return { nodeSettings: DATASTORE_UTILS.upsertObject(templateSettings) };
};

const upsertTemplateSetting = ({ id, parentNodeId }, { data }) => ({
  nodeSettings: upsertHelpers.deepMerge({
    [parentNodeId]: {
      [data.customData.key]: {
        id,
        value: data.customData.value,
      },
    },
  }),
});

const upsertTemplateSettings = (results, { values }) => {
  const obj = results.reduce(
    (accu, { id, parentNodeId }, index) => ({
      ...accu,
      [parentNodeId]: {
        ...accu[parentNodeId],
        [values[index].data.customData.key]: {
          id,
          value: values[index].data.customData.value,
        },
      },
    }),
    {},
  );

  return {
    nodeSettings: upsertHelpers.deepMerge(obj),
  };
};

// TODO: Make this more generic as to be able to target other child keys and enable many to many relationship
const unlinkOldNode = (
  id,
  parentChildKey = PARTICIPANTS,
  childKey = SEATS,
) => nodes => {
  const oldNodeId = dotProp.get(nodes, `${id}.${parentChildKey}`, null);
  if (Array.isArray(oldNodeId) && oldNodeId.length !== 0) {
    const newNodes = dotProp.set(nodes, `${id}.${parentChildKey}`, []);
    return dotProp.set(newNodes, `${oldNodeId[0]}.${childKey}`, []);
  }
  return nodes;
};

const updateLink = (
  link,
  { id, fk, data, prevNodeChildKey, nextNodeChildKey, upsertLinkId = false },
) => {
  const { nextNodeId } = data;
  const normalizedLink = normalize(link, NODE_SCHEMA.link);
  const { entities } = normalizedLink;
  const nextId = LOGIC_HELPERS.ifElse(upsertLinkId, link.id, nextNodeId);
  const prevId = LOGIC_HELPERS.ifElse(upsertLinkId, link.id, id);

  return {
    nodes: compose(
      DATASTORE_UTILS.upsertArray(`${nextNodeId}.${nextNodeChildKey}`, prevId),
      DATASTORE_UTILS.upsertArray(`${id}.${prevNodeChildKey}`, nextId),
      DATASTORE_UTILS.removeItemsArray(`${fk}.${nextNodeChildKey}`, id),
      DATASTORE_UTILS.removeItemsArray(`${id}.${prevNodeChildKey}`, fk),
    ),
    links: DATASTORE_UTILS.upsertObject(entities.link),
  };
};

const unlink = (
  _,
  {
    id,
    fk,
    prevNodeChildKey,
    nextNodeChildKey,
    linkKey,
    removeLinkId = true,
    removedPrevLinkId = true,
  },
) => ({
  nodes: compose(
    DATASTORE_UTILS.removeItemsArray(
      `${id}.${prevNodeChildKey}`,
      LOGIC_HELPERS.ifElse(removedPrevLinkId, linkKey, fk),
    ),
    DATASTORE_UTILS.removeItemsArray(
      `${fk}.${nextNodeChildKey}`,
      LOGIC_HELPERS.ifElse(removeLinkId, linkKey, id),
    ),
  ),
  linkIds: DATASTORE_UTILS.removeItemsInArray(linkKey),
});

const connectLinkWithoutActions = (
  link,
  { id, data, prevNodeChildKey, nextNodeChildKey },
) => {
  const { nextNodeId } = data;
  const sourcePath = `${id}.${prevNodeChildKey}`;
  const destinationPath = `${nextNodeId}.${nextNodeChildKey}`;

  return {
    nodes: compose(
      DATASTORE_UTILS.upsertArray(`${sourcePath}`, nextNodeId),
      DATASTORE_UTILS.upsertArray(`${destinationPath}`, id),
    ),
  };
};

// TODO: Make unlinking of node optional later on as we should allow many links for a particular node
const createLink = (
  link,
  {
    id,
    data,
    prevNodeChildKey,
    nextNodeChildKey,
    upsertLinkId = false,
    overrideDestinationLinkId = false,
  },
) => {
  const { nextNodeId, action, actionContent: content } = data;
  if (!action) {
    return connectLinkWithoutActions(link, {
      id,
      data,
      prevNodeChildKey,
      nextNodeChildKey,
    });
  }

  const sourcePath = `${id}.${prevNodeChildKey}`;
  const destinationPath = `${nextNodeId}.${nextNodeChildKey}`;
  const editedLink = { ...link, content };
  const normalizedLink = normalize(editedLink, NODE_SCHEMA.link);
  const { entities } = normalizedLink;
  // TODO: Change this one to use link.id permanently. Needs further test specially for parts using links
  const destinationId = LOGIC_HELPERS.ifElse(
    upsertLinkId && !overrideDestinationLinkId,
    link.id,
    id,
  );
  const sourcePathId = LOGIC_HELPERS.ifElse(upsertLinkId, link.id, nextNodeId);

  return {
    nodes: compose(
      DATASTORE_UTILS.upsertObject(entities.node),
      DATASTORE_UTILS.upsertArray(`${sourcePath}`, sourcePathId),
      DATASTORE_UTILS.upsertArray(`${destinationPath}`, destinationId),
    ),
    links: DATASTORE_UTILS.upsertObject(entities.link),
    linkIds: DATASTORE_UTILS.upsertArray('', link.id),
  };
};

const deleteNodeAndLinks = (
  _,
  { id, fk, childKey, parentNodeId, nextNodeChildKey },
) => ({
  nodes: compose(
    DATASTORE_UTILS.removeObjectById(id),
    DATASTORE_UTILS.removeItemsArray(`${parentNodeId}.${childKey}`, id),
    DATASTORE_UTILS.removeItemsArray(`${fk}.${nextNodeChildKey}`, id),
  ),
});

const handleNode = (status, id, data) => nodes =>
  dotProp.set(
    nodes,
    `${id}.calculated.transfer`,
    LOGIC_HELPERS.ifElse(status === PENDING, data, {
      status,
    }),
  );

const transferNode = (result, payload) => {
  const { nodeTransfer, notifications } = result[0];
  if (!nodeTransfer) return {};
  return {
    nodes: handleNode(PENDING, payload.id, nodeTransfer.nodeTransferViewModel),
    notifications: DATASTORE_UTILS.upsertObject(notifications),
  };
};

const getTransferNode = (result, payload) => {
  const { nodeTransferViewModel = {} } = result;
  const {
    status,
    notificationToken,
    transferToUserId,
    transferFrom,
  } = nodeTransferViewModel;
  let others = {};
  if (transferToUserId === payload.myUserId) {
    others = {
      transferToMe: DATASTORE_UTILS.upsertArray('', notificationToken),
    };
  } else if (transferFrom === payload.myUserId) {
    others = {
      transferFromMe: DATASTORE_UTILS.upsertArray('', notificationToken),
    };
  }
  return {
    nodes: handleNode(status, payload.id, nodeTransferViewModel),
    nodeTransfers: DATASTORE_UTILS.upsertObject({
      [notificationToken]: nodeTransferViewModel,
    }),
    ...others,
  };
};

export default {
  getNode,
  createNode,
  updateNode,
  deleteNode,
  moveNode,
  copyNode,
  batchDeleteNode,
  insertNode,
  shareNode,
  getTree,
  createPhoto,
  updatePhoto,
  deletePhoto,
  batchMove,
  createNextNode,
  getAttachment,
  createAttachment,
  updateAttachment,
  removeAttachment,
  updateChild,
  getChildren,
  createTemplateSettings,
  initTemplateSettings,
  upsertTemplateSetting,
  upsertTemplateSettings,
  batchDeleteNodeChildren,
  updateLink,
  createLink,
  unlinkOldNode,
  unlink,
  deleteNodeAndLinks,
  transferNode,
  getTransferNode,
  handleNode,
  getNodes,
};
