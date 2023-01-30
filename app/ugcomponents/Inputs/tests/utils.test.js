/**
 * Created by stephenkarpinskyj on 1/6/18.
 */

import utils from '../utils';

describe('ugcomponents/Inputs/utils', () => {
  describe('#parseDate()', () => {
    it('parses correctly', () => {
      expect(utils.parseDate('Oct 20 18').toISOString()).toEqual(
        '2018-10-20T00:00:00.000Z',
      );
      expect(utils.parseDate('Not a date').toISOString()).toBeNull();
    });
  });

  describe('#parseTime()', () => {
    it('parses correctly', () => {
      expect(
        utils
          .parseTime('3')
          .toISOString()
          .endsWith('T03:00:00.000Z'),
      ).toBe(true);
      expect(
        utils
          .parseTime('3p')
          .toISOString()
          .endsWith('T15:00:00.000Z'),
      ).toBe(true);
      expect(utils.parseTime('Not a time').toISOString()).toBeNull();
    });
  });

  describe('#parseNumber()', () => {
    it('parses correctly', () => {
      expect(utils.parseNumber('3')).toEqual(3);
      expect(utils.parseNumber('Not a number')).toEqual(Number.NaN);
    });
  });

  describe('#storePathToInputName()', () => {
    it('converts correctly', () => {
      const path = ['some', 'path'];
      expect(utils.storePathToInputName(path)).toEqual('some.path');
    });
  });
});
