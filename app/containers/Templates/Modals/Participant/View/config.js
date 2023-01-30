import first from 'lodash/first';
import { TEMPLATE_API, GET_PARTICIPANTS, GET_PEOPLE } from 'apis/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';

export const GET_LINK_IDS = {
  value: {
    linkIds: NODE_STORE_SELECTORS.linkIds,
    groups: NODE_STORE_SELECTORS.groups,
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const GET_PARTICIPANT_GROUP_LINKS = {
  value: {
    participantGroupLinks: {
      keyPath: ({ linkIds = [] }) =>
        linkIds.map(linkId => NODE_STORE_SELECTORS.linkType({ id: linkId })),
      cacheKey: ({ linkIds = [] }) =>
        `getParticipantGroupLinks.${linkIds.toString()}.participantGroupLinks`,
      props: ({ linkIds }) => linkIds,
      getter: (...args) => {
        const linkTypes = dropRight(args);
        const [linkIds] = takeRight(args);
        const linkIdsWithTypes = zip(linkIds, linkTypes);
        const filtered = linkIdsWithTypes.filter(
          linkIdWithType => linkIdWithType[1] === 'participant.group',
        );
        return filtered.map(a => a[0]);
      },
    },
  },
};

export const GET_PARTICIPANT_LINK_IDS = {
  value: {
    participantLinkIds: {
      keyPath: ({ participantGroupLinks = [] }) =>
        participantGroupLinks.map(participantGroupLink =>
          NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({
            id: participantGroupLink,
          }),
        ),
      cacheKey: ({ participantGroupLinks = [], id }) =>
        `getParticipantLinkIds.${participantGroupLinks.toString()}.getParticipantLinkIds.${id}`,
      props: [
        ({ participantGroupLinks }) => participantGroupLinks,
        ({ id }) => id,
      ],
      getter: (...args) => {
        const prevNodeIds = dropRight(args, 2);
        const [linkIds, nodeId] = takeRight(args, 2);
        const prevNodeIdsWithLinkIds = zip(linkIds, prevNodeIds);
        const filtered = prevNodeIdsWithLinkIds.filter(
          prevNodeIdWithLinkId => prevNodeIdWithLinkId[1] === nodeId,
        );
        return filtered.map(a => a[0]);
      },
    },
  },
};

export const CONFIG = {
  value: {
    personId: {
      keyPath: ({ id }) =>
        NODE_STORE_SELECTORS.nodeProp({
          id,
          path: NODE_PATHS.calculatedPeople,
        }),
      getter: people => first(people),
    },
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    lastName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.lastName }),
    email: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    dateOfBirth: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.dateOfBirth }),
    personType: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.personType }),
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
  },
  setValue: {},
  isLoading: {
    loading: [TEMPLATE_API, GET_PARTICIPANTS],
    isFetching: {
      keyPath: [[TEMPLATE_API, GET_PARTICIPANTS], [TEMPLATE_API, GET_PEOPLE]],
      getter: (pax, people) => pax || people,
    },
  },
};

export const CONFIG2 = {
  value: {
    knownAs: ({ personId }) => PERSON_STORE_SELECTORS.knownAs({ id: personId }),
  },
  setValue: {
    linkedUser: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.all,
    calculatedPeople: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.calculatedPeople }),
    calculatedParticipants: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedParticipants({ id }),
    participants: ({ groups = [] }) =>
      NODE_STORE_SELECTORS.participants({ id: groups[0] }),
  },
  isLoading: {
    loading: [TEMPLATE_API, GET_PARTICIPANTS],
  },
};
