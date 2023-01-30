import { CONFIG } from '../config';

describe('CardContent/config.js', () => {
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

    describe('open', () => {
      describe('keyPath', () => {
        it('should match snapshot', () => {
          expect(CONFIG.value.open.keyPath({ userId: 1 })).toMatchSnapshot();
        });
      });

      describe('getter', () => {
        it('should return true if value receive is bool value', () => {
          expect(CONFIG.value.open.getter()).toBe(true);
        });
      });
    });
  });
});
