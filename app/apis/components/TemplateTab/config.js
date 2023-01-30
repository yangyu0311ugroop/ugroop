import {
  TEMPLATE_TAB_API,
  GET_TEMPLATE_TAB_DETAIL,
  BATCH_GET_TEMPLATE_TAB_DETAIL,
  FILE_STORE,
} from 'apis/constants';
import {
  DISCUSSION_DATASTORE,
  NODE_STORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { get } from 'lodash';
import { compose } from 'redux';
import { normalize } from 'normalizr';
import { TEMPLATE_SELECTOR } from 'datastore/templateManagementStore/selectors';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import tabHelpers from 'datastore/templateManagementStore/helpers/tabs';
import { requests } from 'utils/request';

import { TEMPLATE_TAB_UTILS } from './utils';

export const CONFIG = {
  name: TEMPLATE_TAB_API,
  requests: {
    [GET_TEMPLATE_TAB_DETAIL]: ({ tab }) => {
      const { id, type } = tab;
      return requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_TAB_API}/${id}/${type}`,
      );
    },
    [BATCH_GET_TEMPLATE_TAB_DETAIL]: ({ tabs }) =>
      Promise.all(
        tabs.map(async tab =>
          requests.fetchWithAuthorisation(
            'get',
            `/${TEMPLATE_TAB_API}/${tab.id}/${tab.type}`,
          ),
        ),
      ),
  },
  processResult: {
    [GET_TEMPLATE_TAB_DETAIL]: (result, payload) => {
      let templateId = payload && payload.templateId;
      const { type, children, id, parentNodeId } = result;
      const tabChildrenData = tabHelpers.convertChildrenToArray(type, children);
      const normalised = normalize(tabChildrenData, NODE_SCHEMA.node);
      const entities = normalised.entities;
      const ids = normalised.result;

      if (!templateId) {
        templateId = parentNodeId;
      }

      return {
        dayIds: ids,
        nodes: compose(
          DATASTORE_UTILS.upsertObject(entities.node),
          DATASTORE_UTILS.upsertObject(entities.eventNodes),
          DATASTORE_UTILS.upsertArray(`${id}.children`, ids),
        ),
        calculatedNodes: DATASTORE_UTILS.upsertArray(
          `${templateId}.calculated.events`,
          DATASTORE_UTILS.getObjectIds(entities.eventNodes),
        ),
        files: DATASTORE_UTILS.upsertObject(
          Object.assign(get(entities, 'photo', {})),
        ),
        attachments: DATASTORE_UTILS.upsertObject(
          Object.assign(get(entities, 'attachment', {})),
        ),
        ids,
        result,
        feedbacks: DATASTORE_UTILS.upsertObject(entities.feedbacks),
        comments: DATASTORE_UTILS.upsertObject(entities.comments),
      };
    },
    [BATCH_GET_TEMPLATE_TAB_DETAIL]: result =>
      TEMPLATE_TAB_UTILS.addMultipleNode(result),
  },
  value: {
    children: TEMPLATE_SELECTOR.children,
  },
  setValue: {
    nodes: [NODE_STORE, 'nodes'],
    files: [FILE_STORE, 'files'],
    link: [NODE_STORE, 'links'],
    attachments: [ATTACHMENT_DATASTORE, 'attachments'],
    feedbacks: [DISCUSSION_DATASTORE, 'feedbacks'],
    comments: [DISCUSSION_DATASTORE, 'comments'],
  },
};
