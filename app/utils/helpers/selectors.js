import { ARRAY_HELPERS } from 'utils/helpers/arrays';

const propOrValueArray = (value, propValue) =>
  Array.isArray(value) ? value : ARRAY_HELPERS.arrayIfNot(propValue);

const selectPropOrValueArray = prop => ({ [prop]: propValue }) =>
  propOrValueArray(prop, propValue);

const filterIncludesReducer = values => (acc, [id, value]) =>
  values.includes(value) ? [...acc, id] : acc;

export const SELECTOR_HELPERS = {
  propOrValueArray,
  selectPropOrValueArray,
  filterIncludesReducer,
};
