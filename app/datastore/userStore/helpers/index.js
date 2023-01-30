import {
  DEFAULT,
  CLOSED,
  UPCOMING,
  PAST,
  ACTIVE,
  DEFAULT_REMINDER_FREQUENCY_DAYS,
  DEFAULT_REMINDER_ATTEMPTS,
  DEFAULT_REMINDER_DISABLED,
  DEFAULT_SEEMORE_DISABLED,
  CANCELLED,
} from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { COMPLETED, PENDING } from 'datastore/invitationStore/constants';
import invitationSchema from 'datastore/invitationStore/schema';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import userSchema from 'datastore/userStore/schema';
import dotProp from 'dot-prop-immutable';
import { first, get, reduce } from 'lodash';
import { normalize } from 'normalizr';
import { compose } from 'redux';
import orgStoreSchema from 'datastore/orgStore/schema';
import CustomerSchema from 'datastore/customerDataImmerStore/schema';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import { userActivities as USER_ACTIVITY_SCHEMA } from 'datastore/coordinateDataStore/schema';
import {
  ADMIN,
  COLLABORATOR,
  OWNER,
  TOUR_ORGANIZER,
  CHECKLIST,
  TOUR_VIEWER,
  TOUR_COLLABORATOR,
  TOUR_INTERESTED,
  TOUR_PARTICIPANT,
  MEMBER,
  GUEST,
  DAY,
  TEMPLATE,
  EVENTS,
  PARTICIPANT,
} from 'utils/modelConstants';
import {
  INTERESTED_PERSON_STATUSES,
  PARTICIPANT_STATUSES,
} from 'utils/constants/nodes';
import momentjs from 'moment';

const USER_ROLES_TEXT = {
  ADMIN: 'Admin',
  TOUR_ORGANIZER: 'Organiser',
  OWNER: 'Owner',
  COLLABORATOR: 'Collaborator',
  TOUR_VIEWER: 'Viewer',
  TOUR_INTERESTED: 'Follower',
  TOUR_PARTICIPANT: 'Participant',
  MEMBER: 'Member',
  GUEST: 'Guest',
};

const normaliseData = (key, data, schema = userSchema) => {
  if (!helpers.arrayHasData(data)) {
    return { [key]: {} };
  }

  const { entities, result } = normalize(data, schema[key]);
  return { [key]: entities[key], result };
};

const separateInvitations = (nodeShares = {}, myUserId) =>
  Object.keys(nodeShares).reduce(
    (
      {
        invitationToMe,
        invitationFromMe,
        completedInvitationToMe,
        completedInvitationFromMe,
      },
      token,
    ) => {
      const element = nodeShares[token];

      if (element.shareFrom === myUserId) {
        if (element.status === PENDING) {
          return {
            invitationToMe,
            invitationFromMe: [...invitationFromMe, element],
            completedInvitationToMe,
            completedInvitationFromMe,
          };
        }

        return {
          invitationToMe,
          invitationFromMe,
          completedInvitationToMe,
          completedInvitationFromMe: [...completedInvitationFromMe, element],
        };
      }

      if (element.status === PENDING) {
        return {
          invitationToMe: [...invitationToMe, element],
          invitationFromMe,
          completedInvitationToMe,
          completedInvitationFromMe,
        };
      }

      return {
        invitationToMe,
        invitationFromMe,
        completedInvitationToMe: [...completedInvitationToMe, element],
        completedInvitationFromMe,
      };
    },
    {
      invitationToMe: [],
      invitationFromMe: [],
      completedInvitationToMe: [],
      completedInvitationFromMe: [],
    },
  );

const separateShares = nodeShares =>
  Object.keys(nodeShares).reduce(
    ({ confirmed, pending }, token) => {
      const element = nodeShares[token];

      if (element.status === PENDING) {
        return { confirmed, pending: [...pending, element] };
      }

      return { pending, confirmed: [...confirmed, element] };
    },
    { confirmed: [], pending: [] },
  );

const getInviteeId = ({ users }) => {
  if (!helpers.arrayHasData(users)) {
    return {};
  }

  const { result } = helpers.normaliseData('user', users);
  return { inviteeId: first(result) };
};

const arrayHasData = array => Array.isArray(array) && array.length;

const getFromMeToMe = (nodeShare, { myUserId, status }) => {
  if (!myUserId) {
    return {};
  }

  // separate invitationFromMe and invitationToMe invitation
  const {
    invitationFromMe,
    invitationToMe,
    completedInvitationFromMe,
    completedInvitationToMe,
  } = helpers.separateInvitations(nodeShare, myUserId);

  if (status === PENDING) {
    // normalise to respective list
    const { result: fromMe } = normalize(
      invitationFromMe,
      invitationSchema.nodeShare,
    );
    const { result: toMe } = normalize(
      invitationToMe,
      invitationSchema.nodeShare,
    );

    return {
      fromMe,
      toMe,
    };
  }

  if (status === COMPLETED) {
    const { result: completedFromMe } = normalize(
      completedInvitationFromMe,
      invitationSchema.nodeShare,
    );
    const { result: completedToMe } = normalize(
      completedInvitationToMe,
      invitationSchema.nodeShare,
    );

    return {
      completedFromMe,
      completedToMe,
    };
  }

  return {};
};

const normalise = result => {
  const {
    users,
    persons,
    organisations,
    notifications,
    nodes,
    nodeShares = {},
    userNodes,
    nodeTransfers = {},
  } = result;
  const { nodeShare, nodeShareSubNode } = normalize(
    nodeShares,
    invitationSchema.nodeShare,
  ).entities;
  const { notification } = helpers.normaliseData(
    'notification',
    notifications,
    invitationSchema,
  );

  const { nodeTransfer } = normalize(
    nodeTransfers,
    invitationSchema.nodeTransfer,
  ).entities;

  const { node } = helpers.normaliseData('node', nodes, NODE_SCHEMA);

  const { entities: personEntities } = normalize(
    persons || {},
    userSchema.person,
  );
  const person = personEntities.person;
  const personFiles = personEntities.photo;
  const personPhones = personEntities.phone;
  const passports = personEntities.passport;
  const insurancePolicies = personEntities.insurancePolicy;

  const { user } = helpers.normaliseData('user', users);
  const { entities } = normalize(organisations || {}, [
    orgStoreSchema.organisation,
  ]);
  const organisation = entities.organisation;
  const orgFiles = entities.photo;

  const files = Object.assign({}, personFiles, orgFiles);
  const userNodesData =
    userNodes && normalize(userNodes, invitationSchema.userNodes);
  const rs = {
    nodeShare,
    nodeShareSubNode,
    notification,
    node,
    person,
    files,
    user,
    organisation,
    personPhones,
    passports,
    raw: result,
    nodeTransfer,
    insurancePolicies,
  };
  if (userNodes) {
    rs.userNodes = { ...userNodesData.entities.userNodes };
    rs.userNodeUserIdsPerTour = userNodes.map(o => o.userId);
    rs.userNodeIdsPerTour = userNodesData.result;
  }
  return rs;
};

const getTourStatus = ({ now = momentjs(), startDate: date, duration }) => {
  const startDate = momentjs(date)
    .hour(0)
    .minute(0)
    .second(0);

  const endDate = momentjs(startDate)
    .add(duration - 1, 'day')
    .hour(23)
    .minute(59)
    .second(59);

  const past = now.isAfter(endDate);
  if (past) return PAST;
  const active = now.isBetween(startDate, endDate);
  if (active) return ACTIVE;
  return UPCOMING;
};

const normaliseChecklists = nodes => {
  const { node, eventNodes } = normalize(nodes, NODE_SCHEMA.node).entities;

  return { ...node, ...eventNodes };
};

const transFormNodeTrasFer = nodeTransfer => {
  if (!nodeTransfer) return {};
  return Object.keys(nodeTransfer).reduce((acc, key) => {
    const { createdat, updatedat, ...rest } = nodeTransfer[key];
    return {
      ...acc,
      [nodeTransfer[key].notificationToken]: {
        ...rest,
        createdAt: createdat,
        updatedAt: updatedat,
      },
    };
  }, {});
};

const upsertInvitations = (
  {
    nodeShare,
    nodeShareSubNode,
    userNodes,
    notification,
    node,
    person,
    personPhones,
    files,
    user,
    organisation,
    passports,
    raw,
    nodeTransfer,
    fromTransfer,
    userNodeUserIdsPerTour,
    userNodeIdsPerTour,
    templateId,
    insurancePolicies,
  },
  idUpsertMode = ARRAY_MODE.APPEND,
) => {
  const result = {
    share: DATASTORE_UTILS.upsertObject(nodeShare),
    shareIds: upsertHelpers.array(
      DATASTORE_UTILS.getObjectIds(nodeShare, { number: false }),
      idUpsertMode,
    ),
    shareSubNode: DATASTORE_UTILS.upsertObject(nodeShareSubNode),
    shareSubNodeIds: upsertHelpers.array(
      DATASTORE_UTILS.getObjectIds(nodeShareSubNode),
      idUpsertMode,
    ),
    userNodes: DATASTORE_UTILS.upsertObject(userNodes),
    userNodeIds: upsertHelpers.array(
      DATASTORE_UTILS.getObjectIds(userNodes),
      idUpsertMode,
    ),
    notification: DATASTORE_UTILS.upsertObject(notification),
    node: DATASTORE_UTILS.upsertObject(node),
    person: DATASTORE_UTILS.upsertObject(person),
    personPhones: DATASTORE_UTILS.upsertObject(personPhones),
    files: DATASTORE_UTILS.upsertObject(files),
    user: DATASTORE_UTILS.upsertObject(user),
    organisation: DATASTORE_UTILS.upsertObject(organisation),
    passports: DATASTORE_UTILS.upsertObject(passports),
    raw,
    nodeTransfer: !fromTransfer
      ? DATASTORE_UTILS.upsertObject(transFormNodeTrasFer(nodeTransfer))
      : nodeTransfer,
    userNodeIdsPerTour,
    userNodeUserIdsPerTour,
    templateId,
    insurancePolicies: DATASTORE_UTILS.upsertObject(insurancePolicies),
  };
  return result;
};

/**
 * @deprecated SK: We should stop copying these constants, they also exist in datastore/invitationStore/constants#TOUR_ROLES (though that place is far from ideal)
 */
const translateRole = role =>
  LOGIC_HELPERS.switchCase(role, {
    [ADMIN]: USER_ROLES_TEXT.ADMIN,
    [OWNER]: USER_ROLES_TEXT.OWNER,
    [GUEST]: USER_ROLES_TEXT.GUEST,
    [MEMBER]: USER_ROLES_TEXT.MEMBER,
    [COLLABORATOR]: USER_ROLES_TEXT.COLLABORATOR,
    [TOUR_COLLABORATOR]: USER_ROLES_TEXT.COLLABORATOR,
    [TOUR_ORGANIZER]: USER_ROLES_TEXT.TOUR_ORGANIZER,
    [TOUR_VIEWER]: USER_ROLES_TEXT.TOUR_VIEWER,
    [TOUR_INTERESTED]: USER_ROLES_TEXT.TOUR_INTERESTED,
    [TOUR_PARTICIPANT]: USER_ROLES_TEXT.TOUR_PARTICIPANT,
    [DEFAULT]: role,
  });

export const accumulateDays = (startDate, nodes) => (acc, dayId, index) => {
  const node = nodes[dayId];
  const dayDate = MOMENT_HELPERS.addDuration(
    startDate,
    MOMENT_HELPERS.createDuration(index + 1, 'day'),
  );
  const isDayBetween7Days = MOMENT_HELPERS.isDayBetween(dayDate);
  return isDayBetween7Days ? [...acc, node.id] : acc;
};

export const aggregateIds = ({ nodes, allowedDays, events }) => (acc, key) => {
  const node = nodes[key];
  const old = acc;
  if (node.type === DAY && allowedDays.includes(node.id)) {
    old.dayIds = [...old.dayIds, node.id];
    return old;
  }

  if (events.includes(node.type) && allowedDays.includes(node.parentNodeId)) {
    old.eventIds = [...old.eventIds, node.id];
    return old;
  }

  return old;
};

const convertDayChildren = node => {
  const { events = [], children = [], ...rest } = node;
  const sectionChildren = children.filter(id => !events.includes(id));
  return {
    ...rest,
    children: sectionChildren,
    events,
  };
};

const templateReducer = (acc, template) => {
  const { node = {}, eventNodes = {}, photo = {} } = normalize(
    template,
    NODE_SCHEMA.singleNode,
  ).entities;

  // Inject calculated.events into each template
  /* const processedTemplate = dotProp.set(
    node[template.id],
    'calculated.events',
    DATASTORE_UTILS.getObjectIds(eventNodes),
  ); */
  const calculateEvents = {
    calculated: { events: DATASTORE_UTILS.getObjectIds(eventNodes) },
  };

  const nodeData = Object.keys(node).reduce(
    (ac, cur) => ({
      ...ac,
      [cur]: {
        ...(node[cur].type === DAY ? convertDayChildren(node[cur]) : node[cur]),
      },
    }),
    {},
  );

  return {
    nodes: {
      ...acc.nodes,
      ...nodeData,
      ...eventNodes,
    },
    /* calculatedNodes: {
      [processedTemplate.id]: processedTemplate,
    }, */
    photos: { ...acc.photos, ...photo },
    calculatedNodes: {
      ...acc.calculatedNodes,
      [template.id]: calculateEvents,
    },
  };
};

const normaliseTemplates = templates => {
  const { nodes, photos, calculatedNodes } = templates.reduce(templateReducer, {
    nodes: {},
    photos: {},
  });

  const nodeKeys = Object.keys(nodes);

  let allowedDays = [];
  let allowedTemplates = [];
  let allowedTabTimeline = [];

  if (!nodeKeys.length) {
    return {
      tabtimelineIds: [],
      dayIds: [],
      templateIds: [],
      eventIds: [],
    };
  }

  nodeKeys.forEach(value => {
    const node = nodes[value];

    if (node.type === TEMPLATE) {
      const startDate = node.customData.startDate;

      const isRecent = MOMENT_HELPERS.isRecent(
        startDate,
        node.customData.duration,
        0,
      );

      if (isRecent) {
        const tabtimelineId = node.children[0];
        const tabtimeline = nodes[tabtimelineId];
        const dayIds = tabtimeline.children;
        const days = dayIds.reduce(
          helpers.accumulateDays(startDate, nodes),
          [],
        );

        allowedDays = [...allowedDays, ...days];
        allowedTemplates = [...allowedTemplates, node.id];
        allowedTabTimeline = [...allowedTabTimeline, tabtimeline.id];
      }
    }
  });

  const aggregated = nodeKeys.reduce(
    helpers.aggregateIds({ nodes, allowedDays, events: EVENTS }),
    { eventIds: [], dayIds: [] },
  );

  return {
    node: DATASTORE_UTILS.upsertObject(nodes),
    dayIds: aggregated.dayIds,
    templateIds: allowedTemplates,
    tabtimelineIds: allowedTabTimeline,
    eventIds: aggregated.eventIds,
    file: DATASTORE_UTILS.upsertObject(photos),
    calculatedNodes: DATASTORE_UTILS.upsertObject(calculatedNodes),
  };
};

const updateNodes = (nodeId = '', value = {}) => (node = {}) => {
  if (Object.keys(node).includes(nodeId.toString())) {
    return dotProp.set(node, `${nodeId}.calculated.transfer`, value);
  }
  return node;
};

export const helpers = {
  normalise,
  normaliseChecklists,
  normaliseData,
  separateShares,
  separateInvitations,
  getFromMeToMe,
  getInviteeId,
  arrayHasData,
  upsertInvitations,
  translateRole,
  accumulateDays,
  aggregateIds,
  normaliseTemplates,
  updateNodes,
  getTourStatus,
};

const normaliseGetPeople = (result, req) => {
  const normalised = helpers.normalise(result);
  normalised.templateId = req.id;
  normalised.payload = req;
  return helpers.upsertInvitations(normalised, ARRAY_MODE.SET);
};

const normaliseGetPerson = results => {
  const normalised = helpers.normalise(results);

  return {
    ...helpers.getInviteeId(results),
    ...helpers.upsertInvitations(normalised),
  };
};

const normaliseBatchRecentActivity = result => {
  const { entities } = normalize(result || {}, USER_ACTIVITY_SCHEMA);

  return {
    userActivities: entities.userActivity,
  };
};

const normaliseAddRole = result => {
  const normalised = helpers.normalise(result);
  return helpers.upsertInvitations(normalised);
};

const normaliseGetInvitations = (result, payload) => {
  const normalised = helpers.normalise(result);

  return {
    ...helpers.getFromMeToMe(normalised.nodeShare, payload),
    ...helpers.upsertInvitations(normalised),
  };
};
const getMyPendingTransfer = (
  { transferFrom, transferToUserId, status },
  myUserId,
  toMe = true,
) =>
  ((transferToUserId === myUserId && toMe) ||
    (transferFrom === myUserId && !toMe)) &&
  status === PENDING;

const transferToMeFromMe = (transfer, userId) => {
  if (!transfer) return { transferToMe: [], transferFromMe: [] };
  const transferToMe = Object.keys(transfer).filter(key =>
    getMyPendingTransfer(transfer[key], userId),
  );
  const transferFromMe = Object.keys(transfer).filter(key =>
    getMyPendingTransfer(transfer[key], userId, false),
  );
  return { transferToMe, transferFromMe };
};

const normaliseGetTourTransfer = (result, param) => {
  const normalised = helpers.normalise(result);
  const { nodeTransfer } = normalised;
  const { nodeId, linkToken } = param;

  let hasNode = false;
  if (linkToken && nodeId) {
    if (nodeTransfer) {
      hasNode = Object.keys(nodeTransfer).includes(linkToken);
    }
  }

  let nodeValue = {};
  if (hasNode) {
    nodeValue = nodeTransfer[linkToken];
  }

  return {
    ...helpers.upsertInvitations({ ...normalised, fromTransfer: true }),
    ...transferToMeFromMe(nodeTransfer, param.myUserId),
    node: helpers.updateNodes(nodeId, nodeValue),
  };
};

const normaliseGetOrgInvitations = ({
  notifications,
  orgInvitations = [],
  organisations,
  persons,
}) => {
  if (!orgInvitations.length) {
    return {};
  }

  const { notification, result: notificationIds } = helpers.normaliseData(
    'notification',
    notifications,
    invitationSchema,
  );
  const { orgInvitation, result } = helpers.normaliseData(
    'orgInvitation',
    orgInvitations,
    invitationSchema,
  );

  const { entities: personEntities } = normalize(persons, userSchema.person);
  const person = personEntities.person;
  const personFiles = personEntities.photo;

  const { entities } = normalize(organisations, [orgStoreSchema.organisation]);
  const organisation = entities.organisation;
  const orgFiles = entities.photo;

  const files = { ...personFiles, ...orgFiles };

  return {
    orgInvitations: result,
    notifications: DATASTORE_UTILS.upsertArray('', notificationIds),
    notification: DATASTORE_UTILS.upsertObject(notification),
    orgInvitation: DATASTORE_UTILS.upsertObject(orgInvitation),
    person: DATASTORE_UTILS.upsertObject(person),
    organisation: DATASTORE_UTILS.upsertObject(organisation),
    files: DATASTORE_UTILS.upsertObject(files),
  };
};

export const openChecklistReducer = nodes => (accumulate, nodeId) => {
  const { type, status, customData, id } = nodes[nodeId];

  if (
    type !== CHECKLIST ||
    status === CLOSED ||
    !customData ||
    !customData.dueDate
  ) {
    return accumulate;
  }

  return accumulate.concat(id);
};

export const convertChecklists = checklists =>
  arrays.convertChecklistsToArray(checklists);

export const onUpdate = (parent, convertedChildren) => {
  switch (parent.type) {
    case TEMPLATE: {
      const convertedParent = dotProp.set(
        parent,
        'checklists',
        convertChecklists,
      );
      return dotProp.set(convertedParent, 'children', convertedChildren);
    }
    case DAY: {
      const convertedParent = dotProp.set(
        parent,
        'checklists',
        convertChecklists,
      );
      return dotProp.set(convertedParent, 'children', convertedChildren);
    }
    default: {
      return dotProp.set(parent, 'children', convertedChildren);
    }
  }
};

export const convertChildren = () => children =>
  arrays.convert(children, undefined, onUpdate);

const normaliseGetChecklists = (results, payload = {}) => {
  const filteredResults = payload.activeOnly
    ? results.filter(
        item =>
          getTourStatus(get(item, 'customData')) !== PAST &&
          item.status !== CANCELLED,
      )
    : results;
  let newTemplates = filteredResults.map(result =>
    dotProp.set(result, 'children', convertChildren()),
  );
  newTemplates = newTemplates.map(result =>
    dotProp.set(result, 'checklists', convertChecklists),
  );

  const nodes = helpers.normaliseChecklists(newTemplates);

  const checklistIds = Object.keys(nodes).reduce(
    openChecklistReducer(nodes),
    [],
  );

  const setValue = helpers.normaliseTemplates(newTemplates);

  const dayIds = get(setValue, 'dayIds', []);

  const mergedIds = dayIds.concat(checklistIds);

  return {
    ...setValue,
    checklistIds: mergedIds,
  };
};
const getStatusByRole = (role = '') =>
  LOGIC_HELPERS.ifElse(
    role.indexOf(PARTICIPANT) !== -1,
    PARTICIPANT_STATUSES.declined,
    INTERESTED_PERSON_STATUSES.complete,
  );
const removePeople = result => {
  const {
    invitationToken,
    removeTourUserNodeIds: userNodeIds,
    hadRemovedInvite,
    linkeeNodeIds,
  } = result;

  const nodes = Object.keys(linkeeNodeIds).reduce(
    (acc, key) => ({
      ...acc,
      [linkeeNodeIds[key].nodeId]: {
        status: getStatusByRole(linkeeNodeIds[key].role),
      },
    }),
    {},
  );

  return {
    share: DATASTORE_UTILS.removeObjectById(invitationToken),
    shareIds: store => ARRAY_HELPERS.remove(store, invitationToken),
    userNodes: DATASTORE_UTILS.removeObjectById(...userNodeIds),
    userNodeIds: DATASTORE_UTILS.removeItemsInArray(...userNodeIds),
    hadRemovedInvite,
    nodes: DATASTORE_UTILS.upsertObject(nodes),
  };
};

export const isNonContributor = role => {
  const contributor = [TOUR_INTERESTED, TOUR_PARTICIPANT];
  return contributor.includes(role);
};

const normaliseUserPreference = result => {
  const { userPreferenceResult } = result;
  const values = userPreferenceResult || {};
  const userId = get(values, '0.userId', null);
  const { entities: preference } = normalize(
    values,
    userSchema.userPreferences,
  );
  return {
    user: DATASTORE_UTILS.upsertObject(userId ? { [userId]: preference } : {}),
  };
};
const normalisePersonalPreference = (result, payload) => {
  const { id } = payload;
  const {
    reminderAttempts,
    reminderDisabled,
    seeMoreDisabled,
    reminderFrequencyDays,
  } = result;
  const attempts = reminderAttempts || DEFAULT_REMINDER_ATTEMPTS;
  const frequency = reminderFrequencyDays || DEFAULT_REMINDER_FREQUENCY_DAYS;
  const disabledReminder = reminderDisabled || DEFAULT_REMINDER_DISABLED;
  const disabledSeeMore = seeMoreDisabled || DEFAULT_SEEMORE_DISABLED;

  return {
    userPreferences: DATASTORE_UTILS.upsertObject(
      id
        ? {
            [id]: {
              reminderAttempts: attempts,
              reminderFrequencyDays: frequency,
              reminderDisabled: disabledReminder,
              seeMoreDisabled: disabledSeeMore,
            },
          }
        : {},
    ),
  };
};
const normaliseUpdatePersonalPreference = (result, payload) => {
  const { id } = payload;
  const {
    reminderAttempts,
    reminderFrequencyDays,
    reminderDisabled,
    seeMoreDisabled,
  } = result;
  return {
    userPreferences: compose(
      DATASTORE_UTILS.updateAttribute(
        `${id}.reminderAttempts`,
        reminderAttempts,
      ),
      DATASTORE_UTILS.updateAttribute(
        `${id}.reminderFrequencyDays`,
        reminderFrequencyDays,
      ),
      DATASTORE_UTILS.updateAttribute(
        `${id}.reminderDisabled`,
        reminderDisabled,
      ),
      DATASTORE_UTILS.updateAttribute(`${id}.seeMoreDisabled`, seeMoreDisabled),
    ),
  };
};

const normaliseGetMe = result => {
  const { user, userRelatedOrgs, orgLists, person, customers } = result;
  const normalizedData = normalize(customers.data, CustomerSchema.customers);
  const customerRelations = reduce(
    customers.data,
    (r, value) => {
      const copyResult = r;
      if (value.metadata && value.metadata.OrgId) {
        copyResult.orgs[value.metadata.OrgId] = value.id;
      } else if (value.metadata && value.metadata.UserId) {
        copyResult.users[value.metadata.UserId] = value.id;
      }
      return copyResult;
    },
    {
      users: {},
      orgs: {},
    },
  );
  return {
    user,
    userRelatedOrgs,
    orgLists,
    person,
    customerRelations,
    ...normalizedData.entities,
  };
};

const normaliseUpdateUserPreference = result => {
  const { userPreferenceModel: data } = result;
  const userId = get(data, 'userId', null);
  return {
    user: DATASTORE_UTILS.updateAttribute(
      `${userId}.preference.${data.code}`,
      data.value,
    ),
  };
};

export const USER_STORE_HELPERS = {
  normaliseGetInvitations,
  normaliseGetOrgInvitations,
  normaliseGetChecklists,
  normaliseGetPeople,
  normaliseGetPerson,
  removePeople,
  normaliseAddRole,
  normaliseUserPreference,
  normaliseUpdateUserPreference,
  normaliseBatchRecentActivity,
  normaliseGetTourTransfer,
  transferToMeFromMe,
  transFormNodeTrasFer,
  normalisePersonalPreference,
  normaliseUpdatePersonalPreference,
  normaliseGetMe,
};

export default USER_STORE_HELPERS;
