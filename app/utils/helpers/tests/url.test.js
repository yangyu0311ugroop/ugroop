import { URL_HELPERS } from 'appConstants';
import qs from 'qs';
import { parseQueryParam, stringifyParam, URL_CHECKER } from '../url';

describe('URL Helper', () => {
  beforeEach(() => {
    qs.parse = jest.fn();
    qs.stringify = jest.fn();
  });
  describe('parseQueryParam', () => {
    it('should pass to parse the default option provided if no option was given', () => {
      parseQueryParam('a=1');
      expect(qs.parse).toBeCalledWith('a=1', { ignoreQueryPrefix: true });
    });
    it('should use the passed opt if opt was given', () => {
      parseQueryParam('a=1', { something: 1 });
      expect(qs.parse).toBeCalledWith('a=1', { something: 1 });
    });
  });

  describe('stringifyParam', () => {
    it('should pass a blank object in opts if opts is not given to stringify', () => {
      stringifyParam({ a: 1 });
      expect(qs.stringify).toBeCalledWith({ a: 1 }, {});
    });
    it('should pass the object in opts if opts is given to stringify', () => {
      stringifyParam({ a: 1 }, { something: 1 });
      expect(qs.stringify).toBeCalledWith({ a: 1 }, { something: 1 });
    });
  });

  describe('URL_CHECKER', () => {
    describe('isOnMyToursPage', () => {
      it('should return true if location is in my tours', () => {
        const result = URL_CHECKER.isOnMyToursPage(URL_HELPERS.tours());
        const result2 = URL_CHECKER.isOnMyToursPage(URL_HELPERS.tours(1), 1);
        const result3 = URL_CHECKER.isOnMyToursPage(URL_HELPERS.orgTours(1), 1);

        expect(result).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(false);
      });
    });
    describe('isOnOrgToursPage', () => {
      it('should return true if location is in org tours', () => {
        const result = URL_CHECKER.isOnOrgToursPage(URL_HELPERS.orgTours(1), 1);

        expect(result).toBe(true);
      });
    });
  });
});
