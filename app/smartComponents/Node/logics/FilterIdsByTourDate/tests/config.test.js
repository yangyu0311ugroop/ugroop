import { SELECTED_TOUR_CONFIG, TOUR_DATES_CONFIG, CONFIG } from '../config';

describe('SortBy/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(SELECTED_TOUR_CONFIG).toMatchSnapshot();
      expect(TOUR_DATES_CONFIG).toMatchSnapshot();
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('TOUR_DATES_CONFIG', () => {
    it('calculatedDate', () => {
      expect(
        TOUR_DATES_CONFIG.value.calculatedDate({
          dayId: 2,
        }),
      ).toMatchSnapshot();
    });
    it('isDateSet', () => {
      expect(
        TOUR_DATES_CONFIG.value.isDateSet({
          dayId: 2,
        }),
      ).toMatchSnapshot();
    });
  });
  describe('ALL_VALUES', () => {
    describe('value', () => {
      it('should exists', () => {
        expect(
          CONFIG.value.values.cacheKey({
            ids: [1, 2],
            id: 1,
            dayId: 2,
          }),
        ).toMatchSnapshot();
      });
      it('should exists', () => {
        expect(
          CONFIG.value.values.cacheKey({
            ids: null,
            id: 1,
            dayId: 2,
          }),
        ).toMatchSnapshot();
      });
      it('keypath', () => {
        expect(CONFIG.value.values.keyPath({ ids: [1, 2] })).toMatchSnapshot();
      });
      it('props', () => {
        expect(CONFIG.value.values.props({ ids: [1, 2] })).toMatchSnapshot();
      });
      it('getter', () => {
        expect(
          CONFIG.value.values.getter(1, 2, 3, { ids: [1, 2, 3] }),
        ).toMatchSnapshot();
      });
    });
    describe('filteredIds', () => {
      it('should exists', () => {
        expect(
          CONFIG.value.filteredIds.getter({
            values: [['2019-09-13T01:48:32.332Z', 1], [null, 2], [null, 3]],
            calculatedDate: '2019-09-13T01:48:32.332Z',
            isDateSet: true,
          }),
        ).toEqual([1]);
        expect(
          CONFIG.value.filteredIds.getter({
            values: [['2019-09-13T01:48:32.332Z', 1], [null, 2], [null, 3]],
            calculatedDate: '2019-09-13T01:48:32.332Z',
            isDateSet: false,
          }),
        ).toEqual([1, 2, 3]);
      });
    });
  });
});
