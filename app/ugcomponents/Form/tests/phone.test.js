/**
 * Created by stephenkarpinskyj on 8/6/18.
 */

import { isPhoneNumber } from '../rules/phone';

describe('ugcomponents/Form/rules/phone', () => {
  describe('#isPhoneNumber()', () => {
    it('exists', () => {
      expect(isPhoneNumber);
    });
    it('validates correctly', () => {
      expect(isPhoneNumber([], '+63 999 999 9999')).toBe(true); // PH
      expect(isPhoneNumber([], '+63 999 999')).toBe(false); // too short
    });
    it('handles null/missing value', () => {
      expect(isPhoneNumber([], null)).toBe(true);
      expect(isPhoneNumber([], '')).toBe(true);
      expect(isPhoneNumber()).toBe(true);
    });
  });
});
