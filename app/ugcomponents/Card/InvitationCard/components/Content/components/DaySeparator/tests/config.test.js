import { INVITATION_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('DaySeparator/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should match snapshot', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('setValue', () => {});

  describe('value', () => {
    describe('createdAt', () => {
      it('should exists', () => {
        expect(CONFIG.value.createdAt({ token: 'thisToken' })).toEqual([
          INVITATION_STORE,
          'shares',
          'thisToken',
          'updatedAt',
        ]);
      });
    });

    describe('previousCreatedAt', () => {
      it('should exists', () => {
        expect(
          CONFIG.value.previousCreatedAt({ previousToken: 'thisToken' }),
        ).toEqual([INVITATION_STORE, 'shares', 'thisToken', 'updatedAt']);
      });
    });
  });
});
