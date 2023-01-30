import { USERLOGOUT } from 'containers/App/constants';
/**
 * Created by quando on 1/7/17.
 */
import { CONFIG as config } from 'resaga';
import { requests } from 'utils/request';
import { COGNITO_STORE_SELECTORS } from '../../../../datastore/stormPathStore/selectors';

export const ORGANISATION_SETUP_PAGE = 'organisationSetup';
export const GET_ORGTYPES = 'getOrgTypes';
export const GET_ORGSUBTYPES = 'getOrgSubtypes';

export const CONFIG = {
  [config.PAGE]: ORGANISATION_SETUP_PAGE,
  [config.SUBMIT]: {
    [GET_ORGTYPES]: () =>
      requests.fetchWithAuthorisation('get', '/organisations/orgTypes'),
    [GET_ORGSUBTYPES]: async orgTypes => {
      const subtype = await requests.fetchWithAuthorisation(
        'get',
        `/organisations/orgTypes/${orgTypes}/subTypes`,
      );
      return {
        organisation: orgTypes,
        subtype,
      };
    },
  },
  value: {
    knownAs: COGNITO_STORE_SELECTORS.knownAs,
    email: COGNITO_STORE_SELECTORS.myEmail,
    userId: COGNITO_STORE_SELECTORS.myId,
    firstName: COGNITO_STORE_SELECTORS.firstName,
    lastName: COGNITO_STORE_SELECTORS.lastName,
  },
};

export const ORGANISATION_CUSTOM_REDUCERS = {
  [USERLOGOUT]: store => store.clear(),
};
