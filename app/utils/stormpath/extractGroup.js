/**
 * Created by Yang on 23/1/17.
 */
function extractOrgGroup(account) {
  if (!account.groups) {
    throw new Error('account must have groups');
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in account.groups) {
    if (key.startsWith('tenant')) {
      return key;
    }
  }
  throw new Error('can not find tenant group');
}

export { extractOrgGroup };
