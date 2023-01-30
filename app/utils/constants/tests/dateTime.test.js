/**
 * Created by stephenkarpinskyj on 14/6/18.
 */

import { FORMATS_DATE_TIME } from '../dateTime';

describe('utils/constants/dateTime', () => {
  describe('#FORMATS_DATE_TIME', () => {
    it('still matches snapshot', () => {
      expect(FORMATS_DATE_TIME).toMatchSnapshot();
    });
  });
});
