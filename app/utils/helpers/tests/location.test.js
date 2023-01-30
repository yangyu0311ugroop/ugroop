import { isMaxSize } from '../location';

describe('isMaxSize', () => {
  it('should return true if path is equal to /admin', () => {
    expect(isMaxSize({ path: '/' })).toBe(true);
  });
  it('should return false if path is not equal to /admin', () => {
    expect(isMaxSize({ path: '/tours' })).toBe(false);
  });
});
