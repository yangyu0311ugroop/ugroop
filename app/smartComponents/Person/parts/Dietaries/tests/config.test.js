import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Dietaries/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('should have personDietaries', () => {
      expect(CONFIG.value.personDietaries({ id: 1 })).toEqual([
        PERSON_DATA_STORE,
        'people',
        1,
        'dietaries',
      ]);
    });
    it('should have userDietaries', () => {
      expect(CONFIG.value.userDietaries({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'people',
        1,
        'dietaries',
      ]);
    });
  });
});
