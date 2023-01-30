import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import helpers from '../helpers';

describe('helpers', () => {
  describe('getMessage', () => {
    it('should return something', () => {
      TEST_HELPERS.expectMatchSnapshot(helpers.getMessage('leader'));
    });
  });

  describe('makeOptions', () => {
    it('should return something', () => {
      TEST_HELPERS.expectMatchSnapshot(helpers.makeOptions);
    });
  });

  describe('renderOtherValue', () => {
    it('should just return value', () => {
      expect(helpers.renderOtherValue('value')).toEqual('value');
    });
  });

  describe('renderValue', () => {
    it('should return value if not includesValue', () => {
      expect(helpers.renderValue('value')).toEqual('Other');
    });
    it('should return value if includesValue', () => {
      TEST_HELPERS.expectMatchSnapshot(helpers.renderValue('leader'));
    });
  });
});
