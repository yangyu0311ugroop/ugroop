/**
 * Created by stephenkarpinskyj on 15/5/18.
 */

import {
  isNumber,
  isInt,
  minNumberField,
  maxNumberField,
} from '../rules/number';

describe('ugcomponents/Form/rules/number', () => {
  describe('#isNumber()', () => {
    it('exists', () => {
      expect(isNumber);
    });
    it('validates correctly', () => {
      expect(isNumber([], '1')).toBeTruthy();
      expect(isNumber([], 1)).toBeTruthy();
      expect(isNumber([], '1.123')).toBeTruthy();
      expect(isNumber([], 1.123)).toBeTruthy();
      expect(isNumber([], 'notANumber')).toBeFalsy();
      expect(isNumber([], '1.notANumber')).toBeFalsy();
    });
    it('handles null/missing value', () => {
      expect(isNumber([], '')).toBeTruthy();
      expect(isNumber([], null)).toBeTruthy();
      expect(isNumber()).toBeTruthy();
    });
  });

  describe('#isInt()', () => {
    it('exists', () => {
      expect(isInt);
    });
    it('validates correctly', () => {
      expect(isInt([], '1')).toBeTruthy();
      expect(isInt([], 1)).toBeTruthy();
      expect(isInt([], '1.123')).toBeFalsy();
      expect(isInt([], 1.123)).toBeFalsy();
      expect(isInt([], 'notANumber')).toBeFalsy();
      expect(isInt([], '1.notANumber')).toBeFalsy();
    });
    it('handles null/missing value', () => {
      expect(isInt([], '')).toBeTruthy();
      expect(isInt([], null)).toBeTruthy();
      expect(isInt()).toBeTruthy();
    });
  });

  describe('#minNumberField()', () => {
    const check = (value, otherValue, expected, offset) => {
      const otherFieldName = 'otherField';
      const opts = { otherFieldName, offset };
      const result = minNumberField(
        { [otherFieldName]: otherValue },
        value,
        opts,
      );
      expect(result).toBe(expected);
    };

    it('exists', () => {
      expect(minNumberField);
    });
    it('validates correctly', () => {
      check(1, 1, true);
      check(2, 1, true);
      check(2, 1, true, 1);
      check(1, 2, true, -1);
      check(1, 2, false);
      check(1, 1, false, 1);
      check(1, 3, false, -1);
    });
    it('handles null/missing value', () => {
      expect(minNumberField([], '', {})).toBeTruthy();
      expect(minNumberField([], null, {})).toBeTruthy();
      expect(
        minNumberField({ otherField: '' }, 1, { otherFieldName: 'otherField' }),
      ).toBeTruthy();
      expect(minNumberField(undefined, undefined, {})).toBeTruthy();
      expect(minNumberField()).toBeTruthy();
    });
  });

  describe('#maxNumberField()', () => {
    const check = (value, otherValue, expected, offset) => {
      const otherFieldName = 'otherField';
      const opts = { otherFieldName, offset };
      const result = maxNumberField(
        { [otherFieldName]: otherValue },
        value,
        opts,
      );
      expect(result).toBe(expected);
    };

    it('exists', () => {
      expect(maxNumberField);
    });
    it('validates correctly', () => {
      check(1, 1, true);
      check(1, 2, true);
      check(1, 2, true, 1);
      check(2, 1, true, -1);
      check(2, 1, false);
      check(1, 1, false, 1);
      check(3, 1, false, -1);
    });
    it('handles null/missing value', () => {
      expect(maxNumberField([], '', {})).toBeTruthy();
      expect(maxNumberField([], null, {})).toBeTruthy();
      expect(
        maxNumberField({ otherField: '' }, 1, { otherFieldName: 'otherField' }),
      ).toBeTruthy();
      expect(maxNumberField(undefined, undefined, {})).toBeTruthy();
      expect(maxNumberField()).toBeTruthy();
    });
  });
});
