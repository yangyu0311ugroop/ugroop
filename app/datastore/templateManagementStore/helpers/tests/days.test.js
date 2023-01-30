import utils from 'datastore/templateManagementStore/helpers/utils';
import helpers from '../days';

describe('Day helpers', () => {
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

  describe('updateChildren', () => {
    it('should updateChildren', () => {
      expect(
        helpers.updateChildren({ 1: [11, 12], 2: [21, 22] })({
          1: { id: 1, children: [14, 15] },
          2: { id: 2 },
        }),
      ).toEqual({
        1: { id: 1, children: [11, 12] },
        2: { id: 2, children: [21, 22] },
      });
    });
  });

  describe('checkAll', () => {
    it('should checkAll', () => {
      expect(helpers.checkAll(1, [11, 12])({ 2: [21] })).toEqual({
        2: [21],
        1: [11, 12],
      });
    });
  });

  describe('checkAllData', () => {
    it('should checkAllData', () => {
      expect(helpers.checkAllData(1, [11, 12])({ 21: { dayId: 2 } })).toEqual({
        21: { dayId: 2 },
        11: { dayId: 1 },
        12: { dayId: 1 },
      });
    });
  });

  describe('uncheckAll', () => {
    it('should uncheckAll', () => {
      expect(helpers.uncheckAll(1)({ 2: [21], 1: [11, 12] })).toEqual({
        2: [21],
      });
    });
  });

  describe('insertSectionIds', () => {
    it('should insertSectionIds', () => {
      expect(helpers.insertSectionIds(1, [11, 12])({ 2: [21] })).toEqual({
        2: [21],
        1: [11, 12],
      });
    });
  });
});
