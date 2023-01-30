import { ASC, CREATED_AT, DESC, DUE_DATE, PERCENTAGE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { helpers, SORT_BY, ALL_VALUES } from '../config';

describe('SortBy/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(SORT_BY).toMatchSnapshot();
      expect(ALL_VALUES).toMatchSnapshot();
    });
  });

  describe('ALL_VALUES', () => {
    describe('values', () => {
      it('should exists', () => {
        expect(
          ALL_VALUES.value.values.cacheKey({
            ids: [1, 2],
            sortBy: CREATED_AT,
            order: ASC,
          }),
        ).toMatchSnapshot();
        expect(
          ALL_VALUES.value.values.keyPath({ ids: [1, 2], sortBy: CREATED_AT }),
        ).toMatchSnapshot();
        expect(
          ALL_VALUES.value.values.props({ ids: [1, 2] }),
        ).toMatchSnapshot();
        expect(
          ALL_VALUES.value.values.getter(1, 2, 3, [22, 33, 44]),
        ).toMatchSnapshot();
      });
    });
    describe('sortedIds', () => {
      it('should exists', () => {
        expect(
          ALL_VALUES.value.sortedIds.getter({
            values: [[33, 1], [21, 2], [35, 3]],
            sortBy: PERCENTAGE,
            order: ASC,
          }),
        ).toEqual([2, 1, 3]);
        expect(
          ALL_VALUES.value.sortedIds.getter({
            values: [[33, 1], [21, 2], [35, 3]],
            sortBy: PERCENTAGE,
            order: DESC,
          }),
        ).toEqual([3, 1, 2]);
      });
    });
  });
});

describe('helpers', () => {
  afterEach(() => jest.clearAllMocks());

  describe('helpers', () => {
    it('should exists', () => {
      expect(helpers).toMatchSnapshot();
    });
  });

  describe('calculatedStartTimeValue()', () => {
    it('should exists', () => {
      NODE_STORE_SELECTORS.calculatedStartTimeValue = jest.fn(
        () => 'calculatedStartTimeValue',
      );

      expect(helpers.calculatedStartTimeValue(2233)).toBe(
        'calculatedStartTimeValue',
      );
    });
  });

  describe('createdAt()', () => {
    it('should exists', () => {
      NODE_STORE_SELECTORS.createdAt = jest.fn(() => 'createdAt');

      expect(helpers.createdAt(2233)).toBe('createdAt');
    });
  });

  describe('percentage()', () => {
    it('should exists', () => {
      NODE_STORE_SELECTORS.percentage = jest.fn(() => 'percentage');

      expect(helpers.percentage(2233)).toBe('percentage');
    });
  });

  describe('sortValue()', () => {
    it('should sort ASC', () => {
      expect(helpers.sortValue(ASC)([1], [])).toBe(1);
      expect(helpers.sortValue(ASC)([], [1])).toBe(-1);

      expect(helpers.sortValue(ASC)([1], [2])).toBe(-1);
      expect(helpers.sortValue(ASC)([1], [1])).toBe(-1);
      expect(helpers.sortValue(ASC)([2], [1])).toBe(1);
    });

    it('should sort DESC', () => {
      expect(helpers.sortValue(DESC)([1], [])).toBe(-1);
      expect(helpers.sortValue(DESC)([], [1])).toBe(1);

      expect(helpers.sortValue(DESC)([1], [2])).toBe(1);
      expect(helpers.sortValue(DESC)([1], [1])).toBe(-1);
      expect(helpers.sortValue(DESC)([2], [1])).toBe(-1);
    });
  });

  const date1 = '1234-12-21 13:34:56.789';
  const date2 = '2345-12-21 13:34:56.789';

  describe('sortTime()', () => {
    it('should sort ASC', () => {
      expect(helpers.sortTime(ASC)([date1], [])).toBe(1);
      expect(helpers.sortTime(ASC)([], [date1])).toBe(-1);

      expect(helpers.sortTime(ASC)([date1], [date2])).toBe(-1);
      expect(helpers.sortTime(ASC)([date1], [date1])).toBe(-1);
      expect(helpers.sortTime(ASC)([date2], [date1])).toBe(1);
    });

    it('should sort DESC', () => {
      expect(helpers.sortTime(DESC)([date1], [])).toBe(-1);
      expect(helpers.sortTime(DESC)([], [date1])).toBe(1);

      expect(helpers.sortTime(DESC)([date1], [date2])).toBe(1);
      expect(helpers.sortTime(DESC)([date1], [date1])).toBe(-1);
      expect(helpers.sortTime(DESC)([date2], [date1])).toBe(-1);
    });
  });

  describe('getSelector()', () => {
    it('should return selector', () => {
      expect(helpers.getSelector(CREATED_AT)).toBe(helpers.createdAt);
      expect(helpers.getSelector(DUE_DATE)).toBe(
        helpers.calculatedStartTimeValue,
      );
      expect(helpers.getSelector(PERCENTAGE)).toBe(helpers.percentage);
      expect(helpers.getSelector('some other selector')).toBe(null);
    });
  });

  describe('getSortFunction()', () => {
    it('should return selector', () => {
      helpers.sortTime = jest.fn(() => 'helpers.sortTime');
      helpers.sortValue = jest.fn(() => 'helpers.sortValue');

      expect(helpers.getSortFunction(CREATED_AT)).toBe('helpers.sortTime');
      expect(helpers.getSortFunction(DUE_DATE)).toBe('helpers.sortTime');
      expect(helpers.getSortFunction(PERCENTAGE)).toBe('helpers.sortValue');
      expect(helpers.getSortFunction('some other selector')).toBe(null);
    });
  });
});
