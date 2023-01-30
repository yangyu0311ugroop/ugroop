import { USER_DATA_STORE } from 'appConstants';

export const CONFIG = {
  setValue: {},

  value: {
    userInfo: {
      // TODO: Remove default values if resaga uses component's default prop values
      keyPath: ({
        dataStore = USER_DATA_STORE,
        dataStoreProperty = 'people',
        userId,
      }) => [dataStore, dataStoreProperty, userId],
      getter: (
        person,
        { isManual, nameProperty = 'knownAs', photoProperty = 'photo' },
      ) => {
        if (isManual || !person) return {};
        const {
          [nameProperty]: fullName,
          [photoProperty]: profileUrl = [],
        } = person;
        return {
          fullName,
          profileUrl: Array.isArray(profileUrl) ? profileUrl[0] : profileUrl,
        };
      },
      spreadObject: true,
    },
  },
};
