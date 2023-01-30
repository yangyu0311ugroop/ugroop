import { PERSON_DATA_STORE } from 'appConstants';

export const CONFIG_1 = {
  value: {
    value: ({ id }) => [PERSON_DATA_STORE, 'people', id, 'insurancePolicies'],
  },
};
