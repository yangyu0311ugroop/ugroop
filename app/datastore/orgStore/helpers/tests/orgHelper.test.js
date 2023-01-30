import { ORGANISATION_HELPER } from '../orgHelper';

describe('getAssignableRole', () => {
  it('should call getAssignableRole should return empty object', () => {
    expect(ORGANISATION_HELPER.getAssignableRole()).toEqual({});
  });
});
