import { USER_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('UserCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('photo', () => {
      it('should exists', () => {
        expect(CONFIG.value.photo({ id: 999 })).toEqual([
          USER_DATA_STORE,
          'people',
          999,
          'photo',
        ]);
      });
    });
  });
});
