import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { CONFIG_1, CONFIG_2 } from '../config';

describe('CONFIG_1', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1.value).toBe('object');
    });
    it('should have personMedicals', () => {
      expect(CONFIG_1.value.personMedicals({ id: 1 })).toEqual([
        PERSON_DATA_STORE,
        'people',
        1,
        'medicals',
      ]);
    });
    it('should have personMedicals', () => {
      expect(CONFIG_1.value.userMedicals({ id: 1 })).toEqual([
        USER_DATA_STORE,
        'people',
        1,
        'medicals',
      ]);
    });
  });
});

describe('CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });
  });
});
