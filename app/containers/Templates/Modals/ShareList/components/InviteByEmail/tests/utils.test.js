import { EMPTY_RTE } from 'appConstants';
import utils from '../utils';

describe('InviteByEmail/utils.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof utils).toBe('object');
    });
  });

  describe('makeInvitee()', () => {
    const basic = { shareTo: 'some people' };

    it('should exists', () => {
      expect(typeof utils.makeInvitee).toBe('function');
    });

    it('should return only basic info with empty payload', () => {
      expect(utils.makeInvitee({}, basic)).toMatchSnapshot();
    });

    it('should return invitation info if invitation exists', () => {
      expect(
        utils.makeInvitee(
          { invitation: { status: 'pending', role: 'some role' } },
          basic,
        ),
      ).toMatchSnapshot();

      expect(
        utils.makeInvitee(
          { invitation: { status: 'confirmed', role: 'some role' } },
          basic,
        ),
      ).toMatchSnapshot();
    });

    it('should return organisation info if organisation exists', () => {
      expect(
        utils.makeInvitee({ organisation: { name: 'some org name' } }, basic),
      ).toMatchSnapshot();
    });
  });

  describe('makePayload()', () => {
    const payload = { id: 123, shareTo: 'someone', userId: 5 };

    it('should exists', () => {
      expect(typeof utils.makePayload).toBe('function');
    });

    it('should include pm if not empty', () => {
      expect(
        utils.makePayload(
          {
            inviteToOrganisation: true,
            role: 'tour_organizer',
            pm: 'some valid personal message',
          },
          payload,
        ),
      ).toMatchSnapshot();
    });

    it('should NOT include pm if empty', () => {
      expect(
        utils.makePayload(
          { inviteToOrganisation: true, role: 'tour_organizer', pm: '' },
          payload,
        ),
      ).toMatchSnapshot();
      expect(
        utils.makePayload(
          { inviteToOrganisation: true, role: 'tour_organizer', pm: EMPTY_RTE },
          payload,
        ),
      ).toMatchSnapshot();
    });
  });
});
