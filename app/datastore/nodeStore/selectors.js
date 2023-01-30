import _ from 'lodash';
import {
  CLOSED,
  NODE_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  EMPTY_RTE,
} from 'appConstants';
import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import {
  DIETARY_PATHS,
  MEDICAL_PATHS,
} from 'datastore/personDataStore/constants';
import { CHECKLIST, RATINGS, REACTIONS, SEATS } from 'utils/modelConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';
const EMPTY_ARRAY = [];

// nodes

// define view store selectors
const activityIds = ({ id }) => [NODE_STORE, 'nodes', id, 'activities'];
const parentActivityIds = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'activities',
];
const activities = [NODE_STORE, 'activities'];

const sortBy = ({
  parentNodeId,
  viewStore = TEMPLATE_MANAGEMENT_VIEWSTORE,
}) => [viewStore, 'checklists', parentNodeId, 'sortBy'];
const order = ({ parentNodeId, viewStore = TEMPLATE_MANAGEMENT_VIEWSTORE }) => [
  viewStore,
  'checklists',
  parentNodeId,
  'order',
];
export const SORT_BY_SELECTORS = {
  sortBy,
  order,
};

const editable = () => [TEMPLATE_MANAGEMENT_VIEWSTORE, 'updatingTourInfo'];

const minimalView = [NODE_STORE, 'dashboard', 'minimalView'];
const showAllOrganisations = [NODE_STORE, 'dashboard', 'showAllOrganisations'];

export const NODE_VIEW_STORE_SELECTORS = {
  editable,
  minimalView,
  showAllOrganisations,
};

// define data store selectors
const nodes = [NODE_STORE, 'nodes'];
const calculatedNodes = [NODE_STORE, 'calculatedNodes'];
const node = ({ id }) => [NODE_STORE, 'nodes', id];
const nodeProp = ({ id, path }) => [
  NODE_STORE,
  'nodes',
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const nodeSettings = [NODE_STORE, 'nodeSettings'];

const checklistsStatus = ({ type, checklists, statuses }) => {
  if (type && type === CHECKLIST) {
    if (!checklists || !Array.isArray(checklists[0])) {
      return undefined;
    }
    return checklists[0].map(id => NODE_STORE_SELECTORS.status({ id }));
  }

  if (Array.isArray(checklists) && Array.isArray(statuses)) {
    return checklists.reduce((accumulate, ids, index) => {
      if (statuses[index] === CLOSED || !Array.isArray(ids)) {
        return accumulate;
      }

      return accumulate.concat(
        ids.map(id => NODE_STORE_SELECTORS.status({ id })),
      );
    }, EMPTY_ARRAY);
  }

  return undefined;
};

const content = ({ id }) => [NODE_STORE, 'nodes', id, 'content'];
const vicinity = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'vicinity',
];
const heading = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'heading'];
const subheading = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'subheading',
];

const firstName = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'firstName',
];
const lastName = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'lastName',
];

const customData = ({ id }) => [NODE_STORE, 'nodes', id, 'customData'];
const duration = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'duration',
];
const subtitle = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'subtitle',
];
const hashkey = ({ id }) => [NODE_STORE, 'nodes', id, 'hashkey'];
const hashkeyDescription = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'haskeyDescription',
];
const disableRYI = ({ id }) => [NODE_STORE, 'nodes', id, 'disableRYI'];
const timeZoneId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'timeZoneId',
];
const parentContent = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'content',
];
const children = ({ id }) => [NODE_STORE, 'nodes', id, 'children'];
const childrenCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'children',
  'length',
];
const risks = ({ id }) => [NODE_STORE, 'nodes', id, 'risks'];
const sharedWith = ({ id }) => [NODE_STORE, 'nodes', id, 'sharedWith'];
const editing = ({ id }) => [NODE_STORE, 'nodes', id, 'calculated', 'editing'];
const child = index => ({ id }) => [NODE_STORE, 'nodes', id, 'children', index];
const personal = ({ id }) => [NODE_STORE, 'nodes', id, 'personal'];
const parentChildren = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'children',
];
const parentType = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'type',
];
const description = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'description',
];
const likelihood = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'likelihood',
];

const rooms = ({ id }) => [NODE_STORE, 'nodes', id, 'rooms'];
const impact = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'impact'];
const control = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'control'];
const lastNodeId = ({ id }) => [NODE_STORE, 'nodes', id, 'lastNodeId'];
const parentId = ({ id }) => [NODE_STORE, 'nodes', id, 'parentId'];
const insertLocation = ({ id }) => [NODE_STORE, 'nodes', id, 'insertLocation'];
const shortDescription = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'shortDescription',
];
const notes = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'notes'];
const status = ({ id }) => [NODE_STORE, 'nodes', id, 'status'];
const seats = ({ id }) => [NODE_STORE, 'nodes', id, SEATS];
const ratings = ({ id }) => [NODE_STORE, 'nodes', id, RATINGS];
const reactions = ({ id }) => [NODE_STORE, 'nodes', id, REACTIONS];
const rating = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'rating'];
const createdAt = ({ id }) => [NODE_STORE, 'nodes', id, 'createdAt'];
const createdBy = ({ id }) => [NODE_STORE, 'nodes', id, 'createdBy'];
const printMode = ({ id }) => [NODE_STORE, 'nodes', id, 'printMode'];
const completedAt = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'completedAt',
];
const completedBy = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'completedBy',
];
const tourRoles = ({ id }) => [NODE_STORE, 'nodes', id, 'tourRoles'];
const dueDate = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'dueDate'];
const displayDate = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'displayDate',
];
const comments = ({ id }) => [NODE_STORE, 'nodes', id, 'feedbacks'];
const feedbacks = ({ id }) => [NODE_STORE, 'nodes', id, 'feedbacks'];
const commentCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'feedbacks',
  'length',
];
const location = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'location',
];
const url = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'url'];
const email = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'email'];
const icon = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'icon'];
const placeId = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'placeId'];
const origin = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'origin'];
const destination = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'destination',
];
const travelMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'travelMode',
];
const visible = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'visible'];
const routeContent = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'routeContent',
];

const photoId = ({ id }) => [NODE_STORE, 'nodes', id, 'photos', 0];
const photos = ({ id }) => [NODE_STORE, 'nodes', id, 'photos'];
const attachmentId = ({ id }) => [NODE_STORE, 'nodes', id, 'attachment'];
const exist = ({ id }) => [NODE_STORE, 'nodes', id, 'id'];
const isEditable = ({ id }) => [NODE_STORE, 'nodes', id, 'isEditable'];
const sortedIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'sortedIds',
];

const checklists = ({ id }) => [NODE_STORE, 'nodes', id, 'checklists'];
const routes = ({ id }) => [NODE_STORE, 'nodes', id, 'routes'];
const checklistCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'checklists',
  'length',
];
const nextNodes = ({ id }) => [NODE_STORE, 'nodes', id, 'nextNodes'];
const firstNextNodeId = ({ id }) => [NODE_STORE, 'nodes', id, 'nextNodes', 0];
const firstChildrenId = ({ id }) => [NODE_STORE, 'nodes', id, 'children', 0];
const parentChecklists = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'checklists',
];
const parentParentNodeId = ({ parentNodeId }) => [
  NODE_STORE,
  'nodes',
  parentNodeId,
  'parentNodeId',
];
const lastModifiedBy = ({ id }) => [NODE_STORE, 'nodes', id, 'lastModifiedBy'];
const updatedAt = ({ id }) => [NODE_STORE, 'nodes', id, 'updatedAt'];
const startDate = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'startDate',
];
const isPrivate = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'private',
];
const secondChild = ({ id }) => [NODE_STORE, 'nodes', id, 'children', 1];
const weekDay = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'weekDay'];
const responsibility = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'responsibility',
];
const when = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'when'];
const done = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'done'];

const index = ({ id }) => [NODE_STORE, 'nodes', id, 'index'];

const parentNodeId = ({ id }) => [NODE_STORE, 'nodes', id, 'parentNodeId'];
const viaNodePath = ({ id, nodePath = [] }) => [
  NODE_STORE,
  'nodes',
  id,
  ...nodePath,
];
const trail = ({ id }) => [NODE_STORE, 'nodes', id, 'calculated', 'trail'];
const organisationId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'organisationId',
];
const timeNode = ({ id }) => [NODE_STORE, 'timeNodes', id];
const percentage = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'percentage',
];
const getNodeSetting = ({ id, settingKey }) => [
  NODE_STORE,
  'nodeSettings',
  id,
  settingKey,
  'value',
];
const getNodeSettingNodeId = ({ id, settingKey }) => [
  NODE_STORE,
  'nodeSettings',
  id,
  settingKey,
  'id',
];

const allChecklists = ({ id }) => {
  if (Array.isArray(id)) {
    return id.map(nodeId => NODE_STORE_SELECTORS.checklists({ id: nodeId }));
  }

  return NODE_STORE_SELECTORS.checklists({ id });
};
const allStatuses = ({ id }) => {
  if (Array.isArray(id)) {
    return id.map(nodeId => NODE_STORE_SELECTORS.status({ id: nodeId }));
  }

  return NODE_STORE_SELECTORS.status({ id });
};

const allChecklistIds = {
  cacheKey: NODE_STORE_CACHE_KEYS.allChecklists,
  keyPath: allChecklists,
  props: null,
  getter: (...results) => results,
  // getter: (...results) => flatten(results), // flatten results
};

const allChecklistStatuses = {
  cacheKey: NODE_STORE_CACHE_KEYS.allStatuses,
  keyPath: allStatuses,
  props: null,
  getter: (...results) => results,
};

/**
 * Input props: [idProp] (node id)
 */
const cachedChildren = ({ idProp = 'id' } = {}) => ({
  keyPath: ({ [idProp]: id }) => children({ id }),
  cacheKey: NODE_STORE_CACHE_KEYS.cachedChildren({ idProp }),
  props: null,
});

/**
 * Input props: [idProp] (node id), [parentNodeIdProp] (id of parent node)
 * Output: index of node in parent's children or -1 if not a child
 */
const cachedIndex = ({
  idProp = 'id',
  parentNodeIdProp = 'parentNodeId',
} = {}) => ({
  keyPath: ({ [parentNodeIdProp]: id }) => children({ id }),
  cacheKey: NODE_STORE_CACHE_KEYS.cachedIndex({ idProp, parentNodeIdProp }),
  props: ({ [idProp]: id }) => id,
  getter: (childrenIds, id) => !!childrenIds && childrenIds.indexOf(id),
});

const interestedPeople = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'interestedPeople',
];

const eventIds = ({ id }) => [NODE_STORE, 'nodes', id, 'events'];
const eventDataId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'eventId',
];

const eventDataIds = ({ idsProp = 'ids' }) => ({
  keyPath: ({ [idsProp]: ids }) => !!ids && ids.map(id => eventDataId({ id })),
  cacheKey: NODE_STORE_CACHE_KEYS.eventDataIds({ idsProp }),
  props: null,
  getter: (...args) => _.dropRight(args, 1),
});

const addEventDataIds = ({ nodesProp = 'nodes' }) => ({
  keyPath: ({ [nodesProp]: nodesValue }) =>
    !!nodesValue && nodesValue.map(NODE_STORE_SELECTORS.eventDataId),
  cacheKey: NODE_STORE_CACHE_KEYS.addEventDataIds({ nodesProp }),
  props: ({ [nodesProp]: nodesValue }) => nodesValue,
  getter: (...eventDataIdsValue) => {
    const nodesValue = eventDataIdsValue.pop();
    return nodesValue.reduce((acc, nodeValue, idx) => {
      const dataId = eventDataIdsValue[idx];
      return dataId ? [...acc, _.assign(nodeValue, { dataId })] : acc;
    }, []);
  },
});

/**
 * @param ids Node id's to use if array, else prop name
 * @param types Node types to use if array, else prop name
 */
const filterByTypes = ({ ids = 'ids', types = 'types' }) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      NODE_STORE_SELECTORS.type({ id }),
    ),
  cacheKey: NODE_STORE_CACHE_KEYS.filterByTypes({ ids, types }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(types),
  ],
  getter: (...selectedTypes) => {
    const typesValue = selectedTypes.pop();
    const idsValue = selectedTypes.pop();
    return _.zip(idsValue, selectedTypes).reduce(
      NODE_STORE_UTILS.filterByTypesReducer(typesValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids Node id's to use if array, else prop name
 * @param statuses Node statuses to use if array, else prop name
 */
const filterByStatuses = ({ ids = 'ids', statuses = 'statuses' }) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      NODE_STORE_SELECTORS.status({ id }),
    ),
  cacheKey: NODE_STORE_CACHE_KEYS.filterByStatuses({ ids, statuses }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(statuses),
  ],
  getter: (...selectedStatuses) => {
    const statusesValue = selectedStatuses.pop();
    const idsValue = selectedStatuses.pop();
    return _.zip(idsValue, selectedStatuses).reduce(
      NODE_STORE_UTILS.filterByStatusesReducer(statusesValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * Filters out nodes not same start/end date as a target node id
 *
 * Input props:
 *  [idProp] (target node id to compare)
 *  [dateProp] (calculated date to compare)
 *  [nodesProp] (node ids with start/end times and corresponding event id/subtype)
 * Output props:
 *  array of node id's with relative node position and dayCountType
 */
const filterAndSortByTime = ({
  idProp = 'id',
  dateProp = 'date',
  nodesProp = 'nodes',
}) => ({
  keyPath: ({ [nodesProp]: nodesValue }) =>
    nodesValue.map(({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventType({ id }),
    ),
  cacheKey: NODE_STORE_CACHE_KEYS.filterAndSortByTime({
    idProp,
    dateProp,
    nodesProp,
  }),
  props: [
    ({ [dateProp]: date }) => date,
    ({ [nodesProp]: nodesValue }) => nodesValue,
  ],
  getter: (...types) => {
    const nodesValue = types.pop();
    const date = types.pop();
    return NODE_STORE_UTILS.filterAndSortByTime({
      date,
      events: nodesValue.reduce(
        (acc, event, idx) => [...acc, _.assign(event, { type: types[idx] })],
        [],
      ),
    });
  },
});

/**
 * Filters out calculated event if:
 *  a) does not match any grouping
 *  b) does not match hasTime
 *
 * Input props:
 *  grouping (one or more type of event to include)
 *  hasTime (whether to include events with or without time)
 * Output props:
 *  array of event id's with moment value, node position, day count, etc
 */
const filterCalculatedEvents = opts => ({
  keyPath: calculatedEvents,
  cacheKey: NODE_STORE_CACHE_KEYS.filterCalculatedEvents(opts),
  props: [
    ({ grouping = opts.grouping }) => grouping,
    ({ hasTime = opts.hasTime }) => hasTime,
  ],
  getter: (events = [], grouping, hasTime) => {
    const d = events.filter(
      NODE_STORE_UTILS.calculatedEventsFilter({ grouping, hasTime }),
    );
    const data = d.map(({ value, timeZoneId: tz, ...rest }) => ({
      value: MOMENT_HELPERS.setTimeZone(value, tz),
      ...rest,
    }));
    return data;
  },
});

/**
 * Filters out calculated nodes if either start/end date matches any other node
 *
 * Input props:
 *  [idsProp] (node ids to match start/end time with)
 *  [nodesProp] (node ids with start/end times to filter)
 * Output props:
 *  id array
 */
const filterByNotMatchingTime = ({ idsProp = 'ids', nodesProp = 'nodes' }) => ({
  keyPath: ({ [idsProp]: ids }) =>
    !!ids &&
    ids.map(id => NODE_STORE_SELECTORS.calculatedStartTimeValue({ id })),
  cacheKey: NODE_STORE_CACHE_KEYS.filterByNotMatchingTime({
    idsProp,
    nodesProp,
  }),
  props: [({ [nodesProp]: nodesValue }) => nodesValue],
  getter: (...nodeStartTimes) => {
    const nodesValue = nodeStartTimes.pop();
    return NODE_STORE_UTILS.filterByNotMatchingTime(nodesValue, nodeStartTimes);
  },
});

const calculatedParticipants = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'participants',
];

const calculatedGalleryId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'galleryId',
];

const calculatedTimelineId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'timelineId',
];

const calculatedRoutes = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'routes',
];

const calculatedRouteError = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'routeError',
];

const calculatedIndex = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'index',
];
const calculatedOrigin = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'origin',
];

const calculatedDestination = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'destination',
];
const calculatedMarkerIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'markerIds',
];
const calculatedVisibleChildren = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'visibleChildren',
];
const calculatedPrivateIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'privateIds',
];
const calculatedHiddenIds = ({ id }) => [NODE_STORE, 'nodes', id, 'hiddenIds'];
const calculatedOnlyMeIds = ({ id }) => [NODE_STORE, 'nodes', id, 'onlyMeIds'];

const calculatedDistance = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'distance',
];

const calculatedPlaceIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'placeIds',
];

const calculatedRouteIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'routeIds',
];

const calculatedEvents = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'events',
];

const calculatedNodesEvents = ({ id }) => [
  NODE_STORE,
  'calculatedNodes',
  id,
  'calculated',
  'events',
];

const calculatedEventIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventIds',
];

const calculatedEventObjs = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
];

// const calculatedEventType = ({ id, eid }) => [
//   NODE_STORE,
//   'nodes',
//   id,
//   'calculated',
//   'eventObjs',
//   eid,
//   'type',
// ];

/**
 * Input props: [idProp] (node id)
 */
const cachedCalculatedEvents = ({ idProp = 'id' } = {}) => ({
  keyPath: ({ [idProp]: id }) => NODE_STORE_SELECTORS.calculatedEvents({ id }),
  cacheKey: NODE_STORE_CACHE_KEYS.cachedCalculatedEvents({ idProp }),
  props: null,
});

const cachedCalculatedNodesEventIds = ({ idProp = 'id' } = {}) => ({
  keyPath: ({ [idProp]: id }) =>
    NODE_STORE_SELECTORS.calculatedNodesEvents({ id }),
  cacheKey: NODE_STORE_CACHE_KEYS.cachedCalculatedNodeEvents({ idProp }),
  props: null,
});

const calculatedTime = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
];

const calculatedUploadPhotoDialogId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'uploadPhotoDialogId',
];

const calculatedShowChecklists = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'showChecklists',
];
const calculatedSelectedIds = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'selectedIds',
];
const calculatedClickMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'clickMode',
];
const calculatedPreviewId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'previewId',
];
const calculatedOngoing = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'ongoing',
];
const calculatedFetching = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'fetching',
];
const calculatedLayoutRecheck = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'layoutRecheck',
];
const calculatedLayout = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'layout',
];
const calculatedSelectedId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'selectedId',
];
const calculatedShowDetail = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'showDetail',
];
const calculatedPreviousLayout = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'previousLayout',
];
const calculatedStatus = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'status',
];
const calculatedMedicalSeverity = ({ id }) => [
  ...node({ id }),
  ...MEDICAL_PATHS.calculatedSeverity,
];
const calculatedMedicalCount = ({ id }) => [
  ...node({ id }),
  ...MEDICAL_PATHS.calculatedCount,
];
const calculatedDietaryCount = ({ id }) => [
  ...node({ id }),
  ...DIETARY_PATHS.calculatedCount,
];
const calculatedStart = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'startTime',
];
const calculatedEnd = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'endTime',
];
const calculatedFirstEventId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'firstEventId',
];
const calculatedActive = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'active',
];
const calculatedRouteFound = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'routeFound',
];

const calculatedStartTime = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'start',
];

const calculatedStartTimeValue = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'start',
  'value',
];

const calculatedStartTimeReal = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'start',
  'real',
];

const calculatedStartTimeZoneId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'start',
  'timeZoneId',
];

const calculatedStartTimeMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'start',
  'mode',
];

const calculatedEventId = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'id',
];

const calculatedEventType = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'type',
];

const calculatedEventCancellation = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'cancellation',
];

const calculatedEventSubType = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'subtype',
];

const calculatedEventMode = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'mode',
];

const calculatedEventValue = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'value',
];

const calculatedEventTimeZone = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'timeZoneId',
];

const calculatedEventReal = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'real',
];

const calculatedEventDayCount = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'dayCount',
];

const calculatedEventPosition = ({ id, eid }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'eventObjs',
  eid,
  'position',
];

const calculatedStartTimeMoment = ({ idProp = 'id' } = {}) => ({
  keyPath: [
    ({ [idProp]: id }) => calculatedStartTimeValue({ id }),
    ({ [idProp]: id }) => calculatedStartTimeZoneId({ id }),
  ],
  cacheKey: NODE_STORE_CACHE_KEYS.calculatedStartTimeMoment({ idProp }),
  props: null,
  getter: NODE_STORE_UTILS.calculatedTimeMoment,
});

const calculatedEndTime = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'end',
];

const calculatedEndTimeValue = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'end',
  'value',
];

const calculatedEndTimeZoneId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'end',
  'timeZoneId',
];

const calculatedEndTimeMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'end',
  'mode',
];

const calculatedEndTimeReal = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'time',
  'end',
  'real',
];

const calculatedEndTimeMoment = ({ idProp = 'id' } = {}) => ({
  keyPath: [
    ({ [idProp]: id }) => calculatedEndTimeValue({ id }),
    ({ [idProp]: id }) => calculatedEndTimeZoneId({ id }),
  ],
  cacheKey: NODE_STORE_CACHE_KEYS.calculatedEndTimeMoment({ idProp }),
  props: null,
  getter: NODE_STORE_UTILS.calculatedTimeMoment,
});

const calculatedStartEndTimes = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    !!ids && ids.map(id => calculatedTime({ id })),
  cacheKey: NODE_STORE_CACHE_KEYS.calculatedStartEndTimes({ idsProp }),
  props: ({ [idsProp]: ids }) => ids,
  getter: (...times) => {
    const ids = times.pop();
    const data = _.zip(ids, times).reduce(
      NODE_STORE_UTILS.idValuesReducer,
      EMPTY_ARRAY,
    );
    return data;
  },
});

const calculatedStartTimeValues = ({ idsProp = 'ids', sort = true } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    !!ids && ids.map(id => calculatedStartTimeValue({ id })),
  cacheKey: NODE_STORE_CACHE_KEYS.calculatedStartTimeValues({ idsProp, sort }),
  props: ({ [idsProp]: ids }) => ids,
  getter: (...args) => {
    const times = _.dropRight(args, 1);
    const [ids] = _.takeRight(args, 1);
    const idValues = _.zip(ids, times).reduce(
      NODE_STORE_UTILS.idValueReducer,
      EMPTY_ARRAY,
    );
    return sort ? _.sortBy(idValues, ({ value }) => value) : idValues;
  },
});

const calculatedTrail = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'trail',
];

const calculatedTrailParent = ({ idProp = 'id' } = {}) => ({
  keyPath: ({ [idProp]: id }) => calculatedTrail({ id }),
  cacheKey: NODE_STORE_CACHE_KEYS.calculatedTrailParent({ idProp }),
  props: ({ [idProp]: id }) => id,
  getter: NODE_STORE_UTILS.getParentInTrail,
});

const sortByProp = ({
  ids = 'ids',
  path = NODE_PATHS.createdAt,
  sortFunc = null,
  reverse = true,
} = {}) => ({
  keyPath: ({ [ids]: i, [path]: p }) => {
    const pathValue = SELECTOR_HELPERS.propOrValueArray(path, p);
    return SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      nodeProp({ id, path: pathValue }),
    );
  },
  cacheKey: NODE_STORE_CACHE_KEYS.sortByProp({ ids, path, reverse }),
  props: SELECTOR_HELPERS.selectPropOrValueArray(ids),
  getter: (...props) => {
    const idsValue = props.pop();
    const toSort = _.zip(idsValue, props).reduce(
      (acc, [id, value]) => (id ? [...acc, { id, value }] : acc),
      EMPTY_ARRAY,
    );
    const sorted = _.sortBy(toSort, sortFunc || 'value').map(({ id }) => id);
    return reverse ? sorted.reverse() : sorted;
  },
});

const type = ({ id }) =>
  !Array.isArray(id) && [NODE_STORE, 'nodes', id, 'type'];

const participants = ({ id }) => [NODE_STORE, 'nodes', id, 'participants'];
const participantLinks = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'participantLinks',
];
const firstParticipant = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'participants',
  '0',
];

const links = [NODE_STORE, 'links'];
const linkIds = [NODE_STORE, 'linkIds'];
const linkType = ({ id }) => [...links, id, 'type'];
const linkProp = field => ({ id }) => [
  ...links,
  id,
  ...ARRAY_HELPERS.arrayIfNot(field),
];
const userNode = ({ id }) => [...links, id, 'userNode'];

export const LINK_STORE_SELECTORS = {
  userNode,
};

const nodeTransferStatus = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'transfer',
  'status',
];

const nodeTransferTo = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'transfer',
  'transferTo',
];
const nodeTransferToUserId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'transfer',
  'transferToUserId',
];
const nodeTransferToken = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'transfer',
  'notificationToken',
];
const subtype = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'subtype'];

const isEmpty = {
  keyPath: [content, description, url, location, photoId],
  getter: (contentVal, descriptionVal, urlVal, locationVal, photoVal) =>
    !(
      contentVal ||
      (descriptionVal && descriptionVal !== EMPTY_RTE) ||
      urlVal ||
      locationVal ||
      photoVal
    ),
};

const calculatedPeopleTabId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'peopleTabId',
];

const calculatedPeopleCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'calculated',
  'peopleCount',
];

const followers = ({ id }) => [NODE_STORE, 'nodes', id, 'followers'];
const oldFollower = ({ id }) => [NODE_STORE, 'nodes', id, 'oldFollower'];
const oldFollowerProp = (selector = []) => ({ id }) => [
  ...oldFollower({ id }),
  ...selector,
];

const roomType = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'roomType',
];
const ageType = ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'ageType'];
const guestCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'guestCount',
];

const bedCount = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'bedCount',
];

const selectedChecklists = {
  keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedChecklists'],
  getter: val => val || [],
};

const customDataStartMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'start',
  'mode',
];

const customDataStartTimeZoneId = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'start',
  'timeZoneId',
];

const customDataEndMode = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'end',
  'mode',
];

const customDataStartValue = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'start',
  'value',
];

const customDataEndValue = ({ id }) => [
  NODE_STORE,
  'nodes',
  id,
  'customData',
  'end',
  'value',
];

const groups = ({ id }) => [NODE_STORE, 'nodes', id, 'groups'];

const id = ({ id: nodeId }) => [NODE_STORE, 'nodes', nodeId, 'id']; // normally to check if nodeId exists

export const NODE_STORE_SELECTORS = {
  subtype,
  parentActivityIds,
  startDate,
  responsibility,
  when,
  done,
  isPrivate,
  secondChild,
  weekDay,
  activityIds,
  activities,
  nodes,
  calculatedNodes,
  node,
  nodeProp,
  hashkey,
  hashkeyDescription,
  duration,
  customData,
  firstName,
  lastName,
  isEditable,
  content,
  vicinity,
  heading,
  subheading,
  subtitle,
  parentContent,
  children,
  childrenCount,
  risks,
  sharedWith,
  printMode,
  editing,
  child,
  personal,
  allChecklistIds,
  allChecklistStatuses,
  allChecklists,
  allStatuses,
  parentChildren,
  parentType,
  description,
  likelihood,
  impact,
  control,
  notes,
  status,
  createdAt,
  createdBy,
  completedAt,
  completedBy,
  tourRoles,
  dueDate,
  displayDate,
  comments,
  feedbacks,
  commentCount,
  location,
  url,
  icon,
  placeId,
  origin,
  destination,
  travelMode,
  visible,
  routeContent,
  checklists,
  routes,
  checklistCount,
  nextNodes,
  firstChildrenId,
  firstNextNodeId,
  parentChecklists,
  parentNodeId,
  parentParentNodeId,
  viaNodePath,
  cachedChildren,
  cachedIndex,
  interestedPeople,
  eventIds,
  eventDataId,
  eventDataIds,
  addEventDataIds,
  filterByTypes,
  filterByStatuses,
  filterAndSortByTime,
  filterCalculatedEvents,
  filterByNotMatchingTime,
  calculatedMedicalCount,
  calculatedParticipants,
  calculatedGalleryId,
  calculatedTimelineId,
  calculatedRoutes,
  calculatedRouteError,
  calculatedIndex,
  calculatedOrigin,
  calculatedDistance,
  calculatedMarkerIds,
  calculatedVisibleChildren,
  calculatedPrivateIds,
  calculatedHiddenIds,
  calculatedOnlyMeIds,
  calculatedDestination,
  calculatedPlaceIds,
  calculatedRouteIds,
  calculatedEvents,
  calculatedNodesEvents,
  calculatedEventIds,
  calculatedEventObjs,
  calculatedPeopleCount,
  cachedCalculatedEvents,
  cachedCalculatedNodesEventIds,
  calculatedTime,
  calculatedUploadPhotoDialogId,
  calculatedShowChecklists,
  calculatedSelectedIds,
  calculatedClickMode,
  calculatedPreviewId,
  calculatedStartTime,
  calculatedStartTimeValue,
  calculatedStartTimeReal,
  calculatedStartTimeZoneId,
  calculatedStartTimeMode,
  calculatedStartTimeMoment,
  calculatedEndTime,
  calculatedEndTimeValue,
  calculatedEndTimeZoneId,
  calculatedEndTimeMode,
  calculatedEndTimeMoment,
  calculatedEndTimeReal,
  calculatedStartEndTimes,
  calculatedStartTimeValues,
  calculatedTrail,
  calculatedTrailParent,
  calculatedOngoing,
  calculatedFetching,
  calculatedLayout,
  calculatedSelectedId,
  calculatedShowDetail,
  calculatedPreviousLayout,
  calculatedLayoutRecheck,
  calculatedStatus,
  calculatedMedicalSeverity,
  calculatedDietaryCount,
  calculatedStart,
  calculatedEnd,
  calculatedFirstEventId,
  calculatedActive,
  calculatedRouteFound,
  calculatedEventId,
  calculatedEventCancellation,
  calculatedEventType,
  calculatedEventSubType,
  calculatedEventDayCount,
  calculatedEventPosition,
  calculatedEventReal,
  calculatedEventTimeZone,
  calculatedEventValue,
  calculatedEventMode,
  sortByProp,
  type,
  id,
  checklistsStatus,
  trail,
  organisationId,
  timeNode,
  percentage,
  lastModifiedBy,
  updatedAt,
  index,
  photos,
  photoId,
  attachmentId,
  exist,
  timeZoneId,
  shortDescription,
  parentId,
  lastNodeId,
  insertLocation,
  nodeSettings,
  getNodeSetting,
  getNodeSettingNodeId,
  sortedIds,
  participants,
  participantLinks,
  firstParticipant,
  seats,
  ratings,
  rating,
  email,
  reactions,
  links,
  linkIds,
  linkType,
  linkProp,
  nodeTransferStatus,
  nodeTransferTo,
  nodeTransferToUserId,
  nodeTransferToken,
  isEmpty,
  calculatedPeopleTabId,
  followers,
  oldFollowerProp,
  selectedChecklists,
  disableRYI,
  rooms,
  roomType,
  ageType,
  guestCount,
  bedCount,
  customDataStartTimeZoneId,
  customDataStartMode,
  customDataEndMode,
  customDataStartValue,
  customDataEndValue,
  groups,
};
