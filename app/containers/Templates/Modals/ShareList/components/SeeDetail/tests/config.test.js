import { CONFIG, SEE_DETAIL_CONFIG } from '../config';

describe('SeeDetail/config.js', () => {
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
    it('CONFIG.value should exists', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });

    it('SEE_DETAIL_CONFIG.value should exists', () => {
      expect(SEE_DETAIL_CONFIG.value).toMatchSnapshot();
    });

    it('organisationName', () => {
      expect(
        CONFIG.value.organisationName({ seeDetail: 'abcd' }),
      ).toMatchSnapshot();
    });

    it('inviteToOrganisation', () => {
      expect(
        CONFIG.value.inviteToOrganisation({ seeDetail: 'abcd' }),
      ).toMatchSnapshot();
    });

    describe('detail', () => {
      it('should return correct values', () => {
        expect(
          CONFIG.value.detail.getter(
            'jon@qq',
            {
              'jon@qq': {
                createdAt: 'ages ago',
                updatedAt: 'ages ago',
                shareFrom: 'foo@qq',
                role: 'general',
                status: 'pending',
                resendUserId: 77,
              },
            },
            {
              'jon@qq': {
                createdAt: 'ages ago',
                updatedAt: 'ages ago',
                shareFrom: 'foo@qq',
                role: 'general',
                status: 'pending',
                resendUserId: 77,
              },
            },
            false,
          ),
        ).toMatchSnapshot();
      });
      it('should return correct values when request from organisation', () => {
        expect(
          CONFIG.value.detail.getter(
            'jon@qq',
            {
              'jon@qq': {
                createdAt: 'ages ago',
                updatedAt: 'ages ago',
                shareFrom: 'foo@qq',
                role: 'general',
                status: 'pending',
              },
            },
            {
              'jon@qq': {
                createdAt: 'ages ago',
                updatedAt: 'ages ago',
                shareFrom: 'foo@qq',
                role: 'general',
                status: 'pending',
              },
            },
            true,
          ),
        ).toMatchSnapshot();
      });
    });
  });

  describe('isLoading', () => {
    it('isLoading getter', () => {
      const snapshot = CONFIG.isLoading.isLoading.getter(
        true,
        true,
        true,
        true,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
  describe('updatedAt', () => {
    it('should return correct values', () => {
      expect(CONFIG.setValue.updatedAt({ seeDetail: '1' })).toEqual([
        'invitationStore',
        'shares',
        '1',
        'updatedAt',
      ]);
    });
  });
  describe('resendUserId', () => {
    it('should return correct values', () => {
      expect(CONFIG.setValue.resendUserId({ seeDetail: '1' })).toEqual([
        'invitationStore',
        'shares',
        '1',
        'resendUserId',
      ]);
    });
  });
});
