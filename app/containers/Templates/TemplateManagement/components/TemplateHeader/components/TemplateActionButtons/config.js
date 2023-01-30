import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { COMMENT } from 'containers/Templates/TemplateManagement/components/Comment/config';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_TRAIL_STORE_SELECTORS } from 'datastore/nodeTrailsDataStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import zip from 'lodash/zip';
import { CONFIG as config } from 'resaga';
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';
import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  LOCAL_USER_STORE,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { STARS_SELECTOR } from 'smartComponents/Node/hoc/withStars/config';
import { COGNITO_STORE_SELECTOR } from '../../../../../../../datastore/stormPathStore/selectors.resaga';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from '../../../../../Components/NodeExplorer/selectors';

export const snackbar = { reveal: revealSnackbar };

// Actions
export const UNDER_CONSTRUCTION = 'underConstruction';

export const GET_BREADCRUMB_TRAIL = {
  value: {
    trails: RESAGA_HELPERS.mapToId(
      NODE_TRAIL_STORE_SELECTORS.breadcrumb.trail,
      'templateId',
    ),
    templateParentId: ({ templateId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: templateId }),
  },
};

export const GET_NEEDED_TRAILS = {
  value: {
    rootNodeName: ({ trails = [] }) =>
      NODE_TRAIL_STORE_SELECTORS.trails.content({ id: trails[0] }),
  },
};

export const GET_USER_ID = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
  },
};

export const GET_USER_ORGS = {
  value: {
    userOrgs: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.organisations,
      'userId',
    ),
  },
};

export const GET_ORG_ID = {
  value: {
    rootNodeOrgId: {
      keyPath: ({ userOrgs = [] }) =>
        userOrgs.map(userOrg =>
          ORGANISATION_STORE_SELECTORS.rootNodeId({ id: userOrg }),
        ),
      cacheKey: ({ userOrgs, trails }) =>
        `template.breadcrumbs.${userOrgs ? userOrgs.toString() : null}.${
          trails ? trails.toString() : null
        }.getRootNodeOrg`,
      props: [({ userOrgs }) => userOrgs, ({ trails }) => trails],
      getter: (...rootNodeIds) => {
        const trails = rootNodeIds.pop() || [];
        const userOrgs = rootNodeIds.pop();
        const pairedRootNodeAndOrg = zip(userOrgs, rootNodeIds);
        const filtered = pairedRootNodeAndOrg.filter(
          ([, rootNodeId]) => rootNodeId === trails[0],
        );
        return Array.isArray(filtered[0]) ? filtered[0][0] : 0;
      },
    },
  },
};

export const CONFIG = {
  [config.SUBMIT]: {
    [UNDER_CONSTRUCTION]: () => ({}),
  },
  [config.ON_SUCCESS]: {
    [UNDER_CONSTRUCTION]: [
      () => snackbar.reveal({ text: 'Under Construction' }),
    ],
  },
  value: {
    hashkey: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.hashkey, 'templateId'),
    templateTitle: ({ templateId }) =>
      NODE_STORE_SELECTORS.content({ id: templateId }),
    parentNodeId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.parentNodeId,
      'templateId',
    ),
    localUserStore: [LOCAL_USER_STORE, ''],
    timelineId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedTimelineId,
      'templateId',
    ),
    rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    organisationIds: [ORGANISATION_DATA_STORE, 'organisationIds'],
  },
  setValue: {
    nodeId: [COMMENT, 'nodeId'],
    nodeStore: [COMMENT, 'nodeStore'],
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    participantListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
    interestedListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
    showCopyLinkDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.CONTRIBUTORS_LIST.open,
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    stars: STARS_SELECTOR,
    isOpenFolderTree: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenFolderTree,
    selectedId: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedId,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderTreeMode,
    selectedType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedType,
    selectedName: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedName,
    paxLabel: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'paxLabel'],
    ...SET_VALUE,
  },
};
