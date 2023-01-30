import { GEOCODE_STORE } from 'appConstants';

const countryCode = ({ id }) => [GEOCODE_STORE, 'geocodes', id, 'countryCode'];
const currentCountryCode = [
  GEOCODE_STORE,
  'geocodes',
  'currentLocation',
  'countryCode',
];
const currentLocation = [GEOCODE_STORE, 'geocodes', 'currentLocation'];

export const GEOCODE_STORE_SELECTORS = {
  countryCode,
  currentCountryCode,
  currentLocation,
};
