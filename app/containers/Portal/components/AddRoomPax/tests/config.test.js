import { CONFIG, CONFIG2 } from '../config';

describe('AddRisk/config.js', () => {
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
  });

  describe('config2.value.keyPath', () => {
    it('should exists', () => {
      expect(
        typeof CONFIG2.value.allRoomPaxIds.keyPath({ rooms: [1, 2] }),
      ).toEqual('object');
    });
    it('should not break', () => {
      expect(typeof CONFIG2.value.allRoomPaxIds.keyPath({})).toEqual('object');
    });
  });
  describe('config2.value.props', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value.allRoomPaxIds.props({ rooms: [1] })).toEqual(
        'object',
      );
    });
  });
  describe('config2.value.getter', () => {
    it('should exists', () => {
      expect(
        typeof CONFIG2.value.allRoomPaxIds.getter({
          ids: [1, 2],
          related: [1, 3],
        }),
      ).toEqual('object');
    });
    it('should exists', () => {
      expect(typeof CONFIG2.value.allRoomPaxIds.getter({})).toEqual('object');
    });
  });
});
