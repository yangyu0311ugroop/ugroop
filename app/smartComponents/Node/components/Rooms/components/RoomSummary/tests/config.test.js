import { CONFIG, CONFIG1 } from '../config';

describe('RiskCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
  describe('CONFIG1.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG1.value).toBe('object');
    });
    it('value.roomvalues.keyPatch', () => {
      expect(typeof CONFIG1.value.roomValues.keyPath({ rooms: [1] })).toBe(
        'object',
      );
      expect(typeof CONFIG1.value.roomValues.keyPath({})).toBe('object');
      expect(typeof CONFIG1.value.roomValues.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.roomvalues.props', () => {
      expect(typeof CONFIG1.value.roomValues.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.roomvalues.getter', () => {
      expect(typeof CONFIG1.value.roomValues.getter(1, [1, 2])).toBe('object');
    });
    it('value.roomvalues.cacheKey', () => {
      expect(typeof CONFIG1.value.roomValues.cacheKey({ rooms: [1] })).toBe(
        'string',
      );
    });
    it('value.roomvalues.cacheKey null', () => {
      expect(typeof CONFIG1.value.roomValues.cacheKey({})).toBe('string');
    });
    it('value.roomTypes.keyPath', () => {
      expect(typeof CONFIG1.value.roomTypes.keyPath({ rooms: [1] })).toBe(
        'object',
      );
      expect(typeof CONFIG1.value.roomTypes.keyPath({})).toBe('object');
      expect(typeof CONFIG1.value.roomTypes.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.roomTypes.props', () => {
      expect(typeof CONFIG1.value.roomTypes.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.roomTypes.getter', () => {
      expect(typeof CONFIG1.value.roomTypes.getter(1, [1, 2])).toBe('object');
    });
  });
});
