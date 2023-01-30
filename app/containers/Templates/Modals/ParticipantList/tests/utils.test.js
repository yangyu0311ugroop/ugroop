import { SORT_CONSTANTS } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

import {
  sorter,
  getValues,
  getterParticipantsWithNoGroup,
  mergeParticipantIdsWithGroupIds,
  getParticipantWithSortValues,
  getterParticipantsWithGroup,
} from '../utils';

describe('utils', () => {
  describe('getterParticipantsWithNoGroup', () => {
    const targetIds = 'participants';
    const key = 'sample';
    const props = {
      participants: [1, 2, 3],
    };
    describe('keyPath', () => {
      it('should get groups based on the targetId', () => {
        const config = getterParticipantsWithNoGroup(targetIds, key);
        const keyPaths = config.keyPath(props);

        expect(keyPaths).toEqual(
          props.participants.map(id => NODE_STORE_SELECTORS.groups({ id })),
        );
      });
    });

    describe('cacheKey', () => {
      it('should return a particular cacheKey string', () => {
        const config = getterParticipantsWithNoGroup(targetIds, key);
        const cacheKey = config.cacheKey(props);

        expect(cacheKey).toEqual(
          `ParticipantList.${key}.${props.participants.toString()}.`,
        );
      });
    });

    describe('props', () => {
      it('should return the targetIds only', () => {
        const config = getterParticipantsWithNoGroup(targetIds, key);
        const returnedProps = config.props(props);

        expect(returnedProps).toEqual(props.participants);
      });
    });

    describe('getter', () => {
      it('should return empty array if participantIds is not an array', () => {
        const config = getterParticipantsWithNoGroup(targetIds, key);
        const args = [null, null, null];
        const result = config.getter(...args);

        expect(result).toEqual([]);
      });

      it('should return all participant with no group', () => {
        const config = getterParticipantsWithNoGroup(targetIds, key);
        const args = [[], [1], [1, 2]];
        const result = config.getter(...args);

        expect(result).toEqual([1]);
      });
    });
  });

  describe('getterParticipantsWithGroup', () => {
    const config = getterParticipantsWithGroup('participants', 'sample');
    const props = {
      participants: [1],
    };
    describe('keyPath', () => {
      it('should return group keyPath', () => {
        const keyPaths = config.keyPath(props);

        expect(keyPaths).toEqual([NODE_STORE_SELECTORS.groups({ id: 1 })]);
      });
    });

    describe('cacheKey', () => {
      it('should return a cacheKey by default', () => {
        const cacheKey = config.cacheKey(props);

        expect(cacheKey).toEqual('ParticipantList.sample.1.');
      });
    });

    describe('props', () => {
      it('should return targetIds ids', () => {
        const returnedProps = config.props(props);

        expect(returnedProps).toEqual(props.participants);
      });
    });

    describe('getter', () => {
      it('should return participants with groups', () => {
        const args = [[1], [], [1]];

        const returned = config.getter(...args);

        expect(returned).toEqual([1]);
      });

      it('should return participants with groups', () => {
        const args = [[1], [], null];

        const returned = config.getter(...args);

        expect(returned).toEqual([]);
      });
    });
  });

  describe('mergeParticipantIdsWithGroupIds', () => {
    describe('cacheKey', () => {
      it('should return a particular shape of cacheKey', () => {
        const config = mergeParticipantIdsWithGroupIds({});
        const props = {
          participantWithNoGroups: [1],
          groups: [2, 3],
        };
        const cacheKey = config.cacheKey(props);

        expect(cacheKey).toEqual(
          `ParticipantList.participantWithNoGroups.${props.participantWithNoGroups.toString()}.${props.groups.toString()}`,
        );
      });
    });

    describe('props', () => {
      it('should return participant ids and group ids as props', () => {
        const config = mergeParticipantIdsWithGroupIds({});
        const props = {
          participantWithNoGroups: [1],
          groups: [2, 3],
        };
        const returnedProps = config.props.map(func => func(props));

        expect(returnedProps).toEqual([
          props.participantWithNoGroups,
          props.groups,
        ]);
      });
    });

    describe('getter', () => {
      it('should merge participant ids with group ids', () => {
        const config = mergeParticipantIdsWithGroupIds({});
        const props = {
          participantWithNoGroups: [1],
          groups: [2, 3],
        };
        const result = config.getter(props);

        expect(result).toEqual([2, 3, 1]);
      });
    });
  });

  describe('getParticipantWithSortValues', () => {
    describe('keyPath', () => {
      it('should return keyPath for createdAt if sortMode is createdAt', () => {
        const props = {
          confirmedParticipantsWithNoGroups: [1, 2],
          groups: [3, 4],
        };
        const config = getParticipantWithSortValues({});
        const keyPaths = config.keyPath(props);
        expect(keyPaths).toEqual(
          [1, 2].map(id => NODE_STORE_SELECTORS.createdAt({ id })),
        );
      });

      it('should return keyPath for firstName if sortMode is not createdAt', () => {
        const props = {
          confirmedParticipantsWithNoGroups: [1, 2],
          groups: [3, 4],
          sortMode: 'name',
        };
        const config = getParticipantWithSortValues({});
        const keyPaths = config.keyPath(props);
        expect(keyPaths).toEqual(
          [1, 2].map(id => NODE_STORE_SELECTORS.firstName({ id })),
        );
      });

      it('should return keyPath for type if sortMode is by type', () => {
        const props = {
          confirmedParticipantsWithNoGroups: [1, 2],
          groups: [3, 4],
          sortMode: SORT_CONSTANTS.TYPE,
        };
        const config = getParticipantWithSortValues(props);
        const keyPaths = config.keyPath(props);
        expect(keyPaths).toEqual(
          [1, 2].map(id => NODE_STORE_SELECTORS.type({ id })),
        );
      });
    });

    describe('cacheKey', () => {
      it('should return a particular cachekey string', () => {
        const props = {
          confirmedParticipantsWithNoGroups: [1, 2],
          groups: [3, 4],
          sortMode: 'name',
        };
        const config = getParticipantWithSortValues({});
        const cacheKey = config.cacheKey(props);

        expect(cacheKey).toEqual(
          `ParticipantList.confirmedParticipantWithSortValue.${props.groups.toString()}.${
            props.sortMode
          }`,
        );
      });
    });

    describe('props', () => {
      it('should return the id keys', () => {
        const props = {
          confirmedParticipantsWithNoGroups: [1, 2],
          groups: [3, 4],
          sortMode: 'name',
        };
        const config = getParticipantWithSortValues({});
        const returnedProps = config.props(props);

        expect(returnedProps).toEqual(props.confirmedParticipantsWithNoGroups);
      });
    });

    describe('getter', () => {
      it('should return empty array if participantIds is empty', () => {
        const args = ['a', 'b', []];
        const config = getParticipantWithSortValues({});
        const result = config.getter(...args);

        expect(result).toEqual([]);
      });

      it('should return tuple of participant ids and their sort value', () => {
        const args = ['a', 'b', [1, 2]];
        const config = getParticipantWithSortValues({});
        const result = config.getter(...args);

        expect(result).toEqual([[1, 'a'], [2, 'b']]);
      });
    });
  });

  describe('getValues', () => {
    it('should have keyPath', () => {
      const { keyPath } = getValues('knownAs');
      const userNodeUserIdsAll = [1];
      expect(keyPath({ userNodeUserIdsAll })).toEqual(
        userNodeUserIdsAll.map(id => USER_STORE_SELECTORS.knownAs({ id })),
      );
    });
    it('should have keyPath that returns empty array', () => {
      const { keyPath } = getValues('knownAs');
      expect(keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const { cacheKey } = getValues('knownAs');
      const userNodeUserIdsAll = [1];
      expect(cacheKey({ userNodeUserIdsAll })).toEqual(
        `nodeUserIds.userNodes.knownAsValues.forSort.${1}`,
      );
    });
    it('should have cacheKey if no userNodeUserIdsAll', () => {
      const { cacheKey } = getValues('knownAs');
      expect(cacheKey({})).toEqual(
        `nodeUserIds.userNodes.knownAsValues.forSort.${null}`,
      );
    });
    it('should have props that returns userNodeUserNodesIds', () => {
      const { props } = getValues('knownAs');
      const userNodeUserNodesIds = [1];
      expect(props({ userNodeUserNodesIds })).toEqual([1]);
    });
    it('should have props that returns empty array', () => {
      const { props } = getValues('knownAs');
      expect(props({})).toEqual([]);
    });
    it('should have getter that returns correct values', () => {
      const { getter } = getValues('knownAs');
      const args = [1, 2, ['a', 'b']];
      const returned = [['a', 1], ['b', 2]];
      expect(getter(...args)).toEqual(returned);
    });
  });

  describe('sorter', () => {
    it('should have keyPath', () => {
      const { keyPath } = sorter('targetIds', 'status');
      const targetIds = [1];
      expect(keyPath({ targetIds, sortMode: 'createdAt' })).toEqual(
        targetIds.map(id => NODE_STORE_SELECTORS.createdAt({ id })),
      );
    });

    it('should not break if targetIds is undefined', () => {
      const { keyPath } = sorter('targetIds', 'status');
      expect(keyPath({ sortMode: 'createdAt' })).toEqual([]);
    });

    it('should have keyPath with default sortMode', () => {
      const { keyPath } = sorter('targetIds', 'status');
      const targetIds = [1];
      expect(keyPath({ targetIds })).toEqual(
        targetIds.map(id => NODE_STORE_SELECTORS.createdAt({ id })),
      );
    });
    it('should have cacheKey', () => {
      const { cacheKey } = sorter('targetIds', 'status');
      const targetIds = [1];
      const reactions = [1];
      const confirmedParticipantIds = [1];
      const pendingParticipantIds = [1];
      const declinedParticipantIds = [1];
      expect(
        cacheKey({
          targetIds,
          sortMode: 'createdAt',
          reactions,
          confirmedParticipantIds,
          pendingParticipantIds,
          declinedParticipantIds,
        }),
      ).toEqual(`sorted.status.createdAt.${1}.1.1.1.1`);
    });

    it('should not break cacheKey even if targetIds was undefined', () => {
      const { cacheKey } = sorter('targetIds', 'status');
      const reactions = [1];
      const confirmedParticipantIds = [1];
      const pendingParticipantIds = [1];
      const declinedParticipantIds = [1];
      expect(
        cacheKey({
          sortMode: 'createdAt',
          reactions,
          confirmedParticipantIds,
          pendingParticipantIds,
          declinedParticipantIds,
        }),
      ).toEqual(`sorted.status.createdAt..1.1.1.1`);
    });

    it('should have props', () => {
      const { props } = sorter('targetIds', 'status');
      const args = {
        targetIds: [1],
        sortMode: 'createdAt',
        participantViewModeModalFilter: 'confirmed',
        confirmedParticipantIds: [1],
      };
      expect(props(args)).toEqual({
        ids: [1],
        otherValues: [],
        reactionCountValues: [],
        sortMode: 'createdAt',
        participantIds: [1],
      });
    });

    it('should have props with ids as empty array if ids was not defined', () => {
      const { props } = sorter('targetIds', 'status');
      const args = {
        sortMode: 'createdAt',
        participantViewModeModalFilter: 'confirmed',
        confirmedParticipantIds: [1],
      };
      expect(props(args)).toEqual({
        ids: [],
        otherValues: [],
        reactionCountValues: [],
        sortMode: 'createdAt',
        participantIds: [1],
      });
    });

    it('should have props if sortMode and participantViewModeModalFilter is not specified', () => {
      const { props } = sorter('targetIds', 'status');
      const args = {
        targetIds: [1],
        confirmedParticipantIds: [1],
      };
      expect(props(args)).toEqual({
        ids: [1],
        otherValues: [],
        reactionCountValues: [],
        sortMode: 'createdAt',
        participantIds: [1],
      });
    });
    it('should have getter that returns sorted values', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        '2019-07-17T02:33:31.431Z',
        '2019-09-23T08:45:18.896Z',
        '2019-11-19T08:40:08.096Z',
        '2019-11-19T09:04:44.183Z',
        {
          ids: [1597, 1820, 1898, 1900],
          otherValues: [],
          participantIds: [1544, 1593, 1869, 1998, 1999, 2000, 2006, 2014],
          reactionCountValues: [],
          sortMode: 'createdAt',
        },
      ];
      const sorted = [1597, 1820, 1898, 1900];
      expect(getter(...args)).toEqual(sorted);
    });
    it('should return sortedValues if knownAs', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        'Another',
        'Fourth',
        'Lalisa',
        'Lalisa',
        {
          ids: [1597, 1820, 1898, 1900],
          otherValues: [
            [1544, 'Elijah Tristan Pekson'],
            [1593, 'Matty Mullins'],
            [1869, 'Lisa Manoban'],
          ],
          participantIds: [1544, 1593, 1869, 1998, 1999, 2000, 2006, 2014],
          reactionCountValues: [],
          sortMode: 'name',
        },
      ];
      const sorted = [1597, 1820, 1898, 1900];
      expect(getter(...args)).toEqual(sorted);
    });
    it('should have getter that return empty array', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        'Elijah Tristan',
        'Another',
        'Fourth',
        'Lalisa',
        {
          ids: [],
          otherValues: [],
          participantIds: [1544, 1597, 1820, 1900],
          reactionCountValues: [
            { participantNode: 1544, reactionCount: 5 },
            { participantNode: 1593, reactionCount: 4 },
            { participantNode: 1869, reactionCount: 7 },
          ],
          sortMode: 'mostLikes',
        },
      ];
      expect(getter(...args)).toEqual([]);
    });
    it('should return sorted values if sorting reactions', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        'Elijah Tristan',
        'Another',
        'Fourth',
        'Lalisa',
        {
          ids: [1544, 1597, 1820, 1900],
          otherValues: [],
          participantIds: [1544, 1597, 1820, 1900],
          reactionCountValues: [
            { participantNode: 1544, reactionCount: 5 },
            { participantNode: 1593, reactionCount: 4 },
            { participantNode: 1869, reactionCount: 7 },
          ],
          sortMode: 'mostLikes',
        },
      ];
      const sorted = [1544, 1597, 1820, 1900];
      expect(getter(...args)).toEqual(sorted);
    });
    it('should return sorted values if sorting medicals and there are medicals', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        2,
        2,
        0,
        1,
        0,
        0,
        {
          ids: [1544, 1593, 1998, 2000, 2006, 2014],
          otherValues: [
            [1544, 'Elijah Tristan'],
            [1593, 'Matty'],
            [1597, 'Another'],
            [1820, 'Fourth'],
            [1869, 'Lisa'],
            [1900, 'Lalisa'],
            [1908, 'Kim'],
            [1909, 'Chaeyoung'],
            [1924, 'Bruce'],
            [1928, 'Mama'],
            [1929, 'Starry'],
            [1945, 'Lisa'],
            [1952, 'Work'],
            [1953, 'Jake'],
            [1959, 'Koo'],
            [1961, 'One'],
            [1990, 'Natsu'],
            [1991, 'Ash'],
            [1993, 'Gajee'],
            [1998, 'Wendy'],
            [1999, 'Aaron'],
            [2000, 'A'],
            [2006, 'Matt'],
            [2014, 'Neil'],
          ],
          participantIds: [1544, 1593, 1998, 2000, 2006, 2014],
          reactionCountValues: [],
          sortMode: 'medicals',
        },
      ];
      const sorted = [1544, 1593, 2000, 2006, 2014, 1998];
      expect(getter(...args)).toEqual(sorted);
    });
    it('should return sorted values if sorting medicals', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        0,
        1,
        4,
        0,
        3,
        {
          ids: [1597, 1820, 1869, 1900, 1999],
          otherValues: [
            [1544, 'Elijah Tristan'],
            [1593, 'Matty'],
            [1597, 'Another'],
            [1820, 'Fourth'],
            [1869, 'Lisa'],
            [1900, 'Lalisa'],
            [1908, 'Kim'],
            [1909, 'Chaeyoung'],
            [1924, 'Bruce'],
            [1928, 'Mama'],
            [1929, 'Starry'],
            [1945, 'Lisa'],
            [1952, 'Work'],
            [1953, 'Jake'],
            [1959, 'Koo'],
            [1961, 'One'],
            [1990, 'Natsu'],
            [1991, 'Ash'],
            [1993, 'Gajee'],
            [1998, 'Wendy'],
            [1999, 'Aaron'],
            [2000, 'A'],
            [2006, 'Matt'],
            [2014, 'Neil'],
          ],
          participantIds: [1597, 1820, 1869, 1900, 1999],
          sortMode: 'medicals',
        },
      ];
      const sorted = [1869, 1999, 1820, 1597, 1900];
      expect(getter(...args)).toEqual(sorted);
    });
    it('should return sorted values if sorting last seen', () => {
      const { getter } = sorter('targetIds', 'status');
      const args = [
        'Another',
        'Fourth',
        'Lisa',
        'Lalisa',
        'Aaron',
        {
          ids: [1597, 1820, 1869, 1900, 1999],
          otherValues: [
            [1544, '2020-02-05T07:59:33.087Z'],
            [1593, '2020-02-03T08:45:15.927Z'],
            [1869, '2020-02-04T05:46:58.647Z'],
          ],
          participantIds: [1544, 1593, 1998, 2000, 2006, 2014],
          reactionCountValues: [],
          sortMode: 'lastSeen',
        },
      ];
      const sorted = [1869, 1999, 1597, 1820, 1900];
      expect(getter(...args)).toEqual(sorted);
    });
  });
});
