import { USERLOGOUT } from 'containers/App/constants';
import { fromJS } from 'immutable';
/**
 * Created by Jay on 1/7/17.
 */
import { CONFIG as config } from 'resaga';
import { requests } from 'utils/request';
import {
  CONFIG,
  ORGANISATION_CUSTOM_REDUCERS,
  GET_ORGTYPES,
  GET_ORGSUBTYPES,
} from '../config';

describe('containers/FirstTimeSetup/Organisation/defines/config', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('CONFIG', () => {
    it('submit GET_ORGTYPES', () => {
      requests.fetchWithAuthorisation = jest.fn();
      CONFIG[config.SUBMIT][GET_ORGTYPES]();
      expect(requests.fetchWithAuthorisation).toBeCalled();
      requests.fetchWithAuthorisation.mockClear();
    });
    it('submit GET_ORGSUBTYPES', () => {
      const mockOrgTypes = [{ code: 'educ' }];
      requests.fetchWithAuthorisation = jest.fn();
      CONFIG[config.SUBMIT][GET_ORGSUBTYPES](mockOrgTypes);
      expect(requests.fetchWithAuthorisation).toBeCalled();
      requests.fetchWithAuthorisation.mockClear();
    });
  });
});

describe('ORGANISATION_CUSTOM_REDUCERS', () => {
  it('remove LOGIN_FORM on USERLOGOUT', () => {
    const state = fromJS({
      [GET_ORGTYPES]: 'ho ho',
      [GET_ORGSUBTYPES]: 'hi ho',
    });
    const newState = ORGANISATION_CUSTOM_REDUCERS[USERLOGOUT](state);
    expect(newState.get(GET_ORGTYPES)).toBe(undefined);
    expect(newState.get(GET_ORGSUBTYPES)).toBe(undefined);
  });
});
