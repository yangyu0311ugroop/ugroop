import { USER_FIELDS } from 'appConstants';
import {
  CONFIG_0,
  CONFIG,
  columnSortByFunc,
  filterName,
  sortBy,
} from '../config';

describe('SorterTable/config.js', () => {
  describe('CONFIG_0', () => {
    describe('get array of knownAs', () => {
      const knownAs = ['john', 'paul', 'dan', 'elijah'];
      const ids = [1, 2, 3, 4];
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.knownAs.keyPath({
            ids,
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.knownAs.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const props = {
          ids,
          knownAs,
        };
        expect(CONFIG_0.value.knownAs.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const args = ['john', 'paul', 'dan', 'elijah', [1, 2, 3, 4], undefined];
        const returned = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
        expect(CONFIG_0.value.knownAs.getter(...args)).toEqual(returned);
      });
    });

    describe('get array of firstName', () => {
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.firstName.keyPath({
            ids: [1, 2, 3, 4],
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.firstName.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const firstName = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
        const props = {
          ids: [1, 2, 3, 4],
          firstName,
        };
        expect(CONFIG_0.value.firstName.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const args = ['john', 'paul', 'dan', 'elijah', [1, 2, 3, 4], undefined];
        const returned = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
        expect(CONFIG_0.value.firstName.getter(...args)).toEqual(returned);
      });
    });

    describe('get array of lastName', () => {
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.lastName.keyPath({
            ids: [1, 2, 3, 4],
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.lastName.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const lastName = [
          [1, 'serafico'],
          [2, 'santos'],
          [3, 'olivar'],
          [4, 'topas'],
        ];
        const props = {
          ids: [1, 2, 3, 4],
          lastName,
        };
        expect(CONFIG_0.value.lastName.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const args = [
          'serafico',
          'santos',
          'olivar',
          'topas',
          [1, 2, 3, 4],
          undefined,
        ];
        const returned = [
          [1, 'serafico'],
          [2, 'santos'],
          [3, 'olivar'],
          [4, 'topas'],
        ];
        expect(CONFIG_0.value.lastName.getter(...args)).toEqual(returned);
      });
    });

    describe('get array of email', () => {
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.email.keyPath({
            ids: [1, 2, 3, 4],
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.email.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const email = [
          'john.serafico@gmail.com',
          'paul.santos@gmail.com',
          'dan.olivar@gmail.com',
          'elijah.topas@gmail.com',
        ];
        const props = {
          ids: [1, 2, 3, 4],
          email,
        };
        expect(CONFIG_0.value.email.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const args = [
          'john.serafico@gmail.com',
          'paul.santos@gmail.com',
          'dan.olivar@gmail.com',
          'elijah.topas@gmail.com',
          [1, 2, 3, 4],
          undefined,
        ];
        const returned = [
          [1, 'john.serafico@gmail.com'],
          [2, 'paul.santos@gmail.com'],
          [3, 'dan.olivar@gmail.com'],
          [4, 'elijah.topas@gmail.com'],
        ];
        expect(CONFIG_0.value.email.getter(...args)).toEqual(returned);
      });
    });

    describe('get array of createdAt', () => {
      const createdAt = [
        '2020-01-07T02:53:55.454Z',
        '2020-01-07T02:56:17.588Z',
        '2020-01-15T05:20:21.820Z',
        '2019-10-08T04:19:42.620Z',
      ];
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.createdAt.keyPath({
            ids: [1, 2, 3, 4],
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.createdAt.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const props = {
          ids: [1, 2, 3, 4],
          createdAt,
        };
        expect(CONFIG_0.value.createdAt.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const args = [
          '2020-01-07T02:53:55.454Z',
          '2020-01-07T02:56:17.588Z',
          '2020-01-15T05:20:21.820Z',
          '2019-10-08T04:19:42.620Z',
          [1, 2, 3, 4],
          undefined,
        ];
        const returned = [
          [1, '2020-01-07T02:53:55.454Z'],
          [2, '2020-01-07T02:56:17.588Z'],
          [3, '2020-01-15T05:20:21.820Z'],
          [4, '2019-10-08T04:19:42.620Z'],
        ];
        expect(CONFIG_0.value.createdAt.getter(...args)).toEqual(returned);
      });
    });

    describe('get array of lastSeenDate', () => {
      const lastSeenDate = [
        '2020-03-12T15:07:20.000Z',
        '2020-03-12T15:07:18.000Z',
        '2020-03-12T15:08:09.000Z',
        undefined,
      ];
      const ids = [1, 2, 3, 4];
      it('contains required properties', () => {
        expect(
          CONFIG_0.value.lastSeenDate.keyPath({
            ids: [1, 2, 3, 4],
          }),
        ).toMatchSnapshot();
      });
      it('should base its cacheKey to the option passed to it with field key and sort function key', () => {
        const scenarios = [[1, 2, 3, 4]];
        scenarios.forEach(scenario => {
          expect(
            CONFIG_0.value.lastSeenDate.cacheKey({ ids: scenario }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const props = {
          ids,
          lastSeenDate,
        };
        expect(
          CONFIG_0.value.lastSeenDate.props.map(func => func(props)),
        ).toEqual(Object.values(props));
      });
      it('should return the sorted array in getter', () => {
        const args = [
          '2020-03-12T15:07:20.000Z',
          '2020-03-12T15:07:18.000Z',
          '2020-03-12T15:08:09.000Z',
          undefined,
          [1, 2, 3, 4],
          undefined,
        ];
        const returned = [
          [1, 'Invalid date'],
          [2, 'Invalid date'],
          [3, 'Invalid date'],
          [4, ''],
        ];
        expect(CONFIG_0.value.lastSeenDate.getter(...args)).toEqual(returned);
      });
    });
  });
  describe('CONFIG', () => {
    describe('sortedIds', () => {
      it('should base its cacheKey to the option passed to it + field key and sort function key', () => {
        const scenarios = [[2, 1, 4, 3]];
        const columnSortBy = 'knownAs';
        scenarios.forEach(scenario => {
          expect(
            CONFIG.value.sortedIds.cacheKey({ ids: scenario, columnSortBy }),
          ).toMatchSnapshot();
        });
      });
      it('returns correct props', () => {
        const knownAs = [[2, 'paul'], [1, 'john'], [4, 'elijah'], [3, 'dan']];
        const props = {
          ids: [],
          columnOrderBy: 'asc',
          columnSortBy: 'knownAs',
          knownAs,
        };
        expect(CONFIG.value.sortedIds.props.map(func => func(props))).toEqual(
          Object.values(props),
        );
      });
      it('should return the sorted array in getter', () => {
        const knownAs = [[2, 'paul'], [1, 'john'], [4, 'elijah'], [3, 'dan']];
        const ids = [2, 1, 4, 3];
        const columnOrderBy = 'asc';
        const columnSortBy = 'knownAs';

        const params = {
          ids,
          columnOrderBy,
          columnSortBy,
          knownAs,
        };

        expect(CONFIG.value.sortedIds.getter(params)).toEqual(
          [3, 4, 1, 2],
          'asc',
          'knownAs',
        );
      });
      it('should return the sorted array in getter', () => {
        const knownAs = [[2, 'paul'], [1, 'john'], [4, 'elijah'], [3, 'dan']];
        const ids = [];
        const columnOrderBy = 'asc';
        const columnSortBy = 'knownAs';

        const params = {
          ids,
          columnOrderBy,
          columnSortBy,
          knownAs,
        };
        expect(CONFIG.value.sortedIds.getter(params)).toEqual([]);
      });
    });
  });

  describe('sortBy', () => {
    const unsorted = [
      [5, 'zed'],
      [2, 'paul'],
      [1, 'john'],
      [3, 'dan'],
      [4, 'elijah'],
      [6, 'diamond'],
      [3, 'dan'],
    ];
    const columnSortBy = 'knownAs';
    it('should exists', () => {
      expect(sortBy('asc', columnSortBy, [...unsorted])).toEqual([
        3,
        3,
        6,
        4,
        1,
        2,
        5,
      ]);
      expect(sortBy('desc', columnSortBy, [...unsorted])).toEqual([
        5,
        2,
        1,
        4,
        6,
        3,
        3,
      ]);
    });
  });

  describe('filterName', () => {
    it('filterName mapped', () => {
      const knownAs = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
      const firstName = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
      const lastName = [
        [1, 'serafico'],
        [2, 'santos'],
        [3, 'olivar'],
        [4, 'topas'],
      ];
      const result = filterName(knownAs, firstName, lastName);
      expect(result).toMatchSnapshot();
    });
  });

  describe('columnSortByFunc', () => {
    const knownAs = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
    const firstName = [[1, 'john'], [2, 'paul'], [3, 'dan'], [4, 'elijah']];
    const lastName = [
      [1, 'serafico'],
      [2, 'santos'],
      [3, 'olivar'],
      [4, 'topas'],
    ];

    const email = [
      [1, 'john.serafico@gmail.com'],
      [2, 'paul.santos@gmail.com'],
      [3, 'dan.olivar@gmail.com'],
      [4, 'elijah.topas@gmail.com'],
    ];

    const createdAt = [
      [1, '2020-01-07T02:53:55.454Z'],
      [2, '2020-01-07T02:56:17.588Z'],
      [3, '2020-01-15T05:20:21.820Z'],
      [4, '2019-10-08T04:19:42.620Z'],
    ];

    const lastSeenDate = [
      [1, '2020-03-12T15:07:20.000Z'],
      [2, '2020-03-12T15:07:18.000Z'],
      [3, '2020-03-12T15:06:55.000Z'],
      [4, '2020-03-12T15:08:09.000Z'],
    ];

    const args = {
      knownAs,
      firstName,
      lastName,
      email,
      createdAt,
      lastSeenDate,
    };
    it('columnSortByFunc columnSortBy knownAs', () => {
      const columnSortBy = 'example';
      const result = columnSortByFunc(args, columnSortBy);
      expect(result).toEqual(knownAs);
    });
    it('columnSortByFunc columnSortBy knownAs', () => {
      const columnSortBy = USER_FIELDS.KNOWN_AS;
      const result = columnSortByFunc(args, columnSortBy);
      expect(result).toEqual(knownAs);
    });
    it('columnSortByFunc columnSortBy email', () => {
      const columnSortBy = USER_FIELDS.EMAIL;
      const result = columnSortByFunc(args, columnSortBy);
      expect(result).toEqual(email);
    });
    it('columnSortByFunc columnSortBy createdDate', () => {
      const columnSortBy = USER_FIELDS.CREATED_DATE;
      const result = columnSortByFunc(args, columnSortBy);
      expect(result).toEqual(createdAt);
    });
    it('columnSortByFunc columnSortBy lastSeenDate', () => {
      const columnSortBy = USER_FIELDS.LASTSEEN_DATE;
      const result = columnSortByFunc(args, columnSortBy);
      expect(result).toEqual(lastSeenDate);
    });
  });
});
