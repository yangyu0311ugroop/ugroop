/**
 * Created by quando on 7/3/17.
 */

import {
  INVALID_BUTTON,
  PASSWORD_BUTTON,
  PASSWORD_BUTTON_SHOW,
  REQUIRED_BUTTON,
  SENDING_BUTTON,
  SUCCESS_BUTTON,
  TIMED_OUT_BUTTON,
  VALID_BUTTON,
} from '../submitButton';

describe('defineRegisterInputs ', () => {
  it('should have INVALID_BUTTON', () => {
    expect(INVALID_BUTTON);
  });
  it('should have PASSWORD_BUTTON', () => {
    expect(PASSWORD_BUTTON);
  });
  it('should have PASSWORD_BUTTON_SHOW', () => {
    expect(PASSWORD_BUTTON_SHOW);
  });
  it('should have REQUIRED_BUTTON', () => {
    expect(REQUIRED_BUTTON);
  });
  it('should have SENDING_BUTTON', () => {
    expect(SENDING_BUTTON);
  });
  it('should have SUCCESS_BUTTON', () => {
    expect(SUCCESS_BUTTON);
  });
  it('should have TIMED_OUT_BUTTON', () => {
    expect(TIMED_OUT_BUTTON);
  });
  it('should have VALID_BUTTON', () => {
    expect(VALID_BUTTON);
  });
});
