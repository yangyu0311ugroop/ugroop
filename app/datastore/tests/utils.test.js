import utils, { DATA_HELPERS } from '../utils';

describe('datastore/utils.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof utils).toBe('object');
    });
  });

  describe('upsertObject()', () => {
    const store = { 1: { he: 'he' }, 2: { ha: 'ha' } };

    it('should exists', () => {
      expect(typeof utils.upsertObject).toBe('function');
    });

    it('upsertObject() empty store ', () => {
      expect(
        utils.upsertObject({
          2: { hi: 'hi' },
          3: { ho: 'ho' },
        })(),
      ).toEqual({
        2: { hi: 'hi' },
        3: { ho: 'ho' },
      });
    });

    it('upsertObject(object)', () => {
      expect(
        utils.upsertObject({ 2: { hi: 'hi' }, 3: { ho: 'ho' } })(store),
      ).toEqual({
        1: { he: 'he' },
        2: { ha: 'ha', hi: 'hi' },
        3: { ho: 'ho' },
      });
    });

    it('upsertObject(key, value #object)', () => {
      expect(utils.upsertObject(2, { hi: 'hi' })(store)).toEqual({
        1: { he: 'he' },
        2: { ha: 'ha', hi: 'hi' },
      });
    });

    it('upsertObject(key, value #value)', () => {
      expect(utils.upsertObject(2, 'hi')(store)).toEqual({
        1: { he: 'he' },
        2: 'hi',
      });
    });
  });

  describe('upsertArray()', () => {
    const store = { 1: { children: [11, 12, 13] } };

    it('should exists', () => {
      expect(typeof utils.upsertArray).toBe('function');
    });

    it('upsertArray() empty store ', () => {
      expect(utils.upsertArray('1.children', [11, 12, 13])()).toEqual({
        1: { children: [11, 12, 13] },
      });
    });

    it('upsertArray() single value', () => {
      expect(utils.upsertArray('1.children', 14)(store)).toEqual({
        1: { children: [11, 12, 13, 14] },
      });
    });

    it('upsertArray() array values', () => {
      expect(utils.upsertArray('1.children', [14, 15])(store)).toEqual({
        1: { children: [11, 12, 13, 14, 15] },
      });
    });

    it('upsertArray() no keyPath', () => {
      expect(utils.upsertArray('', [14, 15])([11, 12, 13])).toEqual([
        11,
        12,
        13,
        14,
        15,
      ]);
    });

    it('should add item first if opts.isAppendedFirst is true and path is blank', () => {
      expect(
        utils.upsertArray('', 7, { isAppendedFirst: true })([11, 12, 13]),
      ).toEqual([7, 11, 12, 13]);
    });

    it('should add item last if opts.isAppendedFirst is false and path is blank', () => {
      expect(
        utils.upsertArray('', 7, { isAppendedFirst: false })([11, 12, 13]),
      ).toEqual([11, 12, 13, 7]);
    });

    it('should add item first if opts.isAppendedFirst is true', () => {
      expect(
        utils.upsertArray('1.children', 7, { isAppendedFirst: true })(store),
      ).toEqual({
        1: { children: [7, 11, 12, 13] },
      });
    });

    it('should add item last if opts.isAppendedFirst is false', () => {
      expect(
        utils.upsertArray('1.children', 7, { isAppendedFirst: false })(store),
      ).toEqual({
        1: { children: [11, 12, 13, 7] },
      });
    });
  });

  describe('upsertObjectInArray', () => {
    it('upsertObjIntoArray same id', () => {
      expect(
        utils.upsertObjIntoArray(
          { id: 1, name: 'abcd' },
          [{ id: 1, name: 'edfg' }],
          { id: 1 },
        ),
      ).toEqual([{ id: 1, name: 'abcd' }]);
    });
    it('upsertObjIntoArray with different id', () => {
      expect(
        utils.upsertObjIntoArray(
          { id: 1, name: 'abcd' },
          [{ id: 2, name: 'edfg' }],
          { id: 1 },
        ).length,
      ).toEqual(2);
    });
    it('upsertObjIntoArray with no filter', () => {
      expect(
        utils.upsertObjIntoArray({ id: 1, name: 'abcd' }, [
          { id: 2, name: 'edfg' },
        ]).length,
      ).toEqual(2);
    });
    it('upsertObjIntoArray with no empty filter', () => {
      expect(
        utils.upsertObjIntoArray(
          { id: 1, name: 'abcd' },
          [{ id: 2, name: 'edfg' }],
          {},
        ).length,
      ).toEqual(2);
    });
    it('upsertObjIntoArray with no empty filter', () => {
      expect(
        utils.upsertObjIntoArray(
          { id: 1, name: 'abcd' },
          [{ id: 2, name: 'edfg' }],
          { hello: 'abcd' },
        ).length,
      ).toEqual(2);
    });
  });

  describe('updateSpecificObjectAttribute', () => {
    it('should pass the following table test', () => {
      const testCases = [
        {
          firstParam: ['isEditable', true],
          secondParam: {},
          expected: { isEditable: true },
        },
        {
          firstParam: ['isEditable', true, 1],
          secondParam: { 1: { isEditable: false } },
          expected: { 1: { isEditable: true } },
        },
      ];
      testCases.forEach(testCase => {
        expect(
          utils.updateSpecificObjectAttribute(...testCase.firstParam)(
            testCase.secondParam,
          ),
        ).toEqual(testCase.expected);
      });
    });
  });

  describe('upsertArrayInsideObj', () => {
    it('should update an array inside the object we are targeting', () => {
      const store = {
        1: {
          children: [2, 3],
        },
      };
      expect(utils.upsertArrayInsideObj(1, 'children', 4)(store)).toEqual({
        1: {
          children: [4, 2, 3],
        },
      });
    });
    it('should update an array inside the object we are targeting that are not reversed', () => {
      const store = {
        1: {
          children: [2, 3],
        },
      };
      expect(
        utils.upsertArrayInsideObj(1, 'children', [4], { isReversed: false })(
          store,
        ),
      ).toEqual({
        1: {
          children: [2, 3, 4],
        },
      });
    });
  });

  describe('removeIdInArrayInsideObject', () => {
    it('should remove an item in array inside an object', () => {
      const store = {
        1: {
          children: [2, 3],
        },
      };
      expect(
        utils.removeIdInArrayInsideObject(3, 1, 'children')(store),
      ).toEqual({
        1: {
          children: [2],
        },
      });
    });
    it('should remove an item in array inside an object', () => {
      const store = {
        1: {
          children: [2, 3],
        },
      };
      expect(
        utils.removeIdInArrayInsideObject([2, 3], 1, 'children')(store),
      ).toEqual({
        1: {
          children: [],
        },
      });
    });
  });

  describe('removeObjectById', () => {
    it('should object by id', () => {
      const store = {
        1: {
          id: 1,
        },
        2: {
          id: 2,
        },
        3: {
          id: 3,
        },
      };
      expect(utils.removeObjectById(2, 3)(store)).toEqual({
        1: {
          id: 1,
        },
      });
    });
  });

  describe('removeItemsInArray', () => {
    it('should remove based on the ids provided', () => {
      const store = [1, 2, 3];
      const input = [2, 3];
      const result = utils.removeItemsInArray(...input)(store);
      expect(result).toEqual([1]);
    });
    it('should handle undefined store value', () => {
      const input = [2, 3];
      const result = utils.removeItemsInArray(...input)();
      expect(result).toEqual([]);
    });
  });

  describe('removeItemsArray', () => {
    it('should remove items in a particular array attribute of the object given the path', () => {
      const mockStore = {
        1: {
          children: [2, 3, 4, 5],
        },
      };
      const result = utils.removeItemsArray('1.children', 2, 3)(mockStore);
      expect(result).toEqual({
        1: {
          children: [4, 5],
        },
      });
    });

    it('should remove all items in a particular array attribute of the object given the path', () => {
      const mockStore = {
        1: {
          children: [2, 3, 4, 5],
        },
      };
      const result = utils.removeItemsArray(
        '1.children',
        ...mockStore[1].children,
      )(mockStore);
      expect(result).toEqual({
        1: {
          children: [],
        },
      });
    });
  });

  describe('removeItemsInArrayById', () => {
    it('should remove items in an array given the path to that array attribute inside the object', () => {
      const store = {
        1: {
          id: 1,
          children: [2, 3],
        },
        2: {
          id: 2,
          children: [],
        },
        3: {
          id: 3,
          children: [],
        },
      };
      const idsToBeRemoved = [2, 3];
      const result = utils.removeItemsInArrayById(
        1,
        'children',
        ...idsToBeRemoved,
      )(store);
      expect(result).toEqual({
        1: {
          id: 1,
          children: [],
        },
        2: {
          id: 2,
          children: [],
        },
        3: {
          id: 3,
          children: [],
        },
      });
    });
  });

  describe('removeObjFromArray', () => {
    it('should remove based on the ids provided', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const result = utils.removeObjFromArray(data, { id: 1 });
      expect(result).toEqual([{ id: 2 }]);
    });
    it('should remove based on the ids provided', () => {
      const data = [{ id: 3 }, { id: 2 }];
      const result = utils.removeObjFromArray(data, { id: 1 });
      expect(result).toEqual([{ id: 3 }, { id: 2 }]);
    });
    it('not remove anything if id does not exist', () => {
      const data = [{ id: 3 }, { id: 2 }];
      const result = utils.removeObjFromArray(data, { id: 100 });
      expect(result).toEqual([{ id: 3 }, { id: 2 }]);
    });
  });

  describe('updatedAttribute', () => {
    it('should update specific attribute of store given the path', () => {
      const o = {
        1: {
          person: 'Paul',
        },
      };

      const expected = {
        1: {
          person: 'Jesus',
        },
      };

      const result = utils.updateAttribute('1.person', 'Jesus')(o);
      expect(result).toEqual(expected);
    });
  });

  describe('updateObject', () => {
    it('returns spliced data', () => {
      const data = { id: 1 };
      const storeData = [{}];
      expect(utils.updateObject(data)(storeData)).toEqual([data]);
    });

    it('returns store data', () => {
      const data = { x: 1 };
      const storeData = [];
      expect(utils.updateObject(data)(storeData)).toEqual(storeData);
    });
  });

  describe('getObjectIds', () => {
    it('should return ids from the object', () => {
      expect(utils.getObjectIds({ 1: {} })).toEqual([1]);
    });
    it('should return non-number ids from the object', () => {
      expect(utils.getObjectIds({ notNumber: {} }, { number: false })).toEqual([
        'notNumber',
      ]);
    });
    it('should return not failed', () => {
      expect(utils.getObjectIds(null)).toEqual([]);
    });
  });

  describe('DATA_HELPERS.arrayAdd', () => {
    it('returns arrayAdd', () => {
      expect(DATA_HELPERS.arrayAdd(1)(22)).toEqual(22);
      expect(DATA_HELPERS.arrayAdd(1)()).toEqual([1]);
      expect(DATA_HELPERS.arrayAdd(1)([1])).toEqual([1]);
      expect(DATA_HELPERS.arrayAdd([2, 3])([1])).toEqual([1, 2, 3]);
    });
  });

  describe('DATA_HELPERS.objectAdd', () => {
    it('returns objectAdd', () => {
      expect(DATA_HELPERS.objectAdd({ 1: '1' })()).toEqual({ 1: '1' });
      expect(DATA_HELPERS.objectAdd({ 2: '2' })({ 1: '1' })).toEqual({
        1: '1',
        2: '2',
      });
    });
  });

  describe('DATA_HELPERS.objectUpdate', () => {
    it('returns objectUpdate', () => {
      expect(DATA_HELPERS.objectUpdate({ 1: { content: '1' } })()).toEqual({
        1: { content: '1' },
      });
      expect(
        DATA_HELPERS.objectUpdate({ 2: { content: '2' } })({
          1: { content: '1' },
        }),
      ).toEqual({
        1: { content: '1' },
        2: { content: '2' },
      });
    });
  });

  describe('DATA_HELPERS.arrayRemove', () => {
    it('returns arrayRemove', () => {
      expect(DATA_HELPERS.arrayRemove(1)()).toEqual([]);
      expect(DATA_HELPERS.arrayRemove(1)([1, 2])).toEqual([2]);
      expect(DATA_HELPERS.arrayRemove([2])([1])).toEqual([1]);
    });
  });

  describe('DATA_HELPERS.objectRemove', () => {
    it('returns objectRemove', () => {
      expect(DATA_HELPERS.objectRemove(1)(22)).toEqual(22);
      expect(DATA_HELPERS.objectRemove(1)()).toEqual({});
      expect(
        DATA_HELPERS.objectRemove(2)({
          1: { content: '1' },
          2: { content: '2' },
        }),
      ).toEqual({
        1: { content: '1' },
      });
    });
  });

  describe('DATA_HELPERS.toggle', () => {
    it('returns false', () => {
      expect(DATA_HELPERS.toggle(true)).toEqual(false);
      expect(DATA_HELPERS.toggle('a')).toEqual(false);
      expect(DATA_HELPERS.toggle(1)).toEqual(false);
      expect(DATA_HELPERS.toggle(-11)).toEqual(false);
    });

    it('returns true', () => {
      expect(DATA_HELPERS.toggle()).toEqual(true);
      expect(DATA_HELPERS.toggle(null)).toEqual(true);
      expect(DATA_HELPERS.toggle(undefined)).toEqual(true);
      expect(DATA_HELPERS.toggle(false)).toEqual(true);
      expect(DATA_HELPERS.toggle(0)).toEqual(true);
    });
  });
});
