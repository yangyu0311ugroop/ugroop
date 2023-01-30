import { CHARGES_API_HELPERS, CHARGES_NORMALISER } from '../helpers';

describe('<CARD_API_HELPERS />', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(typeof CHARGES_API_HELPERS).toBe('object');
  });

  describe('getCustomerCharges', () => {
    it('dispatchTo still matches snapshot', () => {
      CHARGES_API_HELPERS.getCustomerCharges(
        {
          customer: 1,
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
  describe('CHARGES_NORMALISER.normaliseListCharges', () => {
    it('dispatchTo still matches snapshot', () => {
      expect(
        CHARGES_NORMALISER.normaliseListCharges(
          {
            id: 99222,
          },
          { id: 1 },
        ),
      ).toMatchSnapshot();
    });
  });
});
