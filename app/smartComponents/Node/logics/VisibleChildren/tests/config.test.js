import {
  ONLY_ME,
  PUBLIC,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { CONFIG, CREATED_BY_ME_CONFIG } from '../config';

describe('VisibleChildren/config.js', () => {
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

    describe('CREATED_BY_ME_CONFIG', () => {
      it('should exists', () => {
        expect(typeof CREATED_BY_ME_CONFIG.value.createdByMe).toBe('object');
      });

      it('cacheKey should work', () => {
        expect(
          CREATED_BY_ME_CONFIG.value.createdByMe.cacheKey({ ids: [1, 2] }),
        ).toMatchSnapshot();
      });

      it('keyPath should work', () => {
        expect(CREATED_BY_ME_CONFIG.value.createdByMe.keyPath({})).toEqual([]);
        expect(
          CREATED_BY_ME_CONFIG.value.createdByMe.keyPath({ ids: [1, 2] }),
        ).toMatchSnapshot();
      });

      it('props 0 should work', () => {
        expect(CREATED_BY_ME_CONFIG.value.createdByMe.props[0]({})).toEqual([]);
        expect(
          CREATED_BY_ME_CONFIG.value.createdByMe.props[0]({ ids: [1, 2] }),
        ).toEqual([1, 2]);
      });

      it('props 1 should work', () => {
        expect(
          CREATED_BY_ME_CONFIG.value.createdByMe.props[1]({ me: 11 }),
        ).toEqual(11);
      });

      it('getter should work', () => {
        expect(
          CREATED_BY_ME_CONFIG.value.createdByMe.getter(
            1,
            1,
            2,
            1,
            [11, 12, 13, 14],
            1,
          ),
        ).toEqual([11, 12, 14]);
      });
    });

    describe('visibleChildren', () => {
      it('should exists', () => {
        expect(CONFIG.value.visibleChildren.cacheKey({})).toMatchSnapshot();
        expect(
          CONFIG.value.visibleChildren.cacheKey({ ids: [1, 2] }),
        ).toMatchSnapshot();
        expect(CONFIG.value.visibleChildren.keyPath({})).toMatchSnapshot();
        expect(
          CONFIG.value.visibleChildren.keyPath({ ids: [1, 2] }),
        ).toMatchSnapshot();
        expect(CONFIG.value.visibleChildren.props[0]({ ids: [1, 2] })).toEqual([
          1,
          2,
        ]);
        expect(CONFIG.value.visibleChildren.props[0]({})).toEqual([]);
        expect(
          CONFIG.value.visibleChildren.props[1]({ createdByMe: [1, 2] }),
        ).toEqual([1, 2]);
        expect(CONFIG.value.visibleChildren.props[1]({})).toEqual([]);
        expect(
          CONFIG.value.visibleChildren.getter(
            ONLY_ME,
            ONLY_ME,
            PUBLIC,
            ORGANISERS,
            [1, 2, 3, 4],
            [1],
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
