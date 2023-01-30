import { CONFIG, CONFIG2 } from '../config';

describe('PaxRoom/config.js', () => {
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
  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG2.value.participantRooms.keyPath({ templateId: 1 })).toEqual(
        ['nodeStore', 'nodes', 1, 'rooms'],
      );
      expect(
        CONFIG2.value.participantRooms.getter([1, 2], {
          currentParticipantRooms: [1],
        }),
      ).toEqual([1]);
      expect(CONFIG2.value.participantRooms.getter(undefined, {})).toEqual([]);
    });
  });
});
