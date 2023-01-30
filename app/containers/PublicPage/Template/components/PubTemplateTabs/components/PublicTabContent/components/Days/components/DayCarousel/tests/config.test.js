import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('DayCarousel/config.js', () => {
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

    describe('Days getter', () => {
      it('should return empty array if props.daysId is not an array', () => {
        const result = CONFIG.value.days.getter(undefined, null, {
          daysId: null,
        });
        expect(result).toEqual([]);
      });
      it('should return dayId if days is empty', () => {
        const result = CONFIG.value.days.getter(undefined, null, {
          daysId: [1],
        });
        expect(result).toEqual([{ id: 1 }]);
      });
      it('should return array with photos if daysId is array is days have photo', () => {
        const mockDays = {
          1: { content: 'Mighty fortress is our God', photos: [1] },
          2: { content: 'Mighty fortress is our God', photos: [2] },
        };
        const mockPhotos = {
          1: { content: 'Hope in God, O my soul' },
          2: { content: 'He is strong and is strong to save' },
        };
        const expectedResult = [
          {
            content: 'Mighty fortress is our God',
            photos: { content: 'Hope in God, O my soul' },
          },
          {
            content: 'Mighty fortress is our God',
            photos: { content: 'He is strong and is strong to save' },
          },
        ];
        const result = CONFIG.value.days.getter(mockDays, mockPhotos, {
          daysId: [1, 2],
        });
        expect(result).toEqual(expectedResult);
      });
      it('should return array with null photos if photo for the day is not available', () => {
        const mockDays = {
          1: { content: 'Mighty fortress is our God', photos: [] },
          2: { content: 'Mighty fortress is our God', photos: [] },
        };
        const expectedResult = [
          { content: 'Mighty fortress is our God', photos: null },
          { content: 'Mighty fortress is our God', photos: null },
        ];
        const result = CONFIG.value.days.getter(mockDays, null, {
          daysId: [1, 2],
        });
        expect(result).toEqual(expectedResult);
      });
    });

    describe('templateDate getter', () => {
      it('keypath', () => {
        const result = CONFIG.value.templateDate.keyPath;
        expect(result).toEqual([
          [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
          [NODE_STORE, 'nodes'],
        ]);
      });
      it('getter', () => {
        const id = 1;
        const startDate = 2;
        const template = { [id]: { customData: { startDate } } };
        expect(CONFIG.value.templateDate.getter(id, template)).toEqual(
          startDate,
        );
        expect(CONFIG.value.templateDate.getter(null, template)).toEqual('');
      });
    });
  });
});
