import utils from 'datastore/templateManagementStore/helpers/utils';
import { List } from 'immutable';
import helpers from '../sections';

describe('Section helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('moveBefore', () => {
    it('should moveBefore', () => {
      utils.move = jest.fn();
      helpers.moveBefore(123)(456);

      expect(utils.move).toBeCalledWith(456, 123);
    });
  });

  describe('moveAfter', () => {
    it('should moveAfter', () => {
      utils.move = jest.fn();
      helpers.moveAfter(123)(456);

      expect(utils.move).toBeCalledWith(456, 123, 1);
    });
  });

  describe('moveAcross', () => {
    it('should not Move', () => {
      utils.isNotMoving = jest.fn(() => true);
      const list = List();

      expect(helpers.moveAcross(list)(456)).toBe(456);
      expect(utils.isNotMoving).toBeCalledWith(list);
    });

    it('should move', () => {
      utils.isNotMoving = jest.fn(() => false);
      utils.move = jest.fn(() => 999);
      const list = List();

      expect(helpers.moveAcross(list)(456)).toBe(999);
      expect(utils.isNotMoving).toBeCalledWith(list);
      expect(utils.move).toBeCalledWith(456, list, 1);
    });

    it('should move batch', () => {
      utils.isNotMoving = jest.fn(() => false);
      utils.move = jest.fn((days, operation) => operation);
      const list = List([1, 2]);

      helpers.moveAcross(list)(456);

      expect(utils.isNotMoving).toBeCalled();
      expect(utils.move).toBeCalled();
      expect(utils.move.mock.calls.length).toBe(2);
      expect(utils.move.mock.calls).toMatchSnapshot();
    });
  });

  describe('insertToBeMovedId', () => {
    it('should insertToBeMovedId default value', () => {
      expect(helpers.insertToBeMovedId({ dayId: 12, id: 121 })()).toEqual({
        12: [121],
      });
    });

    it('should insertToBeMovedId', () => {
      expect(
        helpers.insertToBeMovedId({ dayId: 12, id: 121 })({ 11: [111] }),
      ).toEqual({ 11: [111], 12: [121] });
    });
  });

  describe('insertToBeMovedData', () => {
    it('should insertToBeMovedData default value', () => {
      expect(helpers.insertToBeMovedData(11, { status: 'ok' })()).toEqual({
        11: { status: 'ok' },
      });
    });

    it('should insertToBeMovedData', () => {
      expect(
        helpers.insertToBeMovedData(11, { status: 'ok' })({ 11: { id: 11 } }),
      ).toEqual({ 11: { id: 11, status: 'ok' } });
    });
  });

  describe('removeToBeMovedId', () => {
    it('should removeToBeMovedId default value', () => {
      expect(helpers.removeToBeMovedId({ dayId: 1, id: 11 })()).toEqual({});
    });

    it('should removeToBeMovedId', () => {
      expect(
        helpers.removeToBeMovedId({ dayId: 1, id: 11 })({ 1: [11, 12, 13] }),
      ).toEqual({ 1: [12, 13] });
    });
  });

  describe('removeToBeMovedData', () => {
    it('should removeToBeMovedData default value', () => {
      expect(helpers.removeToBeMovedData(1)()).toEqual({});
    });

    it('should removeToBeMovedData', () => {
      expect(
        helpers.removeToBeMovedData(1)({ 1: [11, 12, 13], 2: [21] }),
      ).toEqual({ 2: [21] });
    });
  });
});
