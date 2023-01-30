/**
 * Created by stephenkarpinskyj on 1/6/18.
 */

import moment from 'moment';
import constants from '../constants';

describe('ugcomponents/Inputs/constants', () => {
  describe('#TEXT_MIN_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.TEXT_MIN_ERROR(10)).toMatchSnapshot();
    });
  });
  describe('#TEXT_MAX_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.TEXT_MAX_ERROR(10)).toMatchSnapshot();
    });
  });

  describe('#INT_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.INT_ERROR()).toMatchSnapshot();
    });
  });
  describe('#NUMBER_MIN_ERROR()', () => {
    it('still matches snapshot for epsilon', () => {
      expect(constants.NUMBER_MIN_ERROR(Number.EPSILON)).toMatchSnapshot();
    });
    it('still matches snapshot', () => {
      expect(constants.NUMBER_MIN_ERROR(10)).toMatchSnapshot();
    });
  });
  describe('#NUMBER_MAX_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.NUMBER_MAX_ERROR(10)).toMatchSnapshot();
    });
  });

  describe('#DURATION_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.DURATION_ERROR()).toMatchSnapshot();
    });
  });
  describe('#DURATION_POSITIVE_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.DURATION_POSITIVE_ERROR()).toMatchSnapshot();
    });
  });

  describe('#DATE_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.DATE_ERROR()).toMatchSnapshot();
    });
  });
  describe('#DATE_MIN_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(
        constants.DATE_MIN_ERROR(
          moment.utc('0001-02-03'),
          constants.DATE_DISPLAY_FORMAT,
        ),
      ).toMatchSnapshot();
    });
    it('returns null if no date', () => {
      expect(constants.DATE_MIN_ERROR()).toBeNull();
    });
  });
  describe('#DATE_MAX_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(
        constants.DATE_MAX_ERROR(
          moment.utc('0001-02-03'),
          constants.DATE_DISPLAY_FORMAT,
        ),
      ).toMatchSnapshot();
    });
    it('returns null if no date', () => {
      expect(constants.DATE_MAX_ERROR()).toBeNull();
    });
  });
  describe('#TIME_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.TIME_ERROR()).toMatchSnapshot();
    });
  });
  describe('#TIME_MIN_FIELD_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.TIME_MIN_FIELD_ERROR()).toMatchSnapshot();
    });
  });
  describe('#TIME_MAX_FIELD_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.TIME_MAX_FIELD_ERROR()).toMatchSnapshot();
    });
  });

  describe('#PHONE_IS_PHONE_NUMBER_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.PHONE_IS_PHONE_NUMBER_ERROR()).toMatchSnapshot();
    });
  });

  describe('#EMAIL_IS_EMAIL_ERROR()', () => {
    it('still matches snapshot', () => {
      expect(constants.EMAIL_IS_EMAIL_ERROR()).toMatchSnapshot();
    });
  });
});
