/**
 * Created by quando on 6/3/17.
 */
import hasLength from '../rules/hasLength';

const textTooShort = 'Helo';
const textBoundary1 = 'Hello';
const textValid = 'HeloWorld';
const textBoundary2 = 'HelloWorld';
const textTooLong = 'HelloWorld';
const min = 5;
const max = 10;

describe('<HelpBlock />', () => {
  it('should exists', () => {
    expect(hasLength);
  });
  it('should be correct', () => {
    expect(hasLength([], null, { min, max })).toBe(false);
    expect(hasLength([], null)).toBe(false);
    expect(hasLength([], null, {})).toBe(false);
    expect(hasLength([], null, { max })).toBe(false);
    expect(hasLength([], false, { min, max })).toBe(false);
    expect(hasLength([], false, { min, max })).toBe(false);
    expect(hasLength([], undefined, { min, max })).toBe(false);
    expect(hasLength([], textTooShort, { min, max })).toBe(false);
    expect(hasLength([], textBoundary1, { min, max })).toBe(true);
    expect(hasLength([], textBoundary1, { min })).toBe(true);
    expect(hasLength([], textValid, { min, max })).toBe(true);
    expect(hasLength([], textBoundary2, { min, max })).toBe(false);
    expect(hasLength([], textTooLong, { min, max })).toBe(false);
  });
});
