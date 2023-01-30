import {
  GET_PUB_TEMPLATE_TIMES,
  GET_PUB_TEMPLATE_TREE,
  GET_PUB_TEMPLATE_EVENTS,
  PUB_CREATE_INTEREST,
  PUB_API,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

/**
 * @param obj
 *  hashkey: template hashkey
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const fetchEvents = (obj, props) => {
  const { hashkey, onSuccess, onError } = obj;
  props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_EVENTS, {
    payload: {
      hashkey,
    },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  hashkey: template hashkey
 *  idUpsertMode: id array upsert method (append by default)
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const getTreeAndTimes = (obj, props) => {
  const { hashkey, idUpsertMode, onSuccess, onError } = obj;
  // TODO: Combine in one api call?
  props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_TREE, {
    payload: { hashkey, idUpsertMode },
    onSuccess: ({ node, eventNodes }) => {
      const ids = [
        ...DATASTORE_UTILS.getObjectIds(node),
        ...DATASTORE_UTILS.getObjectIds(eventNodes),
      ];
      props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_TIMES, {
        payload: { hashkey, ids },
        onSuccess,
        onError,
      });
    },
    onError,
  });
};

/**
 * @param obj
 *  hashkey: template hashkey
 *  data: node + paticipant
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const createInterest = (obj, props) => {
  const { hashkey, data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(PUB_API, PUB_CREATE_INTEREST, {
    payload: {
      hashkey,
      data,
    },
    onSuccess,
    onError,
  });
};

export const CONFIG = {
  value: {
    hashkeyDescription: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.hashkeyDescription,
      'templateId',
    ),
    orgId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'templateId',
    ),
  },
};

export const PUB_API_HELPERS = {
  fetchEvents,
  getTreeAndTimes,
  createInterest,
};
