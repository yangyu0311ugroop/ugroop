import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import {
  ORGANISATION_STORE_SELECTORS,
  getMemberRootNodeId,
} from 'datastore/orgStore/selectors';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from '../NodeExplorer/selectors';

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    parentNodeId: ({ folderId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: folderId }),
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
  },
};

export const CONFIG_USER_ORGANISATIONS = {
  value: {
    sortedIds: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.sortedIds, 'folderId'),
      'sortedIds',
    ),
    userOrgs: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.organisations,
      'userId',
    ),
  },
};

export const CONFIG_ORG_MEMBERS = {
  value: {
    memberIds: {
      keyPath: ({ userOrgs }) =>
        Array.isArray(userOrgs)
          ? userOrgs.map(userOrg =>
              ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: userOrg }),
            )
          : [],
      cacheKey: ({ userOrgs }) =>
        `templateManagementPage.moveTour.${
          userOrgs ? userOrgs.toString() : null
        }.roleMemberValue`,
      props: () => null,
      getter: (...args) => {
        const values = args.filter(arg => arg);

        return values.reduce((acc, value) => [...acc, ...value], []);
      },
    },
  },
};

export const ROOT_NODE_IDS_CONFIG = {
  value: {
    rootNodeIds: {
      keyPath: ({ memberIds }) =>
        Array.isArray(memberIds)
          ? memberIds.map(memberId => getMemberRootNodeId({ id: memberId }))
          : [],
      cacheKey: ({ memberIds }) =>
        `organisationTours.moveItems.${
          memberIds ? memberIds.toString() : null
        }.rootNodeId`,
      props: () => null,
      getter: (...args) => {
        const values = args.filter(arg => arg !== null);
        return values;
      },
    },
  },

  setValue: {},
};
