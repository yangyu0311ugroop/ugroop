import { SELECTOR_HELPERS } from '../selectors';

describe('utils/helpers/selectors', () => {
  describe('#propOrValueArray', () => {
    it('returns value if array', () => {
      const value = [1];
      expect(SELECTOR_HELPERS.propOrValueArray(value)).toEqual(value);
    });

    it('returns propValue as array if value not array', () => {
      const value = 'notArray';
      const propValue = 'shouldBeArray';
      expect(SELECTOR_HELPERS.propOrValueArray(value, propValue)).toEqual([
        propValue,
      ]);
    });
  });

  describe('#selectPropOrValueArray', () => {
    it('returns value of prop', () => {
      const props = { value: 'shouldBeArray' };
      const prop = 'value';
      expect(SELECTOR_HELPERS.selectPropOrValueArray(prop)(props)).toEqual([
        props.value,
      ]);
    });
  });

  describe('#filterIncludesReducer', () => {
    const acc = [1];
    const value = 'x';
    const values = [value];

    it('adds included value', () => {
      expect(
        SELECTOR_HELPERS.filterIncludesReducer(values)(acc, [2, value]),
      ).toEqual([1, 2]);
    });

    it('not adds excluded value', () => {
      expect(
        SELECTOR_HELPERS.filterIncludesReducer(values)(acc, [2, 'y']),
      ).toEqual([1]);
    });
  });
});
