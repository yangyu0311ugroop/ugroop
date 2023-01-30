import {
  INVITATION_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  USER_DATA_STORE,
  PERSON_DATA_STORE,
  NODE_STORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import dropRight from 'lodash/dropRight';
import first from 'lodash/first';
import get from 'lodash/get';
import reduce from 'lodash/reduce';
import {
  getOrganisationName,
  getOrganisationPhotoUrl,
} from 'datastore/orgStore/selectors';
import {
  PHONE_STORE_SELECTOR_CREATOR,
  PHONE_STORE_FIELDS,
} from 'datastore/phoneStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { FILE_STORE_SELECTORS } from '../../../../../../datastore/fileStore/selectors';

const getList = ({ id, data }) => {
  const values = Object.values(data).filter(
    val => id === get(val, 'nodeId', 0),
  );
  return get(values, '0.userId');
};
const personReducer = path => (acc, curr) => {
  const val = get(curr, path, []);
  if (!val.length) return acc;
  return [...acc, ...val];
};

export const TEMPLATE_CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};
export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    iconUrl: NODE_STORE_SELECTORS.photos,
    orgId: NODE_STORE_SELECTORS.organisationId,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    startDate: NODE_STORE_SELECTORS.startDate,
    duration: NODE_STORE_SELECTORS.duration,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    currentUser: COGNITO_STORE_SELECTORS.knownAs,
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG2 = {
  value: {
    orgName: ({ orgId }) => getOrganisationName({ id: orgId }),
    ownerName: ({ createdBy }) =>
      USER_STORE_SELECTORS.knownAs({ id: createdBy }),
    orgPhoto: ({ orgId }) => getOrganisationPhotoUrl({ id: orgId }),
    participantsNode: {
      keyPath: ({ filteredParticipants = [] }) =>
        filteredParticipants.map(id => NODE_STORE_SELECTORS.node({ id })), // customData({ id })),
      cacheKey: ({ filteredParticipants, cacheKey = 'printParticipant' }) =>
        `filteredParticipants.${cacheKey}.${
          filteredParticipants ? filteredParticipants.toString() : null
        }`,
      getter: (...args) => {
        const participantsContent = dropRight(args, 1);

        const peopleIds = participantsContent.map(data =>
          first(get(data, 'calculated.people')),
        );
        const phoneIds = participantsContent.map(data =>
          get(data, 'customData.phoneId'),
        );
        const roomIds = participantsContent.map(data =>
          first(get(data, 'rooms', [])),
        );
        const groupLinkIds = participantsContent.map(data =>
          first(get(data, 'groups', [])),
        );
        return {
          participantsContent,
          peopleIds,
          phoneIds,
          roomIds,
          groupLinkIds,
        };
      },
      spreadObject: true,
    },
    userIds: {
      keyPath: ({ userNodeIds = [] }) =>
        userNodeIds.map(id => [INVITATION_STORE, 'userNodes', id]),
      cacheKey: ({ userNodeIds, cacheKey = 'printParticipantUserNodeIds' }) =>
        `filteredParticipantsUserNodeIds.${cacheKey}.${
          userNodeIds ? userNodeIds.toString() : null
        }`,
      props: ({ filteredParticipants }) => filteredParticipants,
      getter: (...values) => {
        const ids = values.pop();
        if (!Array.isArray(ids)) return [];
        return ids.map(id => getList({ id, data: values }));
      },
    },
  },
};

export const CONFIG3 = {
  value: {
    personValues: {
      keyPath: ({ peopleIds = [] }) =>
        peopleIds.map(id => PERSON_STORE_SELECTORS.person({ id })), // customData({ id })),
      cacheKey: ({ peopleIds, cacheKey = 'printParticipantPerson' }) =>
        `filteredParticipantsPerson.${cacheKey}.${
          peopleIds ? peopleIds.toString() : null
        }`,
      getter: (...args) => {
        const personDetails = dropRight(args, 1);
        const medicalIds = reduce(personDetails, personReducer('medicals'), []);
        const dietariesIds = reduce(
          personDetails,
          personReducer('dietaries'),
          [],
        );
        return { personDetails, medicalIds, dietariesIds };
      },
      spreadObject: true,
    },
    phoneList: {
      keyPath: ({ phoneIds = [] }) =>
        phoneIds.map(id =>
          PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.number)({ id }),
        ),
      cacheKey: ({ phoneIds, cacheKey = 'printParticipantphoneIds' }) =>
        `filteredParticipantsphoneIds.${cacheKey}.${
          phoneIds ? phoneIds.toString() : null
        }`,
      getter: (...args) => {
        const personPhone = dropRight(args, 1);
        return personPhone;
      },
    },
    personIds: {
      keyPath: ({ userIds = [] }) =>
        userIds.map(id => [USER_DATA_STORE, 'people', id, 'personId']), // USER_STORE_SELECTORS.knownAs({ id })), // customData({ id })),
      cacheKey: ({ userIds, cacheKey = 'filteredParticipantsUsersPeople' }) =>
        `filteredParticipantsUsersPeople.${cacheKey}.${
          userIds ? userIds.toString() : null
        }`,
      getter: (...args) => {
        const ids = dropRight(args, 1);
        return ids;
      },
    },
    photoMetaInfo: ({ orgPhoto }) =>
      FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: orgPhoto }),
    rooms: {
      keyPath: ({ roomIds = [] }) =>
        roomIds.map(id => NODE_STORE_SELECTORS.roomType({ id })), // customData({ id })),
      cacheKey: ({ roomIds, cacheKey = 'printParticipantRooms' }) =>
        `filteredParticipantsRooms.${cacheKey}.${
          roomIds ? roomIds.toString() : null
        }`,
      getter: (...args) => {
        const roomContent = dropRight(args, 1);
        return roomContent;
      },
    },
    /* groups: {
      keyPath: ({ groupIds = [] }) => {
        return groupIds.map(id => NODE_STORE_SELECTORS.content({ id })); // customData({ id })),
      },
      cacheKey: ({ groupIds, cacheKey = 'printParticipantgroups' }) =>
        `filteredParticipantsGroups.${cacheKey}.${
          groupIds ? groupIds.toString() : null
        }`,
      getter: (...args) => {
        const groopContent = dropRight(args, 1);
        return groopContent;
      },
    }, */
    groupIds: {
      keyPath: ({ groupLinkIds = [] }) =>
        groupLinkIds.map(id => [NODE_STORE, 'links', id, 'nextNodeId']), // customData({ id })),
      cacheKey: ({ groupLinkIds, cacheKey = 'printParticipantgroupLinkss' }) =>
        `filteredParticipantsGroupLinks.${cacheKey}.${
          groupLinkIds ? groupLinkIds.toString() : null
        }`,
      getter: (...args) => {
        const groopContent = dropRight(args, 1);
        return groopContent;
      },
    },
  },
};
export const CONFIG_PERSON = {
  value: {
    userPeople: {
      keyPath: ({ personIds = [] }) =>
        personIds.map(id => [PERSON_DATA_STORE, 'people', id]), // USER_STORE_SELECTORS.knownAs({ id })), // customData({ id })),
      cacheKey: ({
        personIds,
        cacheKey = 'filteredParticipantsPersonPeople',
      }) =>
        `filteredParticipantsPersonPeople.${cacheKey}.${
          personIds ? personIds.toString() : null
        }`,
      getter: (...args) => {
        const userDetails = dropRight(args, 1);
        const userMedicalIds = reduce(
          userDetails,
          personReducer('medicals'),
          [],
        );
        const userDietariesIds = reduce(
          userDetails,
          personReducer('dietaries'),
          [],
        );
        return { userDetails, userMedicalIds, userDietariesIds };
      },
      spreadObject: true,
    },
    groups: {
      keyPath: ({ groupIds = [] }) =>
        groupIds.map(id => NODE_STORE_SELECTORS.content({ id })), // customData({ id })),
      cacheKey: ({ groupIds, cacheKey = 'printParticipantgroups' }) =>
        `filteredParticipantsGroups.${cacheKey}.${
          groupIds ? groupIds.toString() : null
        }`,
      getter: (...args) => {
        const groopContent = dropRight(args, 1);
        return groopContent;
      },
    },
  },
  setValue: {},
};
export const CONFIG4 = {
  value: {
    medicals: {
      keyPath: ({ medicalIds = [], userMedicalIds = [] }) =>
        medicalIds
          .concat(userMedicalIds)
          .map(id => [...PERSON_STORE_SELECTORS.medical, id]),
      cacheKey: ({ medicalIds, cacheKey = 'printParticipantmedicalIds' }) =>
        `filteredParticipantsmedicalIds.${cacheKey}.${
          medicalIds ? medicalIds.toString() : null
        }`,
      getter: (...args) => {
        const values = dropRight(args, 1);
        return values;
      },
    },
    dietaries: {
      keyPath: ({ dietariesIds = [], userDietariesIds = [] }) =>
        dietariesIds
          .concat(userDietariesIds)
          .map(id => [...PERSON_STORE_SELECTORS.dietary, id]),
      cacheKey: ({ dietariesIds, cacheKey = 'printParticipantdietariesIds' }) =>
        `filteredParticipantsmedicalIds.${cacheKey}.${
          dietariesIds ? dietariesIds.toString() : null
        }`,
      getter: (...args) => {
        const values = dropRight(args, 1);
        return values;
      },
    },
  },
  setValue: {},
};
