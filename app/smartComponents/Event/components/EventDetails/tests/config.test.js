import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('Cards/config.js', () => {
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
    describe('events', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.event).toEqual(
          EVENT_STORE_DATA_SELECTORS.cachedEvent,
        );
      });
    });
  });
});
