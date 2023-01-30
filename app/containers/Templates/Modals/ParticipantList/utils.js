import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { SORT_CONSTANTS, DEFAULT } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';
import sortBy from 'lodash/sortBy';
import isString from 'lodash/isString';
import { SORT_HELPERS } from 'utils/sorter';

export const getterParticipantsWithNoGroup = (targetIds, key) => ({
  keyPath: ({ [targetIds]: ids = [] }) =>
    ids.map(id => NODE_STORE_SELECTORS.groups({ id })),
  cacheKey: ({ [targetIds]: ids = [], groupParticipants = [] }) =>
    `ParticipantList.${key}.${ids.toString()}.${groupParticipants.toString()}`,
  props: ({ [targetIds]: ids }) => ids,
  getter: (...args) => {
    const participantGroups = dropRight(args);
    const [participantIds] = takeRight(args);
    if (!Array.isArray(participantIds)) return [];
    const participantIdsWithGroups = zip(participantIds, participantGroups);
    const filtered = participantIdsWithGroups.filter(a => {
      if (Array.isArray(a[1]) && a[1].length > 0) return true;
      return false;
    });
    const participantIdsOnly = filtered.map(a => a[0]);
    const participantsWithNoGroup = participantIds.filter(
      participantId => !participantIdsOnly.includes(participantId),
    );

    return participantsWithNoGroup;
  },
});

export const getterParticipantsWithGroup = (targetIds, key) => ({
  keyPath: ({ [targetIds]: ids = [] }) =>
    ids.map(id => NODE_STORE_SELECTORS.groups({ id })),
  cacheKey: ({ [targetIds]: ids = [], groupParticipants = [] }) =>
    `ParticipantList.${key}.${ids.toString()}.${groupParticipants.toString()}`,
  props: ({ [targetIds]: ids }) => ids,
  getter: (...args) => {
    const participantGroups = dropRight(args);
    const [participantIds] = takeRight(args);
    if (!Array.isArray(participantIds)) return [];
    const participantIdsWithGroups = zip(participantIds, participantGroups);
    const filtered = participantIdsWithGroups.filter(a => {
      if (Array.isArray(a[1]) && a[1].length > 0) return false;
      return true;
    });
    const participantIdsOnly = filtered.map(a => a[0]);
    const participantsWithNoGroup = participantIds.filter(
      participantId => !participantIdsOnly.includes(participantId),
    );

    return participantsWithNoGroup;
  },
});

export const mergeParticipantIdsWithGroupIds = ({
  participantIdsKey = 'participantWithNoGroups',
  groupIdKeys = 'groups',
}) => ({
  cacheKey: ({ [participantIdsKey]: pIds = [], [groupIdKeys]: gIds = [] }) =>
    `ParticipantList.participantWithNoGroups.${pIds.toString()}.${gIds.toString()}`,
  props: [
    ({ [participantIdsKey]: pIds = [] }) => pIds,
    ({ [groupIdKeys]: gIds = [] }) => gIds,
  ],
  getter: ({ [participantIdsKey]: pIds = [], [groupIdKeys]: gIds = [] }) => [
    ...gIds,
    ...pIds,
  ],
});

export const getParticipantWithSortValues = ({
  idsKey = 'confirmedParticipantsWithNoGroups',
  groupIdsKey = 'groups',
  sortKey = 'sortMode',
  cacheKey = 'confirmedParticipantWithSortValue',
}) => ({
  keyPath: ({ [idsKey]: ids = [], [sortKey]: sortMode = 'createdAt' }) =>
    ids.map(participantId => {
      if (sortMode === SORT_CONSTANTS.TYPE)
        return NODE_STORE_SELECTORS.type({ id: participantId });

      if (sortMode === 'createdAt')
        return NODE_STORE_SELECTORS.createdAt({ id: participantId });

      return NODE_STORE_SELECTORS.firstName({ id: participantId });
    }),
  cacheKey: ({
    [groupIdsKey]: groups = [],
    [sortKey]: sortMode = 'createdAt',
  }) =>
    `ParticipantList.${cacheKey}.${
      groups ? groups.toString() : 'null'
    }.${sortMode.toString()}`,
  props: ({ [idsKey]: ids }) => ids,
  getter: (...args) => {
    const sortValues = dropRight(args);
    const [participantIds] = takeRight(args);
    if (participantIds.length === 0) return [];
    const participantAndSortValues = zip(participantIds, sortValues);

    return participantAndSortValues;
  },
});

export const sorter = (targetIds, status) => ({
  keyPath: ({ [targetIds]: ids = [], sortMode = 'createdAt' }) =>
    ids.map(id =>
      LOGIC_HELPERS.switchCase(sortMode, {
        [SORT_CONSTANTS.NAME]: NODE_STORE_SELECTORS.firstName({ id }),
        [SORT_CONSTANTS.LAST_NAME]: NODE_STORE_SELECTORS.lastName({ id }),
        [SORT_CONSTANTS.CREATED_AT]: NODE_STORE_SELECTORS.createdAt({ id }),
        [SORT_CONSTANTS.MEDICALS]: NODE_STORE_SELECTORS.calculatedMedicalCount({
          id,
        }),
        [SORT_CONSTANTS.LAST_SEEN]: NODE_STORE_SELECTORS.firstName({ id }),
        [SORT_CONSTANTS.MOST_LIKES]: NODE_STORE_SELECTORS.firstName({ id }),
      }),
    ),
  cacheKey: ({
    [targetIds]: ids = [],
    sortMode,
    reactions = [],
    confirmedParticipantIds = [],
    pendingParticipantIds = [],
    declinedParticipantIds = [],
  }) =>
    `sorted.${status}.${sortMode}.${ids.toString()}.${
      reactions.length ? reactions.toString() : null
    }.${
      confirmedParticipantIds.length ? confirmedParticipantIds.toString() : null
    }.${
      pendingParticipantIds.length ? pendingParticipantIds.toString() : null
    }.${
      declinedParticipantIds.length ? declinedParticipantIds.toString() : null
    }`,
  props: ({
    [targetIds]: ids = [],
    sortMode = 'createdAt',
    knownAsValues = [],
    lastSeenValues = [],
    firstNameValues = [],
    pairedReactionNodes = [],
    confirmedParticipantIds = [],
    pendingParticipantIds = [],
    declinedParticipantIds = [],
    participantViewModeModalFilter = 'confirmed',
  }) => {
    const otherValues = LOGIC_HELPERS.switchCase(sortMode, {
      [SORT_CONSTANTS.NAME]: knownAsValues,
      [SORT_CONSTANTS.LAST_SEEN]: lastSeenValues,
      [SORT_CONSTANTS.MEDICALS]: firstNameValues,
      [DEFAULT]: [],
    });
    const participantIds = LOGIC_HELPERS.switchCase(
      participantViewModeModalFilter,
      {
        [VARIANTS.CONFIRMED]: confirmedParticipantIds,
        [VARIANTS.PENDING]: pendingParticipantIds,
        [VARIANTS.DECLINED]: declinedParticipantIds,
        [VARIANTS.ALL_PARTICIPANTS]: confirmedParticipantIds.concat(
          declinedParticipantIds.concat(pendingParticipantIds),
        ),
        [DEFAULT]: confirmedParticipantIds.concat(
          declinedParticipantIds.concat(pendingParticipantIds),
        ),
      },
    );
    const reactionCountValues = LOGIC_HELPERS.switchCase(sortMode, {
      [SORT_CONSTANTS.MOST_LIKES]: pairedReactionNodes,
      [DEFAULT]: [],
    });
    return { ids, otherValues, reactionCountValues, sortMode, participantIds };
  },
  getter: (...args) => {
    const sortBasis = dropRight(args, 1);
    let unsortedValues = sortBasis;
    const unsortedIds = takeRight(args, 1);
    const unsorted = zip(unsortedIds[0].ids, unsortedValues);

    if (unsortedIds[0].ids.length === 0) return [];

    // sorting for reactions
    if (unsortedIds[0].sortMode === SORT_CONSTANTS.MOST_LIKES) {
      const nodesWithReactions = unsortedIds[0].reactionCountValues.map(
        item => ({ id: item.participantNode, content: item.reactionCount }),
      );
      // sort reactions
      const sortedReactions = nodesWithReactions
        .sort(SORT_HELPERS.sortFolderItemsByName('desc'))
        .map(item => item.id);
      const nodeIdsWithReactions = unsortedIds[0].reactionCountValues.map(
        item => item.participantNode,
      );
      // filter complete list of nodes for nodes without reactions
      const filterOtherNodes = unsorted.filter(
        item => !nodeIdsWithReactions.includes(item[0]),
      );

      // filter reaction nodes to check which ones are included in list
      const filteredSortedReactions = sortedReactions.filter(id =>
        unsortedIds[0].participantIds.includes(id),
      );

      const sortNames = sortBy(filterOtherNodes, SORT_HELPERS.sortValue).map(
        ([id]) => id,
      );

      // merge sorted reactions and sorted names
      const merged = filteredSortedReactions.concat(sortNames);
      return merged;
    }

    const sampleValue = unsortedValues[0];

    if (unsortedIds[0].otherValues) {
      const filter = unsortedIds[0].otherValues.filter(([id]) =>
        unsortedIds[0].ids.includes(id),
      );
      const filterIds = filter.map(f => f[0]);

      if (isString(sampleValue)) {
        unsortedValues = unsorted.reduce((acc, value) => {
          const index = filterIds.indexOf(value[0]);

          if (index === -1) return [...acc, value];

          return [...acc, filter[index]];
        }, []);
      } else {
        // sorting for Medicals and users without Medicals
        // users without medicals are sorted according to firstName
        // from the Node store. This will probably need to be
        // simplified later on
        unsortedValues = unsorted.reduce((acc, value) => {
          const index = filterIds.indexOf(value[0]);
          if (index === 0) {
            const valueIndex = filterIds.indexOf(value[0]);
            if (value[1] === 0) {
              return [...acc, filter[valueIndex]];
            }
            return [...acc, value];
          }
          if (value[1] === 0) {
            return [...acc, filter[index]];
          }
          return [...acc, value];
        }, []);
        const otherValues = unsortedValues.filter(item => !isString(item[1]));
        const firstNames = unsortedValues.filter(item => isString(item[1]));

        const sortOtherValues = otherValues
          .sort(SORT_HELPERS.sortArrayItems('desc'))
          .map(([id]) => id);

        const sortNames = sortBy(firstNames, SORT_HELPERS.sortValue).map(
          ([id]) => id,
        );

        const merged = sortOtherValues.concat(sortNames);
        return merged;
      }
    }

    if (unsortedIds[0].sortMode === SORT_CONSTANTS.LAST_SEEN) {
      const nodesLastSeen = unsortedValues.filter(
        item => new Date(item[1]).getTime() > 0,
      );
      const nodesLastSeenIds = nodesLastSeen.map(item => item[0]);
      const nodesNotAccessed = unsortedValues.filter(
        item => !nodesLastSeenIds.includes(item[0]),
      );
      const sortLastSeen = nodesLastSeen
        .sort(SORT_HELPERS.sortArrayItems('desc'))
        .map(([id]) => id);
      const sortNotAccessed = sortBy(
        nodesNotAccessed,
        SORT_HELPERS.sortValue,
      ).map(([id]) => id);
      const merged = sortLastSeen.concat(sortNotAccessed);
      return merged;
    }

    const sorted = sortBy(unsortedValues, SORT_HELPERS.sortValue).map(
      ([id]) => id,
    );

    return sorted;
  },
});

export const getValues = valueType => ({
  keyPath: ({ userNodeUserIdsAll = [] }) =>
    userNodeUserIdsAll.map(id =>
      LOGIC_HELPERS.switchCase(valueType, {
        [SORT_CONSTANTS.KNOWN_AS]: USER_STORE_SELECTORS.knownAs({ id }),
        [SORT_CONSTANTS.LAST_SEEN]: COORDINATE_DATA_STORE_SELECTORS.lastAccess({
          id,
        }),
      }),
    ),
  cacheKey: ({ userNodeUserIdsAll = [] }) =>
    `nodeUserIds.userNodes.${valueType}Values.forSort.${
      userNodeUserIdsAll.length ? userNodeUserIdsAll.toString() : null
    }`,
  props: ({ userNodeUserNodesIds = [] }) => userNodeUserNodesIds,
  getter: (...args) => {
    const [ids] = takeRight(args, 1);
    const knownAsValues = dropRight(args, 1);
    const paired = zip(ids, knownAsValues);
    return paired;
  },
});
