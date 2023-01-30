import {
  USER_NODE_STORE_SELECTORS,
  USER_NODES_SELECTORS,
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_STORE_SELECTORS,
  USER_USERS_FIELDS,
  USER_USERS_SELECTOR_CREATOR,
  USERS_PREFERENCE_SELECTORS,
  USER_REMINDER_FREQUENCY_DAYS,
  USER_REMINDER_DISABLED,
  USER_SEE_MORE_DISABLED,
  USER_REMINDER_ATTEMPTS,
  ORG_USERS_SELECTORS,
  LOCAL_USER_SELECTOR,
} from '../selectors';
import { ARRAY_HELPERS } from '../../../utils/helpers/arrays';
import {
  USER_DATA_STORE,
  ORGANISATION_DATA_STORE,
  LOCAL_USER_STORE,
} from '../../../appConstants';

describe('userStore/selectors.js', () => {
  it('should return particular object for USER_STORE_SELECTORS', () => {
    expect(USER_STORE_SELECTORS).toMatchSnapshot();
  });

  describe('USER_STORE_SELECTORS', () => {
    it('should return specific shape of keyPath', () => {
      const keys = Object.keys(USER_STORE_SELECTORS);
      keys.forEach(key => {
        expect(USER_STORE_SELECTORS[key]({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('getAllNames', () => {
      it('should have keyPath', () => {
        const ids = [1];
        expect(
          USER_STORE_SELECTORS.getAllNames({ idsProp: 'ids' }).keyPath({ ids }),
        ).toEqual(
          ARRAY_HELPERS.arrayIfNot(ids).map(id =>
            USER_STORE_SELECTORS.knownAs({ id }),
          ),
        );
      });
      it('should have getter', () => {
        const results = [1, null];
        expect(
          USER_STORE_SELECTORS.getAllNames({ idsProp: 'ids' }).getter(
            ...results,
          ),
        ).toEqual([1]);
      });
    });

    describe('getAllEmails', () => {
      it('should have keyPath', () => {
        const ids = [1];
        expect(
          USER_STORE_SELECTORS.getAllEmails({ idsProp: 'ids' }).keyPath({
            ids,
          }),
        ).toEqual(
          ARRAY_HELPERS.arrayIfNot(ids).map(id =>
            USER_STORE_SELECTORS.email({ id }),
          ),
        );
      });
      it('should have getter', () => {
        const results = [1, null];
        expect(
          USER_STORE_SELECTORS.getAllEmails({ idsProp: 'ids' }).getter(
            ...results,
          ),
        ).toEqual([1]);
      });
    });

    describe('getAllPhotos', () => {
      it('should have keyPath', () => {
        const ids = [1];
        expect(
          USER_STORE_SELECTORS.getAllPhotos({ idsProp: 'ids' }).keyPath({
            ids,
          }),
        ).toEqual(
          ARRAY_HELPERS.arrayIfNot(ids).map(id =>
            USER_STORE_SELECTORS.photo({ id }),
          ),
        );
      });
      it('should have getter', () => {
        const results = [1, null];
        expect(
          USER_STORE_SELECTORS.getAllPhotos({ idsProp: 'ids' }).getter(
            ...results,
          ),
        ).toEqual([1]);
      });
    });

    describe('getArrayCacheKey', () => {
      it('should return cacheKey', () => {
        const value = [1];
        expect(
          USER_STORE_SELECTORS.getArrayCacheKey({ idsProp: 'value', key: '1' })(
            { value },
          ),
        ).toEqual(`userStore.value:${value}.1`);
      });
    });
  });

  describe('ORG_USERS_SELECTORS', () => {
    it('should have keyPaths', () => {
      expect(ORG_USERS_SELECTORS.name({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'orgUsers',
        1,
        'name',
      ]);
      expect(ORG_USERS_SELECTORS.lastSeenDate({ id: 1 })).toEqual([
        ORGANISATION_DATA_STORE,
        'members',
        1,
        'lastSeen',
      ]);
      expect(ORG_USERS_SELECTORS.role({ id: 1 })).toEqual([
        ORGANISATION_DATA_STORE,
        'orgUsers',
        1,
        'role',
      ]);
      expect(ORG_USERS_SELECTORS.createdAt({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'orgUsers',
        1,
        'createdAt',
      ]);
    });
  });

  describe('USER_REMINDER_FREQUENCY_DAYS', () => {
    it('should return keyPath', () => {
      expect(USER_REMINDER_FREQUENCY_DAYS({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'preferences',
        1,
        'reminderFrequencyDays',
      ]);
    });
  });

  describe('USER_REMINDER_ATTEMPTS', () => {
    it('should return keyPath', () => {
      expect(USER_REMINDER_ATTEMPTS({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'preferences',
        1,
        'reminderAttempts',
      ]);
    });
  });

  describe('USER_REMINDER_DISABLED', () => {
    it('should return keyPath', () => {
      expect(USER_REMINDER_DISABLED({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'preferences',
        1,
        'reminderDisabled',
      ]);
    });
  });

  describe('USER_SEE_MORE_DISABLED', () => {
    it('should return keyPath', () => {
      expect(USER_SEE_MORE_DISABLED({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'preferences',
        1,
        'seeMoreDisabled',
      ]);
    });
  });

  describe('USER_NODES_SELECTORS', () => {
    it('should return a specific shape of keyPath', () => {
      const keys = Object.keys(USER_NODES_SELECTORS);
      keys.forEach(key => {
        expect(USER_NODES_SELECTORS[key]({ id: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('USER_PASSPORTS_SELECTORS', () => {
    it('should return a specific shape of keyPath', () => {
      const keys = Object.keys(USER_PASSPORTS_FIELDS);
      keys.forEach(key => {
        expect(
          USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS[key])({
            id: 1,
          }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('USER_USERS_SELECTOR_CREATOR', () => {
    it('should return a specific shape of keyPath', () => {
      const keys = Object.keys(USER_USERS_FIELDS);
      keys.forEach(key => {
        expect(
          USER_USERS_SELECTOR_CREATOR(USER_USERS_FIELDS[key])({ id: 1 }),
        ).toMatchSnapshot();
      });
    });
  });
  describe('USERS_PREFERENCE_SELECTORS', () => {
    it('should return a specific shape of keyPath', () => {
      const keys = Object.keys(USERS_PREFERENCE_SELECTORS);
      keys.forEach(key => {
        expect(USERS_PREFERENCE_SELECTORS[key]({ id: 1 })).toMatchSnapshot();
      });
    });
  });
  describe('USER_NODE_STORE_SELECTORS', () => {
    it('should return a specific shape of keyPath', () => {
      const keys = Object.keys(USER_NODE_STORE_SELECTORS);
      keys.forEach(key => {
        expect(USER_NODE_STORE_SELECTORS[key]({ id: 1 })).toMatchSnapshot();
      });
    });
  });
  describe('LOCAL_USER_SELECTOR', () => {
    it('should return keyPath', () => {
      expect(LOCAL_USER_SELECTOR.readUpdates({ userId: 1 })).toEqual([
        LOCAL_USER_STORE,
        '1',
        'readUpdates',
      ]);
    });
  });
});
