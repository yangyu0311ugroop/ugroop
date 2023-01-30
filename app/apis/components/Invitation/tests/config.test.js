import {
  CANCEL_INVITATION,
  GET_TOKEN,
  INVITATION_API,
  RESEND_INVITATION,
  DECLINE_INVITATION,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';
import { requests } from 'utils/request';
import { CONFIG, helpers } from '../config';

describe('Invitation/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(INVITATION_API);
    });
  });

  describe('requests', () => {
    it('should call fetchWithAuthorisation', () => {
      requests.fetchWithAuthorisation = jest.fn();
      requests.fetchWithURL = jest.fn();

      CONFIG.requests[GET_TOKEN]({ tokenId: 'some token' });
      CONFIG.requests[CANCEL_INVITATION]({
        token: 'some token',
        content: 'some content',
      });
      CONFIG.requests[RESEND_INVITATION]({
        token: 'some token',
        content: 'some content',
      });
      CONFIG.requests[DECLINE_INVITATION]({
        tokenId: 'some token',
        content: 'content',
      });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
      expect(requests.fetchWithURL).toBeCalled();
      expect(requests.fetchWithURL.mock.calls).toMatchSnapshot();
    });
  });

  describe('helpers', () => {
    it('should normaliseInvitationAction', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'utils.upsertObject');

      expect(
        helpers.normaliseInvitationAction({
          notificationToken: 'some token',
          status: 'pending',
          updatedAt: 'just now',
        }),
      ).toEqual({
        shares: 'utils.upsertObject',
        cancelInvitation: 'some token',
      });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith({
        'some token': { status: 'pending', updatedAt: 'just now' },
      });
    });

    it('should processGetToken', () => {
      expect(
        helpers.processGetToken({
          content: { shareTo: 'someEmail@ugroop.com' },
          nodeShare: { hi: 'nodeShare' },
          organisation: 'organisation',
        }),
      ).toEqual({
        remoteContent: { shareTo: 'someEmail@ugroop.com' },
        organisation: 'organisation',
        hi: 'nodeShare',
      });
    });
    it('should processGetToken for Organisation', () => {
      expect(
        helpers.processGetToken({
          content: { inviteTo: 'someEmail@ugroop.com' },
          nodeShare: null,
          organisation: { inviteTo: 'someEmail@ugroop.com' },
        }),
      ).toEqual({
        inviteTo: 'someEmail@ugroop.com',
        remoteContent: {
          inviteTo: 'someEmail@ugroop.com',
          shareTo: 'someEmail@ugroop.com',
        },
        organisation: { inviteTo: 'someEmail@ugroop.com' },
      });
    });
    it('should processGetToken for node transfer', () => {
      expect(
        helpers.processGetToken({
          content: { inviteTo: 'someEmail@ugroop.com' },
          nodeShare: null,
          organisation: null,
          nodeTransfer: { inviteTo: 'someEmail@ugroop.com' },
        }),
      ).toEqual({
        inviteTo: 'someEmail@ugroop.com',
        remoteContent: {
          inviteTo: 'someEmail@ugroop.com',
          shareTo: 'someEmail@ugroop.com',
        },
        organisation: null,
      });
    });

    it('reveal', () => {
      expect(helpers.reveal('hi')()).toEqual(revealSnackbar({ text: 'hi' }));
    });
  });
});
