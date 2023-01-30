/**
 * Created by quando on 10/8/17.
 */
import { isLessThanOrEqual } from '../rules/isBetween';

describe('component/Form/rules/isLessThanOrEqual()', () => {
  it('should exists', () => {
    expect(isLessThanOrEqual).toBeDefined();
  });
  const value = 100;
  it('should be false', () => {
    expect(isLessThanOrEqual([], value, null)).toBe(false);
    expect(isLessThanOrEqual([], value, false)).toBe(false);
    expect(isLessThanOrEqual([], value, -100)).toBe(false);
    expect(isLessThanOrEqual([], value, 0)).toBe(false);
    expect(isLessThanOrEqual([], value, 1)).toBe(false);
    expect(isLessThanOrEqual([], value, 99)).toBe(false);
  });
  it('should be true', () => {
    expect(isLessThanOrEqual([], value, 100)).toBe(true);
    expect(isLessThanOrEqual([], value, 101)).toBe(true);
    expect(isLessThanOrEqual([], value, 9999999999)).toBe(true);
  });
});
