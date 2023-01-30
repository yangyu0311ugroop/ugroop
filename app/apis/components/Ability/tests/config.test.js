import { ABILITY_API, FIND_MY_ABILITIES, FIND_MY_TOURS } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG, utility } from '../config';

describe('Ability/config.js', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('utils.reduce', () => {
    it('should return reduced object', () => {
      expect(
        utility.reduce({ tour: { owner: 'owner ability' } }, 'tour', 'id')(
          { 1: 'viewer' },
          { id: 2, role: 'owner' },
        ),
      ).toEqual({ 1: 'viewer', 2: 'owner ability' });
    });

    it('should return notSetRole', () => {
      expect(
        utility.reduce(
          { tour: { owner: 'owner ability' } },
          'tour',
          'id',
          'owner',
        )({ 1: 'viewer' }, { id: 2 }),
      ).toEqual({ 1: 'viewer', 2: 'owner ability' });
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('requests', () => {
    describe('FIND_MY_ABILITIES', () => {
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[FIND_MY_ABILITIES]({ tokenId: 'some token' });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ABILITY_API}/me`,
        );
      });
    });

    describe('FIND_MY_TOURS', () => {
      it('should call fetchWithAuthorisation', () => {
        requests.fetchWithAuthorisation = jest.fn();

        CONFIG.requests[FIND_MY_TOURS]({ tokenId: 'some token' });

        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${ABILITY_API}/tours`,
        );
      });
    });
  });

  describe('processResult', () => {
    describe('FIND_MY_ABILITIES', () => {
      it('should return tours and organisation', () => {
        utility.reduce = jest.fn((a, b, c) => () => ({ [c]: b }));
        Date.now = jest.fn(() => 'Date.now');

        expect(
          CONFIG.processResult[FIND_MY_ABILITIES]({
            definitions: 'some definitions',
            organisation: [1],
            organisationNode: [
              {
                id: 1,
                rootNodeId: 2233,
              },
            ],
            organisationData: [
              {
                id: 1,
                name: 'some organisation',
              },
            ],
            ownedTours: [2],
            sharedTours: [3],
          }),
        ).toMatchSnapshot();
      });
    });
  });
});
