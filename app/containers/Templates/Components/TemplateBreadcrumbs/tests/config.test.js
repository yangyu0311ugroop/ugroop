import { CONFIG, ITEM_CONFIG, GET_ORG_ID_CONFIG } from '../config';

describe('BreadcrumbContainer/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('isLoading', () => {
    describe('isFetchParentsLoading', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.isLoading.isFetchParentsLoading).toMatchSnapshot();
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('items', () => {
      describe('keyPath', () => {
        it('should return a particular of array shape', () => {
          expect(CONFIG.value.items({ folderId: 1 })).toMatchSnapshot();
        });
      });
    });
  });
});

describe('BreadcrumbContainer/config.js/ITEM_CONFIG', () => {
  describe('value', () => {
    describe('nodeData', () => {
      describe('keyPath', () => {
        it('should return a particular array shape', () => {
          expect(
            ITEM_CONFIG.value.nodeData.keyPath({ id: 7 }),
          ).toMatchSnapshot();
        });
      });
    });
  });
});

describe('BreadcrumbContainer/config.js/ITEM_CONFIG', () => {
  describe('value', () => {
    describe('orgIdFromUrl', () => {
      it('should exists', () => {
        expect(GET_ORG_ID_CONFIG.value.orgIdFromUrl).toBeDefined();
      });

      describe('getter', () => {
        it('should return org id given the path', () => {
          expect(
            GET_ORG_ID_CONFIG.value.orgIdFromUrl.getter({
              location: { pathname: '/orgs/3' },
            }),
          ).toBe(3);
        });
      });
    });
  });
});
