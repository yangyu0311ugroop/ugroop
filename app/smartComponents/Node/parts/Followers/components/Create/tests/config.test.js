import { CONFIG, CONFIG_2, CONFIG_3 } from '../config';

describe('Create/config.js', () => {
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

describe('Create/CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });
  });
});

describe('Create/CONFIG_3', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3.value).toBe('object');
    });

    describe('selectableFollowers', () => {
      describe('getter', () => {
        it('should filter interestedPeople array against nextNodeIds', () => {
          const interestedPeople = [1, 2, 3];
          const nextNodeIds = [1];
          const oldFollowerId = 3;

          const result = CONFIG_3.value.selectableFollowers.getter({
            nextNodeIds,
            interestedPeople,
            oldFollowerId,
          });

          expect(result).toEqual([2]);
        });

        it('should not explode even if interestedPeople and nextNodeIds are not defined', () => {
          const oldFollowerId = 3;

          const result = CONFIG_3.value.selectableFollowers.getter({
            oldFollowerId,
          });

          expect(result).toEqual([]);
        });
      });
    });
  });
});
