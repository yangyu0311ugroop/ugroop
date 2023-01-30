/**
 * Created by quando on 21/3/17.
 */

import {
  INVALID_BUTTON,
  SENDING_BUTTON,
  VALID_BUTTON,
  REQUIRED_BUTTON,
} from '../submitButtons';

describe('defines/submitButtons ', () => {
  it('should have INVALID_BUTTON', () => {
    expect(INVALID_BUTTON);
  });
  it('should have SENDING_BUTTON', () => {
    expect(SENDING_BUTTON);
  });
  it('should have VALID_BUTTON', () => {
    expect(VALID_BUTTON);
  });
  it('should have REQUIRED_BUTTON', () => {
    expect(REQUIRED_BUTTON);
  });
});
