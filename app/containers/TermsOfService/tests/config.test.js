import { CONFIG } from '../config';

describe('Config', () => {
  it('value shall have correct obj', () => {
    expect(CONFIG.value).toMatchSnapshot();
  });
  it('account getter', () => {
    const account = CONFIG.value.account;
    expect(account.getter(null)).toBe(false);
  });
});
