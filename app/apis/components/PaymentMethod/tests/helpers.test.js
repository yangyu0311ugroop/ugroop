import {
  PAYMENT_METHOD_API_HELPERS,
  PAYMENT_METHOD_NORMALISER,
} from 'apis/components/PaymentMethod/helpers';

describe('<CARD_API_HELPERS />', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(typeof PAYMENT_METHOD_API_HELPERS).toBe('object');
  });

  describe('createCustomerCard', () => {
    it('dispatchTo still matches snapshot', () => {
      PAYMENT_METHOD_API_HELPERS.updatePaymentMethod(
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
  describe('normaliseUpdate', () => {
    it('dispatchTo still matches snapshot', () => {
      PAYMENT_METHOD_NORMALISER.normaliseUpdate({
        paymentMethod: {
          id: 99222,
          billing_details: {
            address: {
              line1: '1',
              line2: '2',
            },
          },
          card: {},
        },
      });
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
});
