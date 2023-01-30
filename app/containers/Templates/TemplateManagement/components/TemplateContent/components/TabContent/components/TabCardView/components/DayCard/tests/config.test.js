import { CONFIG } from '../config';

describe('DayCard/config.js', () => {
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

    describe('id', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.id({ dayId: 1 })).toMatchSnapshot();
      });
    });

    describe('content', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.content({ dayId: 1 })).toMatchSnapshot();
      });
    });

    describe('location', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.location({ dayId: 1 })).toMatchSnapshot();
      });
    });

    describe('photoId', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.photoId({ dayId: 1 })).toMatchSnapshot();
      });
    });
  });
});
