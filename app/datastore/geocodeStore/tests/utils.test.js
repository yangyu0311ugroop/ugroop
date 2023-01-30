import { CACHE_PLACES_TIMEZONES_UTILS } from '../utils';

describe('GEOCODES selectors', () => {
  describe('COUNTRY CODE', () => {
    describe('show()', () => {
      it('Should return places cache value', () => {
        window.UGROOP_GLOBAL_VARS = {
          googlePlaces: {},
        };
        CACHE_PLACES_TIMEZONES_UTILS.cachePlaces(1, { country: 'phil' });
        expect(window.UGROOP_GLOBAL_VARS.googlePlaces).toEqual({
          1: { country: 'phil' },
        });
      });
      it('Should not cache places value if placeid is not valid', () => {
        window.UGROOP_GLOBAL_VARS = {
          googlePlaces: {},
        };
        CACHE_PLACES_TIMEZONES_UTILS.cachePlaces(null, { country: 'phil' });
        expect(window.UGROOP_GLOBAL_VARS.googlePlaces).toEqual({});
      });
    });
    describe('show()', () => {
      it('Should return timezone cache value', () => {
        window.UGROOP_GLOBAL_VARS = {
          googleTimezones: {},
        };
        CACHE_PLACES_TIMEZONES_UTILS.cacheTimezones(1, { country: 'phil' });
        expect(window.UGROOP_GLOBAL_VARS.googleTimezones).toEqual({
          1: { country: 'phil' },
        });
      });
      it('Should not cache timezone value if placeid is not valid', () => {
        window.UGROOP_GLOBAL_VARS = {
          googleTimezones: {},
        };
        CACHE_PLACES_TIMEZONES_UTILS.cacheTimezones(null, { country: 'phil' });
        expect(window.UGROOP_GLOBAL_VARS.googleTimezones).toEqual({});
      });
    });
    describe('show()', () => {
      it('getCachePlaces', () => {
        window.UGROOP_GLOBAL_VARS = {
          googlePlaces: { 1: { country: 'phil' } },
        };
        CACHE_PLACES_TIMEZONES_UTILS.getCachePlaces(1, { country: 'phil' });
        expect(window.UGROOP_GLOBAL_VARS.googlePlaces).toEqual({
          1: { country: 'phil' },
        });
      });
      it('getCacheTimezones', () => {
        window.UGROOP_GLOBAL_VARS = {
          googleTimezones: { 1: { country: 'phil' } },
        };
        CACHE_PLACES_TIMEZONES_UTILS.getCacheTimezones(null, {
          country: 'phil',
        });
        expect(window.UGROOP_GLOBAL_VARS.googleTimezones).toEqual({
          1: { country: 'phil' },
        });
      });
    });
  });
});
