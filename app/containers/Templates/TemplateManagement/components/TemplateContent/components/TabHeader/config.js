import { NODE_STORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import dotProp from 'dot-prop-immutable';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';

export const USER_NODES_CONFIG = {
  value: {
    userNodeIds: INVITATION_STORE_SELECTORS.userNodeIds,
    accountId: COGNITO_STORE_SELECTORS.myId,
    tabIds: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.children, 'templateId'),
      'tabIds',
    ),
    title: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (templates, props) =>
        dotProp.get(templates, `${props.templateId}.content`),
    },
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    tabType: ({ tabId }) => NODE_STORE_SELECTORS.type({ id: tabId }),
  },
};

export const ROLES_CONFIG = {
  value: {
    roleRelatedIds: {
      keyPath: ({ userNodeIds = [] }) =>
        userNodeIds.map(id => INVITATION_STORE_SELECTORS.userNodeRole({ id })),
      cacheKey: ({ userNodeIds, cacheKey, accountId }) =>
        `tabHeader.userNodeRoleRelatedIds.${accountId}.${cacheKey}.${
          userNodeIds ? userNodeIds.toString() : null
        }`,
      props: ({ userNodeIds }) => userNodeIds,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [userNodeIds] = takeRight(args, 1);
        const withRelatedIds = userNodeIds
          ? userNodeIds.map((id, index) =>
              id instanceof Array
                ? [...id, relatedIds[index]]
                : [id, relatedIds[index]],
            )
          : [];

        return withRelatedIds;
      },
    },
  },
};

export const USER_ID_CONFIG = {
  value: {
    userIdRelatedIds: {
      keyPath: ({ roleRelatedIds = [] }) =>
        roleRelatedIds.map(id =>
          INVITATION_STORE_SELECTORS.userNodeUserId({ id: id[0] }),
        ),
      cacheKey: ({ roleRelatedIds, cacheKey, accountId }) =>
        `tabHeader.userNodeUserIdRelatedIds.${accountId}.${cacheKey}.${
          roleRelatedIds ? roleRelatedIds.toString() : null
        }`,
      props: ({ roleRelatedIds }) => roleRelatedIds,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [roleRelatedIds] = takeRight(args, 1);
        const withRelatedIds = roleRelatedIds
          ? roleRelatedIds.map((id, index) =>
              id instanceof Array
                ? [...id, relatedIds[index]]
                : [id, relatedIds[index]],
            )
          : [];

        return withRelatedIds;
      },
    },
  },
  setValue: {
    templates: [NODE_STORE, 'nodes'],
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};
