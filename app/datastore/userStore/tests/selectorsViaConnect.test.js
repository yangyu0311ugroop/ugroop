import { USER_DATA_STORE } from 'appConstants';
import { USER_STORE_RESELECTORS } from 'datastore/userStore/selectorsViaConnect';
import { fromJS } from 'immutable';

describe('USER_STORE_RESELECTORS', () => {
  const userStore = fromJS({
    [USER_DATA_STORE]: {
      people: {},
    },
  }).setIn([USER_DATA_STORE, 'people'], {
    1: { id: 1, photo: 'sample-photo' },
  });
  describe('getPeoplePyhoto', () => {
    it('should get the photo of user', () => {
      const peoplePhoto = USER_STORE_RESELECTORS.getPeoplePhoto(userStore, 1);

      expect(peoplePhoto).toBe('sample-photo');
    });

    it('should not break if people is undefined', () => {
      const peoplePhoto = USER_STORE_RESELECTORS.getPeoplePhoto(
        userStore.setIn([USER_DATA_STORE, 'people'], undefined),
        1,
      );

      expect(peoplePhoto).not.toBe('sample-photo');
    });
  });
});
