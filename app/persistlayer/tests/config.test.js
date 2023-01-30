/**
 * Created by Yang on 28/2/17.
 */
import { UGROOPSTORE_KEY_PREFIX } from 'containers/App/constants';
import { config } from '../config';

describe('Config Test', () => {
  it('should import config correctly with right blacklist', () => {
    expect(Array.isArray(config.whitelist)).toBe(true);
  });
  it('should import config correctly with right key Prefix', () => {
    expect(config.keyPrefix).toEqual(UGROOPSTORE_KEY_PREFIX);
  });
  it('should import config correctly with right debounce value', () => {
    expect(config.debounce).toEqual(1000);
  });
});
