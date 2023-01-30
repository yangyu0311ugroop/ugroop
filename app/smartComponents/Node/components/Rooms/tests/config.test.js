import { CONFIG, CONFIG_2 } from '../config';

describe('Rooms/config.js', () => {
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
});

describe('Rooms/config2.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });
    it('value.filteredRooms.keyPatch', () => {
      expect(typeof CONFIG_2.value.filteredRooms.keyPath({ rooms: [1] })).toBe(
        'object',
      );
      expect(typeof CONFIG_2.value.filteredRooms.keyPath({})).toBe('object');
      expect(typeof CONFIG_2.value.filteredRooms.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.filteredRooms.props', () => {
      expect(typeof CONFIG_2.value.filteredRooms.props({ rooms: [1] })).toBe(
        'object',
      );
    });
    it('value.filteredRooms.getter', () => {
      expect(
        typeof CONFIG_2.value.filteredRooms.getter([1, 2], {
          rooms: [1, 2],
          selectedRoomType: ['1', '2', 'All Rooms'],
        }),
      ).toBe('object');
    });
    it('value.filteredRooms.getter null values', () => {
      expect(typeof CONFIG_2.value.filteredRooms.getter([1, 2], {})).toBe(
        'object',
      );
    });
    it('value.filteredRooms.cacheKey', () => {
      expect(typeof CONFIG_2.value.filteredRooms.cacheKey({ rooms: [1] })).toBe(
        'string',
      );
    });
    it('value.filteredRooms.cacheKey null', () => {
      expect(typeof CONFIG_2.value.filteredRooms.cacheKey({})).toBe('string');
    });
  });
});
