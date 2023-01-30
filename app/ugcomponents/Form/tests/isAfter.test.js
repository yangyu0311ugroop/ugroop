/**
 * Created by quando on 10/8/17.
 */
import isAfter from '../rules/isAfter';

describe('component/Form/rules/isAfter()', () => {
  it('should exists', () => expect(isAfter).toBeDefined());
  let now;
  beforeEach(() => {
    now = new Date();
  });
  it('should be false', () => {
    expect(isAfter([], 1)).toBe(false);
    expect(isAfter([], null)).toBe(false);
    expect(isAfter([], now)).toBe(false);
    expect(isAfter([], now.setDate(now.getDate() - 1))).toBe(false);
  });
  it('should be true', () => {
    expect(isAfter([], now.setDate(now.getDate() + 1))).toBe(true);
    expect(isAfter([], now.setDate(now.getDate() + 100))).toBe(true);
  });
});
