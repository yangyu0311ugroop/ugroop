import { EVENTS_API, GET_EVENTS_BY_ID } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('Events/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('requests', () => {
    describe('GET_EVENTS_BY_ID', () => {
      it('should call a particular endpoint', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[GET_EVENTS_BY_ID]({ ids: [1, 2] });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${EVENTS_API}?ids=[1,2]`,
        );
      });
    });
  });

  describe('processResult', () => {
    describe('GET_EVENTS_BY_ID', () => {
      it('should return normalized events', () => {
        const eventList = [{ id: 1 }, { id: 2 }];
        const flightBookingList = [{ id: 3 }];
        const mockResult = {
          eventList,
          flightBookingList,
        };
        const result = CONFIG.processResult[GET_EVENTS_BY_ID](mockResult);

        expect(result).toEqual({
          events: {
            1: { id: 1 },
            2: { id: 2 },
          },
          flightBookings: { 3: { id: 3 } },
          flightBookingIds: [3],
        });
      });
    });
  });
});
