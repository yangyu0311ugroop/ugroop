/**
 * Created by stephenkarpinskyj on 15/4/18.
 */

import helpers from '../arrays';

describe('utils/helpers/arrays', () => {
  describe('#remove()', () => {
    it('removes found value', () => {
      expect(helpers.remove([1, 2], 1)).toEqual([2]);
    });

    it('not removes not found value', () => {
      expect(helpers.remove([1, 2], 3)).toEqual([1, 2]);
    });
  });

  describe('#removeAt()', () => {
    it('removes correct element', () => {
      expect(helpers.removeAt([1, 2], 0)).toEqual([2]);
    });
  });

  describe('#insertAt()', () => {
    it('inserts element correctly', () => {
      expect(helpers.insertAt([1, 2], 1, 3)).toEqual([1, 3, 2]);
    });
  });

  describe('#mergeAppending()', () => {
    it('merges by appending new elements', () => {
      expect(helpers.mergeAppending([1, 2], [2, 3])).toEqual([1, 2, 3]);
      expect(helpers.mergeAppending(null, [2, 3])).toEqual([2, 3]);
      expect(helpers.mergeAppending([1, 2])).toEqual([1, 2]);
    });
  });

  describe('#mergePrepending()', () => {
    it('merges by prepending new elements', () => {
      expect(helpers.mergePrepending([1, 2], [2, 3])).toEqual([3, 1, 2]);
      expect(helpers.mergePrepending(null, [2, 3])).toEqual([3, 2]);
      expect(helpers.mergePrepending([1, 2])).toEqual([1, 2]);
    });
  });

  describe('#length()', () => {
    it('returns array length', () => {
      expect(helpers.length()).toBe(undefined);
      expect(helpers.length('bad input')).toBe(undefined);
      expect(helpers.length([1])).toBe(1);
      expect(helpers.length([1, 2])).toBe(2);
    });
  });

  describe('#arrayIfNot()', () => {
    it('converts to array', () => {
      const result = helpers.arrayIfNot('arg');
      expect(result).toEqual(['arg']);
      expect(helpers.arrayIfNot('arg')).toBe(result);
    });

    it('converts complex key to array', () => {
      const result = helpers.arrayIfNot({ x: 1 });
      expect(result).toEqual([{ x: 1 }]);
      expect(helpers.arrayIfNot({ x: 1 })).toBe(result);
    });

    it('not converts to array', () => {
      expect(helpers.arrayIfNot(['arg'])).toEqual(['arg']);
    });

    it('returns empty array', () => {
      expect(helpers.arrayIfNot()).toEqual([]);
      expect(helpers.arrayIfNot(null)).toEqual([]);
    });
  });

  describe('#uniq()', () => {
    it('filters out redundant and non-truthy items', () => {
      expect(helpers.uniq([undefined, 1, 0, 1, null])).toEqual([1]);
    });
  });
  describe('#isSame()', () => {
    it('return false', () => {
      expect(helpers.isSame([1, 2], [1, 3])).toEqual(false);
    });
    it('return true', () => {
      expect(helpers.isSame([1, 2], [1, 2])).toEqual(true);
    });
    it('return true', () => {
      expect(helpers.isSame([1, 2], [1, 2, 3])).toEqual(false);
    });
  });
});
