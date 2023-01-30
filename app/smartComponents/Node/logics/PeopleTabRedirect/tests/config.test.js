import { CONFIG_0, CONFIG_1, CONFIG_2 } from '../config';

describe('PeopleTabRedirect/CONFIG_0', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0.value).toBe('object');
    });
  });
});

describe('PeopleTabRedirect/CONFIG_1', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1.value).toBe('object');
    });
  });
});

describe('PeopleTabRedirect/CONFIG_2', () => {
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

    describe('peopleTabIndex', () => {
      describe('keyPath', () => {
        it('should match snapshot for keypath', () => {
          const { value } = CONFIG_2;
          const result = value.peopleTabIndex.keyPath({ templateId: 1 });

          expect(result).toMatchSnapshot();
        });
      });

      describe('cacheKey', () => {
        it('should match snapshot for cacheKey', () => {
          const { value } = CONFIG_2;
          const result = value.peopleTabIndex.cacheKey({ templateId: 1 });

          expect(result).toMatchSnapshot();
        });
      });

      describe('props', () => {
        it('should only return peopleTabId', () => {
          const { value } = CONFIG_2;
          const result = value.peopleTabIndex.props({ peopleTabId: 1 });

          expect(result).toBe(1);
        });
      });

      describe('getter', () => {
        it('should return index of peoepleTabId in calculatedVisibleChildren', () => {
          const { value } = CONFIG_2;
          const result = value.peopleTabIndex.getter([3, 1, 2], 1);

          expect(result).toBe(1);
        });
      });
    });
  });
});
