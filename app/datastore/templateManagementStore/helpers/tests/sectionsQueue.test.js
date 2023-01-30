import { List } from 'immutable';
import lists from '../sectionsQueue';

describe('Smoke Tests', () => {
  const list = List([
    { toBeMovedId: 1 },
    { toBeMovedId: 2 },
    { toBeMovedId: 3 },
  ]);
  const operation = { toBeMovedId: 10 };

  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(lists).toBeDefined();
    });
  });

  describe('has()', () => {
    it('should use default value', () => {
      expect(lists.has(undefined, 1)).toBe(false);
    });

    it('should return false if NOT found', () => {
      expect(lists.has(list, 222)).toBe(false);
    });

    it('should return true if found', () => {
      expect(lists.has(list, 1)).toBe(true);
    });
  });

  describe('clearAll()', () => {
    it('should use default value', () => {
      expect(lists.clearAll()()).toBe(list.clear());
    });

    it('should clear list', () => {
      expect(lists.clearAll()(list)).toBe(list.clear());
    });
  });

  describe('push()', () => {
    it('should use default value', () => {
      expect(lists.push(operation)()).toEqual(List([operation]));
    });

    it('should push if list is empty', () => {
      expect(lists.push(operation)(List())).toEqual(List([operation]));
    });

    it('should NOT push if already exist', () => {
      expect(lists.push({ toBeMovedId: 1 })(list).size).toEqual(list.size);
    });
  });

  describe('remove()', () => {
    it('should use default value', () => {
      expect(lists.remove()()).toBe(list.clear());
    });

    it('should NOT remove item if NOT found', () => {
      expect(lists.remove(operation)(list).size).toBe(list.size);
    });

    it('should remove item if found', () => {
      expect(lists.remove({ toBeMovedId: 1 })(list).size).toBe(list.size - 1);
    });
  });

  describe('insertOrRemove()', () => {
    it('should insert if checked', () => {
      expect(
        lists.insertOrRemove({ checked: true, toBeMovedId: 11 })(list).size,
      ).toBe(list.size + 1);
    });

    it('should remove if unchecked', () => {
      expect(
        lists.insertOrRemove({ checked: false, toBeMovedId: 1 })(list).size,
      ).toBe(list.size - 1);
    });
  });

  describe('generateList()', () => {
    const moveAcross = { 21: { dayId: 2 }, 22: { dayId: 3 } };

    it('should return empty array if not moveAcross', () => {
      expect(lists.generateList()).toEqual(List([]));
    });

    it('should return operation list with MOVE_INSIDE if children is empty', () => {
      const operationList = lists.generateList(-1, 1, moveAcross);

      expect(operationList.size).toEqual(2);
      expect(operationList.get(0).action).toEqual('MOVE_INSIDE');
      expect(operationList.get(1).action).toEqual('MOVE_AFTER');
    });

    it('should return operation list with MOVE_AFTER if children is empty', () => {
      const operationList = lists.generateList(1, 1, moveAcross);

      expect(operationList.size).toEqual(2);
      expect(operationList.get(0).action).toEqual('MOVE_AFTER');
      expect(operationList.get(1).action).toEqual('MOVE_AFTER');
    });

    it('should skip if firstMove toBeMovedId === lastChildId', () => {
      const operationList = lists.generateList(21, 1, moveAcross);

      expect(operationList.size).toEqual(1);

      expect(operationList.get(0).toBeMovedId).toEqual(22);
      expect(operationList.get(0).action).toEqual('MOVE_AFTER');
    });
  });
});
