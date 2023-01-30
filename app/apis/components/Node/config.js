import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import FolderNormaliser from 'apis/components/Folder/normalisers';
import {
  BATCH_DELETE,
  BATCH_MOVE,
  COPY,
  GET_NODE,
  CREATE_CHILD,
  CREATE_CLONE,
  CREATE_NEXT_NODE,
  CREATE_NODE,
  REMOVE_NODE,
  DELETE_CHILDREN,
  GET_PHOTOS,
  GET_TIMES,
  MOVE,
  MOVE_AFTER,
  MOVE_BEFORE,
  NODE_API,
  REMOVE_PHOTO,
  SHARE_NODE,
  UPDATE_NODE,
  GET_TREE,
  GET_CHILDREN,
  UPDATE_CHILD,
  INSERT_BEFORE,
  INSERT_AFTER,
  CREATE_PHOTO,
  UPDATE_PHOTO,
  CREATE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  REMOVE_ATTACHMENT,
  FILE_STORE,
  BATCH_DELETE_CHILDREN,
  INSERT_TEMP_AFTER,
  INSERT_TEMP_BEFORE,
  DELETE_TEMP_NODE,
  MOVE_NODE_AFTER,
  MOVE_NODE_BEFORE,
  GET_ATTACHMENT,
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
  CLONE_PARTICIPANT,
  MOVE_NODE_CHILD,
} from 'apis/constants';
import {
  ABILITY_DATA_STORE,
  DO_NOTHING,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  ATTACHMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { first } from 'lodash';
import { stringifyParam } from 'utils/helpers/url';
import { requests } from 'utils/request';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import NodeNormalisers from './normalisers';

export const TEMPLATE_ID_CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  name: NODE_API,

  requests: {
    [GET_NODE]: ({ id, type }) =>
      requests.fetchWithAuthorisation('get', `/${NODE_API}/${id}/${type}/`),
    [GET_CHILDREN]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${NODE_API}/${id}/children/`),
    [UPDATE_NODE]: NODE_API_HELPERS.batchUpdateNode,
    [CREATE_CHILD]: ({ nodeId, node }) => {
      if (Array.isArray(node) && node.length) {
        return Promise.all(
          node.map(one =>
            requests.fetchWithAuthorisation(
              'post',
              `/${NODE_API}/${nodeId}/children`,
              one,
            ),
          ),
        );
      }

      return requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${nodeId}/children`,
        node,
      );
    },
    [CREATE_NEXT_NODE]: ({ nodeId, node }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${nodeId}/nextNodes`,
        node,
      ),
    [DELETE_CHILDREN]: ({ nodeId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${NODE_API}/${nodeId}/children`,
      ),

    [BATCH_MOVE]: ({ id, operations }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/batchMove`,
        operations,
      ),
    [MOVE_BEFORE]: ({ id, toBeMovedId }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/moveBefore/${toBeMovedId}`,
      ),
    [MOVE_AFTER]: ({ id, toBeMovedId, removeParentNode }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/moveAfter/${toBeMovedId}?remove_parent_node=${removeParentNode}`,
      ),
    [UPDATE_CHILD]: ({ id, fk, payload }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/children/${fk}`,
        payload,
      ),
    [UPDATE_PHOTO]: ({ id, fk, ...payload }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/photos/${fk}`,
        payload,
      ),
    [UPDATE_ATTACHMENT]: ({ id, ...payload }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${NODE_API}/${id}/attachment`,
        payload,
      ),
    [SHARE_NODE]: ({ id, payload }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/share`,
        payload,
      ),
    [CREATE_NODE]: ({ node }) =>
      requests.fetchWithAuthorisation('post', `/${NODE_API}`, node),
    [REMOVE_NODE]: ({ nodeId, newParentId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${NODE_API}/${nodeId}?${stringifyParam({ newParentId })}`,
      ),
    [BATCH_DELETE]: ({ items }) =>
      Promise.all(
        items.map(async item =>
          requests.fetchWithAuthorisation(
            'delete',
            `/${NODE_API}/${typeof item === 'object' ? item.id : item}`,
          ),
        ),
      ),
    [BATCH_DELETE_CHILDREN]: ({ items }) =>
      Promise.all(
        items.map(async id =>
          requests.fetchWithAuthorisation(
            'delete',
            `/${NODE_API}/${id}/children`,
          ),
        ),
      ),
    [REMOVE_PHOTO]: ({ id, fk }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${NODE_API}/${id}/photos/${fk}`,
      ),
    [REMOVE_ATTACHMENT]: ({ id }) =>
      requests.fetchWithAuthorisation('delete', `/nodes/${id}/attachment`),
    [MOVE]: ({ id, body }) =>
      requests.fetchWithAuthorisation('patch', `/${NODE_API}/${id}/move`, body),
    [COPY]: ({ id, body }) =>
      requests.fetchWithAuthorisation('post', `/${NODE_API}/${id}/copy`, body),
    [CREATE_CLONE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/clones`,
        data,
      ),
    [BATCH_CREATE_CLONE]: ({ node, data }) => {
      if (Array.isArray(node) && node.length) {
        return Promise.all(
          node.map(id =>
            requests.fetchWithAuthorisation(
              'post',
              `/${NODE_API}/${id}/clones`,
              data,
            ),
          ),
        );
      }
      return null;
    },
    [INSERT_BEFORE]: ({ id, node }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/insertBefore`,
        node,
      ),
    [INSERT_AFTER]: ({ id, node }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/insertAfter`,
        node,
      ),
    [INSERT_TEMP_AFTER]: ({ id, node, parentId, insertLocation }) =>
      Object.assign(node, {
        id,
        parentId,
        lastNodeId: id,
        insertLocation,
      }),
    [INSERT_TEMP_BEFORE]: ({ id, node, parentId, insertLocation }) =>
      Object.assign(node, {
        id,
        parentId,
        lastNodeId: id,
        insertLocation,
      }),

    [DELETE_TEMP_NODE]: () => DO_NOTHING,

    [CREATE_PHOTO]: ({ id, ...payload }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/photos`,
        payload,
      ),
    [CREATE_ATTACHMENT]: ({ id, ...payload }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/attachment`,
        payload,
      ),
    [GET_TIMES]: ({ ids }) => {
      if (Array.isArray(ids) && ids.length) {
        return requests.fetchWithAuthorisation(
          'get',
          `/${NODE_API}/${first(ids)}/times?ids=${JSON.stringify(ids)}`,
        );
      }

      return undefined;
    },
    [GET_TREE]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${NODE_API}/${id}/tree`),
    [GET_PHOTOS]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/Nodes/${id}/photos`),
    [GET_ATTACHMENT]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/Nodes/${id}/attachment`),

    [MOVE_NODE_BEFORE]: ({ id, toBeMovedId }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/nodes/${id}/moveBefore/${toBeMovedId}`,
      ),
    [MOVE_NODE_AFTER]: ({ id, toBeMovedId }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/nodes/${id}/moveAfter/${toBeMovedId}`,
      ),
    [DELETE_LINK]: ({ id, fk }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${NODE_API}/${id}/links/${fk}`,
      ),
    [CREATE_LINK]: ({ id, data }) =>
      requests.fetchWithAuthorisation('post', `/${NODE_API}/${id}/links`, data),
    [UPDATE_LINK]: ({ id, fk, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${NODE_API}/${id}/links/${fk}`,
        data,
      ),
    // TODO: Try replacing the DELETE `/${NODE_API}/${id} with this and see what would happen
    [REMOVE_NODE_AND_LINKS]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${NODE_API}/${id}/nodeAndLinks`,
      ),
    [TRANSFER_NODE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/transfer`,
        data,
      ),
    [GET_TRANSFER_NODE]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${NODE_API}/${id}/transfer`),
    [PATCH_TRANSFER_NODE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${NODE_API}/${id}/transfer`,
        data,
      ),
    [GET_NODES_VIA_FILTER]: ({ filter }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${NODE_API}/getFilterNodes/${filter}`,
      ),
    [FIND_PARTICIPANT]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${NODE_API}/${id}/findParticipant`,
      ),
    [CLONE_PARTICIPANT]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_API}/${id}/cloneParticipant`,
        data,
      ),
    [MOVE_NODE_CHILD]: ({ parentNodeId, toBeMovedId }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/nodes/${parentNodeId}/moveChild/${toBeMovedId}`,
      ),
  },

  processResult: {
    [GET_NODE]: NodeNormalisers.getNode,
    [CREATE_NODE]: NodeNormalisers.createNode,
    [INSERT_BEFORE]: NodeNormalisers.insertNode,
    [INSERT_AFTER]: NodeNormalisers.insertNode,
    [INSERT_TEMP_BEFORE]: NodeNormalisers.insertNode,
    [INSERT_TEMP_AFTER]: NodeNormalisers.insertNode,
    [DELETE_TEMP_NODE]: NodeNormalisers.deleteNode,
    [CREATE_CHILD]: NodeNormalisers.createNode,
    [MOVE]: NodeNormalisers.moveNode,
    [COPY]: NodeNormalisers.copyNode,
    [SHARE_NODE]: NodeNormalisers.shareNode,
    [UPDATE_NODE]: NodeNormalisers.updateNode,
    [REMOVE_NODE]: NodeNormalisers.deleteNode,
    [DELETE_CHILDREN]: NodeNormalisers.deleteNode,
    [BATCH_DELETE]: NodeNormalisers.batchDeleteNode,
    [BATCH_DELETE_CHILDREN]: NodeNormalisers.batchDeleteNodeChildren,
    [CREATE_PHOTO]: NodeNormalisers.createPhoto,
    [UPDATE_PHOTO]: NodeNormalisers.updatePhoto,
    [REMOVE_PHOTO]: NodeNormalisers.deletePhoto,
    [BATCH_MOVE]: NodeNormalisers.batchMove,
    [CREATE_NEXT_NODE]: NodeNormalisers.createNextNode,
    [GET_ATTACHMENT]: NodeNormalisers.getAttachment,
    [CREATE_ATTACHMENT]: NodeNormalisers.createAttachment,
    [UPDATE_ATTACHMENT]: NodeNormalisers.updateAttachment,
    [REMOVE_ATTACHMENT]: NodeNormalisers.removeAttachment,
    [GET_TREE]: NodeNormalisers.getTree,
    [UPDATE_CHILD]: NodeNormalisers.updateChild,
    [GET_CHILDREN]: NodeNormalisers.getChildren,
    [CREATE_LINK]: NodeNormalisers.createLink,
    [DELETE_LINK]: NodeNormalisers.unlink,
    [UPDATE_LINK]: NodeNormalisers.updateLink,
    [REMOVE_NODE_AND_LINKS]: NodeNormalisers.deleteNodeAndLinks,
    [TRANSFER_NODE]: NodeNormalisers.transferNode,
    [GET_TRANSFER_NODE]: NodeNormalisers.getTransferNode,
    [PATCH_TRANSFER_NODE]: NodeNormalisers.getTransferNode,
    [BATCH_CREATE_CLONE]: FolderNormaliser.handleBatchClone,
    [GET_NODES_VIA_FILTER]: NodeNormalisers.getNodes,
  },

  value: {
    tourOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'tour',
      'tour_owner',
    ],
  },

  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
    reaction: NODE_STORE_SELECTORS.nodes,
    user: NODE_STORE_SELECTORS.nodes,
    links: NODE_STORE_SELECTORS.links,
    linkIds: NODE_STORE_SELECTORS.linkIds,
    attachments: [ATTACHMENT_DATASTORE, 'attachments'],
    shares: INVITATION_STORE_SELECTORS.shares,
    shareIds: INVITATION_STORE_SELECTORS.shareIds,
    shareSubNodes: INVITATION_STORE_SELECTORS.shareSubNodes,
    shareSubNodeIds: INVITATION_STORE_SELECTORS.shareSubNodeIds,
    notifications: INVITATION_STORE_SELECTORS.notifications,
    tours: [ABILITY_DATA_STORE, 'tours'],
    files: [FILE_STORE, 'files'],
    editingCheckItem: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editingCheckItem'],
    nodeTransfers: INVITATION_STORE_SELECTORS.nodeTransfers,
    transferToMe: INVITATION_STORE_SELECTORS.transferToMe,
    transferFromMe: INVITATION_STORE_SELECTORS.transferFromMe,
    organisationTours: [ORGANISATION_DATA_STORE, 'organisationTours'],
    ...SET_VALUE,
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
