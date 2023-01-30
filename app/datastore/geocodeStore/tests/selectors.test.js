import { GEOCODE_STORE } from 'appConstants';
import { GEOCODE_STORE_SELECTORS } from '../selectors';

describe('GEOCODES selectors', () => {
  describe('COUNTRY CODE', () => {
    describe('show()', () => {
      it('should return keyPath', () => {
        expect(GEOCODE_STORE_SELECTORS.countryCode({ id: 1 })).toEqual([
          GEOCODE_STORE,
          'geocodes',
          1,
          'countryCode',
        ]);
      });
    });
  });
});
