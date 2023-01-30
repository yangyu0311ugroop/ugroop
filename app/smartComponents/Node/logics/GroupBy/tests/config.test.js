import { CREATED_AT, CREATED_BY } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ALL_VALUES, helpers } from '../config';

describe('SortBy/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(ALL_VALUES).toMatchSnapshot();
    });
  });

  describe('ALL_VALUES', () => {
    describe('values', () => {
      it('should return cacheKey', () => {
        expect(
          ALL_VALUES.value.values.cacheKey({
            ids: [1, 2],
            groupBy: CREATED_AT,
          }),
        ).toMatchSnapshot();
      });

      it('should return keyPath', () => {
        expect(
          ALL_VALUES.value.values.keyPath({
            ids: [1, 2],
            groupBy: CREATED_AT,
          }),
        ).toMatchSnapshot();
      });

      it('should return getter', () => {
        expect(
          ALL_VALUES.value.values.getter(1, 1, [1, 2], CREATED_BY),
        ).toMatchSnapshot();
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

  describe('createdAt()', () => {
    it('should exists', () => {
      expect(helpers.createdAt(2233)).toEqual(
        NODE_STORE_SELECTORS.createdAt({ id: 2233 }),
      );
    });
  });

  describe('createdBy()', () => {
    it('should exists', () => {
      expect(helpers.createdBy(2233)).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 2233 }),
      );
    });
  });

  describe('getSelector()', () => {
    it('should return selector', () => {
      expect(helpers.getSelector(CREATED_AT)).toBe(helpers.createdAt);
      expect(helpers.getSelector(CREATED_BY)).toBe(helpers.createdBy);
      expect(helpers.getSelector('some other selector')).toBe(
        helpers.createdBy,
      );
    });
  });

  describe('selectProp()', () => {
    it('should return selector', () => {
      expect(helpers.selectProp('ids')({ ids: [1, 2] })).toEqual([1, 2]);
      expect(helpers.selectProp('groupBy')({ groupBy: CREATED_AT })).toEqual(
        CREATED_AT,
      );
    });
  });

  describe('reduceGroup()', () => {
    it('should reduce CREATED_AT', () => {
      const result = helpers.reduceGroup(CREATED_AT)(
        {
          groupIds: [],
          groupData: {},
        },
        [1, 11],
      );
      expect(typeof result).toBe('object');
      expect(typeof result.groupData).toBe('object');
      expect(Array.isArray(result.groupIds)).toBe(true);
    });
    it('should reduce CREATED_BY', () => {
      expect(
        helpers.reduceGroup(CREATED_BY)(
          {
            groupIds: [1],
            groupData: { 1: [11] },
          },
          [1, 12],
        ),
      ).toMatchSnapshot();
    });
  });
});
