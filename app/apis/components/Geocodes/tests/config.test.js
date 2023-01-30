import {
  GEOCODE_API,
  GET_PLACE_IDS,
  GET_LAT_LONG,
  GET_GEO_COUNTRY_CODE,
  GET_GEO_CURRENT_LOCATION,
} from 'apis/constants';
import { CONFIG } from '../config';

jest.mock('react-geocode', () => ({
  setApiKey: () => 'setApiKey',
  fromAddress: jest.fn(() => Promise.resolve(1)),
}));
describe('apis/Geocodes/config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('name', () => {
    it('should equal GEOCODE_API', () => {
      expect(CONFIG.name).toEqual(GEOCODE_API);
    });
  });

  describe('requests', () => {
    describe('GET_PLACE_IDS', () => {
      it('should call api if there are locations', () => {
        const locations = ['1'];
        CONFIG.requests[GET_PLACE_IDS]({ locations });
      });
      it('should not call api if there are locations', () => {
        const locations = [];
        CONFIG.requests[GET_PLACE_IDS]({ locations });
      });
    });

    describe('GET_LAT_LONG', () => {
      it('should call api if there is a location', () => {
        const location = 'Manila';
        CONFIG.requests[GET_LAT_LONG]({ location });
      });

      it('should not call api if there is a location', () => {
        const location = null;
        expect(CONFIG.requests[GET_LAT_LONG]({ location })).toEqual(null);
      });
    });
    describe('GET_GEO_COUNTRY_CODE', () => {
      it('should call api if there are locations', () => {
        const location = 'Manila';
        CONFIG.requests[GET_GEO_COUNTRY_CODE]({ location });
      });
      it('should not call api if there are locations', () => {
        const location = null;
        CONFIG.requests[GET_GEO_COUNTRY_CODE]({ location });
      });
    });
    describe('GET_GEO_CURRENT_LOCATION', () => {
      it('should call request', () => {
        CONFIG.requests[GET_GEO_CURRENT_LOCATION]();
      });
    });
  });

  describe('processResult', () => {
    it('it should process result of GET_PLACE_IDS', () => {
      const result = [
        {
          results: [
            {
              geometry: {
                location: {
                  lat: 1,
                  lng: 1,
                },
              },
              address_components: [
                {
                  long_name: 'Philippines',
                  short_name: 'Ph',
                  types: 'country',
                },
              ],
            },
          ],
        },
      ];
      const locations = ['Manila'];
      CONFIG.processResult[GET_PLACE_IDS](result, { locations });
    });
  });
});
