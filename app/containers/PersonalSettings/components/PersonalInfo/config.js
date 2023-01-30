import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    personId: USER_STORE_SELECTORS.id,
    firstName: ({ userId }) => USER_STORE_SELECTORS.firstName({ id: userId }),
    lastName: ({ userId }) => USER_STORE_SELECTORS.lastName({ id: userId }),
    knownAs: ({ userId }) => USER_STORE_SELECTORS.knownAs({ id: userId }),
    email: ({ userId }) => USER_STORE_SELECTORS.email({ id: userId }),
    secondaryEmail: ({ userId }) =>
      USER_STORE_SELECTORS.secondaryEmail({ id: userId }),
    gender: ({ userId }) => USER_STORE_SELECTORS.gender({ id: userId }),
    birthDate: ({ userId }) => USER_STORE_SELECTORS.birthDate({ id: userId }),
    birthPlace: ({ userId }) => USER_STORE_SELECTORS.birthPlace({ id: userId }),
    insurancePolicy: ({ userId }) =>
      USER_STORE_SELECTORS.insurancePolicy({ id: userId }),
    phones: ({ userId }) => USER_STORE_SELECTORS.phones({ id: userId }),
    medicals: ({ userId }) => USER_STORE_SELECTORS.medicals({ id: userId }),
    dietaries: ({ userId }) => USER_STORE_SELECTORS.dietaries({ id: userId }),
  },
  setValue: {},
};
