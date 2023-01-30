import { USER_DATA_STORE } from 'appConstants';
import createCachedSelector from 're-reselect';
import get from 'lodash/get';
import dotProp from 'dot-prop';
export const PEOPLE_ATTRIBUTE = {
  knownAs: 'knownAs',
};
export const ATTRIBUTES = {
  email: 'email',
};
const getPeople = state => state.get(USER_DATA_STORE).get('people');
const getUsers = state => state.get(USER_DATA_STORE).get('users');
const selectUsersAttribute = (state, props) => {
  const users = getUsers(state);
  return dotProp.get(users, `${props.id}.${props.attribute}`);
};
const selectPeopleAttribute = (state, props) => {
  const people = getPeople(state);
  return dotProp.get(people, `${props.id}.${props.attribute}`);
};
const getPeoplePhoto = createCachedSelector(
  getPeople,
  (_, id) => id,
  (people = {}, id) => get(people, `${id}.photo`, null),
)((_, id) => `people.getPeoplePhotos.${id}`);

export const USER_STORE_RESELECTORS = {
  getPeoplePhoto,
  selectUserDataAttribute: selectUsersAttribute,
  selectPeopleAttribute,
};
