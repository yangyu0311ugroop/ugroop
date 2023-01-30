import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Empty/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('createdBy', () => {
    it('should exists', () => {
      expect(CONFIG.value.createdBy).toEqual([
        COGNITO_ACCOUNTSTORE,
        'account',
        'id',
      ]);
    });
  });
});
