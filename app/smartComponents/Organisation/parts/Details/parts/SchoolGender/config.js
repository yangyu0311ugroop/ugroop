import {
  getOrganisationSchoolGender,
  getSubTypes,
} from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    schoolGender: getOrganisationSchoolGender,
    subTypes: getSubTypes,
  },
  setValue: {},
};
