import { USER_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Name/tests/config.test.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('email', () => {
      it('should exists', () => {
        expect(CONFIG.value.email.keyPath({ id: 999 })).toEqual([
          USER_DATA_STORE,
          'people',
          999,
          'email',
        ]);

        expect(CONFIG.value.email.getter('that@guy', 'this@guy')).toEqual(
          'this@guy',
        );
      });
    });

    describe('knownAs', () => {
      it('should exists', () => {
        expect(CONFIG.value.knownAs.keyPath({ id: 999 })).toEqual([
          USER_DATA_STORE,
          'people',
          999,
          'knownAs',
        ]);

        expect(CONFIG.value.knownAs.getter('that@guy', 'this@guy')).toEqual(
          'this@guy',
        );
      });
    });

    describe('orgId', () => {
      it('should exists', () => {
        expect(CONFIG.value.orgId({ id: 999 })).toEqual([
          USER_DATA_STORE,
          'users',
          999,
          'orgId',
        ]);
      });
    });
  });
});
