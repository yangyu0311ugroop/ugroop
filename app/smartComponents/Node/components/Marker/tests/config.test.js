import { CONFIG } from 'smartComponents/Node/components/Marker/config';

describe('Marker/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('active', () => {
      it('should exists', () => {
        expect(CONFIG.value.active.cacheKey({ id: 2233 })).toBe(
          `${2233}.active`,
        );
        expect(CONFIG.value.active.getter(1, 2, 3)).toBe(3);
        expect(CONFIG.value.active.getter(1, 2)).toBe(false);
        expect(CONFIG.value.active.getter(2, 2)).toBe(true);
      });
    });

    describe('hovered', () => {
      it('should exists', () => {
        expect(CONFIG.value.hovered.cacheKey({ id: 2233 })).toBe(
          `${2233}.hovered`,
        );
        expect(CONFIG.value.hovered.getter(1, 2, 3)).toEqual({
          hovered: 3,
          hoveredElse: true,
        });
        expect(CONFIG.value.hovered.getter(1, 2)).toEqual({
          hovered: false,
          hoveredElse: true,
        });
        expect(CONFIG.value.hovered.getter(2, 2)).toEqual({
          hovered: true,
          hoveredElse: false,
        });
      });
    });
  });
});
