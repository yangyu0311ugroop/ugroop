import dotProp from 'dot-prop';
import get from 'lodash/get';
import createCachedSelector from 're-reselect';
import zip from 'lodash/zip';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import {
  NODE_STORE,
  PEOPLE_TAB_OPTIONS,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from '../../appConstants';
import { TAB_OTHER } from '../../utils/modelConstants';
export const CustomDataOrgId = 'customData.organisationId';
export const CREATEDBY = 'createdBy';
export const TRANSFER_TO_USERID = 'calculated.transfer.transferToUserId';
const selectNodeStore = state => state.get(NODE_STORE);

const getPeopleTabOptionSelected = state =>
  state.get(TEMPLATE_MANAGEMENT_VIEWSTORE).get('peopleTabOptionSelected');

const selectAllTabIdsFromTour = (state, props) =>
  dotProp.get(selectNodeStore(state).get('nodes'), `${props.id}.children`);

const selectPhoto = (state, props) =>
  dotProp.get(selectNodeStore(state).get('nodes'), `${props.id}.photos`);

const selectNode = (nodeState, props) =>
  dotProp.get(nodeState.get('nodes'), `${props.id}`);
const selectNodeRef = () => selectNode;

const selectNodeOwnerId = (state, props) =>
  dotProp.get(selectNodeStore(state).get('nodes'), `${props.id}.createdBy`);

const selectNodeOrgId = (state, props) =>
  dotProp.get(
    selectNodeStore(state).get('nodes'),
    `${props.id}.customData.organisationId`,
  );

const selectNodeAttribute = (state, props) =>
  dotProp.get(
    selectNodeStore(state).get('nodes'),
    `${props.id}.${props.attribute}`,
  );

export const makeSelectTimeLineTab = createCachedSelector(
  [selectNodeStore, selectAllTabIdsFromTour, selectNodeRef],
  (nodeStore, tabs, fn) => {
    const allTabs = tabs && tabs.map(t => fn(nodeStore, { id: t }));
    const data = allTabs && allTabs.find(o => o.type === 'tabtimeline');
    if (data) {
      return data.id;
    }
    return null;
  },
)(
  props => `makeSelectTimeLineTab.${props.id}`, // templateId
);

export const makeSelectTourHeaderPhoto = createCachedSelector(
  [selectPhoto],
  result => {
    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  },
)(
  props => `makeSelectTourHeaderPhoto.${props.id}`, // templateId
);

export const makeSelectNodeOwner = createCachedSelector(
  [selectNodeOwnerId],
  result => result,
)((state, props) => `makeSelectNodeOwner.${props.id}`);

export const makeSelectNodeOrgId = createCachedSelector(
  [selectNodeOrgId],
  result => result,
)((state, props) => `makeSelectNodeOrgId.${props.id}`);

export const getNodes = state => state.get(NODE_STORE).get('nodes');

export const getAssignedOrganiser = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.customData.assignedOrganiserId`, null),
)((_, id) => `nodes.getAssignedOrganiser.${id}`);

export const getCreatedBy = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.createdBy`, null),
)((_, id) => `nodes.getCreatedBy.${id}`);

export const getOrganisationId = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.customData.organisationId`, null),
)((_, id) => `nodes.getOrganisationId.${id}`);

export const getNodePhotos = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.photos`, []),
)((_, id) => `nodes.getNodePhotos.${id}`);

export const getNodeContent = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.content`, ''),
)((_, id) => `nodes.getNodeContent.${id}`);

export const getNodeHashkey = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.hashkey`, ''),
)((_, id) => `nodes.getNodeHashkey.${id}`);

export const getNodeGroups = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.groups`, []),
)((_, id) => `nodes.getNodeGroups.${id}`);

export const getNodeParticipants = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.participants`, []),
)((_, id) => `nodes.getNodeParticipants.${id}`);

export const getNodeParticipantsFullName = createCachedSelector(
  getNodes,
  (_, ids) => ids,
  (nodes, ids) =>
    ids.map(
      id =>
        `${get(nodes, `${id}.customData.firstName`, '')} ${get(
          nodes,
          `${id}.customData.lastName`,
          '',
        )}`,
    ),
)((_, ids) => `nodes.getNodeParticipants.${ids ? ids.toString() : 'null'}`);

export const getParticipantsNotTravellingWith = createCachedSelector(
  getNodes,
  (_, ids) => ids,
  (nodes, ids) => {
    const values = ids.map(id => get(nodes, `${id}.groups`, []));
    const valuesIds = zip(values, ids);
    return valuesIds
      .filter(arr => !Array.isArray(arr[0]) || !arr[0].length)
      .map(id => id[1]);
  },
)(
  (_, ids) =>
    `nodes.getParticipantsNotTravellingWith.${ids ? ids.toString() : 'null'}`,
);

export const getAllTravellingGroupByParticipant = createCachedSelector(
  getNodes,
  (_, ids) => ids,
  (nodes, ids) => ids.map(id => get(nodes, `${id}.groups`, [])),
)(
  (_, ids) =>
    `nodes.getParticipantsNotTravellingWith.${ids ? ids.toString() : 'null'}`,
);

export const getNodeChildren = createCachedSelector(
  getNodes,
  (_, id) => id,
  (nodes, id) => get(nodes, `${id}.children`, []),
)((_, id) => `nodes.getNodeChildren.${id}`);

export const getParticipantsIdByStatus = createCachedSelector(
  getNodes,
  getPeopleTabOptionSelected,
  (_, participantIds) => participantIds,
  (nodes, peopleTabOptionSelected, participantIds) => {
    const participantNodes = participantIds.map(
      participantId => nodes[participantId],
    );
    const mapping = {
      [PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS]: null,
      [PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS]: PARTICIPANT_STATUSES.confirmed,
      [PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS]: PARTICIPANT_STATUSES.pending,
      [PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS]:
        PARTICIPANT_STATUSES.declined,
    };
    const requestedStatus = mapping[peopleTabOptionSelected];
    const filteredNodes = participantNodes.reduce((acc, val) => {
      const status = get(val, 'status', '');
      if (status === requestedStatus || requestedStatus === null)
        return [...acc, val];

      return acc;
    }, []);
    const ids = filteredNodes.map(fNode => get(fNode, 'id', null));
    return ids;
  },
)(
  (_, ids) =>
    `nodes.getParticipantsIdByStatus.${ids ? ids.toString() : 'null'}`,
);

export const getParticipantsFirstNameByIds = createCachedSelector(
  getNodes,
  (_, ids) => ids,
  (nodes, ids = []) =>
    ids.map(id => get(nodes, `${id}.customData.firstName`, '')),
)((_, ids) => `getParticipantsFirstNameByIds.${ids.toString()}`);

export const getcustomTabIds = createCachedSelector(
  getNodes,
  (_, ids) => ids,
  (nodes, ids = []) =>
    ids.filter(
      id =>
        get(nodes, `${id}.type`, '') === TAB_OTHER &&
        !get(nodes, `${id}.customData.subtype`, ''),
    ),
)((_, ids) => `getcustomTabIds.${ids.toString()}`);

export const NODE_STORE_RESELECTORS = {
  getAssignedOrganiser,
  getCreatedBy,
  getOrganisationId,
  getNodePhotos,
  getNodeContent,
  getNodeHashkey,
  getNodeGroups,
  getNodeParticipants,
  getNodeParticipantsFullName,
  getParticipantsNotTravellingWith,
  getAllTravellingGroupByParticipant,
  getParticipantsIdByStatus,
  getParticipantsFirstNameByIds,
  selectNodeAttribute,
  getNodeChildren,
  getcustomTabIds,
};

export const getLinks = state => state.get(NODE_STORE).get('links');

export const getLinkPrevNodeId = createCachedSelector(
  getLinks,
  (_, id) => id,
  (links, id) => get(links, `${id}.prevNodeId`, null),
)((_, id) => `links.getLinkPrevNodeId.${id}`);
export const getLinkPrevNodeIds = createCachedSelector(
  getLinks,
  (_, ids) => ids,
  (links, ids) => ids.map(id => get(links, `${id}.prevNodeId`, null)),
)((_, ids) => `links.getLinkPrevNodeIds.${ids ? ids.toString() : 'null'}`);

export const getLinkNextNodeId = createCachedSelector(
  getLinks,
  (_, id) => id,
  (links, id) => get(links, `${id}.nextNodeId`, null),
)((_, id) => `links.getLinkNextNodeId.${id}`);
export const getLinkNextNodeIds = createCachedSelector(
  getLinks,
  (_, ids) => ids,
  (links, ids) => ids.map(id => get(links, `${id}.nextNodeId`, null)),
)((_, ids) => `links.getLinkNextNodeIds.${ids ? ids.toString() : 'null'}`);

export const LINK_STORE_RESELECTORS = {
  getLinkPrevNodeId,
  getLinkNextNodeId,
  getLinkPrevNodeIds,
  getLinkNextNodeIds,
};

export const getNodesSettings = state =>
  state.get(NODE_STORE).get('nodeSettings');

export const getNodeSettingId = createCachedSelector(
  getNodesSettings,
  (_, id, key) => ({ id, key }),
  (nodeSetting, { id, key }) => get(nodeSetting, `${id}.${key}.id`, null),
)((_, { id, key }) => `getNodeSettingId.${id}.${key}`);

export const getNodeSettingValue = createCachedSelector(
  getNodesSettings,
  (_, { id, key }) => ({ id, key }),
  (nodeSetting, { id, key }) => get(nodeSetting, `${id}.${key}.value`, null),
)((_, { id, key }) => `getNodeSettingValue.${id}.${key}`);

export const SETTINGS_STORE_RESELECTORS = {
  getNodeSettingValue,
  getNodeSettingId,
};
