import { CONFIG } from '../config';

describe('config.js', () => {
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
    it('value.link events', () => {
      expect(typeof CONFIG.value.link({ id: 1, type: 'events' })).toEqual(
        'object',
      );
    });
    it('value.link events', () => {
      expect(typeof CONFIG.value.link({ id: 1, type: 'sections' })).toEqual(
        'object',
      );
    });
    it('value.name events', () => {
      expect(typeof CONFIG.value.name({ id: 1, type: 'events' })).toEqual(
        'object',
      );
    });
    it('value.name events', () => {
      expect(typeof CONFIG.value.name({ id: 1, type: 'sections' })).toEqual(
        'object',
      );
    });
    it('value.name description', () => {
      expect(
        typeof CONFIG.value.description({ id: 1, type: 'events' }),
      ).toEqual('object');
    });
    it('value.description events', () => {
      expect(
        typeof CONFIG.value.description({ id: 1, type: 'sections' }),
      ).toEqual('object');
    });
  });
});
