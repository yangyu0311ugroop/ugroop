/**
 * Created by stephenkarpinskyj on 3/4/18.
 */

import { isDuration, isDurationPositive } from '../rules/duration';

describe('ugcomponents/Form/rules/duration', () => {
  const runDurationChecks = rule => {
    it('exists', () => {
      expect(rule);
    });
    it('validates correctly', () => {
      expect(rule([], '1h')).toBeTruthy();
      expect(rule([], '1h 1d')).toBeTruthy();
      expect(rule([], '1h 1d 1w')).toBeTruthy();
      expect(rule([], '1h 1d 1wee')).toBeFalsy();
      expect(rule([], '1h 1d 1week')).toBeTruthy();
      expect(rule([], '1h 1d 1weeks')).toBeTruthy();

      expect(rule([], '1q')).toBeFalsy();
      expect(rule([], '1213')).toBeFalsy();
      expect(rule([], '1000y')).toBeFalsy();
    });
    it('handles null/missing value', () => {
      expect(rule([], '')).toBeTruthy();
      expect(rule([], null)).toBeTruthy();
      expect(rule()).toBeTruthy();
    });
  };

  describe('#isDuration()', () => {
    runDurationChecks(isDuration);
  });

  describe('#isDurationPositive()', () => {
    runDurationChecks(isDurationPositive);

    it('validates positiveness correctly', () => {
      expect(isDurationPositive([], '1h')).toBeTruthy();
      expect(isDurationPositive([], ' ')).toBeFalsy();
      expect(isDurationPositive([], '-1h')).toBeFalsy();
    });
  });
});
