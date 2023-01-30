import {
  pluralizeText,
  isEmptyString,
  toLowerCaseIfString,
  truncateAndToLowerCase,
  removeWhitespace,
  countDecimals,
  capitalizeWords,
  renderName,
  capitalizeFirstLetter,
} from '../stringAdditions';

describe('utils/stringAdditions', () => {
  describe('Test isEmptyString', () => {
    it('shall return true if value is undefined', () => {
      const value = undefined;
      expect(isEmptyString(value)).toBe(true);
    });
    it('should return true if value is blank', () => {
      const value = '';
      expect(isEmptyString(value)).toBe(true);
    });
    it('should return false if str is not undefined or blank', () => {
      const value = 'The Word';
      expect(isEmptyString(value)).toBe(false);
    });
  });

  describe('Test toLowerCaseIfString', () => {
    let data;
    let result;

    it('should return the data if it is null', () => {
      data = null;
      result = toLowerCaseIfString(data);

      expect(result).toBe(null);
    });

    it('should return the data if it is false', () => {
      data = false;
      result = toLowerCaseIfString(data);

      expect(result).toBe(false);
    });

    it('should return the data if it is zero', () => {
      data = 0;
      result = toLowerCaseIfString(data);

      expect(result).toBe(0);
    });

    it('should return the lowercased string if it is a string', () => {
      data = 'HELLO';
      result = toLowerCaseIfString(data);

      expect(result).toBe('hello');
    });

    it('should return the data if it is an object', () => {
      data = { id: 1 };
      result = toLowerCaseIfString(data);

      expect(result).toEqual({ id: 1 });
    });

    it('should return the data if it is an array', () => {
      data = [1, 2];
      result = toLowerCaseIfString(data);

      expect(result).toEqual([1, 2]);
    });

    it('should return the data if it is a date', () => {
      data = new Date(2000, 10, 11);
      result = toLowerCaseIfString(data);

      expect(result.getTime()).toBe(data.getTime());
    });

    it('should return the data if it is true', () => {
      data = true;
      result = toLowerCaseIfString(data);

      expect(result).toBe(true);
    });

    it('should return undefined if the data is undefined', () => {
      data = undefined;
      result = toLowerCaseIfString(data);

      expect(result).toBe(undefined);
    });
  });

  describe('Test truncateAndToLowerCase', () => {
    it('shall be call lower case and trim the string by giving regExp', () => {
      const inputString = 'Ugroop-175 Mills Steert, Alert Park, Melbourne';
      const expected = 'ugroop175millssteertalertparkmelbourne';
      const reg = new RegExp(/[\W_]+/g);
      const newstring = truncateAndToLowerCase(inputString, reg, 64);
      expect(newstring).toBe(expected);
    });
  });

  describe('removeWhitespace', () => {
    it('should strip all whitespace', () => {
      expect(removeWhitespace('  string with whitespace  ')).toBe(
        'stringwithwhitespace',
      );
    });

    it('should ignore missing string', () => {
      expect(removeWhitespace('')).toBe('');
      expect(removeWhitespace(null)).toBeNull();
      expect(removeWhitespace()).toBeUndefined();
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should return capitalized', () => {
      expect(capitalizeFirstLetter('one')).toEqual('One');
    });
  });

  describe('pluralizeText', () => {
    it('should add s if text is word and count is greater than 2', () => {
      const expected = 'words';
      const actual = pluralizeText('word', 2);

      expect(actual).toBe(expected);
    });

    it('should return blank if count is less than 1', () => {
      const expected = '';
      const actual = pluralizeText('word', 0);

      expect(actual).toBe(expected);
    });
  });

  describe('countDecimals', () => {
    it('counts correctly for number strings', () => {
      expect(countDecimals('1')).toEqual(0);
      expect(countDecimals('1.1')).toEqual(1);
      expect(countDecimals('1.123')).toEqual(3);
      expect(countDecimals('.123')).toEqual(3);
    });
    it('counts correctly for non-number strings', () => {
      expect(countDecimals('someWord')).toEqual(0);
      expect(countDecimals('someWord.thing')).toEqual(5);
    });
    it('counts correctly for no string', () => {
      expect(countDecimals('')).toEqual(0);
      expect(countDecimals()).toEqual(0);
      expect(countDecimals(null)).toEqual(0);
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize all words', () => {
      expect(capitalizeWords('  string to capitalize  ')).toBe(
        'String To Capitalize',
      );
    });

    it('returns null if missing string', () => {
      expect(capitalizeWords('')).toBeNull();
      expect(capitalizeWords(null)).toBeNull();
      expect(capitalizeWords()).toBeNull();
    });
  });

  describe('renderName', () => {
    const firstName = 'First';
    const middleName = 'Middle';
    const lastName = 'Last';

    it('renders firstName and middleName and lastName', () => {
      expect(renderName({ firstName, middleName, lastName })).toBe(
        `${firstName} ${middleName} ${lastName}`,
      );
    });

    it('renders firstName and lastName', () => {
      expect(renderName({ firstName, lastName })).toBe(
        `${firstName} ${lastName}`,
      );
    });

    it('renders firstName only', () => {
      expect(renderName({ firstName })).toBe(firstName);
    });

    it('renders lastName only', () => {
      expect(renderName({ lastName })).toBe(lastName);
    });

    it('renders missing name', () => {
      expect(renderName({})).toBe('?');
    });
  });
});
