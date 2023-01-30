import { get } from 'lodash';
import { DATASTORE_UTILS } from 'datastore';

const cachePlaces = (placeId, place) => {
  if (!placeId || !place) return;
  window.UGROOP_GLOBAL_VARS.googlePlaces = DATASTORE_UTILS.upsertObject(
    placeId,
    place,
  )(window.UGROOP_GLOBAL_VARS.googlePlaces);
};
const cacheTimezones = (placeId, timezone) => {
  if (!placeId || !timezone) return;
  window.UGROOP_GLOBAL_VARS.googleTimezones = DATASTORE_UTILS.upsertObject(
    placeId,
    timezone,
  )(window.UGROOP_GLOBAL_VARS.googleTimezones);
};
const getCachePlaces = placeId =>
  get(window.UGROOP_GLOBAL_VARS.googlePlaces, `${placeId}`);
const getCacheTimezones = placeId =>
  get(window.UGROOP_GLOBAL_VARS.googleTimezones, `${placeId}`);

export const CACHE_PLACES_TIMEZONES_UTILS = {
  cachePlaces,
  cacheTimezones,
  getCachePlaces,
  getCacheTimezones,
};
