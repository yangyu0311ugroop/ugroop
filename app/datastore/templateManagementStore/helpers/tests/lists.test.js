import { List } from 'immutable';
import lists, { canCancel, canOverride } from '../lists';

describe('Operation Logic Tests', () => {
  const newOperation = {
    id: 123,
    toBeMovedId: 999,
    parentId: 10,
    action: 'MOVE_AFTER',
  };
  const list = List([
    { toBeMovedId: 123 },
    { toBeMovedId: 99, toBeMovedParentId: 1, parentId: 2 },
  ]);

  afterEach(() => jest.clearAllMocks());

  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(lists).toBeDefined();
    });
  });

  describe('canCancel()', () => {
    it('should return true if operations are opposite, either way', () => {
      const last = {
        id: 123,
        toBeMovedId: 999,
        parentId: 10,
        action: 'MOVE_BEFORE',
      };
      expect(canCancel(last, newOperation)).toBe(true);
      expect(canCancel(newOperation, last)).toBe(true);
    });

    it('should return true if operations are kinda opposite, either way', () => {
      const last = {
        id: 999,
        toBeMovedId: 123,
        parentId: 10,
        action: 'MOVE_AFTER',
      };
      expect(canCancel(last, newOperation)).toBe(true);
      expect(canCancel(newOperation, last)).toBe(true);
    });

    it('should return false if is across move', () => {
      const last = {
        id: 121,
        toBeMovedId: 999,
        parentId: 1,
        toBeMovedParentId: 2,
        action: 'MOVE_AFTER',
      };
      expect(canCancel(last, newOperation)).toBe(false);
      expect(canCancel(newOperation, last)).toBe(false);
    });

    it('should return false otherwise', () => {
      const last = { id: 121, toBeMovedId: 999, action: 'MOVE_BEFORE' };
      expect(canCancel(last, newOperation)).toBe(false);
      expect(canCancel(newOperation, last)).toBe(false);
    });
  });

  describe('lists.canOverride()', () => {
    it('should return true if action and toBeMovedId are matched, either way', () => {
      const last = { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' };
      expect(canOverride(last, newOperation)).toBe(true);
      expect(canOverride(newOperation, last)).toBe(true);
    });

    it('should return false otherwise', () => {
      const last = { id: 121, toBeMovedId: 990, action: 'MOVE_BEFORE' };
      expect(canOverride({}, newOperation)).toBe(false);
      expect(canOverride({ id: false }, newOperation)).toBe(false);
      expect(canOverride(newOperation, last)).toBe(false);
      expect(canOverride(last, newOperation)).toBe(false);
    });
  });

  describe('lists.push()', () => {
    it('should return new List with object', () => {
      expect(lists.push(newOperation)()).toEqual(List([newOperation]));
    });

    it('should return new List with object', () => {
      expect(lists.push(newOperation)(List())).toEqual(List([newOperation]));
    });

    it('should cancel each other', () => {
      const last = {
        id: 123,
        toBeMovedId: 999,
        parentId: 10,
        action: 'MOVE_BEFORE',
      };
      expect(lists.push(newOperation)(List([last]))).toEqual(List());
    });

    it('should push to the end', () => {
      const last = { id: 124, toBeMovedId: 999, action: 'MOVE_BEFORE' };
      expect(lists.push(newOperation)(List([last]))).toEqual(
        List([last, newOperation]),
      );
    });

    it('should reverse', () => {
      const last = {
        id: 999,
        toBeMovedId: 123,
        parentId: 10,
        action: 'MOVE_BEFORE',
      };
      expect(lists.push(newOperation)(List([last]))).toEqual(
        List([
          last,
          {
            toBeMovedId: 123,
            id: 999,
            parentId: 10,
            action: 'MOVE_BEFORE',
          },
        ]),
      );
    });
  });

  describe('lists.clear()', () => {
    it('should clear list', () => {
      expect(lists.clear(list)().size).toBe(0);
    });

    it('should return empty list', () => {
      expect(lists.clear()().size).toBe(0);
    });
  });

  describe('lists.default()', () => {
    it('should clear list', () => {
      expect(lists.default()).toEqual(List());
    });
  });

  describe('lists.toArray()', () => {
    it('should return array', () => {
      expect(lists.toArray(list)).toEqual([
        { toBeMovedId: 123 },
        { parentId: 2, toBeMovedId: 99, toBeMovedParentId: 1 },
      ]);
      expect(lists.toArray(List())).toEqual([]);
    });

    it('should return array even not a list', () => {
      expect(lists.toArray()).toEqual([]);
    });
  });

  describe('lists.reverseAction()', () => {
    it('should reverse action', () => {
      expect(lists.reverseAction('MOVE_AFTER')).toEqual('MOVE_BEFORE');
      expect(lists.reverseAction('MOVE_BEFORE')).toEqual('MOVE_AFTER');
    });
  });

  describe('lists.betterSwap()', () => {
    it('should return false if is across move', () => {
      expect(
        lists.betterSwap(list, { parentId: 1, toBeMovedParentId: 2 }),
      ).toBe(false);
    });

    it('should return false if toBeMovedId is dirty', () => {
      expect(lists.betterSwap(list, { toBeMovedId: 123 })).toBe(false);
    });

    it('should return false if id is NOT dirty', () => {
      expect(lists.betterSwap(list, { toBeMovedId: 1234, id: 1235 })).toBe(
        false,
      );
    });

    it('should return true', () => {
      expect(lists.betterSwap(list, { toBeMovedId: 124, id: 123 })).toBe(true);
    });
  });

  describe('lists.swap()', () => {
    it('should swap', () => {
      expect(
        lists.swap({ id: 1, toBeMovedId: 2, action: 'MOVE_AFTER' }),
      ).toEqual({ id: 2, toBeMovedId: 1, action: 'MOVE_BEFORE' });
    });
  });

  describe('lists.isEmpty()', () => {
    it('should return true if not a list', () => {
      expect(lists.isEmpty()).toBe(true);
    });

    it('should return true if list is empty', () => {
      expect(lists.isEmpty(List())).toBe(true);
    });

    it('should return false otherwise', () => {
      expect(lists.isEmpty(list)).toBe(false);
    });
  });

  describe('lists.has()', () => {
    it('should return true', () => {
      expect(lists.has(list, 123)).toBe(true);
    });

    it('should return false', () => {
      expect(lists.has(list, 999)).toBe(false);
      expect(lists.has(list)).toBe(false);
    });
  });

  describe('lists.hasBeenMovedAcross()', () => {
    it('should return true', () => {
      expect(lists.hasBeenMovedAcross(list, 99)).toBe(true);
    });

    it('should return false', () => {
      expect(lists.hasBeenMovedAcross(list, 123)).toBe(false);
      expect(lists.hasBeenMovedAcross(list)).toBe(false);
    });
  });

  describe('lists.notBelongToSameParent()', () => {
    it('should use default value', () => {
      expect(lists.notBelongToSameParent()()).toBe(false);
    });

    it('should return false', () => {
      expect(
        lists.notBelongToSameParent({ parentId: 1 })({ parentId: 1 }),
      ).toBe(false);
    });

    it('should return true', () => {
      expect(
        lists.notBelongToSameParent({ parentId: 1 })({ parentId: 2 }),
      ).toBe(true);
    });
  });

  describe('lists.isFirstLevel()', () => {
    it('should use default value', () => {
      expect(lists.isFirstLevel()).toBe(true);
    });

    it('should return false', () => {
      expect(lists.isFirstLevel({ parentId: 1 })).toBe(false);
    });

    it('should return true', () => {
      expect(lists.isFirstLevel({})).toBe(true);
    });
  });

  describe('lists.clearSections()', () => {
    it('should use default', () => {
      expect(lists.clearSections()).toEqual(List());
    });

    it('should clear sections', () => {
      expect(lists.clearSections(list)).toEqual(List([{ toBeMovedId: 123 }]));
    });
  });

  describe('lists.clearAll()', () => {
    it('should use default', () => {
      expect(lists.clearAll()()).toEqual(List());
    });

    it('should clear all', () => {
      expect(lists.clearAll()(list)).toEqual(List([]));
    });
  });

  describe('lists.optimiseList()', () => {
    it('should return if empty', () => {
      expect(lists.optimiseList()).toEqual();
      expect(lists.optimiseList(List())).toEqual(List([]));
    });

    it('should swap', () => {
      const originalList = List([
        { id: 120, toBeMovedId: 999, action: 'MOVE_BEFORE' },
        { id: 999, toBeMovedId: 125, action: 'MOVE_BEFORE' },
      ]);
      const optimisedList = lists.optimiseList(originalList);
      expect(optimisedList.toArray()).toEqual([
        { id: 120, toBeMovedId: 999, action: 'MOVE_BEFORE' },
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
    });

    it('should swap and override', () => {
      const originalList = List([
        { id: 124, toBeMovedId: 999, action: 'MOVE_AFTER' },
        { id: 999, toBeMovedId: 125, action: 'MOVE_BEFORE' },
      ]);
      const optimisedList = lists.optimiseList(originalList);
      expect(optimisedList.toArray()).toEqual([
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
    });
  });

  describe('lists.optimise()', () => {
    it('should return optimised list', () => {
      const originalList = List([
        { id: 123, toBeMovedId: 999, action: 'MOVE_AFTER' },
        { id: 124, toBeMovedId: 999, action: 'MOVE_AFTER' },
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
      const optimisedList = lists.optimise(originalList).toArray();
      expect(optimisedList).toEqual([
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
    });

    it('should group by parentId', () => {
      const originalList = List([
        {
          id: 123,
          toBeMovedId: 999,
          parentId: 1,
          action: 'MOVE_AFTER',
        },
        {
          id: 124,
          toBeMovedId: 999,
          parentId: 1,
          action: 'MOVE_AFTER',
        },
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
      const optimisedList = lists.optimise(originalList).toArray();
      expect(optimisedList).toEqual([
        {
          id: 124,
          toBeMovedId: 999,
          parentId: 1,
          action: 'MOVE_AFTER',
        },
        { id: 125, toBeMovedId: 999, action: 'MOVE_AFTER' },
      ]);
    });
  });
});
