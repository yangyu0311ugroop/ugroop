import {
  USER_STORE_SELECTORS,
  ORG_USERS_SELECTORS,
} from 'datastore/userStore/selectors';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { USER_FIELDS } from 'appConstants';
import { toLowerCaseIfString } from 'utils/stringAdditions';
import momentHelper from 'utils/helpers/moment';

export const sortBy = (columnOrderBy, columnSortBy, unsorted) =>
  LOGIC_HELPERS.switchCase(columnOrderBy, {
    asc: () =>
      unsorted
        .sort((aKey, bKey) => {
          const a =
            columnSortBy === USER_FIELDS.CREATED_DATE ||
            USER_FIELDS.LASTSEEN_DATE
              ? aKey[1]
              : toLowerCaseIfString(aKey[1]);
          const b =
            columnSortBy === USER_FIELDS.CREATED_DATE ||
            USER_FIELDS.LASTSEEN_DATE
              ? bKey[1]
              : toLowerCaseIfString(bKey[1]);
          if (a > b) {
            return 1;
          }

          if (a < b) {
            return -1;
          }
          return 0;
        })
        .map(([id]) => id),
    desc: () =>
      unsorted
        .sort((aKey, bKey) => {
          const a =
            columnSortBy === USER_FIELDS.CREATED_DATE ||
            USER_FIELDS.LASTSEEN_DATE
              ? aKey[1]
              : toLowerCaseIfString(aKey[1]);
          const b =
            columnSortBy === USER_FIELDS.CREATED_DATE ||
            USER_FIELDS.LASTSEEN_DATE
              ? bKey[1]
              : toLowerCaseIfString(bKey[1]);
          if (a > b) {
            return -1;
          }
          if (a < b) {
            return 1;
          }

          return 0;
        })
        .map(([id]) => id),
  });
export const CONFIG_0 = {
  value: {
    knownAs: {
      keyPath: ({ ids }) => ids.map(id => USER_STORE_SELECTORS.knownAs({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.knownAs.sort`,
      props: [({ ids }) => ids, ({ knownAs }) => knownAs],
      getter: (...args) => {
        const sortBasis = dropRight(args, 1);
        const [ids] = takeRight(args, 2);
        return dropRight(zip(ids, sortBasis), 1);
      },
    },
    firstName: {
      keyPath: ({ ids }) =>
        ids.map(id => USER_STORE_SELECTORS.firstName({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.firstName.sort`,
      props: [({ ids }) => ids, ({ firstName }) => firstName],
      getter: (...args) => {
        const sortBasis = dropRight(args, 2);
        const [ids] = takeRight(args, 2);
        return zip(ids, sortBasis);
      },
    },
    lastName: {
      keyPath: ({ ids }) =>
        ids.map(id => USER_STORE_SELECTORS.lastName({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.lastName.sort`,
      props: [({ ids }) => ids, ({ lastName }) => lastName],
      getter: (...args) => {
        const sortBasis = dropRight(args, 2);
        const [ids] = takeRight(args, 2);
        return zip(ids, sortBasis);
      },
    },
    email: {
      keyPath: ({ ids }) => ids.map(id => USER_STORE_SELECTORS.email({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.email.sort`,
      props: [({ ids }) => ids, ({ email }) => email],
      getter: (...args) => {
        const sortBasis = dropRight(args, 2);
        const [ids] = takeRight(args, 2);
        return zip(ids, sortBasis);
      },
    },
    createdAt: {
      keyPath: ({ ids }) =>
        ids.map(id => USER_STORE_SELECTORS.createdAt({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.createdAt.sort`,
      props: [({ ids }) => ids, ({ createdAt }) => createdAt],
      getter: (...args) => {
        const sortBasis = dropRight(args, 2);
        const [ids] = takeRight(args, 2);
        return zip(ids, sortBasis);
      },
    },
    lastSeenDate: {
      keyPath: ({ ids }) =>
        ids.map(id => ORG_USERS_SELECTORS.lastSeenDate({ id })),
      cacheKey: ({ ids }) =>
        `SortTable.${ids ? ids.toString() : null}.lastSeenDate.sort`,
      props: [({ ids }) => ids, ({ lastSeenDate }) => lastSeenDate],
      getter: (...args) => {
        const sortBasis = dropRight(args, 2);
        const sortBasisFiltered = sortBasis.map(v =>
          v === undefined
            ? ''
            : momentHelper.getDateFromUnixFormat(
                v,
                'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
              ),
        );
        const [ids] = takeRight(args, 2);
        return zip(ids, sortBasisFiltered);
      },
    },
  },
  setValue: {},
};

export const filterName = (knownAs, firstName, lastName) =>
  knownAs.map((e, i) => {
    const elem = e;
    elem[1] = elem[1] || `${firstName[i][1]} ${lastName[i][1]}`;
    return elem;
  });

export const columnSortByFunc = (props, columnSortBy) => {
  const {
    knownAs,
    firstName,
    lastName,
    email,
    createdAt,
    lastSeenDate,
  } = props;
  switch (columnSortBy) {
    case USER_FIELDS.KNOWN_AS:
      return filterName(knownAs, firstName, lastName);
    case USER_FIELDS.EMAIL:
      return email;
    case USER_FIELDS.CREATED_DATE:
      return createdAt;
    case USER_FIELDS.LASTSEEN_DATE:
      return lastSeenDate;
    default: {
      return filterName(knownAs, firstName, lastName);
    }
  }
};

export const CONFIG = {
  value: {
    sortedIds: {
      cacheKey: ({ ids, columnSortBy }) =>
        `SortTable.${ids ? ids.toString() : null}.${columnSortBy}.sort`,
      props: [
        ({ ids }) => ids,
        ({ columnOrderBy }) => columnOrderBy,
        ({ columnSortBy }) => columnSortBy,
        ({ knownAs }) => knownAs,
      ],
      getter: props => {
        const { ids, columnOrderBy, columnSortBy } = props;
        const unsorted = columnSortByFunc(props, columnSortBy);

        if (ids.length === 0) return [];

        return sortBy(columnOrderBy, columnSortBy, unsorted);
      },
    },
    setValue: {},
  },
};
