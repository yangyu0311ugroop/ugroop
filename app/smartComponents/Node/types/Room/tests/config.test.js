import { CONFIG, CONFIG2, CONFIG3 } from '../config';

describe('Room/config.js', () => {
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
  describe('CONFIG2.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });
    it('value.roomvalues.keyPatch', () => {
      expect(typeof CONFIG2.value.roomTypes.keyPath({ rooms: [1] })).toBe(
        'object',
      );
      expect(typeof CONFIG2.value.roomTypes.cacheKey({ rooms: [1] })).toBe(
        'string',
      );
      expect(typeof CONFIG2.value.roomTypes.keyPath({})).toBe('object');
      expect(typeof CONFIG2.value.roomTypes.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.roomTypes.getter', () => {
      expect(typeof CONFIG2.value.roomTypes.getter(1, [1, 2])).toBe('object');
    });
  });
  describe('CONFIG3.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG3.value).toBe('object');
    });
    it('value.roomvalues.keyPath', () => {
      expect(
        typeof CONFIG3.value.ageTypeValues.keyPath({ occupantIds: [1] }),
      ).toBe('object');
      expect(typeof CONFIG3.value.ageTypeValues.keyPath({})).toBe('object');
      expect(
        typeof CONFIG3.value.ageTypeValues.props({ occupantIds: [1] }),
      ).toBe('object');
    });
    expect(typeof CONFIG3.value.ageTypeValues.cacheKey({ rooms: [1] })).toBe(
      'string',
    );
    expect(typeof CONFIG3.value.ageTypeValues.cacheKey({})).toBe('string');
    it('value.roomTypes.getter', () => {
      expect(typeof CONFIG3.value.ageTypeValues.getter(1, [1, 2])).toBe(
        'object',
      );
    });
  });
});
