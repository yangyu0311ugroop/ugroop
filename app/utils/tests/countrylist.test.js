import { NONE, UNKNOWN } from 'appConstants';
import { COUNTRY_LIST_HELPERS } from 'utils/countrylist';

describe('COUNTRY_LIST_HELPER', () => {
  describe('getCountryList', () => {
    it('should return all country list', () => {
      const data = COUNTRY_LIST_HELPERS.getCountryList();
      expect(data).toMatchSnapshot();
    });
  });

  describe('getCountryByCode', () => {
    it('should return appropriate country name based on country code', () => {
      const result = COUNTRY_LIST_HELPERS.getCountryByCode('PH');
      expect(result).toBe('Philippines');
    });
    it('should return blank if code is none', () => {
      const result = COUNTRY_LIST_HELPERS.getCountryByCode(NONE);
      expect(result).toBe('');
    });
    it('should return unknown if code is unknown', () => {
      const result = COUNTRY_LIST_HELPERS.getCountryByCode(
        'NOT_A_COUNTRY_CODE',
      );
      expect(result).toBe(UNKNOWN);
    });
  });
});
