import { CHARGES_API, GET_CUSTOMER_CHARGES } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('Cards/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('name', () => {
    it('should exists', () => {
      expect(CONFIG.name).toBe(CHARGES_API);
    });
  });

  describe('#requests', () => {
    describe('GET_CUSTOMER_CHARGES', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[GET_CUSTOMER_CHARGES]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_CUSTOMER_CHARGES]({ data: { customer: 1 } });
        expect(requests.fetchWithAuthorisation).toBeCalled();
      });
    });
  });
});
