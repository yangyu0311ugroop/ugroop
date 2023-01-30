import { find, findKey } from 'lodash';

const findUnSetupOrg = array =>
  find(array, obj => {
    if (!findKey(obj, 'firstTimeSetup')) {
      return obj;
    }
    return null;
  });

const findOrg = (array, id) => find(array, o => o.id === id);

export { findUnSetupOrg, findOrg };
