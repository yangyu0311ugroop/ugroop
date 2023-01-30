import { parseMetaInfo } from '../avatarUtils';

describe('avatarUtils ', () => {
  describe('parseMetaInfo ', () => {
    let arg;

    it('should return an empty object if no argument', () => {
      expect(parseMetaInfo()).toEqual({});
    });

    it('should return an empty object if argument parses into an invalid value (1)', () => {
      arg = JSON.stringify([1, 2]);
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return an empty object if argument parses into an invalid value (2)', () => {
      arg = JSON.stringify('hello world');
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return an empty object if argument parses into an invalid value (3)', () => {
      arg = JSON.stringify(102);
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return an empty object if argument parses into an invalid value (4)', () => {
      arg = JSON.stringify(true);
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return an empty object if argument parses into an invalid value (5)', () => {
      arg = JSON.stringify(new Date());
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return an empty object if argument parsing generates an exception', () => {
      arg = '}illegal{';
      expect(parseMetaInfo(arg)).toEqual({});
    });

    it('should return a valid object if argument is valid', () => {
      arg = JSON.stringify({
        x: 0.1,
        y: 0.2,
        height: 0.6,
        width: 0.7,
      });
      expect(parseMetaInfo(arg)).toEqual({
        x: 0.1,
        y: 0.2,
        height: 0.6,
        width: 0.7,
      });
    });
  });
});
