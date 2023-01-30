/**
 * Created by edil on 01/24/18.
 */
import { isGreaterThanOrEqual } from '../rules/isHigher';

describe('component/Form/rules/isLessThanOrEqual()', () => {
  it('should exists', () => {
    expect(isGreaterThanOrEqual).toBeDefined();
  });
  const value = 100;
  it('should be false', () => {
    expect(isGreaterThanOrEqual([], -1, 0)).toBe(false);
    expect(isGreaterThanOrEqual([], 0, value)).toBe(false);
    expect(isGreaterThanOrEqual([], 1, value)).toBe(false);
    expect(isGreaterThanOrEqual([], 99, value)).toBe(false);
    expect(isGreaterThanOrEqual([], 99.999, value)).toBe(false);
    expect(isGreaterThanOrEqual([], -100, value)).toBe(false);
  });
  it('should be true', () => {
    expect(isGreaterThanOrEqual([], null, value)).toBe(true);
    expect(isGreaterThanOrEqual([], false, value)).toBe(true);
    expect(isGreaterThanOrEqual([], 100)).toBe(true);
    expect(isGreaterThanOrEqual([], 1, 0)).toBe(true);
    expect(isGreaterThanOrEqual([], 100, value)).toBe(true);
    expect(isGreaterThanOrEqual([], 100.001, value)).toBe(true);
    expect(isGreaterThanOrEqual([], 101, value)).toBe(true);
    expect(isGreaterThanOrEqual([], 9999999999, value)).toBe(true);
  });
});
