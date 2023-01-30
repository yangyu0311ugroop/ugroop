/**
 * Created by quando on 6/3/17.
 */
import isIn from '../rules/isIn';

const array = ['red', 'apple', 'car'];
const textValid = 'red';
const textInvalid = 'RED';

describe('component/Form/rules/isIn()', () => {
  it('should exists', () => {
    expect(isIn);
  });
  it('should be correct', () => {
    expect(isIn([], null, null)).toBe(false);
    expect(isIn([], textValid, null)).toBe(false);
    expect(isIn([], null, array)).toBe(false);
    expect(isIn([], textValid, array)).toBe(true);
    expect(isIn([], textInvalid, array)).toBe(false);
  });
});
