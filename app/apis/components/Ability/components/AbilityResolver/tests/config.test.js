import { ABILITY_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('AbilityResolver/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    describe('tour', () => {
      it('should return correct keyPath', () => {
        expect(CONFIG.value.tour({ nodeId: 1 })).toEqual([
          ABILITY_DATA_STORE,
          'tours',
          1,
        ]);
      });
    });

    describe('organisation', () => {
      it('should return correct keyPath', () => {
        expect(CONFIG.value.organisation({ orgId: 1 })).toEqual([
          ABILITY_DATA_STORE,
          'organisation',
          1,
        ]);
      });
    });
  });
});
