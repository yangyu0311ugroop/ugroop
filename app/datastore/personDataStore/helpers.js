import { USER_DATA_STORE } from 'appConstants';
import { INPUT_UTILS } from 'ugcomponents/Inputs';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';

const pathToPersonInputName = (path, { nameKey = 'person' } = {}) => {
  const pathArray = [
    ...ARRAY_HELPERS.arrayIfNot(nameKey),
    ...ARRAY_HELPERS.arrayIfNot(path),
  ];
  return INPUT_UTILS.storePathToInputName(pathArray);
};

/**
 * Either return store value using selector based on props.dataStore or value based on props[propName]
 */
const selectPersonProperty = (selectors, propName) => ({
  keyPath: ({ dataStore, id }) =>
    selectors[dataStore || USER_DATA_STORE]({ id }),
  props: ({ [propName]: value }) => value,
  getter: (storeValue, value) => value || storeValue,
});

const pathToMedicalInputName = (path, { nameKey = 'medical' } = {}) =>
  pathToPersonInputName(path, { nameKey });

const pathToDietaryInputName = (path, { nameKey = 'dietary' } = {}) =>
  pathToPersonInputName(path, { nameKey });

const pathToStudentDetailInputName = (
  path,
  { nameKey = 'studentDetail' } = {},
) => pathToPersonInputName(path, { nameKey });

export const PERSON_STORE_HELPERS = {
  pathToPersonInputName,
  selectPersonProperty,
  pathToMedicalInputName,
  pathToDietaryInputName,
  pathToStudentDetailInputName,
};
