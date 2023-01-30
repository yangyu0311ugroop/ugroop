import {
  CANCEL_INVITATION,
  DELETE_ORG_MEMBER,
  GET_ORG_MEMBERS,
  GET_ORG_SUBTYPES,
  GET_ORG_TYPES,
  GET_ORGANISATION,
  GET_OWN_ORG_INFO,
  GET_PERSON,
  ORG_INVITATION,
  ORGANISATION_API,
  PATCH_ORG,
  RESEND_INVITATION,
  SETUP_PERSONAL_TOUR,
  SETUP_TOUR,
  SHARE_ORGANISATION,
  UPDATE_ORG_MEMBER,
  UPDATE_ORG_ROLE,
  ORG_SYNC,
  CREATE_ORGANISATION,
  GET_ORGANISATION_MEMBER_INFO,
  BATCH_GET_ORG_MEMBERS,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('Organisation/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(ORGANISATION_API);
    });
  });

  describe('#requests', () => {
    describe('GET_OWN_ORG_INFO', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_OWN_ORG_INFO]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_OWN_ORG_INFO]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/me`,
        );
      });
    });
    describe('GET_ORG_TYPES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORG_TYPES]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORG_TYPES]();

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/orgTypes`,
        );
      });
    });
    describe('GET_ORG_MEMBERS', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORG_MEMBERS]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORG_MEMBERS]({ id: 1, activated: true });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/1/members/true`,
        );
      });
    });
    describe('GET_ORGANISATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORGANISATION]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORGANISATION]({ id: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/1/facade`,
        );
      });
    });
    describe('GET_ORG_SUBTYPES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORGANISATION]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORG_SUBTYPES]({ code: 'test' });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/orgTypes/test/subTypes`,
        );
      });
    });
    describe('UPDATE_ORG_ROLE', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_ORG_ROLE]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[UPDATE_ORG_ROLE]({ id: 1, userId: 9, role: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${ORGANISATION_API}/1/changeRole/9`,
          { role: {} },
        );
      });
    });
    describe('UPDATE_ORG_MEMBER', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_ORG_MEMBER]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[UPDATE_ORG_MEMBER]({
          id: 1,
          userId: 9,
          activated: true,
        });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${ORGANISATION_API}/1/members/9`,
          { activated: true },
        );
      });
    });
    describe('DELETE_ORG_MEMBER', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[DELETE_ORG_MEMBER]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[DELETE_ORG_MEMBER]({ id: 1, userId: 9 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'delete',
          `/${ORGANISATION_API}/1/members/9`,
        );
      });
    });
    describe('PATCH_ORG', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[PATCH_ORG]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[PATCH_ORG]({ id: 1, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${ORGANISATION_API}/1`,
          {},
        );
      });
    });
    describe('GET_PERSON', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_PERSON]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_PERSON]({ email: 'dan@ugroop.com' });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/dan@ugroop.com/member`,
        );
      });
    });
    describe('GET_ORGANISATION_MEMBER_INFO', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORGANISATION_MEMBER_INFO]).toBe(
          'function',
        );
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_ORGANISATION_MEMBER_INFO]({
          id: 2233,
          email: 'dan@ugroop.com',
        });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ORGANISATION_API}/2233/member/dan@ugroop.com`,
        );
      });
    });
    describe('SHARE_ORGANISATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[SHARE_ORGANISATION]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[SHARE_ORGANISATION]({ id: 1, payload: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORGANISATION_API}/1/userInvite`,
          {},
        );
      });
    });
    describe('RESEND_INVITATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[RESEND_INVITATION]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[RESEND_INVITATION]({ token: '1', content: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORG_INVITATION}/1/resend`,
          { content: {} },
        );
      });
    });
    describe('SETUP_TOUR', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[SETUP_TOUR]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[SETUP_TOUR]({ id: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORGANISATION_API}/1/setupTour`,
        );
      });
    });

    describe('CANCEL INVITATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CANCEL_INVITATION]).toBe('function');
        CONFIG.requests[CANCEL_INVITATION]({ token: '1', content: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORG_INVITATION}/1/cancel`,
          { content: {} },
        );
      });
    });

    describe('SETUP_PERSONAL_TOUR', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[SETUP_PERSONAL_TOUR]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[SETUP_PERSONAL_TOUR]({ id: 1, userId: 2233 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORGANISATION_API}/1/setupTour/2233`,
        );
      });
    });

    describe('CANCEL INVITATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[ORG_SYNC]).toBe('function');
        CONFIG.requests[ORG_SYNC]({ id: 1, data: { x: 1 } });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${ORGANISATION_API}/1/firstTimeSetup`,
          { x: 1 },
        );
      });
    });

    describe('CREATE_ORGANISATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_ORGANISATION]).toBe('function');
        CONFIG.requests[CREATE_ORGANISATION]({ data: { x: 1 } });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${ORGANISATION_API}`,
          { x: 1 },
        );
      });
    });
  });

  describe('#processResult', () => {
    describe('GET_OWN_ORG_INFO', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_OWN_ORG_INFO]).toBe('function');
      });

      it('should return same object', () => {
        const orgInfo = 'test';
        requests.fetchWithAuthorisation = jest.fn();
        expect(CONFIG.processResult[GET_OWN_ORG_INFO](orgInfo)).toEqual({
          orgInfo,
        });
      });
    });
    describe('GET_ORG_TYPES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORG_TYPES]).toBe('function');
      });

      it('should return same object', () => {
        const orgTypes = 'test';
        requests.fetchWithAuthorisation = jest.fn();
        expect(CONFIG.processResult[GET_ORG_TYPES](orgTypes)).toEqual({
          orgTypes: 'test',
        });
      });
    });
    describe('GET_ORGANISATION', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORGANISATION]).toBe('function');
      });
    });
    describe('GET_ORG_MEMBERS', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORG_MEMBERS]).toBe('function');
      });

      it('should call fetchWithAuthorisation multiple times', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[GET_ORG_MEMBERS]({ id: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalled();
        expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
      });
    });
    describe('GET_ORG_SUBTYPES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_ORG_MEMBERS]).toBe('function');
      });

      it('should return same object', () => {
        const subTypes = 'test';
        requests.fetchWithAuthorisation = jest.fn();
        expect(CONFIG.processResult[GET_ORG_SUBTYPES](subTypes)).toEqual({
          subTypes: 'test',
        });
      });
    });

    describe('BATCH_GET_ORG_MEMBERS', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[BATCH_GET_ORG_MEMBERS]).toBe('function');
      });

      it('should call fetchWithAuthorisation multiple times', () => {
        requests.fetchWithAuthorisation = jest.fn();
        CONFIG.requests[BATCH_GET_ORG_MEMBERS]({ ids: [1, 2, 3] });

        expect(requests.fetchWithAuthorisation).toBeCalled();
        expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
      });
    });
  });
});
