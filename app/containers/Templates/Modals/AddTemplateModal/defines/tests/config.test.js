/**
 * Created by Jay on 1/7/17.
 */
import { CONFIG } from '../config';

describe('CONFIG FILE', () => {
  it('should exists', () => {
    expect(CONFIG).toMatchSnapshot();
  });

  describe('value', () => {
    it('should exist', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });
  });

  describe('setValue', () => {
    it('should exist', () => {
      expect(CONFIG.setValue).toMatchSnapshot();
    });
  });
});
