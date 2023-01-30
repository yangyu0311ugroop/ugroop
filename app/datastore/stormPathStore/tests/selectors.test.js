import { COGNITO_ACCOUNTSTORE } from 'appConstants';

/**
 * Created by Yang on 2/2/17.
 */
import { fromJS } from 'immutable';

import {
  selectCognitoPathDataStore,
  selectCurrentUserAccount,
  selectCachedAvatar,
  selectCurrentUserOrgs,
  selectOrgs,
} from '../selectors';

import { COGNITO_STORE_SELECTOR } from '../selectors.resaga';

describe('selectCachedAvatar', () => {
  it('should get the avatar in the cognito data store', () => {
    const avatar = fromJS([
      {
        photoUrl: '/myPhoto.jpg',
      },
    ]);
    const mockedState = fromJS({
      [COGNITO_ACCOUNTSTORE]: {
        avatar,
      },
    });
    expect(selectCachedAvatar()(mockedState)).toEqual(avatar);
  });
});

describe('selectCognitoPathDataStore', () => {
  it('should return the whole cognito account store object', () => {
    const avatar = fromJS([
      {
        photoUrl: '/myPhoto.jpg',
      },
    ]);
    const mockedState = fromJS({
      [COGNITO_ACCOUNTSTORE]: {
        avatar,
      },
    });
    expect(selectCognitoPathDataStore()(mockedState)).toEqual(
      fromJS({
        avatar,
      }),
    );
  });
});

describe('selectCurrentUserAccount', () => {
  it('should get the avatar in the cognito data store', () => {
    const account = fromJS([
      {
        photoUrl: '/myPhoto.jpg',
      },
    ]);
    const mockedState = fromJS({
      [COGNITO_ACCOUNTSTORE]: {
        account,
      },
    });
    expect(selectCurrentUserAccount()(mockedState)).toEqual(account);
  });
});

describe('selectCurrentUserOrgs', () => {
  it('should get the accountRelatedOrgs data under the cognito data store', () => {
    const accountRelatedOrgs = fromJS([
      {
        id: 20,
        orgId: 1,
        rootNodeId: 7,
      },
    ]);
    const mockedState = fromJS({
      [COGNITO_ACCOUNTSTORE]: {
        accountRelatedOrgs,
      },
    });
    expect(selectCurrentUserOrgs()(mockedState)).toEqual(accountRelatedOrgs);
  });
});

describe('selectOrgs', () => {
  it('should select orgs in the store', () => {
    const orgs = fromJS([
      {
        id: 20,
        name: 'Ako si Org',
        createdBy: 7,
      },
    ]);
    const mockedState = fromJS({
      [COGNITO_ACCOUNTSTORE]: {
        orgs,
      },
    });
    expect(selectOrgs()(mockedState)).toEqual(orgs);
  });

  describe('stormPathSelectors', () => {
    it('should have a particular shape', () => {
      expect(COGNITO_STORE_SELECTOR).toMatchSnapshot();
    });
  });
});
