import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';
import countBy from 'lodash/countBy';
import forEach from 'lodash/forEach';

import {
  NODE_STORE,
  SORT_CONSTANTS,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { GET_PARTICIPANTS, TEMPLATE_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { SORT_HELPERS } from 'utils/sorter';

import {
  sorter,
  getValues,
  getterParticipantsWithNoGroup,
  mergeParticipantIdsWithGroupIds,
  getParticipantWithSortValues,
  getterParticipantsWithGroup,
} from './utils';

export const CONFIG_0 = {
  value: {
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedParticipants,
      'parentId',
    ),
    participantLinks: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.participantLinks,
      'parentId',
    ),
    groups: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.groups, 'parentId'),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG = {
  value: {
    sortMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.SORT.list,
    statuses: {
      keyPath: [
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
          .confirmed,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER.pending,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER
          .declined,
      ],
      cacheKey: ({ participantIds }) => {
        const ids = participantIds ? participantIds.toString() : 'null';
        return `containers.templates.modals.participantList.statuses.${ids}`;
      },
      props: ({ participantIds = [] }) => participantIds,
      getter: (confirmed, pending, declined, participantIds) => {
        const statuses = [];
        if (confirmed) statuses.push(PARTICIPANT_STATUSES.confirmed);
        if (pending) statuses.push(PARTICIPANT_STATUSES.pending);
        if (declined) statuses.push(PARTICIPANT_STATUSES.declined);
        return {
          statuses,
          filterConfirmed: confirmed,
          filterPending: pending,
          filterDeclined: declined,
          hasParticipantIds: !!participantIds.length,
        };
      },
      spreadObject: true,
    },
    // groupParticipants: {
    //   keyPath: ({ groups }) =>
    //     groups.map(groupId =>
    //       NODE_STORE_SELECTORS.participants({ id: groupId }),
    //     ),
    //   cacheKey: ({ groups }) =>
    //     `GroupParticipants.${groups ? groups.toString() : 'null'}`,
    //   props: () => null,
    //   getter: (...args) => args,
    // },
    participantLinksNodeIds: {
      keyPath: ({ participantLinks = [] }) =>
        participantLinks.map(id =>
          NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({ id }),
        ),
      cacheKey: ({ participantLinks = [] }) =>
        `ParticipantList.participantLinkNodeIds.${participantLinks.toString()}`,
      props: () => null,
      getter: (...args) => args.filter(arg => arg),
    },
  },
};

export const CONFIG_1 = () => ({
  value: {
    confirmedParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.confirmed],
    }),
    pendingParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.pending],
    }),
    declinedParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.declined],
    }),
    linkRefresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'linkRefresh'],
    pairedUserPersonIds: {
      cacheKey: ({ userNodeIdsAll = [], userNodeUserIdsAll = [] }) =>
        `nodeUserIds.userNodeIds&personIds.forSort.${
          userNodeUserIdsAll.length ? userNodeUserIdsAll.toString() : null
        }.${userNodeIdsAll.length ? userNodeIdsAll.toString() : null}`,
      getter: (...args) => {
        const { userNodeIdsAll = [], userNodeUserIdsAll = [] } = args[0];
        const paired = zip(userNodeIdsAll, userNodeUserIdsAll);
        return paired;
      },
    },
    galleryId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedGalleryId({
        id: templateId,
      }),
    participantIds: {
      getter: ({ isTemplateId, participantIds, participantLinksNodeIds }) =>
        isTemplateId ? participantIds : participantLinksNodeIds,
    },
    userNodeUserNodes: {
      keyPath: ({ userNodeIdsAll = [] }) =>
        userNodeIdsAll.map(id =>
          INVITATION_STORE_SELECTORS.userNodeUserNodes({ id }),
        ),
      cacheKey: ({ userNodeIdsAll = [] }) =>
        `nodeUserIds.userNodeUserNodes.forSort.${
          userNodeIdsAll.length ? userNodeIdsAll.toString() : null
        }`,
      props: ({ userNodeIdsAll = [] }) => userNodeIdsAll,
      getter: (...args) => {
        const arrayValues = dropRight(args, 1);
        const filtered = arrayValues.filter(id => id !== undefined);
        const values = filtered.map(([id]) => id);
        return values;
      },
    },
  },
});

export const CONFIG_2 = () => ({
  value: {
    participantWithGroups: getterParticipantsWithGroup(
      'participantIds',
      'participantWithGroup',
    ),
    participantWithNoGroups: getterParticipantsWithNoGroup(
      'participantIds',
      'participantWithNoGroups',
    ),
    confirmedParticipantsWithNoGroups: getterParticipantsWithNoGroup(
      'confirmedParticipantIds',
      'confirmedParticipantsWithNoGroups',
    ),
    pendingParticipantsWithNoGroups: getterParticipantsWithNoGroup(
      'pendingParticipantIds',
      'pendingParticipantsWithNoGroups',
    ),
    declinedParticipantsWithNoGroups: getterParticipantsWithNoGroup(
      'declinedParticipantIds',
      'declinedParticipantsWithNoGroups',
    ),
    galleryChildren: ({ galleryId }) =>
      NODE_STORE_SELECTORS.children({ id: galleryId }),
    userNodeUserNodesIds: {
      keyPath: ({ userNodeUserNodes = [] }) =>
        userNodeUserNodes.map(id =>
          INVITATION_STORE_SELECTORS.userNodeNodeId({ id }),
        ),
      cacheKey: ({ userNodeUserNodes = [] }) =>
        `nodeUserIds.userNodes.forSort.${
          userNodeUserNodes.length ? userNodeUserNodes.toString() : null
        }`,
      props: ({ userNodeUserNodes = [] }) => userNodeUserNodes,
      getter: (...args) => {
        const values = dropRight(args, 1);
        return values;
      },
    },
    modeList:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.list,
    modeValue:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.value,
    layout:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.LAYOUT.list,
  },
});

export const CONFIG_3 = () => ({
  value: {
    knownAsValues: getValues('knownAs'),
    lastSeenValues: getValues('lastSeen'),
    groupWithSortValue: {
      keyPath: ({ groups = [], sortMode = 'createdAt' }) =>
        groups.map(groupId => {
          if (sortMode === SORT_CONSTANTS.TYPE)
            return NODE_STORE_SELECTORS.type({ id: groupId });

          if (sortMode === 'createdAt')
            return NODE_STORE_SELECTORS.createdAt({ id: groupId });

          return NODE_STORE_SELECTORS.content({ id: groupId });
        }),
      cacheKey: ({ groups = [], sortMode = 'createdAt' }) =>
        `ParticipantList.groupWithSortValue.${
          groups ? groups.toString() : 'null'
        }.${sortMode.toString()}`,
      props: ({ groups }) => groups,
      getter: (...args) => {
        const sortValues = dropRight(args);
        const [groups] = takeRight(args);
        const groupsAndSortValues = zip(groups, sortValues);

        return groupsAndSortValues;
      },
    },
    participantsWithSortValue: getParticipantWithSortValues({
      idsKey: 'participantWithNoGroups',
      cacheKey: 'participantsWithSortValue',
    }),
    confirmedParticipantWithSortValue: getParticipantWithSortValues({}),
    pendingParticipantWithSortValue: getParticipantWithSortValues({
      idsKey: 'pendingParticipantsWithNoGroups',
      cacheKey: 'pendingParticipantWithSortValue',
    }),
    declinedParticipantWithSortValue: getParticipantWithSortValues({
      idsKey: 'declinedParticipantsWithNoGroups',
      cacheKey: 'declinedParticipantWithSortValue',
    }),
    firstNameValues: {
      keyPath: ({ participantIds = [] }) =>
        participantIds.map(id => NODE_STORE_SELECTORS.firstName({ id })),
      cacheKey: ({ participantIds = [] }) =>
        `participantIds.firstNameValues.forSort.${
          participantIds.length ? participantIds.toString() : null
        }`,
      props: ({ participantIds = [] }) => participantIds,
      getter: (...args) => {
        const [ids] = takeRight(args, 1);
        const firstNameValues = dropRight(args, 1);
        const paired = zip(ids, firstNameValues);
        return paired;
      },
    },
    pairedUserPersonNodeIds: {
      getter: (...args) => {
        const { pairedUserPersonIds = [], userNodeUserNodesIds = [] } = args[0];
        const personIds = pairedUserPersonIds.map(item => item[0]);
        const userIds = pairedUserPersonIds.map(item => item[1]);
        const paired = zip(userNodeUserNodesIds, personIds, userIds);
        return paired;
      },
    },
    reactions: {
      keyPath: ({ galleryChildren = [] }) =>
        galleryChildren.map(id => NODE_STORE_SELECTORS.reactions({ id })),
      cacheKey: ({ galleryChildren = [], linkRefresh }) =>
        `galleryIds.reactions.forSort.${
          galleryChildren.length ? galleryChildren.toString() : null
        }.${linkRefresh || null}`,
      props: ({ galleryChildren = [] }) => galleryChildren,
      getter: (...args) => {
        const reactions = dropRight(args, 1);
        const filter = reactions.filter(item => item);
        const allReactionsIds = filter.reduce(
          (acc, value) => [...acc, ...value],
          [],
        );
        return allReactionsIds;
      },
    },
    /*  participantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: 'statuses',
    }), */
    participantViewModeModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
  },
});

export const CONFIG_4 = () => ({
  value: {
    confirmedParticipantsAndGroups: mergeParticipantIdsWithGroupIds({
      participantIdsKey: 'confirmedParticipantWithSortValue',
      groupIdKeys: 'groupWithSortValue',
    }),
    pendingParticipantsAndGroups: mergeParticipantIdsWithGroupIds({
      participantIdsKey: 'pendingParticipantWithSortValue',
      groupIdKeys: 'groupWithSortValue',
    }),
    declinedParticipantsAndGroups: mergeParticipantIdsWithGroupIds({
      participantIdsKey: 'declinedParticipantWithSortValue', // 'declinedParticipantsWithNoGroups',
      groupIdKeys: 'groupWithSortValue',
    }),
    participantsAndGroupsWithSortValue: mergeParticipantIdsWithGroupIds({
      groupIdKeys: 'groupWithSortValue',
      participantIdsKey: 'participantsWithSortValue',
    }),
    nextNodeIds: {
      keyPath: ({ reactions = [] }) =>
        reactions.map(id => [NODE_STORE, 'links', id, 'nextNodeId']),
      cacheKey: ({ reactions = [] }) =>
        `galleryIds.reactions.nextNodeIds.forSort.${
          reactions.length ? reactions.toString() : null
        }`,
      props: ({ reactions = [] }) => reactions,
      getter: (...args) => {
        const nextNodeIds = dropRight(args, 1);
        const count = countBy(nextNodeIds);

        const paired = [];
        forEach(count, (value, key) => {
          paired.push([Number(key), value]);
        });

        return paired;
      },
    },
  },
});

export const CONFIG_5 = () => ({
  value: {
    sortedAllGroupsParticipants: {
      cacheKey: ({
        participantsAndGroupsWithSortValue = [],
        sortMode,
        participantWithGroups = [],
        participantWithNoGroups = [],
      }) =>
        `ParticipantList.sortedAllGroupsParticipants.${participantsAndGroupsWithSortValue.toString()}.${sortMode.toString()}.${participantWithGroups.toString()}.${participantWithNoGroups.toString()}`,
      props: [
        ({ participantsAndGroupsWithSortValue }) =>
          participantsAndGroupsWithSortValue,
        ({ sortMode }) => sortMode,
      ],
      getter: ({ participantsAndGroupsWithSortValue = [], sortMode }) => {
        if (sortMode === SORT_CONSTANTS.TYPE)
          return participantsAndGroupsWithSortValue
            .sort(SORT_HELPERS.sortByKind)
            .map(a => a[0]);

        if (sortMode === SORT_CONSTANTS.CREATED_AT)
          return participantsAndGroupsWithSortValue
            .sort(SORT_HELPERS.sortArrayItems('desc'))
            .map(a => a[0]);

        const sorted = participantsAndGroupsWithSortValue
          .sort(SORT_HELPERS.sortArrayItems())
          .map(a => a[0]);

        return sorted;
      },
    },
    sortedConfirmedGroupsParticipants: {
      cacheKey: ({
        confirmedParticipantsAndGroups = [],
        sortMode,
        participantWithGroups = [],
        participantWithNoGroups = [],
      }) =>
        `ParticipantList.sortedConfirmedGroupsParticipants.${confirmedParticipantsAndGroups.toString()}.${sortMode.toString()}.${participantWithGroups.toString()}.${participantWithNoGroups.toString()}`,
      props: [
        ({ confirmedParticipantsAndGroups }) => confirmedParticipantsAndGroups,
        ({ sortMode }) => sortMode,
      ],
      getter: ({ confirmedParticipantsAndGroups = [], sortMode }) => {
        if (sortMode === SORT_CONSTANTS.TYPE)
          return confirmedParticipantsAndGroups
            .sort(SORT_HELPERS.sortByKind)
            .map(a => a[0]);

        if (sortMode === SORT_CONSTANTS.CREATED_AT)
          return confirmedParticipantsAndGroups
            .sort(SORT_HELPERS.sortArrayItems('desc'))
            .map(a => a[0]);

        const sorted = confirmedParticipantsAndGroups
          .sort(SORT_HELPERS.sortArrayItems())
          .map(a => a[0]);

        return sorted;
      },
    },
    sortedPendingGroupsParticipants: {
      cacheKey: ({
        pendingParticipantsAndGroups = [],
        sortMode,
        participantWithGroups = [],
        participantWithNoGroups = [],
      }) =>
        `ParticipantList.sortedPendingGroupsParticipants.${pendingParticipantsAndGroups.toString()}.${sortMode.toString()}.${participantWithGroups.toString()}.${participantWithNoGroups.toString()}`,
      props: [
        ({ pendingParticipantsAndGroups }) => pendingParticipantsAndGroups,
        ({ sortMode }) => sortMode,
      ],
      getter: ({ pendingParticipantsAndGroups = [], sortMode }) => {
        if (sortMode === SORT_CONSTANTS.TYPE)
          return pendingParticipantsAndGroups
            .sort(SORT_HELPERS.sortByKind)
            .map(a => a[0]);

        if (sortMode === SORT_CONSTANTS.CREATED_AT)
          return pendingParticipantsAndGroups
            .sort(SORT_HELPERS.sortArrayItems('desc'))
            .map(a => a[0]);

        const sorted = pendingParticipantsAndGroups
          .sort(SORT_HELPERS.sortArrayItems())
          .map(a => a[0]);

        return sorted;
      },
    },
    sortedDeclinedGroupsParticipants: {
      cacheKey: ({
        declinedParticipantsAndGroups = [],
        sortMode,
        participantWithGroups = [],
        participantWithNoGroups = [],
      }) =>
        `ParticipantList.sortedDeclinedGroupsParticipants.${declinedParticipantsAndGroups.toString()}.${sortMode.toString()}.${participantWithGroups.toString()}.${participantWithNoGroups.toString()}`,
      props: [
        ({ declinedParticipantsAndGroups }) => declinedParticipantsAndGroups,
        ({ sortMode }) => sortMode,
      ],
      getter: ({ declinedParticipantsAndGroups = [], sortMode }) => {
        if (sortMode === SORT_CONSTANTS.TYPE)
          return declinedParticipantsAndGroups
            .sort(SORT_HELPERS.sortByKind)
            .map(a => a[0]);

        if (sortMode === SORT_CONSTANTS.CREATED_AT)
          return declinedParticipantsAndGroups
            .sort(SORT_HELPERS.sortArrayItems('desc'))
            .map(a => a[0]);

        const sorted = declinedParticipantsAndGroups
          .sort(SORT_HELPERS.sortArrayItems())
          .map(a => a[0]);

        return sorted;
      },
    },
    pairedReactionNodes: {
      keyPath: ({ nextNodeIds = [] }) =>
        nextNodeIds.map(item => NODE_STORE_SELECTORS.content({ id: item[0] })),
      cacheKey: ({ nextNodeIds = [], reactions = [] }) =>
        `galleryIds.reactions.pairedReactionNodes.forSort.${
          nextNodeIds.length ? nextNodeIds.toString() : null
        }.${reactions.length ? reactions.toString() : null}`,
      props: ({ pairedUserPersonNodeIds = [], nextNodeIds = [] }) => ({
        pairedUserPersonNodeIds,
        nextNodeIds,
      }),
      getter: (...args) => {
        const userIds = dropRight(args, 1);
        const otherValues = takeRight(args, 1);

        const {
          pairedUserPersonNodeIds = [],
          nextNodeIds = [],
        } = otherValues[0];
        const userIdNumbers = userIds.map(id => Number(id));
        const filterPairs = pairedUserPersonNodeIds.filter(item =>
          userIdNumbers.includes(item[2]),
        );
        const pairedValues = filterPairs.reduce((acc, value, index) => {
          if (index === 1) {
            return [
              {
                participantNode: acc[0].participantNode,
                reactionCount: nextNodeIds[index - 1][1],
              },
              {
                participantNode: value[0],
                reactionCount: nextNodeIds[index][1],
              },
            ];
          }

          return [
            ...acc,
            { participantNode: value[0], reactionCount: nextNodeIds[index][1] },
          ];
        }, []);

        return pairedValues;
      },
    },
  },
});

export const SORTER_CONFIG = () => ({
  value: {
    sortedConfirmed: sorter('confirmedParticipantIds', 'confirmed'),
    sortedPending: sorter('pendingParticipantIds', 'pending'),
    sortedDeclined: sorter('declinedParticipantIds', 'declined'),
    sortedAll: sorter('participantIds', 'all participants'),
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
  setValue: {
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    modeList:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.list,
    sortMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.SORT.list,
    modeValue:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.value,
    layout:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.LAYOUT.list,
    filterConfirmed:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER.confirmed,
    filterPending:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER.pending,
    filterDeclined:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.FILTER.declined,
    participantViewModeModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
    participantViewModeModalSortBy:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.sort,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
  isLoading: {
    loading: [TEMPLATE_API, GET_PARTICIPANTS],
  },
});
