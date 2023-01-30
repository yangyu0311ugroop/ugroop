import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('DayDate/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('displayDate', () => {
      it('should displayDate', () => {
        expect(CONFIG.value.displayDate({ templateId: 112 })).toEqual(
          NODE_STORE_SELECTORS.displayDate({ id: 112 }),
        );
      });
    });

    describe('startDate', () => {
      it('should startDate', () => {
        expect(CONFIG.value.startDate({ templateId: 112 })).toEqual(
          NODE_STORE_SELECTORS.startDate({ id: 112 }),
        );
      });
    });

    describe('weekDay', () => {
      it('should weekDay', () => {
        expect(CONFIG.value.weekDay({ templateId: 112 })).toEqual(
          NODE_STORE_SELECTORS.weekDay({ id: 112 }),
        );
      });
    });
  });
});
