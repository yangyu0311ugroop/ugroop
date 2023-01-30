/**
 * Created by stephenkarpinskyj on 3/5/18.
 */

import utils from '../utils';

describe('ugcomponents/File/hoc/withUploadFile/utils', () => {
  describe('#fileToData()', () => {
    it('still matches snapshot', () => {
      const file = 'some file';
      expect(utils.fileToData(file)).toMatchSnapshot();
    });
  });

  describe('#parseError()', () => {
    it('parses htmlerror correctly', () => {
      const title = 'some title';
      expect(
        utils.parseError({ code: 'htmlerror', response: { title } }),
      ).toEqual(title);
    });
    it('parses texterror correctly', () => {
      const text = 'some text';
      expect(
        utils.parseError({ code: 'texterror', response: { text } }),
      ).toEqual(text);
    });
    it('parses jsonerror correctly', () => {
      const response = { something: 'some thing' };
      expect(utils.parseError({ code: 'jsonerror', response })).toEqual(
        JSON.stringify(response, null, 2),
      );
    });
    it('parses default correctly', () => {
      const statusText = 'some status text';
      expect(
        utils.parseError({ code: 'someerror', response: { statusText } }),
      ).toEqual(statusText);
    });
    it('parses default correctly 2', () => {
      const statusText = 'some status text';
      expect(utils.parseError({ response: statusText })).toEqual(statusText);
    });
  });
});
