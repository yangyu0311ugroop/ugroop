import { GET_PERSON_DETAIL, PERSON_DETAIL_API } from 'apis/constants';
import { CONFIG } from '../config';

describe('config', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('isLoading', () => {
    it('fetching', () => {
      expect(CONFIG.isLoading.fetching).toEqual([
        PERSON_DETAIL_API,
        GET_PERSON_DETAIL,
      ]);
    });
  });

  describe('value', () => {
    it('should have particular value subscribed', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });
  });
});
