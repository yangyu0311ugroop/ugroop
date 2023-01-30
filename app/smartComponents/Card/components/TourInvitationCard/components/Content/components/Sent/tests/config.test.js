import { INVITATION_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Sent/config.js', () => {
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

    describe('shareTo', () => {
      it('should exists', () => {
        expect(CONFIG.value.shareTo({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'shareTo',
        ]);
      });
    });

    describe('shareToUserId', () => {
      it('should exists', () => {
        expect(CONFIG.value.shareToUserId({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'shareToUserId',
        ]);
      });
    });

    describe('nodeId', () => {
      it('should exists', () => {
        expect(CONFIG.value.nodeId({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'nodeId',
        ]);
      });
    });

    describe('status', () => {
      it('should exists', () => {
        expect(CONFIG.value.status({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'status',
        ]);
      });
    });

    describe('role', () => {
      it('should exists', () => {
        expect(CONFIG.value.role({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'role',
        ]);
      });
    });

    describe('content', () => {
      it('should exists', () => {
        expect(CONFIG.value.content({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'content',
        ]);
      });
    });

    describe('personalMessage', () => {
      it('should exists', () => {
        expect(CONFIG.value.personalMessage({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'notifications',
          'someToken',
          'content',
          'content',
        ]);
      });
    });

    describe('organisationName', () => {
      it('should exists', () => {
        expect(CONFIG.value.organisationName({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'notifications',
          'someToken',
          'content',
          'organisationName',
        ]);
      });
    });

    describe('orgId', () => {
      it('should exists', () => {
        expect(CONFIG.value.orgId.keyPath[0]({ token: 'someToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'someToken',
          'shareToUserId',
        ]);

        expect(CONFIG.value.orgId.getter(1)).toBe(undefined);
        expect(CONFIG.value.orgId.getter(1, { 1: { orgId: 123 } })).toBe(123);
      });
    });
  });
});
