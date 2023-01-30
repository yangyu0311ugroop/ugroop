import {
  CLOSED,
  COMPLETED,
  DO_NOTHING,
  MY_TOURS,
  MY_TOURS_NODE_CONTENT,
  MY_TOURS_NODE_CONTENT_2,
  OUTSTANDING,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_STORE_HELPERS } from '../helpers';

describe('NODE_STORE_HELPERS', () => {
  describe('concatIfNotExist()', () => {
    it('should not do anything if exist', () => {
      expect(NODE_STORE_HELPERS.concatIfNotExist(1)([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist(2)([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist(3)([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);

      // concat array
      expect(NODE_STORE_HELPERS.concatIfNotExist([1])([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist([1, 2])([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist([1, 2, 3])([1, 2, 3])).toEqual(
        [1, 2, 3],
      );
    });

    it('should concat if NOT exist', () => {
      expect(NODE_STORE_HELPERS.concatIfNotExist(4)()).toEqual([4]);
      expect(NODE_STORE_HELPERS.concatIfNotExist(4)([1, 2, 3])).toEqual([
        1,
        2,
        3,
        4,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist(0)([1, 2, 3])).toEqual([
        1,
        2,
        3,
        0,
      ]);

      // concat array
      expect(NODE_STORE_HELPERS.concatIfNotExist([4])([1, 2, 3])).toEqual([
        1,
        2,
        3,
        4,
      ]);
      expect(NODE_STORE_HELPERS.concatIfNotExist([4, 4, 5])([1, 2, 3])).toEqual(
        [1, 2, 3, 4, 5],
      );
    });
  });

  describe('deleteIfExist()', () => {
    it('should DELETE if exist', () => {
      expect(NODE_STORE_HELPERS.deleteIfExist(1)([1, 2, 3])).toEqual([2, 3]);
      expect(NODE_STORE_HELPERS.deleteIfExist(2)([1, 2, 3])).toEqual([1, 3]);
      expect(NODE_STORE_HELPERS.deleteIfExist(3)([1, 2, 3])).toEqual([1, 2]);

      // delete array
      expect(NODE_STORE_HELPERS.deleteIfExist([3])([1, 2, 3])).toEqual([1, 2]);
      expect(NODE_STORE_HELPERS.deleteIfExist([2, 3])([1, 2, 3])).toEqual([1]);
      expect(NODE_STORE_HELPERS.deleteIfExist([1, 2, 3])([1, 2, 3])).toEqual(
        [],
      );
    });

    it('should not do anything if NOT exist', () => {
      expect(NODE_STORE_HELPERS.deleteIfExist(4)()).toEqual([]);
      expect(NODE_STORE_HELPERS.deleteIfExist(4)([1, 2, 3])).toEqual([1, 2, 3]);

      // delete array
      expect(NODE_STORE_HELPERS.deleteIfExist([3])()).toEqual([]);
      expect(NODE_STORE_HELPERS.deleteIfExist([4])([1, 2, 3])).toEqual([
        1,
        2,
        3,
      ]);
    });
  });

  describe('translateType()', () => {
    it('should call LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(NODE_STORE_HELPERS.translateType(1)).toBe('switchCase');
    });
  });

  describe('removeChildId()', () => {
    it('should DO_NOTHING', () => {
      expect(NODE_STORE_HELPERS.removeChildId(123, {})).toBe(DO_NOTHING);
    });

    it('should call setValue', () => {
      const resaga = { setValue: jest.fn() };

      NODE_STORE_HELPERS.removeChildId(123, { childKey: 'children', resaga });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('remainingPredicate()', () => {
    it('should not change', () => {
      expect(NODE_STORE_HELPERS.remainingPredicate({})).toEqual({
        remaining: 0,
        completed: 0,
      });
    });

    it('should increase remaining', () => {
      expect(NODE_STORE_HELPERS.remainingPredicate({}, null)).toEqual({
        remaining: 1,
        completed: 0,
      });
      expect(NODE_STORE_HELPERS.remainingPredicate({}, OUTSTANDING)).toEqual({
        remaining: 1,
        completed: 0,
      });
    });

    it('should increase completed', () => {
      expect(NODE_STORE_HELPERS.remainingPredicate({}, COMPLETED)).toEqual({
        remaining: 0,
        completed: 1,
      });
    });
  });

  describe('openClosedPredicate()', () => {
    it('should not change', () => {
      expect(NODE_STORE_HELPERS.openClosedPredicate({})).toEqual({
        open: 0,
        closed: 0,
      });
    });

    it('should increase open', () => {
      expect(NODE_STORE_HELPERS.openClosedPredicate({}, null)).toEqual({
        open: 1,
        closed: 0,
      });
      expect(NODE_STORE_HELPERS.openClosedPredicate({}, OUTSTANDING)).toEqual({
        open: 1,
        closed: 0,
      });
    });

    it('should increase closed', () => {
      expect(NODE_STORE_HELPERS.openClosedPredicate({}, CLOSED)).toEqual({
        open: 0,
        closed: 1,
      });
    });
  });

  describe('calculateRemaining()', () => {
    it('should reduce remainingPredicate', () => {
      NODE_STORE_HELPERS.remainingPredicate = jest.fn(
        () => 'remainingPredicate',
      );
      expect(NODE_STORE_HELPERS.calculateRemaining(1, 2)).toBe(
        'remainingPredicate',
      );
    });
  });

  describe('calculateOpenClosed()', () => {
    it('should reduce openClosedPredicate', () => {
      NODE_STORE_HELPERS.openClosedPredicate = jest.fn(
        () => 'openClosedPredicate',
      );
      expect(NODE_STORE_HELPERS.calculateOpenClosed(1, 2)).toBe(
        'openClosedPredicate',
      );
    });
  });

  describe('calculateProgress', () => {
    it('should return correct percentage', () => {
      // bad inputs
      expect(NODE_STORE_HELPERS.calculateProgress({})).toBe(0);
      expect(
        NODE_STORE_HELPERS.calculateProgress({ completed: 0, remaining: -1 }),
      ).toBe(0);

      // normal inputs
      expect(
        NODE_STORE_HELPERS.calculateProgress({ completed: 1, remaining: 1 }),
      ).toBe(50);
      expect(
        NODE_STORE_HELPERS.calculateProgress({ completed: 1, remaining: 2 }),
      ).toBe(33);
    });
  });

  describe('calculateTotal', () => {
    it('should return correct percentage', () => {
      // bad inputs
      expect(NODE_STORE_HELPERS.calculateTotal({})).toBe(0);

      // normal inputs
      expect(
        NODE_STORE_HELPERS.calculateTotal({ completed: 1, remaining: 1 }),
      ).toBe(2);
      expect(
        NODE_STORE_HELPERS.calculateTotal({ completed: 1, remaining: 2 }),
      ).toBe(3);
    });
  });

  describe('translateContent()', () => {
    it('should translateContent', () => {
      expect(NODE_STORE_HELPERS.translateContent('some content')).toBe(
        'some content',
      );
      expect(NODE_STORE_HELPERS.translateContent(MY_TOURS_NODE_CONTENT)).toBe(
        MY_TOURS,
      );
      expect(NODE_STORE_HELPERS.translateContent(MY_TOURS_NODE_CONTENT_2)).toBe(
        MY_TOURS,
      );
    });
  });

  describe('#pathToNodeInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(NODE_STORE_HELPERS.pathToNodeInputName(path)).toEqual(
        'node.some.path',
      );
    });
  });
  describe('#processTemplateSettings', () => {
    it('returns correct name', () => {
      const data = { id: 1, customData: { value: 'abc' } };
      expect(NODE_STORE_HELPERS.processTemplateSettings(data)).toEqual({
        id: 1,
        value: 'abc',
      });
    });
  });
  describe('#attributeSelector', () => {
    it('returns correct name', () => {
      const data = { id: 1, customData: { key: 'abc' } };
      expect(NODE_STORE_HELPERS.attributeSelector(data)).toEqual('abc');
    });
  });
  describe('#processHashkey', () => {
    it('returns correct name', () => {
      const data = { hashkey: 'abc' };
      expect(NODE_STORE_HELPERS.processHashkey(data)).toEqual('abc');
    });
  });

  describe('getChildKey', () => {
    it('returns correct name', () => {
      const data = 'participant';
      const data1 = 'interestedperson';
      const data2 = 'something_else';
      expect(NODE_STORE_HELPERS.getChildKey(data)).toEqual('participants');
      expect(NODE_STORE_HELPERS.getChildKey(data1)).toEqual('interestedPeople');
      expect(NODE_STORE_HELPERS.getChildKey(data2)).toEqual('children');
    });
  });

  describe('nextNodeIds', () => {
    describe('keyPath', () => {
      it('should match the expected keyPaths', () => {
        const keyPaths = NODE_STORE_HELPERS.nextNodeIds().keyPath({
          followers: [1, 2],
        });

        expect(keyPaths).toEqual([
          NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id: 1 }),
          NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id: 2 }),
        ]);
      });
    });

    describe('cacheKey', () => {
      it('should match the expected cacheKey', () => {
        const cacheKey = NODE_STORE_HELPERS.nextNodeIds().cacheKey({
          followers: [1],
        });
        const cacheKey2 = NODE_STORE_HELPERS.nextNodeIds().cacheKey({
          followers: null,
        });

        expect(cacheKey).toEqual('Link.types.Guardian.Followers.1');
        expect(cacheKey2).toEqual('Link.types.Guardian.Followers.null');
      });
    });

    describe('props', () => {
      it('should return null', () => {
        expect(NODE_STORE_HELPERS.nextNodeIds().props()).toEqual(null);
      });
      it('should return array', () => {
        expect(NODE_STORE_HELPERS.nextNodeIds().keyPath({})).toEqual([]);
      });
    });

    describe('getter', () => {
      it('should remove the right most part of the argument being passed down', () => {
        expect(NODE_STORE_HELPERS.nextNodeIds().getter(1, 2, 3)).toEqual([
          1,
          2,
        ]);
      });
    });
  });
});
