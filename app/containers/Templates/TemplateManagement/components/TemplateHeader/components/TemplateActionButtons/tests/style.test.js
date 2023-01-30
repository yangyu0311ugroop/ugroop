import stylesheet from '../style';

describe('stylesheet', () => {
  it('should return an object', () => {
    expect(typeof stylesheet()).toBe('object');
  });
});
