import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('FirstDayStartTime/config.js', () => {
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

    describe('startTime', () => {
      it('should exists', () => {
        expect(CONFIG.setValue.startTime({ template: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedStart({ id: 2233 }),
        );
      });
    });

    describe('firstEventId', () => {
      it('should exists', () => {
        expect(CONFIG.setValue.firstEventId({ template: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedFirstEventId({ id: 2233 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('startTime', () => {
      it('should return keyPath', () => {
        expect(CONFIG.value.startTime.cacheKey({ id: 2233 })).toEqual(
          `${2233}.startTime`,
        );
      });

      it('should return getter !real', () => {
        expect(CONFIG.value.startTime.getter({ real: false })).toEqual(null);
      });

      it('should return getter real', () => {
        const value = '1899-12-30T11:59:59.999Z';

        expect(
          CONFIG.value.startTime.getter({ real: true, value }),
        ).not.toEqual(null);
      });
    });

    describe('firstEvent', () => {
      it('should return undefined', () => {
        expect(CONFIG.value.firstEvent.getter({})).toEqual({
          firstEventTime: undefined,
          firstEventId: undefined,
        });
      });

      it('should return first', () => {
        expect(
          CONFIG.value.firstEvent.getter({
            events: [{ value: 'value', id: 2233 }],
          }),
        ).toEqual({
          firstEventTime: 'value',
          firstEventId: 2233,
        });
      });
    });
  });
});
