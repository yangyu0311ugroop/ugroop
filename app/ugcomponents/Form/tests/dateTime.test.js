/**
 * Created by stephenkarpinskyj on 18/4/18.
 */

import moment from 'moment';
import {
  isDate,
  minDate,
  maxDate,
  isTime,
  minTimeField,
  maxTimeField,
} from '../rules/dateTime';

describe('ugcomponents/Form/rules/dateTime', () => {
  describe('#isDate()', () => {
    it('exists', () => {
      expect(isDate);
    });
    it('validates correctly', () => {
      expect(isDate([], moment())).toBe(true);
      expect(isDate([], '01/01/2010')).toBe(true);
      expect(isDate([], 'not a date')).toBe(false);
    });
    it('handles null/missing value', () => {
      expect(isDate([], null)).toBe(true);
      expect(isDate([], '')).toBe(true);
      expect(isDate()).toBe(true);
    });
  });

  describe('#minDate()', () => {
    it('exists', () => {
      expect(minDate);
    });
    it('validates correctly', () => {
      expect(minDate([], moment())).toBe(true);
      expect(minDate([], moment(), moment().subtract(1, 'd'))).toBe(true);
      expect(minDate([], moment(), moment().add(1, 'd'))).toBe(false);
    });
    it('handles null/missing value', () => {
      expect(minDate([], null, null)).toBe(true);
      expect(minDate([], null)).toBe(true);
      expect(minDate([], '', '')).toBe(true);
      expect(minDate([], '')).toBe(true);
      expect(minDate()).toBe(true);
    });
  });

  describe('maxDate', () => {
    it('validates correctly', () => {
      expect(maxDate([], moment())).toBe(true);
      expect(maxDate([], moment(), moment().subtract(1, 'y'))).toBe(false);
      expect(maxDate([], moment(), moment().add(1, 'y'))).toBe(true);
    });
    it('should handle null/missing value', () => {
      expect(maxDate([], null, null)).toBe(true);
      expect(maxDate([], null)).toBe(true);
      expect(maxDate([], '', '')).toBe(true);
      expect(maxDate([], '')).toBe(true);
      expect(maxDate()).toBe(true);
    });
  });

  describe('#isTime()', () => {
    it('exists', () => {
      expect(isTime);
    });
    it('validates correctly', () => {
      expect(isTime([], moment())).toBe(true);
      expect(isTime([], '4p')).toBe(true);
      expect(isTime([], 'not a time')).toBe(false);
    });
    it('handles null/missing value', () => {
      expect(isTime([], null)).toBe(true);
      expect(isTime([], '')).toBe(true);
      expect(isTime()).toBe(true);
    });
  });

  describe('#minTimeField()', () => {
    it('exists', () => {
      expect(minTimeField);
    });
    it('validates correctly', () => {
      const otherTimeFieldName = 'other';
      const makeValues = (value = null) => ({
        date: 'P1D',
        [otherTimeFieldName]: value,
      });

      expect(minTimeField(makeValues(), 'something')).toBe(true);
      expect(
        minTimeField(
          makeValues('somethingElse'),
          'something',
          otherTimeFieldName,
        ),
      ).toBe(true);
      expect(
        minTimeField(
          makeValues(moment().subtract(1, 'd')),
          moment(),
          otherTimeFieldName,
        ),
      ).toBe(true);
      expect(
        minTimeField(makeValues(moment().subtract(1, 'd')), moment(), [
          otherTimeFieldName,
          'date',
        ]),
      ).toBe(true);
      expect(
        minTimeField(makeValues(moment().subtract(1, 'd')), moment(), [
          otherTimeFieldName,
          'date1',
        ]),
      ).toBe(true);
      expect(
        minTimeField(
          makeValues(moment().add(1, 'd')),
          moment(),
          otherTimeFieldName,
        ),
      ).toBe(false);
    });
    it('handles null/missing value', () => {
      expect(minTimeField(null, null)).toBe(true);
    });
  });

  describe('#maxTimeField()', () => {
    it('exists', () => {
      expect(maxTimeField);
    });
    it('validates correctly', () => {
      const otherTimeFieldName = 'other';
      const makeValues = (value = null) => ({ [otherTimeFieldName]: value });

      expect(maxTimeField(makeValues(), 'something')).toBe(true);
      expect(
        maxTimeField(
          makeValues('somethingElse'),
          'something',
          otherTimeFieldName,
        ),
      ).toBe(true);
      expect(
        maxTimeField(
          makeValues(moment().subtract(1, 'd')),
          moment(),
          otherTimeFieldName,
        ),
      ).toBe(false);
      expect(
        maxTimeField(
          makeValues(moment().add(1, 'd')),
          moment(),
          otherTimeFieldName,
        ),
      ).toBe(true);
    });
    it('handles null/missing value', () => {
      expect(maxTimeField(null, null)).toBe(true);
    });
  });
});
