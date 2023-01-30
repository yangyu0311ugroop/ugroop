/**
 * Created by stephenkarpinskyj on 14/6/18.
 */

import timezone from 'google-timezone-api';
import helpers from '../timeZone';

jest.mock('google-timezone-api');

describe('#fetchTimeZone()', () => {
  it('still matches snapshot', () => {
    helpers.fetchTimeZone();
    expect(timezone).toBeCalled();
  });
});
