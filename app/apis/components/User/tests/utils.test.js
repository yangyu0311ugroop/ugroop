import { DATASTORE_UTILS } from 'datastore';
import { USER_APIS_UTILS, retainValue } from '../utils';

describe('app/apis/components/User/utils.js', () => {
  describe('retainValue', () => {
    it('should return the param being passed to it', () => {
      expect(retainValue(1)).toBe(1);
    });
  });
  describe('USER_APIS_UTILS', () => {
    describe('normaliseRoles', () => {
      it('should return a particular object shape fit for the resaga setValue', () => {
        DATASTORE_UTILS.upsertArray = jest.fn(() => () => ({ 1: { id: 1 } }));
        const result = USER_APIS_UTILS.normaliseRoles(
          {
            orgs: [{ orgId: 1 }, { orgId: 2 }, { orgId: 3 }],
            tours: [{ id: 1 }, { id: 2 }],
          },
          { userId: 1 },
        );
        expect(result).toMatchSnapshot();
        expect(result.person({})).toMatchSnapshot();
      });
    });
  });
});
