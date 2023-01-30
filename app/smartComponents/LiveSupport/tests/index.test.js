import { dispatchSetValue, renderWithReduxWithRouter } from 'utils/testUtility';
import React from 'react';
import { screen } from '@testing-library/react';
import LiveSupport from '../index';
import { COGNITO_ACCOUNTSTORE } from '../../../appConstants';
import { organisationDataStore, userStore } from './orgFeedData';
import { sleep } from '../../../utils/timeUtility';
jest.mock('../content', () => ({
  __esModule: true,
  default: props => <div data-testid="intercomContent" {...props} />,
}));
test('IntercomContent shall render content with all other org info', async () => {
  const { store } = renderWithReduxWithRouter(<LiveSupport appId="aa" />, {});
  expect(screen.queryByTestId('intercomContent')).not.toBeNull();
  dispatchSetValue(store, 'userDataStore', 'users', userStore.users);
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 12,
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 12,
    email: 'a@a.com',
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'person', {
    id: 12,
    firstName: 'aa',
    lastName: 'bb',
    knownAs: 'ab',
  });
  dispatchSetValue(
    store,
    'organisationDataStore',
    'organisations',
    organisationDataStore.organisations,
  );
  dispatchSetValue(
    store,
    'organisationDataStore',
    'orgUsers',
    organisationDataStore.orgUsers,
  );
  await sleep(200);
  const component = screen.queryByTestId('intercomContent');
  expect(component.getAttribute('lastTimestamp')).not.toBeNull();
  expect(component.getAttribute('orgName')).toEqual(
    'ab|Saving Grace Bible Church|adsfasfdsafsaf|COORDINATE_BASE_URL_LATEST|sdfgdsfgdfs|ddddd|COORDINATE_BASE_URL',
  );
  expect(component.getAttribute('orgType')).toEqual(
    'Personal|Business|Business|Business|Business|Business|Business',
  );
  expect(component.getAttribute('orgRole')).toEqual(
    'owner|owner|owner|owner|owner|owner|owner',
  );
  expect(component.getAttribute('orgId')).toEqual('1226|32|31|30|29|28|-1');
  expect(component.getAttribute('email')).toEqual('a@a.com');
});
test('IntercomContent shall render content with just Personal Org', async () => {
  const { store } = renderWithReduxWithRouter(<LiveSupport appId="aa" />, {});
  expect(screen.queryByTestId('intercomContent')).not.toBeNull();
  dispatchSetValue(store, 'userDataStore', 'users', userStore.users);
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 12,
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 12,
    email: 'a@a.com',
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'person', {
    id: 12,
    firstName: 'aa',
    lastName: 'bb',
    knownAs: 'ab',
  });
  await sleep(200);
  const component = screen.queryByTestId('intercomContent');
  expect(component.getAttribute('lastTimestamp')).not.toBeNull();
  expect(component.getAttribute('orgName')).toEqual('ab');
  expect(component.getAttribute('orgType')).toEqual('Personal');
  expect(component.getAttribute('orgRole')).toEqual('owner');
  expect(component.getAttribute('email')).toEqual('a@a.com');
});
