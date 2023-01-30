import { COPY, MOVE, NODE_API } from 'apis/constants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';
import takeRight from 'lodash/takeRight';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_ORGANISATION_ID = {
  value: {
    id: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    myToursId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG_USER_ORGANISATIONS = {
  value: {
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

export const CONFIG = {
  value: {
    isOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isOpenFolderTree,
    orgToursId: ORGANISATION_STORE_SELECTORS.rootNodeId,
    rootNodeId: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderTreeIds,
    // memberIds: getRoleMembersIds,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderTreeMode,
    currentOrgRootNodeId: {
      keyPath: ({ id = -1 }) => ORGANISATION_STORE_SELECTORS.rootNodeId({ id }),
      getter: (orgNodeId, { rootParentNodeId }) =>
        orgNodeId || rootParentNodeId,
    },
  },
};

export const KNOWNAS_CONFIG = {
  value: {
    orgNodeIds: {
      keyPath: ({ userOrgs }) =>
        Array.isArray(userOrgs)
          ? userOrgs.map(userOrg =>
              ORGANISATION_STORE_SELECTORS.rootNodeId({ id: userOrg }),
            )
          : [],
      props: () => null,
      getter: (...props) => props.filter(prop => prop),
    },
    knownAsValues: {
      keyPath: ({ memberIds }) => {
        if (Array.isArray(memberIds)) {
          return memberIds.map(member =>
            ORGANISATION_STORE_SELECTORS.knownAs({ id: member }),
          );
        }
        return [];
      },
      cacheKey: ({ memberIds }) =>
        `templateManagementPage.moveTour.${
          memberIds ? memberIds.toString() : null
        }.knownAsValues`,
      props: ({ memberIds }) => memberIds || [],
      getter: (...args) => {
        const filtered = args.filter(arg => arg);
        if (filtered.length === 0) return [];
        const sortBasis = dropRight(filtered, 1);
        const [memberIds] = takeRight(filtered, 1);
        const unsorted = zip(memberIds, sortBasis);

        if (memberIds.length === 0) return [];

        return unsorted;
      },
    },
  },
  setValue: {
    isOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenFolderTree,
    ...SET_VALUE,
  },
  isLoading: {
    isCopyLoading: [NODE_API, COPY],
    isMoveLoading: [NODE_API, MOVE],
  },
};
