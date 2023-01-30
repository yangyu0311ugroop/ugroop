import { GET_CUSTOMER, UPDATE_CUSTOMER, CUSTOMER_API } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('Customer/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(CUSTOMER_API);
    });
  });

  describe('#requests', () => {
    describe('GET_CUSTOMER', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_CUSTOMER]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_CUSTOMER]({ id: 1, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${CUSTOMER_API}/1`,
        );
      });
    });
    describe('UPDATE_CUSTOMER', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_CUSTOMER]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[UPDATE_CUSTOMER]({ id: 1, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${CUSTOMER_API}/${1}`,
          {},
        );
      });
    });
  });
});
