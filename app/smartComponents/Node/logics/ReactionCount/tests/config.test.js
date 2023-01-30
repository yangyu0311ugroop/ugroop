import { CONFIG, CHECK_USER_REACTION, GET_LINKS_USERNODE } from '../config';

describe('ReactionCount/config.js', () => {
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

describe('GET_LINKS_USERNODE', () => {
  describe('value', () => {
    describe('links', () => {
      describe('keyPath', () => {
        it('should return array of selectors', () => {
          const result = GET_LINKS_USERNODE.value.links.keyPath({
            reactions: [{ id: 1 }, { id: 2 }],
          });

          expect(result).toMatchSnapshot();
        });
        it('should return empty array', () => {
          const result = GET_LINKS_USERNODE.value.links.keyPath({});

          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular string if reactions and userId have value', () => {
          const userId = 1;
          const reactions = [1, 2, 3];
          const expected = `node.reactionCount.${userId}.links.${reactions.toString()}`;

          const value = GET_LINKS_USERNODE.value.links.cacheKey({
            userId,
            reactions,
          });
          expect(value).toBe(expected);
        });

        it('should return a particular string if reactions and userId have value', () => {
          const userId = 1;
          const reactions = [];
          const expected = `node.reactionCount.${userId}.links.${reactions.toString()}`;

          const value = GET_LINKS_USERNODE.value.links.cacheKey({
            userId,
          });
          expect(value).toBe(expected);
        });
      });

      describe('getter', () => {
        it('should return all the arguments passed to it back', () => {
          const value = GET_LINKS_USERNODE.value.links.getter([1], [2], [3]);

          expect(value).toEqual([1, 2, 3]);
        });
      });
    });
  });
});

describe('CHECK_USER_REACTION', () => {
  describe('value', () => {
    describe('userReactionId', () => {
      describe('cacheKey', () => {
        it('should a string as cache key', () => {
          const reactions = [1];
          const userNodeId = 2;
          const expected = 'node.reactionCount.2.reactionUserId.1';

          const result = CHECK_USER_REACTION.value.userReactionId.cacheKey({
            reactions,
            userNodeId,
          });

          expect(result).toBe(expected);
        });

        it('should not throw error if reaction is not present', () => {
          const userNodeId = 2;
          const expected = 'node.reactionCount.2.reactionUserId.';

          const result = CHECK_USER_REACTION.value.userReactionId.cacheKey({
            userNodeId,
          });

          expect(result).toBe(expected);
        });
      });

      describe('props', () => {
        it('should returns array of props to be returned in getter', () => {
          const expected = [1, [1, 2], [1, 2]];
          const props = { userNodeId: 1, reactions: [1, 2], links: [1, 2] };

          const result = CHECK_USER_REACTION.value.userReactionId.props.map(
            prop => prop(props),
          );

          expect(result).toEqual(expected);
        });
      });

      describe('getter', () => {
        it('should return reaction id if user id is in the createdByIds', () => {
          const args = { links: [2, 3], reactions: [8, 9], userNodeId: 2 };
          const expected = 8;

          const result = CHECK_USER_REACTION.value.userReactionId.getter(args);

          expect(result).toBe(expected);
        });

        it('should return return 0 if user id is not in the createdByIds', () => {
          const args = { links: [2, 3], reactions: [8, 9], userNodeId: 1 };
          const expected = 0;

          const result = CHECK_USER_REACTION.value.userReactionId.getter(args);

          expect(result).toBe(expected);
        });
      });
    });
  });
});
