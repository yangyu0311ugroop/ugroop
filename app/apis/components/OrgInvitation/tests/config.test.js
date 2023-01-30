import { CONFIRM_INVITATION, DECLINE_INVITATION } from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { requests } from 'utils/request';
import { helpers, CONFIG } from '../config';

describe('OrgInvitation/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('requests', () => {
    it('should call fetchWithAuthorisation', () => {
      requests.fetchWithAuthorisation = jest.fn();

      CONFIG.requests[CONFIRM_INVITATION]({
        token: 'some token',
        content: 'some content',
      });
      CONFIG.requests[DECLINE_INVITATION]({
        token: 'some token',
        content: 'some content',
      });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
  });

  describe('processResult', () => {
    describe('CONFIRM_INVITATION', () => {
      it('should CONFIRM_INVITATION', () => {
        expect(
          CONFIG.processResult[CONFIRM_INVITATION](
            { org: 'user' },
            { token: 'some token' },
          ),
        ).toMatchSnapshot();
      });
    });

    describe('DECLINE_INVITATION', () => {
      it('should DECLINE_INVITATION', () => {
        expect(
          CONFIG.processResult[DECLINE_INVITATION](
            { org: 'user' },
            { token: 'some token' },
          ),
        ).toMatchSnapshot();
      });
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
      });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith({
        'some token': { status: 'pending', updatedAt: 'just now' },
      });
    });
  });
});
