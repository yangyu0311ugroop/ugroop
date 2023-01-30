import { CARD_API_HELPERS, CARD_NORMALISER } from '../helpers';

describe('<CARD_API_HELPERS />', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(typeof CARD_API_HELPERS).toBe('object');
  });

  describe('createCustomerCard', () => {
    it('dispatchTo still matches snapshot', () => {
      CARD_API_HELPERS.createCustomerCard(
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
  describe('deleteCustomerCard', () => {
    it('dispatchTo still matches snapshot', () => {
      CARD_API_HELPERS.deleteCustomerCard(
        {
          id: 99222,
          cardId: 1,
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
  describe('updateCustomerCard', () => {
    it('dispatchTo still matches snapshot', () => {
      CARD_API_HELPERS.updateCustomerCard(
        {
          id: 99222,
          cardId: 1,
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
  describe('getCustomerCards', () => {
    it('dispatchTo still matches snapshot', () => {
      CARD_API_HELPERS.getCustomerCards(
        {
          id: 99222,
          onSuccess: 1,
          onError: 2,
        },
        { resaga },
      );
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
  describe('CARD_NORMALISER.normaliseDeleteteCard', () => {
    it('dispatchTo still matches snapshot', () => {
      expect(
        CARD_NORMALISER.normaliseDeleteCard(
          {
            id: 99222,
          },
          { id: 1 },
        ),
      ).toMatchSnapshot();
    });
  });
  describe('CARD_NORMALISER.normaliseCreateCard', () => {
    it('dispatchTo still matches snapshot', () => {
      expect(
        CARD_NORMALISER.normaliseCreateCard({
          id: 99222,
        }),
      ).toMatchSnapshot();
    });
  });
  describe('CARD_NORMALISER.normaliseUpdateCard', () => {
    it('dispatchTo still matches snapshot', () => {
      expect(
        CARD_NORMALISER.normaliseUpdateCard({
          id: 99222,
        }),
      ).toMatchSnapshot();
    });
  });
});
