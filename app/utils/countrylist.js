import { NONE, UNKNOWN } from 'appConstants';
import { COUNTRY_LIST } from 'countries';
import memoize from 'memoize-one';
import filter from 'lodash/filter';

export const getCountryList = memoize(() => {
  const transformedData = COUNTRY_LIST.map(datum => ({
    value: datum.code,
    children: `${datum.name} - ${datum.code}`,
  }));
  return transformedData;
});

const getCountryByCode = memoize(code => {
  if (code === NONE) {
    return '';
  }

  const selected = filter(COUNTRY_LIST, { code })[0];

  return selected ? selected.name : UNKNOWN;
});

export const COUNTRY_LIST_HELPERS = {
  getCountryList,
  getCountryByCode,
};
