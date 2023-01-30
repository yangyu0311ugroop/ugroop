import { GET_ORG_NAME } from '../config';

describe('GET_ORG_NAME', () => {
  describe('orgId', () => {
    describe('getter', () => {
      it('should return the org id stored in location object', () => {
        const location = { state: { orgId: 1 } };

        expect(GET_ORG_NAME.value.orgId.getter({ location })).toBe(1);
      });
    });
  });

  describe('createdBy', () => {
    describe('getter', () => {
      it('should return the createdBy stored in location object', () => {
        const location = { state: { createdBy: 1 } };

        expect(GET_ORG_NAME.value.createdBy.getter({ location })).toBe(1);
      });
    });
  });
});
