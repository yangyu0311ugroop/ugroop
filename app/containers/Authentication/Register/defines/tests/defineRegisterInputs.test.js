/**
 * Created by quando on 7/3/17.
 */

import {
  EMAIL,
  ORG_ADDRESS,
  ORG_NAME,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
} from '../registerInputs';

describe('defineRegisterInputs ', () => {
  it('should have EMAIL', () => {
    expect(EMAIL);
  });
  it('should have ORG_ADDRESS', () => {
    expect(ORG_ADDRESS);
  });
  it('should have ORG_NAME', () => {
    expect(ORG_NAME);
  });
  it('should have FIRST_NAME', () => {
    expect(FIRST_NAME);
  });
  it('should have LAST_NAME', () => {
    expect(LAST_NAME);
  });
  it('should have PASSWORD', () => {
    expect(PASSWORD);
  });
});
