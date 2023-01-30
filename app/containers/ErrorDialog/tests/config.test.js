import { config } from '../config';

describe('Config', () => {
  it('value shall have correct obj', () => {
    expect(config.value).toMatchSnapshot();
  });
});
