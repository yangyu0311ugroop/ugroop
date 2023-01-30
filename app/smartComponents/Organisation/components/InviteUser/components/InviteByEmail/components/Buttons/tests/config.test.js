import {
  INVITATION_STORE,
  PENDING,
  CONFIRMED,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { CONFIG } from '../config';

describe('Buttons/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('exist', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.exist).toBe('object');
        expect(typeof CONFIG.value.exist.getter).toBe('function');
        expect(CONFIG.value.exist.getter({ some: 'object' })).toBe(true);
      });
    });

    describe('owner', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.owner).toBe('function');
        expect(CONFIG.value.owner({ id: 999 })).toEqual([
          ORGANISATION_DATA_STORE,
          'organisations',
          999,
          'createdBy',
        ]);
      });
    });

    describe('status', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.status).toMatchSnapshot();

        expect(CONFIG.value.status.keyPath({ inviteeToken: 999 })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          999,
          'status',
        ]);

        expect(
          CONFIG.value.status.getter(PENDING, { inviteeToken: 999 }),
        ).toEqual({ pending: true, accepted: false });
        expect(
          CONFIG.value.status.getter(CONFIRMED, { inviteeToken: 999 }),
        ).toEqual({ pending: false, accepted: true });
      });
    });
  });
});
