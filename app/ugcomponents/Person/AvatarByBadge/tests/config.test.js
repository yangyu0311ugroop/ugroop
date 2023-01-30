import { USER_DATA_STORE } from 'appConstants';
import { padFacadeURL } from 'utils/helpers/request';
import { CONFIG } from '../config';

describe('AvatarBadge/tests/config.test.js', () => {
  beforeAll(() => {
    process.env.COORDINATE_BASE_URL = '';
  });
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(CONFIG.setValue).toBeDefined();
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toBeDefined();
    });

    describe('userInfo', () => {
      it('should exists', () => {
        expect(CONFIG.value.userInfo).toBeDefined();
      });

      describe('userInfo', () => {
        const people = { knownAs: 'Ping Pong', photo: 'image link' };
        let getter;

        beforeAll(() => {
          expect(typeof CONFIG.value.userInfo.getter).toBe('function');
          getter = CONFIG.value.userInfo.getter;
        });

        it('should return user information', () => {
          const userInfo = getter(people, { userId: 1 });
          expect(userInfo.fullName).toBe(people.knownAs);
          expect(userInfo.profileUrl).toBe(padFacadeURL(people.photo));
        });

        it('should return user information with photo of specific width', () => {
          const userInfo = getter(people, { userId: 1, width: 100 });
          expect(userInfo.fullName).toBe(people.knownAs);
          expect(userInfo.profileUrl).toBe(padFacadeURL(people.photo));
        });

        it('should return empty object if isManual props is true', () => {
          const actual = getter(people, { userId: 1, isManual: true });
          expect(actual).toEqual({});
        });

        it('should return empty profileUrl', () => {
          const userInfo = getter({ knownAs: 'Ping Pong' }, { userId: 2 });
          expect(userInfo.fullName).toBe('Ping Pong');
          expect(userInfo.profileUrl).not.toBeDefined();
        });
      });

      it('should have props', () => {
        expect(CONFIG.value.userInfo.keyPath).toBeDefined();
        expect(CONFIG.value.userInfo.keyPath).toMatchSnapshot();
        expect(CONFIG.value.userInfo.spreadObject).toBe(true);
      });

      describe('keyPath', () => {
        it('should have a particular shape of keyPath that also bases on the dataStore props', () => {
          expect(CONFIG.value.userInfo.keyPath({ userId: 1 })).toEqual([
            USER_DATA_STORE,
            'people',
            1,
          ]);
        });
      });
    });
  });
});
