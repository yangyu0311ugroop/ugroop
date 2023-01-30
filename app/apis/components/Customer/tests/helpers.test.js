import { CUSTOMER_API_HELPERS } from '../helpers';

describe('<CARD_API_HELPERS />', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(typeof CUSTOMER_API_HELPERS).toBe('object');
  });

  describe('createCustomerCard', () => {
    it('dispatchTo still matches snapshot', () => {
      CUSTOMER_API_HELPERS.updateCustomer(
        {
          id: 99222,
          data: {},
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
});
