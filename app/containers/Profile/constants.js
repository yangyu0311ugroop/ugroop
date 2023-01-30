export const ORG_PROFILE_VIEW_STORE = 'orgProfileViewStore';
export const ORG_PROFILE = 'orgProfile';

export const PERSON_PROFILE_DATASTORE = 'personProfileDataStore';
export const PROFILE_TAB_CODE = 'PROFILE';
export const SCHOOL_TAB_CODE = 'SCHOOL';
export const ROLES_TAB_CODE = 'ROLES';
export const PREFERENCE_TAB_CODE = 'PREFERENCE';
export const SUBSCRIPTION_TAB_CODE = 'SUBSCRIPTION';
export const SCHOOL_TAB_INDEX = 1;
export const SCHOOL_ORG_TYPE = 'EducationalInstitution';

export const ORGANISATION_TAB_ITEM_KEYS = {
  PROFILE: 0,
  SCHOOL: 1,
  ROLES: 2,
  PREFERENCES: 3,
  SUBSCRIPTION: 4,
};
// page
export const TAB_ITEMS_ORGANISATION = [
  {
    id: ORGANISATION_TAB_ITEM_KEYS.PROFILE,
    label: 'Profile',
    code: PROFILE_TAB_CODE,
  },
  {
    id: ORGANISATION_TAB_ITEM_KEYS.SCHOOL,
    label: 'School',
    code: SCHOOL_TAB_CODE,
  },
  {
    id: ORGANISATION_TAB_ITEM_KEYS.ROLES,
    label: 'Roles',
    code: ROLES_TAB_CODE,
  },
  {
    id: ORGANISATION_TAB_ITEM_KEYS.PREFERENCES,
    label: 'Preferences',
    code: PREFERENCE_TAB_CODE,
  },
  {
    id: ORGANISATION_TAB_ITEM_KEYS.SUBSCRIPTION,
    label: 'Billing',
    code: SUBSCRIPTION_TAB_CODE,
  },
];

export const PERSON_TAB_ITEM_KEYS = {
  PROFILE: 0,
  CHANGE_PASSWORD: 1,
  ROLES: 2,
  PREFERENCES: 3,
  PASSPORT: 4,
  DOCUMENTS: 5,
  BILLING: 6,
};

export const TAB_ITEMS_PERSON = [
  {
    id: PERSON_TAB_ITEM_KEYS.PROFILE,
    label: 'Profile',
  },
  {
    id: PERSON_TAB_ITEM_KEYS.CHANGE_PASSWORD,
    label: 'Change Password',
  },
  {
    id: PERSON_TAB_ITEM_KEYS.ROLES,
    label: 'Organisations',
  },
  {
    id: PERSON_TAB_ITEM_KEYS.PREFERENCES,
    label: 'Preferences',
  },
  {
    id: PERSON_TAB_ITEM_KEYS.PASSPORT,
    label: 'Passports',
  },
  {
    id: PERSON_TAB_ITEM_KEYS.BILLING,
    label: 'Billing',
  },
];

export const DEFAULT_PERSON_TAB_INDEX =
  TAB_ITEMS_PERSON[PERSON_TAB_ITEM_KEYS.PROFILE].id;

export const DEFAULT_ORGANISATION_TAB_INDEX =
  TAB_ITEMS_ORGANISATION[ORGANISATION_TAB_ITEM_KEYS.PROFILE].id;
