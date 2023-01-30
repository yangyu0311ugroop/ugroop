import utils from '../index';

describe('utils', () => {
  describe('underConstruction()', () => {
    it('should call alert', () => {
      global.alert = jest.fn();

      utils.underConstruction();

      expect(global.alert).toBeCalled();
    });
  });
});
