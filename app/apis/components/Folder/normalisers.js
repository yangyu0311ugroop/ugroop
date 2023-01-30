import { FOLDER_FETCH_TYPES } from 'apis/components/Folder/constants';
import { convertChecklists } from 'apis/components/Template/config';
import { normalize } from 'normalizr';
import { compose } from 'redux';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_NORMALISERS, NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { NODE_TRAIL_NORMALISERS } from 'datastore/nodeTrailsDataStore/schema';
import dotProp from 'dot-prop-immutable';
import union from 'lodash/union';
import difference from 'lodash/difference';
import { get } from 'lodash';
import { CHECKLIST, FOLDER } from 'utils/modelConstants';

const getChecklists = result => {
  let nodes;

  if (result.type === FOLDER) {
    nodes = dotProp.set(result, 'checklists', checklists =>
      checklists.map(checklist =>
        dotProp.set(checklist, 'checklists', convertChecklists),
      ),
    );
  } else if (result.type === CHECKLIST) {
    nodes = dotProp.set(result, 'checklists', convertChecklists);
  } else {
    nodes = result;
  }

  const { node } = NODE_NORMALISERS.normalise(nodes);
  if (result.returnNode) {
    return node;
  }
  return { nodes: DATASTORE_UTILS.upsertObject(node) };
};

const mergeFolder = (id, folder) => (store = {}) => {
  if (Object.keys(store).length > 0) {
    const oldFolderChildren = dotProp.get(
      store,
      `${id}.calculated.sortedIds`,
      [],
    );
    const newFolderChildren = dotProp.get(
      folder,
      `${id}.calculated.sortedIds`,
      [],
    );
    const mergedFolderChildren = union(oldFolderChildren, newFolderChildren);
    const mergedFolder = dotProp.set(
      folder,
      `${id}.calculated.sortedIds`,
      mergedFolderChildren,
    );
    return dotProp.merge(store, `${id}`, mergedFolder[id]);
  }

  return DATASTORE_UTILS.upsertObject(folder)(store);
};

const fetchFolderChildren = (nodeList, payload = {}) => {
  const normalizedData = NODE_NORMALISERS.folderNormalise(nodeList);
  const count = get(nodeList, 'calculated.sortedIds.length');

  const insertFolder =
    payload.fetchType === FOLDER_FETCH_TYPES.PAGINATION
      ? mergeFolder(normalizedData.id, normalizedData.folder)
      : DATASTORE_UTILS.upsertObject(normalizedData.folder);

  return {
    nodes: compose(
      DATASTORE_UTILS.upsertObject(normalizedData.nodes),
      insertFolder,
    ),
    files: DATASTORE_UTILS.upsertObject(normalizedData.files),
    people: DATASTORE_UTILS.upsertObject(normalizedData.people),
    nodeId: normalizedData.id,
    count,
  };
};

const fetchFolderParent = (nodes, payload) => {
  const restructuredObj = { id: parseInt(payload, 10), trail: nodes };
  const normalizedData = NODE_TRAIL_NORMALISERS.breadcrumbNormaliser(
    restructuredObj,
  );

  return {
    trail: normalizedData.trail,
    breadcrumb: normalizedData.breadcrumb,
    nodes: DATASTORE_UTILS.upsertObject(normalizedData.nodes),
  };
};

export const getUnexistingNodesInStore = (normalizedResult, store) => {
  const addedNodes = Object.keys(normalizedResult.entities.node);
  const currNodes = Object.keys(store);
  const differenceBetweenCurrAndAdded = difference(addedNodes, currNodes);
  const toBeAddedNodes = differenceBetweenCurrAndAdded.map(
    id => normalizedResult.entities.node[id],
  );

  return normalize(toBeAddedNodes, NODE_SCHEMA.node);
};

const batchFetchFolderTree = result => {
  const normalizedResult = normalize(result, NODE_SCHEMA.node);

  return {
    nodes: nodes => {
      const normalizedFilteredResult = getUnexistingNodesInStore(
        normalizedResult,
        nodes,
      );
      return DATASTORE_UTILS.upsertObject(
        normalizedFilteredResult.entities.node,
      )(nodes);
    },
    raw: result,
  };
};

const handleBatchClone = (result = []) => {
  const finalValue = result.map(val =>
    getChecklists({ ...val.customVal, returnNode: true }),
  );
  const cloneIds = result.map(val => val.cloneId);
  const node = finalValue.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  return { nodes: DATASTORE_UTILS.upsertObject(node), result, cloneIds };
};

export default {
  getChecklists,
  fetchFolderChildren,
  fetchFolderParent,
  mergeFolder,
  batchFetchFolderTree,
  handleBatchClone,
};
