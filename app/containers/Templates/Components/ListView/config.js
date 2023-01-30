import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { SHARED_TEMPLATES_DATASTORE } from 'appConstants';
import {
  getMemberRootNodeId,
  ORGANISATION_STORE_SELECTORS,
} from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG_USER_ORGANISATIONS = {
  value: {
    sortedIds: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.sortedIds, 'folderId'),
      'sortedIds',
    ),
    isSharedTours: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
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
