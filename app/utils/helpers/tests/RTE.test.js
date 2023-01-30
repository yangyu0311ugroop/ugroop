import { EMPTY_RTE } from 'appConstants';
import { isEmptyRTE } from '../RTE';

describe('Smoke Tests', () => {
  it('should exists', () => {
    expect(isEmptyRTE);
  });
});

describe('isEmptyRTE()', () => {
  const RTE = '<p>        </p>';
  it('should return false', () => {
    expect(isEmptyRTE('test')).toBe(false);
  });
  it('should return true on undefined string', () => {
    expect(isEmptyRTE()).toBe(true);
  });
  it('should return true on emtpy string', () => {
    expect(isEmptyRTE('')).toBe(true);
  });
  it('should return true on EMPTY_RTE', () => {
    expect(isEmptyRTE(EMPTY_RTE)).toBe(true);
  });
  it('should return true on spaces', () => {
    expect(isEmptyRTE(RTE)).toBe(true);
  });
  it('should return true on combinations', () => {
    const combination = `${RTE}${EMPTY_RTE}${RTE}${EMPTY_RTE}`;
    expect(isEmptyRTE(combination)).toBe(true);
  });
});
