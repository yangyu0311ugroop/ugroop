import {
  CARDS_API,
  CREATE_CUSTOMER_CARD,
  UPDATE_CUSTOMER_CARD,
  DELETE_CUSTOMER_CARD,
  GET_CUSTOMER_CARDS,
} from 'apis/constants';
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
      expect(CONFIG.name).toBe(CARDS_API);
    });
  });

  describe('#requests', () => {
    describe('CREATE_CUSTOMER_CARD', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_CUSTOMER_CARD]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[CREATE_CUSTOMER_CARD]({ id: 1, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'post',
          `/${CARDS_API}/1`,
          {},
        );
      });
    });
    describe('GET_CUSTOMER_CARDS', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[CREATE_CUSTOMER_CARD]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_CUSTOMER_CARDS]({ id: 1 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${CARDS_API}/1/sources`,
        );
      });
    });
    describe('UPDATE_CUSTOMER_CARD', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_CUSTOMER_CARD]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[UPDATE_CUSTOMER_CARD]({ id: 1, cardId: 2, data: {} });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'patch',
          `/${CARDS_API}/${1}/source/${2}`,
          {},
        );
      });
    });
    describe('DELETE_CUSTOMER_CARD', () => {
      it('should exists', () => {
        expect(typeof CONFIG.requests[UPDATE_CUSTOMER_CARD]).toBe('function');
      });

      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[DELETE_CUSTOMER_CARD]({ id: 1, cardId: 2 });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'delete',
          `/${CARDS_API}/${1}/source/${2}`,
        );
      });
    });
  });
});
