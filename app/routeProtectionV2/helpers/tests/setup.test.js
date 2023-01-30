import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { fromJS } from 'immutable';
import utils from '../utils';

describe('Utility Functions', () => {
  const stateWithAccount = fromJS({
    [COGNITO_ACCOUNTSTORE]: {
      account: { name: 'Ping Pong' },
      accountRelatedOrgs: { orgs: [1, 2] },
    },
  });
  const emptyState = fromJS({ something: 'else' });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('selectAccount', () => {
    it('should be defined', () => {
      expect(typeof utils.selectAccount).toBe('function');
    });

    it('should return true', () => {
      expect(utils.selectAccount(stateWithAccount)).toEqual(
        fromJS({ name: 'Ping Pong' }),
      );
    });

    it('should return undefined', () => {
      expect(utils.selectAccount(emptyState)).toBe(undefined);
    });
  });
  describe('selectAccountRelatedOrg', () => {
    it('should be defined', () => {
      expect(typeof utils.selectAccountRelatedOrg).toBe('function');
    });

    it('should return true', () => {
      expect(utils.selectAccountRelatedOrg(stateWithAccount)).toEqual(
        fromJS({ orgs: [1, 2] }),
      );
    });

    it('should return undefined', () => {
      expect(utils.selectAccountRelatedOrg(emptyState)).toBe(undefined);
    });
  });
});
