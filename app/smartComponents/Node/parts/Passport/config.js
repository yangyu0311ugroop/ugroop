import indexOf from 'lodash/indexOf';
import head from 'lodash/head';
import { PASSPORT } from 'utils/modelConstants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_STORE_SELECTORS,
  USER_VIEW_STORE_SELECTORS,
} from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    childrenValues: NODE_STORE_SELECTORS.children,
    nodeValues: {
      keyPath: ({ personId: id }) => PERSON_STORE_SELECTORS.passports({ id }),
      cacheKey: ({ personId: id }) => `Node.parts.Passport.${id}.values`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
    userPersonId: USER_STORE_SELECTORS.id,
    myId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG_2 = {
  value: {
    passportNodeId: {
      keyPath: ({ childrenValues }) =>
        childrenValues &&
        childrenValues.map(id => NODE_STORE_SELECTORS.type({ id })),
      cacheKey: ({ userPersonId: id, childrenValues }) =>
        `Node.parts.Passport.${id}.${
          childrenValues ? childrenValues.toString() : 'null'
        }.passportNodeId`,
      props: ({ childrenValues }) => childrenValues,
      getter: (...types) => {
        const childrenValues = types.pop();
        const index = types.indexOf(PASSPORT);
        return index < 0 ? null : childrenValues[index];
      },
    },
    userValues: {
      keyPath: ({ userPersonId: id }) =>
        PERSON_STORE_SELECTORS.passports({ id }),
      cacheKey: ({ userPersonId: id }) =>
        `Node.parts.Passport.${id}.userValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
  },
};

export const CONFIG_3 = {
  value: {
    value: ({ passportNodeId: id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.passportId }),
    defaultUserValue: {
      keyPath: ({ userValues }) =>
        userValues.map(id =>
          USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.isDefault)({
            id,
          }),
        ),
      cacheKey: ({ userPersonId: id }) =>
        `Node.parts.Passport.${id}.defaultUserValue`,
      props: ({ userValues }) => userValues,
      getter: (...isDefaults) => {
        const ids = isDefaults.pop();
        const index = indexOf(isDefaults, true);
        return index < 0 ? head(ids) : ids[index];
      },
    },
    passportCreateOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.open,
    passportCreateCreatedId:
      USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.createdId,
    passportViewOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.open,
    passportViewDeletedId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.deletedId,
  },
  setValue: {
    passportCreateOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.open,
    passportCreatePersonId: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.personId,
    passportCreateCreatedId:
      USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.createdId,
    passportViewOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.open,
    passportViewId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.id,
    passportViewReadOnly: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.readOnly,
    passportViewDeletedId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.deletedId,
  },
};
