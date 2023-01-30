import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

test('Config Value', () => {
  expect(CONFIG.value.firstName).toEqual(USER_STORE_SELECTORS.firstName);
  expect(CONFIG.value.lastName).toEqual(USER_STORE_SELECTORS.lastName);
  expect(CONFIG.value.knownAs).toEqual(USER_STORE_SELECTORS.knownAs);
});
