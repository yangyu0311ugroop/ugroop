import utils from '../utils';
import bg from '../colors';

describe('AuthorAvatar/tests/utils.test.js ', () => {
  describe('getAbbr() ', () => {
    let ret;

    it('must return an empty string if argument is null', () => {
      ret = utils.getAbbr(null);
      expect(ret).toBe('');
    });

    it('must return an empty string if argument is undefined', () => {
      ret = utils.getAbbr();
      expect(ret).toBe('');
    });

    it('must return an empty string if argument is an empty string', () => {
      ret = utils.getAbbr();
      expect(ret).toBe('');
    });

    it('must return an empty string if argument consists only of spaces', () => {
      ret = utils.getAbbr('         ');
      expect(ret).toBe('');
    });

    it('must return the first char in uppercase if the argument has no embedded spaces and has no leading spaces', () => {
      ret = utils.getAbbr('jane');
      expect(ret).toBe('J');
    });

    it('must return the first non-space char in uppercase if the argument has no embedded spaces but has leading spaces', () => {
      ret = utils.getAbbr('    jane');
      expect(ret).toBe('J');
    });

    it('must return the first char of each word, both in uppercase, if the argument has a single embedded space and has no leading spaces', () => {
      ret = utils.getAbbr('jane watson');
      expect(ret).toBe('JW');
    });

    it('must return the first non-space char of each word, both in uppercase, if the argument has a single embedded long space and has no leading spaces', () => {
      ret = utils.getAbbr('jane       watson');
      expect(ret).toBe('JW');
    });

    it('must return the first non-space char of each word, both in uppercase, if the argument has a single embedded long space and has leading spaces', () => {
      ret = utils.getAbbr('         jane       watson');
      expect(ret).toBe('JW');
    });

    it('must return the first char of the first and last words, both in uppercase, if the argument has a multiple embedded single spaces and has no leading spaces', () => {
      ret = utils.getAbbr('jane watson carlson');
      expect(ret).toBe('JC');
    });

    it('must return the first char of the first and last words, both in uppercase, if the argument has a multiple embedded long spaces and has no leading spaces', () => {
      ret = utils.getAbbr('jane      watson       carlson');
      expect(ret).toBe('JC');
    });

    it('must return the first char of the first and last words, both in uppercase, if the argument has a multiple embedded long spaces and has leading spaces', () => {
      ret = utils.getAbbr('        jane      watson       carlson');
      expect(ret).toBe('JC');
    });

    it('must return the first char of the first and last words, both in uppercase, if the argument has a multiple embedded long spaces and has leading spaces', () => {
      ret = utils.getAbbr('        jane      mary   carlson   watson   ');
      expect(ret).toBe('JW');
    });
  });

  describe('generateColorFromString() ', () => {
    let ret;

    it('must return cyan if the argument is undefined', () => {
      ret = utils.generateColorFromString();
      expect(ret).toBe(bg.cyan);
    });

    it('must return cyan if the argument is null', () => {
      ret = utils.generateColorFromString(null);
      expect(ret).toBe(bg.cyan);
    });

    it('must return cyan if the argument is an empty string', () => {
      ret = utils.generateColorFromString('');
      expect(ret).toBe(bg.cyan);
    });

    it('must return the proper color corresponding to the sum of the UTF-16 codes of the string chars, modulo the number of colors available', () => {
      const str = 'hello, world!';
      const numColorsAvailable = bg.availableColors.length;

      const sum = str.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      const colorIndex = sum % numColorsAvailable;

      ret = utils.generateColorFromString(str);
      expect(ret).toBe(bg.availableColors[colorIndex]);
    });
  });
});
