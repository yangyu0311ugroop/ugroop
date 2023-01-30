import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from '../selectors';

describe('MY_TEMPLATE_VIEWSTORE_SELECTORS', () => {
  it('should contain all the selectors needed for the view store', () => {
    expect(MY_TEMPLATE_VIEWSTORE_SELECTORS).toMatchSnapshot();
  });
});
