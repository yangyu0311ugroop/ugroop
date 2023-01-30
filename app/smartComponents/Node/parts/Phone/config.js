import _ from 'lodash';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PHONE_STORE_SELECTOR_CREATOR } from 'datastore/phoneStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { GEOCODE_STORE_SELECTORS } from 'datastore/geocodeStore/selectors';
import ARRAY_HELPERS from 'utils/helpers/arrays';

export const CONFIG_1 = {
  value: {
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.phone }),
    userValues: {
      keyPath: ({ userId: id }) => USER_STORE_SELECTORS.phones({ id }),
      cacheKey: ({ userId: id }) => `Node.parts.Phone.${id}.userValues1`,
      props: null,
      getter: results => _.uniq(_.compact(results)),
    },
    countryCode: GEOCODE_STORE_SELECTORS.currentCountryCode,
  },
};

export const CONFIG_2 = {
  value: {
    userValues: {
      keyPath: ({ userValues }) =>
        ARRAY_HELPERS.arrayIfNot(userValues).map(id =>
          PHONE_STORE_SELECTOR_CREATOR('number')({ id }),
        ),
      cacheKey: ({ userValues }) =>
        `Node.parts.Phone.${
          userValues ? userValues.toString() : userValues
        }.userValues2`,
      props: ({ userValues }) => userValues,
      getter: (...numbers) => {
        const ids = numbers.pop();
        return ids.length ? _.zip(ids, numbers) : [];
      },
    },
    userPhoneId: {
      keyPath: [
        ({ id }) =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.userPhoneId }),
        ({ id }) =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.phone }),
      ],
      getter: (phoneid, phone) => {
        if (!phoneid && !phone) return 0;
        return phoneid;
      },
    },
  },
};
