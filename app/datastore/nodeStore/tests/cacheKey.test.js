import { NODE_STORE_CACHE_KEYS } from '../cacheKey';

describe('NODE_STORE_CACHE_KEYS', () => {
  describe('remainingCheckitemsCount()', () => {
    it('should return remainingCheckitemsCount cacheKey', () => {
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({}),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({ checklists: 123 }),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({ statuses: 123 }),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({ type: 'checklist' }),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({
          checklists: [222],
          statuses: [123],
          type: 'checklist',
        }),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.remainingCheckitemsCount({
          checklists: [222],
          statuses: [123],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('openClosedCount()', () => {
    it('should return openClosedCount cacheKey', () => {
      expect(
        NODE_STORE_CACHE_KEYS.openClosedCount({ id: [222] }),
      ).toMatchSnapshot();
      expect(NODE_STORE_CACHE_KEYS.openClosedCount({})).toBe('');
      expect(NODE_STORE_CACHE_KEYS.openClosedCount({ id: 112 })).toBe('');
      expect(NODE_STORE_CACHE_KEYS.openClosedCount({ id: false })).toBe('');
      expect(NODE_STORE_CACHE_KEYS.openClosedCount({ id: 'some id' })).toBe('');
    });
  });

  describe('checklists()', () => {
    it('should return checklists cacheKey', () => {
      expect(NODE_STORE_CACHE_KEYS.checklists({ id: 222 })).toMatchSnapshot();
    });
  });

  describe('allChecklists()', () => {
    it('should return allChecklists cacheKey', () => {
      expect(NODE_STORE_CACHE_KEYS.allChecklists({})).toBe(undefined);
      expect(
        NODE_STORE_CACHE_KEYS.allChecklists({ id: 222 }),
      ).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.allChecklists({ id: [1, 2] }),
      ).toMatchSnapshot();
    });
  });

  describe('allStatuses()', () => {
    it('should return allStatuses cacheKey', () => {
      expect(NODE_STORE_CACHE_KEYS.allStatuses({})).toBe(undefined);
      expect(NODE_STORE_CACHE_KEYS.allStatuses({ id: 222 })).toMatchSnapshot();
      expect(
        NODE_STORE_CACHE_KEYS.allStatuses({ id: [1, 2] }),
      ).toMatchSnapshot();
    });
  });

  describe('cachedChildren()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'id';
      const props = { [idProp]: id };
      const propNames = { idProp };
      expect(
        NODE_STORE_CACHE_KEYS.cachedChildren(propNames)(props),
      ).toMatchSnapshot();
    });
  });

  describe('index()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'id';
      const parentNodeId = 2;
      const parentNodeIdProp = 'parentNodeIdProp';
      const props = {
        [idProp]: id,
        [parentNodeIdProp]: parentNodeId,
      };
      const propNames = { idProp, parentNodeIdProp };
      expect(
        NODE_STORE_CACHE_KEYS.cachedIndex(propNames)(props),
      ).toMatchSnapshot();
    });
  });

  describe('eventDataIds()', () => {
    it('returns correct key', () => {
      const ids = [1, 2];
      const idsProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.eventDataIds({ idsProp })({ [idsProp]: ids }),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(NODE_STORE_CACHE_KEYS.eventDataIds({})({})).toMatchSnapshot();
    });
  });

  describe('addEventDataIds()', () => {
    it('returns correct key', () => {
      const ids = [1, 2];
      const nodesProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.addEventDataIds({ nodesProp })({
          [nodesProp]: ids,
        }),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(NODE_STORE_CACHE_KEYS.addEventDataIds({})({})).toMatchSnapshot();
    });
  });

  describe('filterByTypes()', () => {
    it('returns correct key', () => {
      const idsPropValue = [1, 2];
      const ids = 'ids';
      const typesPropValue = ['a', 'b'];
      const types = 'types';
      const props = { [ids]: idsPropValue, [types]: typesPropValue };
      expect(
        NODE_STORE_CACHE_KEYS.filterByTypes({ ids, types })(props),
      ).toMatchSnapshot();
    });
  });

  describe('filterByStatuses()', () => {
    it('returns correct key', () => {
      const idsPropValue = [1, 2];
      const ids = 'ids';
      const statusesPropValue = ['a', 'b'];
      const statuses = 'statuses';
      const props = { [ids]: idsPropValue, [statuses]: statusesPropValue };
      expect(
        NODE_STORE_CACHE_KEYS.filterByStatuses({ ids, statuses })(props),
      ).toMatchSnapshot();
    });
  });

  describe('filterAndSortByTime()', () => {
    it('returns correct key', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterAndSortByTime({
          idProp: 'idProp',
          dateProp: 'dateProp',
          nodesProp: 'nodesProp',
        })({
          idProp: 'idProp',
          dateProp: 'dateProp',
          nodesProp: [1],
        }),
      ).toMatchSnapshot();
    });

    it('returns null', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterAndSortByTime({
          idProp: 'idProp',
          dateProp: 'dateProp',
          nodesProp: 'nodesProp',
        })({
          idProp: 'idProp',
          dateProp: 'dateProp',
        }),
      ).toMatchSnapshot();
    });
  });

  describe('filterCalculatedEvents()', () => {
    it('returns correct key', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterCalculatedEvents({
          grouping: [{ cacheKey: '1' }],
          hasTime: true,
        })({ id: 333 }),
      ).toMatchSnapshot();
    });

    it('returns null', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterCalculatedEvents({
          hasTime: true,
        })({ id: 333 }),
      ).toMatchSnapshot();
    });
  });

  describe('filterByNotMatchingTime()', () => {
    it('returns correct key', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterByNotMatchingTime({
          idsProp: 'idsProp',
          nodesProp: 'nodesProp',
        })({
          idsProp: [1],
          nodesProp: [2],
        }),
      ).toMatchSnapshot();
    });

    it('returns null', () => {
      expect(
        NODE_STORE_CACHE_KEYS.filterByNotMatchingTime({
          idsProp: 'idsProp',
          nodesProp: 'nodesProp',
        })({}),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartTimeMoment()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeMoment({ idProp })({
          [idProp]: id,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedEndTimeMoment()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedEndTimeMoment({ idProp })({
          [idProp]: id,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartEndTimes()', () => {
    it('returns correct key', () => {
      const ids = [1, 2];
      const idsProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartEndTimes({ idsProp })({
          [idsProp]: ids,
        }),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartEndTimes({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartTimeValues()', () => {
    it('returns correct key', () => {
      const ids = [1, 2];
      const idsProp = 'ids';
      const sort = 'sort';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeValues({ idsProp, sort })({
          [idsProp]: ids,
        }),
      ).toMatchSnapshot();
    });

    it('returns correct key with no props', () => {
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeValues({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedTrailParent()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedTrailParent({ idProp })({
          [idProp]: id,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('cachedCalculatedEvents()', () => {
    it('returns correct key', () => {
      const id = 1;
      const idProp = 'ids';
      expect(
        NODE_STORE_CACHE_KEYS.cachedCalculatedEvents({ idProp })({
          [idProp]: id,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('sortByProp()', () => {
    it('returns correct key', () => {
      const idsPropValue = [1, 2];
      const ids = 'ids';
      const pathPropValue = ['a', 'b'];
      const path = 'path';
      const props = { [ids]: idsPropValue, [path]: pathPropValue };
      expect(
        NODE_STORE_CACHE_KEYS.sortByProp({ ids, path, reverse: true })(props),
      ).toMatchSnapshot();
    });
  });

  describe('cachedCalculatedEvents', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.cachedCalculatedEvents({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedEndTimeMoment', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedEndTimeMoment({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartTimeMoment', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeMoment({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartEndTimes', () => {
    it('should return the correct cache key', () => {
      const idsProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartEndTimes({ idsProp })({
          [idsProp]: [1, 2],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculatedStartTimeValues', () => {
    it('should return the correct cache key', () => {
      const idsProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.calculatedStartTimeValues({ idsProp })({
          [idsProp]: [1, 2],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('participantWithSeats', () => {
    it('should return the correct cache key', () => {
      const idsProp = 'id';
      const secondIdProp = 'secondProp';
      expect(
        NODE_STORE_CACHE_KEYS.participantsWithSeats({ idsProp, secondIdProp })({
          [idsProp]: [1, 2],
          [secondIdProp]: 2,
        }),
      ).toMatchSnapshot();
    });

    it('should return the correct cache key even if idsProp is null', () => {
      const idsProp = 'id';
      const secondIdProp = 'secondProp';
      expect(
        NODE_STORE_CACHE_KEYS.participantsWithSeats({ idsProp, secondIdProp })({
          [idsProp]: null,
          [secondIdProp]: 2,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('participantsWithoutSeats', () => {
    it('should return the correct cache key', () => {
      const idsProp = 'id';
      const secondIdProp = 'secondProp';
      expect(
        NODE_STORE_CACHE_KEYS.participantsWithoutSeats({
          idsProp,
          secondIdProp,
        })({
          [idsProp]: [1, 2],
          [secondIdProp]: 2,
        }),
      ).toMatchSnapshot();
    });

    it('should return the correct cache key event if idsProp is null', () => {
      const idsProp = 'id';
      const secondIdProp = 'secondProp';
      expect(
        NODE_STORE_CACHE_KEYS.participantsWithoutSeats({
          idsProp,
          secondIdProp,
        })({
          [idsProp]: null,
          [secondIdProp]: 2,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('confirmedParticipants', () => {
    it('should return the correct cache key', () => {
      const idsProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.confirmedParticipants({ idsProp })({
          [idsProp]: [1, 2],
        }),
      ).toMatchSnapshot();
    });

    it('should return the correct cache key even if idsProp is null', () => {
      const idsProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.confirmedParticipants({ idsProp })({
          [idsProp]: null,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('templateIdByTrail', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.templateIdByTrail({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('parentNodeIdViaTrail', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.parentNodeIdViaTrail({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });
  describe('cachedCalculatedNodeEvents', () => {
    it('should return the correct cache key', () => {
      const idProp = 'id';
      expect(
        NODE_STORE_CACHE_KEYS.cachedCalculatedNodeEvents({ idProp })({
          [idProp]: 1,
        }),
      ).toMatchSnapshot();
    });
  });
});
