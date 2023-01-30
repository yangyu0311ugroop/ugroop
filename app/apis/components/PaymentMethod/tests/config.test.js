import { PAYMENT_METHOD_API, UPDATE_PAYMENT_METHOD } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('PaymentMethod/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(PAYMENT_METHOD_API);
    });
  });

  describe('#requests', () => {
    describe('UPDATE_PAYMENT_METHOD', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_PAYMENT_METHOD]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[UPDATE_PAYMENT_METHOD]({ id: 1, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${PAYMENT_METHOD_API}/1`,
          {},
        );
      });
    });
  });
});
