import { findUnSetupOrg } from '../index';

describe('datastore/stormPathStore/helpers', () => {
  describe('findUnSetupOrg', () => {
    it('returns nothing if firstTimeSetup', () => {
      const obj = { 1: { firstTimeSetup: true } };
      expect(findUnSetupOrg([obj])).toBeUndefined();
    });

    it('returns obj if not firstTimeSetup', () => {
      const obj = { 1: { somethingElse: 1 } };
      expect(findUnSetupOrg([obj])).toBe(obj);
    });
  });
});
