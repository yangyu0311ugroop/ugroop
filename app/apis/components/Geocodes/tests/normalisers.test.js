import { GEOCODE_NORMALISERS } from '../normalisers';

describe('GECODE_NORMALISERS', () => {
  describe('getLatLongs', () => {
    it('should process result of GET_LAT_LONGS', () => {
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
                  types: 'country',
                },
              ],
            },
          ],
        },
      ];
      const locations = ['Manila'];

      const geocode = GEOCODE_NORMALISERS.getLatLongs(result, {
        locations,
      });

      expect(geocode).toMatchSnapshot();
    });
  });

  describe('getLatLong', () => {
    it('should process result of getLatLong', () => {
      const result = {
        results: [
          {
            geometry: {
              location: {
                lat: 1,
                lng: 2,
              },
            },
          },
        ],
      };

      const geocode = GEOCODE_NORMALISERS.getLatLong(result);
      expect(geocode).toMatchSnapshot();
    });
  });
  describe('getCurrentLocation', () => {
    it('should process result of getCurrentLocation', () => {
      expect(GEOCODE_NORMALISERS.getCurrentLocation()).toMatchSnapshot();
    });
  });
  describe('getCountryCode', () => {
    it('should process result of getCountryCode', () => {
      const result = {
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
                types: 'country',
              },
            ],
            place_id: '1',
          },
        ],
      };
      const location = 'Manila';

      const geocode = GEOCODE_NORMALISERS.getCountryCode(result, {
        location,
      });

      expect(geocode).toMatchSnapshot();
    });
    it('should not explode', () => {
      const result = {};
      const location = 'Manila';

      const geocode = GEOCODE_NORMALISERS.getCountryCode(result, {
        location,
      });

      expect(geocode).toMatchSnapshot();
    });
  });
});
