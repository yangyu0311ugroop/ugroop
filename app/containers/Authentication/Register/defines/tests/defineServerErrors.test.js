/**
 * Created by quando on 7/3/17.
 */

import { EMAIL_EXISTS, ORG_NAME_EXISTS } from '../serverErrors';

describe('defineRegisterInputs ', () => {
  it('should have EMAIL_EXISTS', () => {
    expect(EMAIL_EXISTS);
  });
  it('should have ORG_NAME_EXISTS', () => {
    expect(ORG_NAME_EXISTS);
  });
});
