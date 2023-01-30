import {
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
  LOCAL_USER_STORE,
} from 'appConstants';
import ARRAY_HELPERS from '../../utils/helpers/arrays';

const getAllNames = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id =>
      USER_STORE_SELECTORS.knownAs({ id }),
    ),
  cacheKey: getArrayCacheKey({ idsProp, key: 'getAllNames' }),
  props: null,
  getter: (...results) => {
    results.pop();
    return results;
  },
});

const getArrayCacheKey = ({ idsProp, key }) => ({ [idsProp]: ids }) => {
  const idsValue = ARRAY_HELPERS.arrayIfNot(ids);
  return `userStore.${idsProp}:${idsValue}.${key}`;
};
const getAllEmails = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id => USER_STORE_SELECTORS.email({ id })),
  cacheKey: getArrayCacheKey({ idsProp, key: 'getAllEmails' }),
  props: null,
  getter: (...results) => {
    results.pop();
    return results;
  },
});

const getAllPhotos = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id => USER_STORE_SELECTORS.photo({ id })),
  cacheKey: getArrayCacheKey({ idsProp, key: 'getAllPhotos' }),
  props: null,
  getter: (...results) => {
    results.pop();
    return results;
  },
});

export const USER_STORE_SELECTORS = {
  userId: () => [USER_DATA_STORE, 'userId'],
  userNodeId: () => [USER_DATA_STORE, 'userNode', 'id'],
  users: () => [USER_DATA_STORE, 'users'],
  organisations: ({ id }) => [USER_DATA_STORE, 'users', id, 'organisations'],
  orgInvitations: ({ id }) => [USER_DATA_STORE, 'users', id, 'orgInvitations'],
  notifications: ({ id }) => [USER_DATA_STORE, 'users', id, 'notifications'],
  knownAs: ({ id }) => [USER_DATA_STORE, 'people', id, 'knownAs'],
  insurancePolicy: ({ id }) => [
    USER_DATA_STORE,
    'people',
    id,
    'insurancePolicy',
  ],
  metaInfo: ({ id }) => [USER_DATA_STORE, 'people', id, 'metaInfo'],
  secondaryEmail: ({ id }) => [USER_DATA_STORE, 'people', id, 'secondaryEmail'],
  gender: ({ id }) => [USER_DATA_STORE, 'people', id, 'gender'],
  photo: ({ id }) => [USER_DATA_STORE, 'people', id, 'photo'],
  email: ({ id }) => [USER_DATA_STORE, 'people', id, 'email'],
  createdAt: ({ id }) => [USER_DATA_STORE, 'people', id, 'createdAt'],
  orgUsers: ({ id }) => [USER_DATA_STORE, 'users', id, 'organisations'],
  orgUserId: ({ userId }) => [
    USER_DATA_STORE,
    'users',
    userId,
    'organisations',
  ],
  userNodes: ({ id }) => [USER_DATA_STORE, 'people', id, 'userNodes'],
  phones: ({ id }) => [USER_DATA_STORE, 'people', id, 'phones'],
  passports: ({ id }) => [USER_DATA_STORE, 'people', id, 'passports'],
  birthPlace: ({ id }) => [USER_DATA_STORE, 'people', id, 'birthPlace'],
  birthDate: ({ id }) => [USER_DATA_STORE, 'people', id, 'birthDate'],
  firstName: ({ id }) => [USER_DATA_STORE, 'people', id, 'firstName'],
  middleName: ({ id }) => [USER_DATA_STORE, 'people', id, 'middleName'],
  lastName: ({ id }) => [USER_DATA_STORE, 'people', id, 'lastName'],
  medicals: ({ id }) => [USER_DATA_STORE, 'people', id, 'medicals'],
  dietaries: ({ id }) => [USER_DATA_STORE, 'people', id, 'dietaries'],
  studentDetails: ({ id }) => [USER_DATA_STORE, 'people', id, 'studentDetails'],
  id: ({ userId }) => [USER_DATA_STORE, 'people', userId, 'id'],
  getAllEmails,
  getAllNames,
  getAllPhotos,
  getArrayCacheKey,
  insurancePolicies: ({ id }) => [
    USER_DATA_STORE,
    'people',
    id,
    'insurancePolicies',
  ],
};

const USER_NODE = 'userNode';
export const USER_NODE_STORE_SELECTORS = {
  id: () => [USER_DATA_STORE, USER_NODE, 'id'],
};

export const ORG_USERS_SELECTORS = {
  name: ({ id }) => [USER_DATA_STORE, 'orgUsers', id, 'name'],
  role: ({ id }) => [ORGANISATION_DATA_STORE, 'orgUsers', id, 'role'],
  createdAt: ({ id }) => [USER_DATA_STORE, 'orgUsers', id, 'createdAt'],
  lastSeenDate: ({ id }) => [
    ORGANISATION_DATA_STORE,
    'members',
    id,
    'lastSeen',
  ],
};

/**
 * @deprecated SK: So i went and added a lot of UserNode stuff to the INVITATION_STORE_SELECTORS.selectUserNodes, etc! Probably wasn't the greatest choice
 */
export const USER_NODES_SELECTORS = {
  content: ({ id }) => [USER_DATA_STORE, 'userNodes', id, 'content'],
  date: ({ id }) => [USER_DATA_STORE, 'userNodes', id, 'date'],
  role: ({ id }) => [USER_DATA_STORE, 'userNodes', id, 'role'],
};

export const USER_USERS_FIELDS = {
  orgId: 'orgId',
  id: 'id',
  email: 'email',
};

export const USERS_PREFERENCE_SELECTORS = {
  getUserPreference: ({ id, key }) => [
    USER_DATA_STORE,
    'users',
    id,
    'preference',
    key,
  ],
};

export const USER_REMINDER_FREQUENCY_DAYS = ({ id }) => [
  USER_DATA_STORE,
  'preferences',
  id,
  'reminderFrequencyDays',
];

export const USER_REMINDER_ATTEMPTS = ({ id }) => [
  USER_DATA_STORE,
  'preferences',
  id,
  'reminderAttempts',
];

export const USER_REMINDER_DISABLED = ({ id }) => [
  USER_DATA_STORE,
  'preferences',
  id,
  'reminderDisabled',
];

export const USER_SEE_MORE_DISABLED = ({ id }) => [
  USER_DATA_STORE,
  'preferences',
  id,
  'seeMoreDisabled',
];

export const USER_USERS_SELECTOR_CREATOR = selectedField => ({ id }) => [
  USER_DATA_STORE,
  'users',
  id,
  selectedField,
];

export const USER_PASSPORTS_FIELDS = {
  personId: 'personId',
  cardNumber: 'cardNumber',
  countryCode: 'countryCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  expireDate: 'expireDate',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  issuedDate: 'issuedDate',
  issuingAuthority: 'issuingAuthority',
  passportNumber: 'passportNumber',
  passportType: 'passportType',
  passportOtherType: 'passportOtherType',
  isDefault: 'isDefault',
  photo: 'photo',
  editable: 'editable',
};

export const USER_FIELDS = {
  birthDate: 'birthDate',
  birthPlace: 'birthPlace',
};

export const USER_PASSPORTS_SELECTOR_CREATOR = selectedField => ({ id }) => [
  USER_DATA_STORE,
  'passports',
  id,
  selectedField,
];

// region View store
const viewStorePassport = [USER_DATA_STORE, 'view', 'passport'];
const viewStorePassportCreate = [...viewStorePassport, 'create'];
const viewStorePassportView = [...viewStorePassport, 'view'];

export const USER_VIEW_STORE_SELECTORS = {
  PASSPORT: {
    CREATE: {
      open: [...viewStorePassportCreate, 'open'],
      personId: [...viewStorePassportCreate, 'personId'],
      createdId: [...viewStorePassportCreate, 'createdId'],
    },
    VIEW: {
      open: [...viewStorePassportView, 'open'],
      id: [...viewStorePassportView, 'id'],
      readOnly: [...viewStorePassportView, 'readOnly'],
      deletedId: [...viewStorePassportView, 'deletedId'],
    },
  },
};

export const readUpdates = ({ userId }) => [
  LOCAL_USER_STORE,
  `${userId}`,
  'readUpdates',
];

export const LOCAL_USER_SELECTOR = {
  readUpdates,
};
// endregion
