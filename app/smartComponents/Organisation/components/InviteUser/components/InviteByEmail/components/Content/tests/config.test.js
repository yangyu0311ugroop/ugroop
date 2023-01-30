import {
  INVITATION_STORE,
  PENDING,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { CONFIG, CONFIG_IDS } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG Smoke Test', () => {
    it('CONFIG should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('CONFIG_IDS Smoke Test', () => {
    it('CONFIG_IDS should exists', () => {
      expect(typeof CONFIG_IDS).toBe('object');
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
    it('CONFIG_IDS should exists', () => {
      expect(typeof CONFIG_IDS.value).toBe('object');
    });

    it('should match result #owner', () => {
      expect(CONFIG.value.owner({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'organisations',
        999,
        'createdBy',
      ]);
    });

    it('should match result #exist', () => {
      expect(CONFIG.value.exist.getter('someone')).toBe(true);
    });
    it('should match result #peopleIds', () => {
      expect(CONFIG_IDS.value.peopleIds({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'organisations',
        999,
        'people',
      ]);
    });

    describe('status', () => {
      it('should exists', () => {
        expect(CONFIG.value.status).toMatchSnapshot();

        expect(CONFIG.value.status.keyPath({ inviteeToken: 999 })).toEqual([
          INVITATION_STORE,
          'organisationShares',
          999,
          'status',
        ]);

        expect(CONFIG.value.status.getter(PENDING)).toEqual({
          pending: true,
          accepted: false,
        });
      });
    });
  });
});
