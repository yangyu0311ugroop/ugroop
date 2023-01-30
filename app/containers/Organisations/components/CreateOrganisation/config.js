import { CONFIG as config } from 'resaga';
import { requests } from '../../../../utils/request';
import {
  GET_ORGSUBTYPES,
  GET_ORGTYPES,
  ORGANISATION_SETUP_PAGE,
} from '../../../FirstTimeSetup/Organisation/defines/config';

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
};
