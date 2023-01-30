import Sorter, { SORT_HELPERS } from '../sorter';

describe('Sorter', () => {
  describe('sortObjectValue', () => {
    it('should return something', () => {
      const object = { a: [{ b: { c: 3 } }] };
      const target = 'a[0].b.c';
      expect(SORT_HELPERS.sortObjectValue(target)(object)).toEqual(3);
    });
  });
  describe('sortArrayItems', () => {
    const sample = [
      [1, 'b'],
      [1, 'a'],
      [1, 's'],
      [1, 'c'],
      [1, 'xcv'],
      [1, 'b'],
      [1, 'a'],
      [1, 'z'],
      [1, 'q'],
      [1, 'a'],
    ];
    it('should sort in ascending order by default', () => {
      const result = sample.sort(SORT_HELPERS.sortArrayItems());
      const expected = [
        [1, 'a'],
        [1, 'a'],
        [1, 'a'],
        [1, 'b'],
        [1, 'b'],
        [1, 'c'],
        [1, 'q'],
        [1, 's'],
        [1, 'xcv'],
        [1, 'z'],
      ];
      expect(result).toEqual(expected);
    });
    it('should sort in descending order', () => {
      const result = sample.sort(SORT_HELPERS.sortArrayItems('desc'));
      const expected = [
        [1, 'z'],
        [1, 'xcv'],
        [1, 's'],
        [1, 'q'],
        [1, 'c'],
        [1, 'b'],
        [1, 'b'],
        [1, 'a'],
        [1, 'a'],
        [1, 'a'],
      ];
      expect(result).toEqual(expected);
    });
    it('should return -1 if firstItem content is > secondItem content in desc', () => {
      const result = SORT_HELPERS.sortArrayItems('desc')(sample[0], sample[1]);
      expect(result).toBe(-1);
    });
  });
  describe('sortFolderItemsByName', () => {
    const sample = [
      { content: 'b' },
      { content: 'a' },
      { content: 's' },
      { content: 'c' },
      { content: 'xcv' },
      { content: 'b' },
      { content: 'a' },
      { content: 'z' },
      { content: 'q' },
      { content: 'a' },
    ];
    it('should sort in ascending order by default', () => {
      const result = sample.sort(Sorter.sortFolderItemsByName());
      const expected = [
        { content: 'a' },
        { content: 'a' },
        { content: 'a' },
        { content: 'b' },
        { content: 'b' },
        { content: 'c' },
        { content: 'q' },
        { content: 's' },
        { content: 'xcv' },
        { content: 'z' },
      ];

      expect(result).toEqual(expected);
    });
    it('should sort in descending order if order = desc', () => {
      const result = sample.sort(Sorter.sortFolderItemsByName('desc'));
      const expected = [
        { content: 'z' },
        { content: 'xcv' },
        { content: 's' },
        { content: 'q' },
        { content: 'c' },
        { content: 'b' },
        { content: 'b' },
        { content: 'a' },
        { content: 'a' },
        { content: 'a' },
      ];

      expect(result).toEqual(expected);
    });

    it('should return -1 if firstItem content is > secondItem content in desc', () => {
      const result = Sorter.sortFolderItemsByName('desc')(sample[0], sample[1]);
      expect(result).toBe(-1);
    });
  });

  describe('SORT_HELPERS', () => {
    describe('sorterConfig', () => {
      it('should return a particular shape of config', () => {
        expect(SORT_HELPERS.sorterConfig()).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it + field key and sort function key', () => {
        const scenarios = [[1, 2], [], null];
        const config = SORT_HELPERS.sorterConfig();
        scenarios.forEach(scenario => {
          expect(config.cacheKey({ ids: scenario })).toMatchSnapshot();
        });
      });
      it('should only return ids as props', () => {
        const config = SORT_HELPERS.sorterConfig();
        expect(config.props({ ids: [] })).toEqual([]);
      });
      it('should map ids and return array of selectors', () => {
        const selectorCreator = jest.fn(field =>
          jest.fn(({ id }) => ['sample', id, field]),
        );
        const ids = [1, 2, 3];
        const config = SORT_HELPERS.sorterConfig('field1', jest.fn(), {
          selectorCreator,
        });
        expect(config.keyPath({ ids })).toMatchSnapshot();
      });
      it('should return the sorted array in getter', () => {
        const args = [false, false, true];
        const ids = [1, 2, 3];
        const params = [...args, ids];
        const config = SORT_HELPERS.sorterConfig(
          'field1',
          SORT_HELPERS.sortBool,
        );
        expect(config.getter(...params)).toEqual([3, 1, 2]);
      });
      it('should return empty array in getter if ids are empty', () => {
        const args = [false, false, true];
        const ids = [];
        const params = [...args, ids];
        const config = SORT_HELPERS.sorterConfig(
          'field1',
          SORT_HELPERS.sortBool,
        );
        expect(config.getter(...params)).toEqual([]);
      });
    });
  });

  describe('sortValue', () => {
    it('should get the second item in array and return to lowerCase if string', () => {
      expect(SORT_HELPERS.sortValue([1, 'AA'])).toBe('aa');
    });

    it('should return null as it is', () => {
      expect(SORT_HELPERS.sortValue([1, null])).toBe(null);
    });
  });
});
