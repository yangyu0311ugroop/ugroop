import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_0, CONFIG_2, CONFIG_3, SET_VALUE } from '../config';

describe('FollowerList/CONFIG_0', () => {
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

describe('FollowerList/CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });
  });
});

describe('FollowerList/CONFIG_3', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_3.value).toBe('object');
    });

    describe('participantFollowerNodeIds', () => {
      describe('keyPath', () => {
        it('should match keyPath', () => {
          const props = { participantFollowers: [1] };

          expect(
            CONFIG_3.value.participantFollowerNodeIds.keyPath(props),
          ).toEqual(
            props.participantFollowers.map(id =>
              NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id }),
            ),
          );
        });

        it('should match keyPath when participantFollowers is undefined', () => {
          const props = {};

          expect(
            CONFIG_3.value.participantFollowerNodeIds.keyPath(props),
          ).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should match cachekey', () => {
          const props = { participantFollowers: [1] };

          expect(
            CONFIG_3.value.participantFollowerNodeIds.cacheKey(props),
          ).toBe('TabPeople.FollowerList.1');
        });

        it('should not crash', () => {
          const props = {};

          expect(
            CONFIG_3.value.participantFollowerNodeIds.cacheKey(props),
          ).toBe('TabPeople.FollowerList.');
        });
      });

      describe('props', () => {
        it('should return null', () => {
          expect(CONFIG_3.value.participantFollowerNodeIds.props()).toEqual(
            null,
          );
        });
      });

      describe('getter', () => {
        it('should filter null in arguments', () => {
          const args = [1, 2, null, 3];

          expect(
            CONFIG_3.value.participantFollowerNodeIds.getter(...args),
          ).toEqual([1, 2, 3]);
        });
      });
    });
  });
});

describe('FollowerList/config.js', () => {
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

    describe('userParticipantNodeId', () => {
      it('should match keypath', () => {
        expect(
          CONFIG.value.userParticipantNodeId({ userParticipantId: [1] }),
        ).toEqual(INVITATION_STORE_SELECTORS.userNodeNodeId({ id: 1 }));
      });
    });

    describe('userFollowerNodeId', () => {
      it('should match keypath', () => {
        expect(
          CONFIG.value.userFollowerNodeId({ userFollowerId: [1] }),
        ).toEqual(INVITATION_STORE_SELECTORS.userNodeNodeId({ id: 1 }));
      });
    });
  });
});

describe('FollowerList/SET_VALUE', () => {
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
