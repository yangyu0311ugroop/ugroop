import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from '../logic';

describe('LOGIC_HELPERS', () => {
  it('should exist', () => {
    expect(typeof LOGIC_HELPERS).toBe('object');
  });

  describe('ifElse', () => {
    it('should handle bad cases', () => {
      expect(LOGIC_HELPERS.ifElse()).toBe(undefined);
      expect(LOGIC_HELPERS.ifElse('string')).toBe(undefined);
      expect(LOGIC_HELPERS.ifElse(true)).toBe(undefined);
      expect(LOGIC_HELPERS.ifElse(false)).toBe(undefined);
      expect(LOGIC_HELPERS.ifElse(false, 1)).toBe(undefined);
    });

    describe('AND', () => {
      it('should handle array of conditions', () => {
        // true
        expect(LOGIC_HELPERS.ifElse([true], 1, 2)).toBe(1);
        expect(LOGIC_HELPERS.ifElse([1], 1, 2)).toBe(1);
        expect(LOGIC_HELPERS.ifElse(['some string'], 1, 2)).toBe(1);
        expect(LOGIC_HELPERS.ifElse([true, 'some string'], 1, 2)).toBe(1);

        // false
        expect(LOGIC_HELPERS.ifElse([true, null, 'some string'], 1, 2)).toBe(2);
        expect(
          LOGIC_HELPERS.ifElse([true, undefined, 'some string'], 1, 2),
        ).toBe(2);
        expect(LOGIC_HELPERS.ifElse([true, 0, 'some string'], 1, 2)).toBe(2);
        expect(LOGIC_HELPERS.ifElse([true, false, 'some string'], 1, 2)).toBe(
          2,
        );
      });

      it('should return correct condition', () => {
        expect(LOGIC_HELPERS.ifElse(true, 1, 2)).toBe(1);
        expect(LOGIC_HELPERS.ifElse(false, 1, 2)).toBe(2);
      });
    });

    describe('OR', () => {
      it('should handle array of conditions', () => {
        // true
        expect(LOGIC_HELPERS.ifElse([true], 1, 2, true)).toBe(1);
        expect(LOGIC_HELPERS.ifElse([1], 1, 2, true)).toBe(1);
        expect(LOGIC_HELPERS.ifElse(['some string'], 1, 2, true)).toBe(1);
        expect(LOGIC_HELPERS.ifElse([true, 'some string'], 1, 2, true)).toBe(1);

        // true
        expect(
          LOGIC_HELPERS.ifElse([true, null, 'some string'], 1, 2, true),
        ).toBe(1);
        expect(
          LOGIC_HELPERS.ifElse([true, undefined, 'some string'], 1, 2, true),
        ).toBe(1);
        expect(LOGIC_HELPERS.ifElse([true, 0, 'some string'], 1, 2, true)).toBe(
          1,
        );
        expect(
          LOGIC_HELPERS.ifElse([true, false, 'some string'], 1, 2, true),
        ).toBe(1);

        // false
        expect(LOGIC_HELPERS.ifElse([false], 1, 2, true)).toBe(2);
        expect(LOGIC_HELPERS.ifElse([null], 1, 2, true)).toBe(2);
        expect(LOGIC_HELPERS.ifElse([undefined], 1, 2, true)).toBe(2);
        expect(LOGIC_HELPERS.ifElse([0], 1, 2, true)).toBe(2);
        expect(
          LOGIC_HELPERS.ifElse([false, null, undefined, 0], 1, 2, true),
        ).toBe(2);
      });

      it('should return correct condition', () => {
        expect(LOGIC_HELPERS.ifElse(true, 1, 2, true)).toBe(1);
        expect(LOGIC_HELPERS.ifElse(false, 1, 2, true)).toBe(2);
      });
    });
  });

  describe('ifFunction', () => {
    it('should call if function', () => {
      const func = jest.fn();

      LOGIC_HELPERS.ifFunction(func);
      LOGIC_HELPERS.ifFunction(func, ['string']);
      LOGIC_HELPERS.ifFunction(func, ['string', 123, true, false]);

      expect(func).toBeCalled();
      expect(func.mock.calls).toMatchSnapshot();
    });

    it('should return conditionFalse if func is not function', () => {
      const func = 'not a function';

      LOGIC_HELPERS.ifFunction(func);
      expect(LOGIC_HELPERS.ifFunction(func)).toBe(undefined);
      expect(LOGIC_HELPERS.ifFunction(func, ['string'], 9922)).toBe(9922);
      expect(
        LOGIC_HELPERS.ifFunction(func, ['string', 123, true, false], 9922),
      ).toBe(9922);
    });
  });

  describe('switchCase', () => {
    it('should return undefined', () => {
      expect(LOGIC_HELPERS.switchCase(123)).toBe(undefined);
    });

    it('should return defaultFunc', () => {
      const defaultFn = jest.fn(() => 'defaultFn');

      expect(LOGIC_HELPERS.switchCase(123, { [DEFAULT]: defaultFn })).toBe(
        'defaultFn',
      );
    });

    it('should return switch Func', () => {
      const defaultFn = jest.fn(() => 'defaultFn');
      const oneFn = jest.fn(() => 'oneFn');

      expect(
        LOGIC_HELPERS.switchCase(123, { 123: oneFn, [DEFAULT]: defaultFn }),
      ).toBe('oneFn');
    });
  });
});
