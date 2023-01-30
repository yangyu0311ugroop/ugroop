import utils from '../utils';

describe('Array Logic utility function tests', () => {
  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(utils).toBeDefined();
      expect(typeof utils.isNotMoving).toBe('function');
      expect(typeof utils.isMovingAcross).toBe('function');
      expect(typeof utils.isMovingInside).toBe('function');
      expect(typeof utils.removeAt).toBe('function');
      expect(typeof utils.replaceAt).toBe('function');
      expect(typeof utils.insertTo).toBe('function');
      expect(typeof utils.merge).toBe('function');
      expect(typeof utils.checkRoot).toBe('function');
      expect(typeof utils.checkChildren).toBe('function');
    });
  });

  describe('isNotMoving()', () => {
    it('should use default value', () => {
      expect(utils.isNotMoving()).toBe(true);
    });

    it('should return false', () => {
      expect(utils.isNotMoving({ id: 1, toBeMovedId: 2 })).toBe(false);
      expect(utils.isNotMoving({ id: 1 })).toBe(false);
      expect(utils.isNotMoving({ toBeMovedId: 2 })).toBe(false);
    });

    it('should return true', () => {
      expect(utils.isNotMoving({ id: 1, toBeMovedId: 1 })).toBe(true);
    });
  });

  describe('isMovingAcross()', () => {
    it('should use default value', () => {
      expect(utils.isMovingAcross()).toBe(false);
    });

    it('should return false', () => {
      expect(utils.isMovingAcross({ parentId: 1, toBeMovedParentId: 1 })).toBe(
        false,
      );
    });

    it('should return true', () => {
      expect(utils.isMovingAcross({ parentId: 1, toBeMovedParentId: 2 })).toBe(
        true,
      );
      expect(utils.isMovingAcross({ parentId: 1 })).toBe(true);
    });
  });

  describe('isMovingInside()', () => {
    it('should use default value', () => {
      expect(utils.isMovingInside()).toBe(false);
    });

    it('should return false', () => {
      expect(utils.isMovingInside({ id: 1 })).toBe(false);
      expect(utils.isMovingInside({ action: 'MOVE_AFTER' })).toBe(false);
    });

    it('should return true', () => {
      expect(utils.isMovingInside({ action: 'MOVE_INSIDE' })).toBe(true);
    });
  });

  describe('removeAt()', () => {
    const array = [1, 2, 3];

    it('should use default value', () => {
      expect(utils.removeAt()).toEqual([]);
    });

    it('should not remove', () => {
      expect(utils.removeAt(array, array.length)).toEqual(array);
      expect(utils.removeAt(array, array.length + 10)).toEqual(array);
    });

    it('should remove', () => {
      expect(utils.removeAt(array, 0)).toEqual([2, 3]);
      expect(utils.removeAt(array, 1)).toEqual([1, 3]);
      expect(utils.removeAt(array, 2)).toEqual([1, 2]);
    });
  });

  describe('replaceAt()', () => {
    const array = [1, 2, 3];

    it('should use default value', () => {
      expect(utils.replaceAt()).toEqual([undefined]);
    });

    it('should replace', () => {
      expect(utils.replaceAt(array, 0, 99)).toEqual([99, 2, 3]);
      expect(utils.replaceAt(array, 1, 99)).toEqual([1, 99, 3]);
      expect(utils.replaceAt(array, 2, 99)).toEqual([1, 2, 99]);
    });
  });

  describe('insertTo()', () => {
    const array = [1, 2, 3];

    it('should use default value', () => {
      expect(utils.insertTo()).toEqual([undefined]);
      expect(utils.insertTo(array, undefined, 99)).toEqual([1, 2, 3, 99]);
    });

    it('should insertTo', () => {
      expect(utils.insertTo(array, 0, 99)).toEqual([99, 1, 2, 3]);
      expect(utils.insertTo(array, 1, 99)).toEqual([1, 99, 2, 3]);
      expect(utils.insertTo(array, 2, 99)).toEqual([1, 2, 99, 3]);
      expect(utils.insertTo(array, 3, 99)).toEqual([1, 2, 3, 99]);
      expect(utils.insertTo(array, 10, 99)).toEqual([1, 2, 3, 99]);
    });
  });

  describe('merge()', () => {
    const photo = { customData: { photo: 'abc' } };
    const a = { content: 1 };
    const b = { updatedAt: 123 };

    it('should merge', () => {
      expect(utils.merge(a, b)).toEqual({ content: 1, updatedAt: 123 });
      // should not mutate `a`
      expect(a).toEqual({ content: 1 });
    });

    it('should merge with photo', () => {
      expect(utils.merge(photo, a, b)).toEqual({
        content: 1,
        updatedAt: 123,
        customData: { photo: 'abc' },
        photos: [{ content: 'abc' }],
      });
      // should not mutate `photo`
      expect(photo).toEqual({ customData: { photo: 'abc' } });
    });
  });

  describe('checkRoot()', () => {
    const array = [{ id: 11 }, { id: 12 }, { id: 13 }];
    const action = jest.fn(() => 999);

    it('should not do anything if index not found', () => {
      expect(utils.checkRoot(array, { id: 20 }, action)).toBe(array);
      expect(action).not.toBeCalled();
    });

    it('should call action if index found', () => {
      expect(utils.checkRoot(array, { id: 11 }, action)).toBe(999);
      expect(action).toBeCalled();
    });
  });

  describe('checkChildren()', () => {
    const array = [
      { id: 11, children: 101 },
      { id: 12, children: 102 },
      { id: 13, children: 103 },
    ];
    const action = jest.fn(() => 999);
    const subAction = jest.fn(() => 123);

    it('should not do anything if index not found', () => {
      expect(utils.checkChildren(array, { id: 20 }, subAction, action)).toBe(
        array,
      );
      expect(subAction).not.toBeCalled();
      expect(action).not.toBeCalled();
    });

    it('should call action if index found', () => {
      expect(utils.checkChildren(array, { id: 11 }, subAction, action)).toBe(
        999,
      );
      expect(subAction).toBeCalledWith(101);
      expect(action).toBeCalledWith(array, 0, { id: 11, children: 123 });
    });
  });

  describe('equaliser()', () => {
    const array = [{ id: 11 }, { id: 12 }, { id: 13 }];

    it('should use default value', () => {
      expect(utils.equaliser()({ id: 1 }, 0)).toEqual(true);
    });

    it('should return true', () => {
      expect(utils.equaliser(array)({ id: 1 }, 0)).toEqual(true);
      expect(utils.equaliser(array)({ id: 12 }, 0)).toEqual(true);
      expect(utils.equaliser(array)(undefined, 2)).toEqual(true);
    });

    it('should return false', () => {
      expect(utils.equaliser(array)({ id: 11 }, 0)).toEqual(false);
      expect(utils.equaliser(array)({ id: 12 }, 1)).toEqual(false);
      expect(utils.equaliser(array)({ id: 13 }, 2)).toEqual(false);
    });
  });
});
