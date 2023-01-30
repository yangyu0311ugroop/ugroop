import { CONFIRMED, INVITATION_STORE, PENDING } from 'appConstants';
import { CONFIG } from '../config';

describe('Invitee/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(CONFIG.setValue).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('email', () => {
      it('should exists', () => {
        expect(CONFIG.value.email.keyPath({ token: 123 })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          123,
          'inviteTo',
        ]);

        expect(CONFIG.value.email.getter('that@guy', {})).toEqual('that@guy');

        expect(
          CONFIG.value.email.getter('that@guy', { email: 'theother@guy' }),
        ).toEqual('theother@guy');
      });
    });

    describe('content', () => {
      it('should exists', () => {
        expect(CONFIG.value.content({ token: 123 })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          123,
          'content',
        ]);
      });
    });

    describe('userId', () => {
      it('should exists', () => {
        expect(CONFIG.value.userId.keyPath({ token: 'that@guy' })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          'that@guy',
          'inviteToUserId',
        ]);

        expect(CONFIG.value.userId.getter(123, {})).toEqual(123);

        expect(CONFIG.value.userId.getter(123, { userId: 456 })).toEqual(456);

        expect(
          CONFIG.value.userId.getter(123, { userId: 456, ownerId: 789 }),
        ).toEqual(789);
      });
    });
    describe('status', () => {
      it('should exists', () => {
        expect(CONFIG.value.status.keyPath({ token: 'that@guy' })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          'that@guy',
          'status',
        ]);

        expect(CONFIG.value.status.getter(PENDING, { accepted: true })).toEqual(
          { pending: true, accepted: true },
        );

        expect(
          CONFIG.value.status.getter(CONFIRMED, { pending: true }),
        ).toEqual({ pending: true, accepted: true });

        // return accepted if owner
        expect(
          CONFIG.value.status.getter(CONFIRMED, { ownerId: true }),
        ).toEqual({ accepted: true });
      });
    });
  });
});
