import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, GET_USER_NODE, GET_USER_NODE_CONTENT } from '../config';

describe('ReactionItem/config.js', () => {
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
  });
});

describe('GET_USER_NODE', () => {
  describe('value', () => {
    it('should exist', () => {
      expect(typeof GET_USER_NODE.value).toBe('object');
    });
  });
});

describe('GET_USER_NODE_CONTENT', () => {
  describe('value', () => {
    it('should exist', () => {
      expect(typeof GET_USER_NODE_CONTENT).toBe('object');
    });

    describe('keyPath', () => {
      it('should return keyPath', () => {
        const userNode = [1];
        const expected = NODE_STORE_SELECTORS.content({ id: 1 });

        expect(
          GET_USER_NODE_CONTENT.value.userId.keyPath({ userNode }),
        ).toEqual(expected);
      });

      it('should not throw error if userNode is not an array', () => {
        const expected = NODE_STORE_SELECTORS.content({ id: undefined });

        expect(GET_USER_NODE_CONTENT.value.userId.keyPath({})).toEqual(
          expected,
        );
      });
    });

    describe('cacheKey', () => {
      it('should return valid cacheKey', () => {
        const userNode = [1];
        const expected = `reactionItem.${userNode.toString()}.userNode`;

        expect(GET_USER_NODE_CONTENT.value.userId.cacheKey({ userNode })).toBe(
          expected,
        );
      });

      it('should not throw error if userNode is not array', () => {
        const userNode = [];
        const expected = `reactionItem.${userNode.toString()}.userNode`;

        expect(GET_USER_NODE_CONTENT.value.userId.cacheKey({})).toBe(expected);
      });
    });

    describe('props', () => {
      it('should return null', () => {
        expect(GET_USER_NODE_CONTENT.value.userId.props()).toEqual(null);
      });
    });

    describe('getter', () => {
      it('should make content as number', () => {
        const content = '1';
        const expected = Number(content);

        expect(GET_USER_NODE_CONTENT.value.userId.getter(content)).toBe(
          expected,
        );
      });
    });
  });
});
