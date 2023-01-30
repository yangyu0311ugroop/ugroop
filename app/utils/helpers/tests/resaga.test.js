import { GETTER_HELPERS, RESAGA_HELPERS } from '../resaga';

describe('resaga', () => {
  describe('GETTER_HELPERS', () => {
    describe('getIfNotGiven', () => {
      it('return storeValue', () => {
        expect(GETTER_HELPERS.getIfNotGiven('content')(1, {})).toBe(1);
      });

      it('return given prop value', () => {
        expect(
          GETTER_HELPERS.getIfNotGiven('content')(1, { content: 999 }),
        ).toBe(999);
      });
    });

    describe('getIfNot', () => {
      it('should return propValue if propValue is not undefined', () => {
        expect(GETTER_HELPERS.getIfNot(true, false)).toBe(false);
      });
      it('should return storeValue if propValue is undefined', () => {
        expect(GETTER_HELPERS.getIfNot(false, undefined)).toBe(false);
      });
    });
  });

  describe('RESAGA_HELPERS', () => {
    describe('subscribeIfNotGiven', () => {
      it('return resaga value-shaped', () => {
        GETTER_HELPERS.getIfNot = jest.fn(() => 2299);

        const selector = RESAGA_HELPERS.subscribeIfNotGiven(
          ['some', 'path'],
          'content',
        );

        expect(selector.keyPath).toEqual(['some', 'path']);
        expect(selector.props({ content: 'content' })).toBe('content');
        expect(selector.getter).toBe(GETTER_HELPERS.getIfNot);
      });
    });

    describe('subscribeSelectorIfNotGiven', () => {
      it('should return resaga value-shaped', () => {
        GETTER_HELPERS.getIfNotGiven = jest.fn(() => 777);

        expect(
          RESAGA_HELPERS.subscribeSelectorIfNotGiven(
            {
              keyPath: [['store', 'attr'], ['store', 'attr2']],
              spreadObject: true,
            },
            'content',
          ),
        ).toEqual({
          keyPath: [['store', 'attr'], ['store', 'attr2']],
          spreadObject: true,
          getter: 777,
        });
      });
    });

    describe('mapToId', () => {
      it('should pass to selector the selected id in the params', () => {
        const selector = jest.fn();
        RESAGA_HELPERS.mapToId(selector, 'folderId')({ folderId: 1 });
        expect(selector).toBeCalledWith({ id: 1 });
      });
    });

    describe('toggleValue', () => {
      it('should toggleValue', () => {
        expect(RESAGA_HELPERS.toggleValue(5)).toBe(false);
      });

      it('should toggleValue #2', () => {
        expect(RESAGA_HELPERS.toggleValue()).toBe(true);
      });
    });

    describe('prop', () => {
      it('should return prop', () => {
        expect(RESAGA_HELPERS.prop('id')({ id: 3344 })).toBe(3344);
      });
    });

    describe('concat', () => {
      it('should return concat', () => {
        expect(RESAGA_HELPERS.concat(23)()).toEqual([23]);
      });

      it('should return concat 2', () => {
        expect(RESAGA_HELPERS.concat(23)([12])).toEqual([12, 23]);
      });

      it('should return concat 3', () => {
        expect(RESAGA_HELPERS.concat(23)([23])).toEqual([23]);
      });
    });
  });
});
