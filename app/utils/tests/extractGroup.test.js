/**
 * Created by Yang on 23/1/17.
 */
import { extractOrgGroup } from '../stormpath/extractGroup';

describe('Test ExtractOrgGroup', () => {
  it('shall return correct tenant group', () => {
    const account = {
      username: 'yuy0311@dshfksdj.com',
      groups: {
        'tenant.group.companyA-group': true,
        'companyA-group.role.admin': true,
      },
    };
    expect(extractOrgGroup(account)).toBe('tenant.group.companyA-group');
  });
  it('shall return error if no groups are not found', () => {
    const account = {
      username: 'yuy0311@dshfksdj.com',
    };
    const expectedError = new Error('account must have groups');
    expect(() => {
      extractOrgGroup(account);
    }).toThrow(expectedError);
  });
  it('shall return error if no tenent group is not found', () => {
    const account = {
      username: 'yuy0311@dshfksdj.com',
      groups: {
        'companyA-group.role.admin': true,
      },
    };
    const expectedError = new Error('can not find tenant group');
    expect(() => {
      extractOrgGroup(account);
    }).toThrow(expectedError);
  });
});
