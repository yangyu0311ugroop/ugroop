import { URL_HELPERS } from 'appConstants';
import qs from 'qs';

export const parseQueryParam = (url, opt = { ignoreQueryPrefix: true }) =>
  qs.parse(url, opt);

export const stringifyParam = (parsedParam, opts = {}) =>
  qs.stringify(parsedParam, opts);

export const URL_CHECKER = {
  isOnMyToursPage: (location, id) =>
    URL_HELPERS.tours(id) === location || URL_HELPERS === URL_HELPERS.tours(),
  isOnOrgToursPage: (location, id) => location === URL_HELPERS.orgTours(id),
};
