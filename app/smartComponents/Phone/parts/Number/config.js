import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
} from 'datastore/phoneStore/selectors';

export const CONFIG = {
  value: {
    number: PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.number),
    isDefault: PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.isDefault),
    organisationId: ORGANISATION_STORE_SELECTORS.organisationId,
  },
  setValue: {},
};
