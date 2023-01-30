import { CONFIG, CONFIG_0, SET_VALUE } from '../config';

describe('CONFIG_0', () => {
  afterEach(() => jest.clearAllMocks());

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0.value).toBe('object');
    });
  });
});

describe('Invitation/config.js', () => {
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

    describe('orgId', () => {
      describe('keyPath', () => {
        const props = { id: 1, userId: 1 };
        const keyPaths = CONFIG.value.orgId.keyPath.map(key => key(props));

        expect(keyPaths).toMatchSnapshot();
      });

      describe('getter', () => {
        it('return orgid if is a member', () => {
          expect(CONFIG.value.orgId.getter(1, [1])).toEqual(1);
        });
        it('Return first org on the array', () => {
          expect(CONFIG.value.orgId.getter(2, [1])).toEqual(1);
        });
        it('Return null if not a member', () => {
          expect(CONFIG.value.orgId.getter(2)).toEqual(null);
        });
      });
    });
  });
});

describe('Invitation/SET_VALUE', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof SET_VALUE).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof SET_VALUE.setValue).toBe('object');
    });
  });
});
