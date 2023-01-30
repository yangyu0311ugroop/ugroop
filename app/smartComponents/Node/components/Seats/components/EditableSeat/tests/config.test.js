import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { CONFIG, GET_TEMPLATE_PARENT } from '../config';

describe('EditableSeat/config.js', () => {
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

describe('GET_TEMPLATE_PARENT', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_TEMPLATE_PARENT).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof GET_TEMPLATE_PARENT.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_TEMPLATE_PARENT.value).toBe('object');
    });

    describe('templateId', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey shape', () => {
          expect(
            GET_TEMPLATE_PARENT.value.templateId.cacheKey({ parentNodeId: 1 }),
          ).toBe(
            NODE_STORE_CACHE_KEYS.templateIdByTrail({ idProp: 'parentNodeId' })(
              { parentNodeId: 1 },
            ),
          );
        });
      });

      describe('props', () => {
        it('should return null', () => {
          expect(GET_TEMPLATE_PARENT.value.templateId.props()).toEqual(null);
        });
      });

      describe('getter', () => {
        it('should return 0 if trail is not array', () => {
          expect(GET_TEMPLATE_PARENT.value.templateId.getter()).toBe(0);
        });

        it('should return last item of array if trail is an array', () => {
          expect(GET_TEMPLATE_PARENT.value.templateId.getter([1, 2, 3])).toBe(
            3,
          );
        });
      });
    });
  });
});
