import {
  CREATE_ORG_USER,
  GET_INVITATIONS,
  GET_ROLES,
  USER_API,
  GET_RECENT_ACTIVITY,
  HIDE_RECENT_ACTIVITY,
  CREATE_USER_VIA_INVITE,
  SIGN_IN,
  SIGN_OUT,
  FORGET_PWD,
  RESET_PWD,
  RESEND_SIGNUP,
  ME,
  PERSON_SYNC,
  CHANGE_PWD,
  GET_ORGANISATION_INVITATIONS,
  REGISTER_DEVICE,
  UNREGISTER_DEVICE,
  CREATE_PERSONAL_REGISTRATION,
  GET_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE,
  GET_USER_RELATED_TEMPLATES,
  GET_USER_NODE,
  GET_TRANSFER_NODE_LIST,
  GET_PERSONAL_PREFERENCES,
  UPSERT_PERSONAL_PREFERENCES,
} from 'apis/constants';
import { PENDING, RECEIVED } from 'datastore/invitationStore/constants';
import { requests } from 'utils/request';
import { AwsApi } from 'utils/cognito';
import {
  CONFIG,
  beforeCreateUser,
  convertToOrgKey,
  trimOrgName,
  errorProcesser,
} from '../config';

/**
 * RANDOM STRING GENERATOR
 *
 * Info:      http://stackoverflow.com/a/27872144/383904
 * Use:       randomString(length [,"A"] [,"N"] );
 * Default:   return a random alpha-numeric string
 * Arguments: If you use the optional "A", "N" flags:
 *            "A" (Alpha flag)   return random a-Z string
 *            "N" (Numeric flag) return random 0-9 string
 */
function randomString(len) {
  let str = ''; // String result
  for (let i = 0; i < len; i += 1) {
    // Loop `len` times
    let rand = Math.floor(Math.random() * 62); // random: 0..61
    // eslint-disable-next-line no-multi-assign
    const charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // eslint-disable-line no-nested-ternary
    str += String.fromCharCode(charCode); // add Character to str
  }
  return str; // After all loops are done, return the concatenated string
}

describe('User/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(USER_API);
    });
  });

  describe('convertToOrgKey()', () => {
    it('should convert correct Org Key', () => {
      const name =
        'This is My Org Name I - think this is going to work indeed!!!!@#$%^&';
      const convertKey = convertToOrgKey(name);
      expect(convertKey).toEqual(
        'thisismyorgnameithinkthisisgoingtoworkindeed',
      );
    });
    it('should convert correct Org Key', () => {
      const name = 'uGroop';
      const convertKey = convertToOrgKey(name);
      expect(convertKey).toEqual('ugroop');
    });
    it('should genereate 63 chars', () => {
      const name = randomString(255);
      const convertKey = convertToOrgKey(name);
      expect(convertKey.length).toEqual(59);
    });
  });

  describe('trimOrgName()', () => {
    it('should convert correct Org Key', () => {
      const name =
        'This is My Org Name I - think this is working to work indeed!!!!@#$%^&';
      const trimOrg = trimOrgName(name, name);
      expect(trimOrg).toEqual(name);
    });
  });

  describe('beforeCreateUser()', () => {
    it('should return correct Org Key', () => {
      const key = beforeCreateUser({ orgName: 'a', orgAddress: 'b' });
      expect(key).toEqual({
        email: undefined,
        givenName: undefined,
        location: { address: 'b' },
        orgName: 'a',
        orgNameKey: 'org-a-b',
        password: undefined,
        surname: undefined,
      });
    });
  });

  describe('errorProcesser()', () => {
    it('should return correct data', () => {
      const data = errorProcesser();
      expect(data).toEqual({ error: undefined, msg: undefined });
    });
    it('should return correct data', () => {
      const error = { response: { error: { headers: { error: 'abcd' } } } };
      const data = errorProcesser(error);
      expect(data).toEqual({ error, msg: 'abcd' });
    });
    it('should return correct data', () => {
      const error = { response: { error: { message: 'abcd' } } };
      const data = errorProcesser(error);
      expect(data).toEqual({ error, msg: 'abcd' });
    });
    it('should return correct data', () => {
      const error = { message: 'abcd' };
      const data = errorProcesser(error);
      expect(data).toEqual({ error, msg: 'abcd' });
    });
    it('should return correct data', () => {
      const error = { somethingelse: 'abcd' };
      const data = errorProcesser(error);
      expect(data).toEqual({ error, msg: error });
    });
  });

  describe('#requests', () => {
    it('still matches snapshot', () => {
      requests.fetchWithAuthorisation = jest.fn();

      CONFIG.requests[GET_INVITATIONS]({});
      CONFIG.requests[GET_INVITATIONS]({ show: RECEIVED, status: PENDING });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });

    describe('CREATE_ORG_USER', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_ORG_USER]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithURL = jest.fn();
        const data = {
          orgName: 'avcd',
          orgAddress: 'a',
          firstName: 'v',
          lastName: 'c',
          email: 'ads',
          password: 'ssd',
          namekey: 's',
        };
        CONFIG.requests[CREATE_ORG_USER](data);

        expect(requests.fetchWithURL).toBeCalledWith(
          'post',
          `/${USER_API}`,
          beforeCreateUser(data),
        );
      });
    });

    describe('CREATE_USER_VIA_INVITE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_USER_VIA_INVITE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithURL = jest.fn();
        const data = {
          orgName: 'avcd',
          orgAddress: 'a',
          firstName: 'v',
          lastName: 'c',
          email: 'ads',
          password: 'ssd',
          namekey: 's',
        };
        CONFIG.requests[CREATE_USER_VIA_INVITE](data);

        expect(requests.fetchWithURL).toBeCalledWith(
          'post',
          `/${USER_API}/createUserViaInvite`,
          data,
        );
      });
    });
    describe('CREATE_PERSONAL_REGISTRATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_PERSONAL_REGISTRATION]).toBe(
          'function',
        );
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithURL = jest.fn();
        const data = {
          givenName: 'v',
          surname: 'c',
          email: 'ads',
          password: 'ssd',
        };
        CONFIG.requests[CREATE_PERSONAL_REGISTRATION](data);

        expect(requests.fetchWithURL).toBeCalledWith(
          'post',
          `/${USER_API}/createSimpleUser`,
          data,
        );
      });
    });

    describe('ME', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[ME]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[ME]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me`,
        );
      });
    });

    describe('REGISTER_DEVICE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[REGISTER_DEVICE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[REGISTER_DEVICE]({ id: 1, data: { token: 'token' } });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${USER_API}/1/registerDevice`,
          { token: 'token' },
        );
      });
    });

    describe('UNREGISTER_DEVICE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UNREGISTER_DEVICE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[UNREGISTER_DEVICE]({ id: 1, data: { token: 'token' } });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${USER_API}/1/unregisterDevice`,
          { token: 'token' },
        );
      });
    });
    describe('UPDATE_USER_PREFERENCE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_USER_PREFERENCE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[UPDATE_USER_PREFERENCE]({
          id: 1,
          data: { token: 'token' },
        });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${USER_API}/1/upsertUserPreference`,
          { token: 'token' },
        );
      });
    });
    describe('GET_USER_PREFERENCE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_USER_PREFERENCE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_USER_PREFERENCE]({
          id: 1,
          data: { token: 'token' },
        });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/1/userPreference`,
        );
      });
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_USER_PREFERENCE]({
          id: 1,
          data: { token: 'token' },
        });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/1/userPreference`,
        );
      });
    });
    describe('GET_USER_NODE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_USER_NODE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_USER_NODE]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/userNode`,
        );
      });
    });
    describe('GET_TRANSFER_NODE_LIST', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_TRANSFER_NODE_LIST]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_TRANSFER_NODE_LIST]({});

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/transfers?show=default&status=pending`,
        );
      });
    });
    describe('GET_PERSONAL_PREFERENCES', () => {
      it('should exist', () => {
        expect(typeof CONFIG.requests[GET_PERSONAL_PREFERENCES]).toBe(
          'function',
        );
      });
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_PERSONAL_PREFERENCES]({ id: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/1/Preferences/personal`,
        );
      });
    });
    describe('UPSERT_PERSONAL_PREFERENCES', () => {
      it('should exist', () => {
        expect(typeof CONFIG.requests[UPSERT_PERSONAL_PREFERENCES]).toBe(
          'function',
        );
      });
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[UPSERT_PERSONAL_PREFERENCES]({ id: 1, data: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${USER_API}/1/Preferences/personal`,
          1,
        );
      });
    });
    describe('PERSON_SYNC', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[PERSON_SYNC]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[PERSON_SYNC]({ id: 1, data: { name: 'abcd' } });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${USER_API}/1/firstTimeSetup`,
          { name: 'abcd' },
        );
      });
    });

    describe('SIGNIN', () => {
      it('should call fetchWithAuthorisation', () => {
        expect(CONFIG.requests[SIGN_IN]).toEqual(AwsApi.signIn);
      });
    });
    describe('SIGNOUT', () => {
      it('should call fetchWithAuthorisation', () => {
        expect(CONFIG.requests[SIGN_OUT]).toEqual(AwsApi.signOut);
      });
    });
    describe('resendSignUp', () => {
      it('should call fetchWithAuthorisation', () => {
        expect(CONFIG.requests[RESEND_SIGNUP]).toEqual(AwsApi.resendSignUp);
      });
    });
    describe('resetPassword', () => {
      it('should call fetchWithAuthorisation', () => {
        expect(CONFIG.requests[RESET_PWD]).toEqual(AwsApi.resetPassword);
      });
    });

    describe('forgetPassword', () => {
      it('should call fetchWithAuthorisation', () => {
        expect(CONFIG.requests[FORGET_PWD]).toEqual(AwsApi.forgetPassword);
      });
    });

    describe('GET_ROLES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ROLES]).toBe('function');
      });
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_ROLES]({ userId: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/1/roles`,
        );
      });
    });

    describe('GET_RECENT_ACTIVITY', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_RECENT_ACTIVITY]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_RECENT_ACTIVITY]('abcd@email.com');

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/activities`,
        );
      });
    });

    describe('HIDE_RECENT_ACTIVITY', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[HIDE_RECENT_ACTIVITY]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[HIDE_RECENT_ACTIVITY]({ nodeId: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${USER_API}/${HIDE_RECENT_ACTIVITY}/1`,
        );
      });
    });

    describe('GET_ORGANISATION_INVITATIONS', () => {
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORGANISATION_INVITATIONS]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/orgInvitations`,
        );
      });
    });

    describe('GET_USER_NODE', () => {
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_USER_NODE]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/userNode`,
        );
      });
    });

    describe('GET_USER_RELATED_TEMPLATES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_USER_RELATED_TEMPLATES]).toBe(
          'function',
        );
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_USER_RELATED_TEMPLATES]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${USER_API}/me/templates`,
        );
      });
    });

    describe('processError', () => {
      it('SIGN_IN', () => {
        expect(CONFIG.processError[SIGN_IN]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('CREATE_ORG_USER', () => {
        expect(CONFIG.processError[CREATE_ORG_USER]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('FORGET_PWD', () => {
        expect(CONFIG.processError[FORGET_PWD]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('RESET_PWD', () => {
        expect(CONFIG.processError[RESET_PWD]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('CHANGE_PWD', () => {
        expect(CONFIG.processError[CHANGE_PWD]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('CHANGE_PWD', () => {
        expect(CONFIG.processError[CREATE_USER_VIA_INVITE]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
      it('CREATE_ORG_USER', () => {
        expect(CONFIG.processError[CREATE_PERSONAL_REGISTRATION]()).toEqual({
          error: undefined,
          msg: undefined,
        });
      });
    });
  });
});
