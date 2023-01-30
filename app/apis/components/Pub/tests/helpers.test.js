import { PUB_API_HELPERS } from '../helpers';
import {
  PUB_API,
  GET_PUB_TEMPLATE_EVENTS,
  PUB_CREATE_INTEREST,
} from '../../../constants';

const test = {
  hashkey: 'key',
  data: 'data',
  onSuccess: jest.fn(),
  onError: jest.fn(),
};
const resaga = {
  dispatchTo: jest.fn(),
};
describe('PUB_API_HELPERS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchEvents', () => {
    it('should call dispatchTo', () => {
      PUB_API_HELPERS.fetchEvents(test, { resaga });
      expect(resaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_EVENTS,
        {
          payload: {
            hashkey: 'key',
          },
          onSuccess: test.onSuccess,
          onError: test.onError,
        },
      );
    });
  });

  describe('getTreeAndTimes', () => {
    it('should call dispatchTo', () => {
      PUB_API_HELPERS.getTreeAndTimes(
        {
          hashkey: 'hashkey',
          onSuccess: 'onSuccess',
          onError: 'onError',
        },
        { resaga },
      );

      expect(resaga.dispatchTo).toBeCalled();

      // Get times
      resaga.dispatchTo.mock.calls[0][2].onSuccess({
        node: { 1: null, 2: null },
      });

      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('createInterest', () => {
    it('should call dispatchTo', () => {
      PUB_API_HELPERS.createInterest(test, { resaga });
      expect(resaga.dispatchTo).toBeCalledWith(PUB_API, PUB_CREATE_INTEREST, {
        payload: {
          hashkey: 'key',
          data: 'data',
        },
        onSuccess: test.onSuccess,
        onError: test.onError,
      });
    });
  });
});
