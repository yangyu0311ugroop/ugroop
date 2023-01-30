import { CONSOLE_HELPERS, MISSING_REQUIRED_PROPS } from '../console';

describe('CONSOLE_HELPERS', () => {
  it('should exist', () => {
    expect(typeof CONSOLE_HELPERS).toBe('object');
  });

  describe('error', () => {
    it('should exist', () => {
      global.console.error = jest.fn();

      CONSOLE_HELPERS.error(MISSING_REQUIRED_PROPS, 1, 2, 3);

      expect(global.console.error).toBeCalledWith(
        MISSING_REQUIRED_PROPS,
        1,
        2,
        3,
      );
    });
  });
});
