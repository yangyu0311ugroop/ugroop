import { CONFIG } from '../config';

describe('OldFollower/config.js', () => {
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

    describe('oldFollowerId', () => {
      it('should return keyPath', () => {
        expect(
          CONFIG.setValue.oldFollowerId({ participantId: 1 }),
        ).toMatchSnapshot();
      });
    });

    describe('participants', () => {
      it('should return keyPath', () => {
        expect(CONFIG.setValue.participants({ id: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});
