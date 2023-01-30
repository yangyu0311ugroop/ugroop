import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import {
  CONFIG,
  GET_LINK_IDS,
  GET_PARTICIPANT_GROUP_LINKS,
  GET_PARTICIPANT_LINK_IDS,
  CONFIG2,
} from '../config';

describe('Templates/Modals/Participant/View/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('setValue', () => {
    describe('participants', () => {
      it('should point to participants via first item in group', () => {
        const groups = [1];

        expect(CONFIG2.setValue.participants({ groups })).toEqual(
          NODE_STORE_SELECTORS.participants({ id: 1 }),
        );
      });
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { id: 'id' };
      expect(CONFIG.value.firstName(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.firstName,
        }),
      );
      expect(CONFIG.value.lastName(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.lastName,
        }),
      );
      expect(CONFIG.value.personType(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.personType,
        }),
      );
      expect(CONFIG.value.parentNodeId).toEqual(
        NODE_STORE_SELECTORS.parentNodeId,
      );
    });
  });
});

describe('Templates/Modals/Participant/View/GET_LINK_IDS', () => {
  describe('GET_LINK_IDS', () => {
    it('exists', () => {
      expect(GET_LINK_IDS).toBeDefined();
    });
  });
});

describe('Templates/Modals/Participant/View/GET_PARTICIPANT_GROUP_LINKS', () => {
  describe('GET_PARTICIPANT_GROUP_LINKS', () => {
    it('exists', () => {
      expect(GET_PARTICIPANT_GROUP_LINKS).toBeDefined();
    });
  });

  describe('#value', () => {
    describe('participantGroupLinks', () => {
      describe('KeyPath', () => {
        it('should not throw error if linkIds is undefined', () => {
          const props = { linkIds: undefined };
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.keyPath(
              props,
            ),
          ).toEqual([]);
        });

        it('should return linkType selectors', () => {
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.keyPath({
              linkIds: [1, 2],
            }),
          ).toEqual([
            NODE_STORE_SELECTORS.linkType({ id: 1 }),
            NODE_STORE_SELECTORS.linkType({ id: 2 }),
          ]);
        });
      });

      describe('cacheKey', () => {
        it('should not throw error if linkIds is undefined', () => {
          const props = { linkIds: undefined };
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.cacheKey(
              props,
            ),
          ).toEqual('getParticipantGroupLinks..participantGroupLinks');
        });
        it('should return a particular cacheKey shape', () => {
          const props = { linkIds: [1] };
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.cacheKey(
              props,
            ),
          ).toEqual('getParticipantGroupLinks.1.participantGroupLinks');
        });
      });

      describe('props', () => {
        it('should return linkIds', () => {
          const props = { linkIds: [1] };
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.props(
              props,
            ),
          ).toEqual([1]);
        });
      });

      describe('getter', () => {
        it('should get all the linkIds with type participant.group', () => {
          expect(
            GET_PARTICIPANT_GROUP_LINKS.value.participantGroupLinks.getter(
              'participant.group',
              null,
              null,
              [1, 2, 3],
            ),
          ).toEqual([1]);
        });
      });
    });
  });
});

describe('Templates/Modals/Participant/View/GET_PARTICIPANT_LINK_IDS', () => {
  describe('GET_PARTICIPANT_LINK_IDS', () => {
    it('exists', () => {
      expect(GET_PARTICIPANT_LINK_IDS).toBeDefined();
    });
  });

  describe('#value', () => {
    describe('participantLinkIds', () => {
      describe('KeyPath', () => {
        it('should not throw error if linkIds is undefined', () => {
          const props = { participantGroupLinks: undefined };
          expect(
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.keyPath(props),
          ).toEqual([]);
        });

        it('should return linkType selectors', () => {
          expect(
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.keyPath({
              participantGroupLinks: [1, 2],
            }),
          ).toEqual([
            NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({ id: 1 }),
            NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({ id: 2 }),
          ]);
        });
      });

      describe('cacheKey', () => {
        it('should not throw error if linkIds is undefined', () => {
          const props = { participantGroupLinks: undefined };
          expect(
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.cacheKey(props),
          ).toEqual('getParticipantLinkIds..getParticipantLinkIds.undefined');
        });
        it('should return a particular cacheKey shape', () => {
          const props = { participantGroupLinks: [1], id: 1 };
          expect(
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.cacheKey(props),
          ).toEqual('getParticipantLinkIds.1.getParticipantLinkIds.1');
        });
      });

      describe('props', () => {
        it('should return linkIds', () => {
          const props = { participantGroupLinks: [1], id: [1] };
          const resagaProps =
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.props;

          expect(resagaProps[0](props)).toEqual([1]);
          expect(resagaProps[1](props)).toEqual([1]);
        });
      });

      describe('getter', () => {
        it('should get all linkIds connected to participant via id', () => {
          expect(
            GET_PARTICIPANT_LINK_IDS.value.participantLinkIds.getter(
              1,
              2,
              3,
              [1, 2, 3],
              3,
            ),
          ).toEqual([3]);
        });
      });
    });
  });
  describe('#config2.value', () => {
    it('contains required properties', () => {
      const props = { personId: 1 };
      expect(CONFIG2.value.knownAs(props)).toEqual(
        PERSON_STORE_SELECTORS.knownAs({ id: 1 }),
      );
    });
  });
  describe('#config2.setValue', () => {
    it('contains required properties', () => {
      const props = { personId: 1 };
      expect(typeof CONFIG2.setValue.calculatedPeople(props)).toBe('object');
      expect(typeof CONFIG2.setValue.calculatedParticipants(props)).toBe(
        'object',
      );
      expect(typeof CONFIG2.setValue.participants({})).toBe('object');
    });
  });
  describe('#CONFIG.value', () => {
    it('contains required properties for email', () => {
      const props = { id: 1 };
      expect(typeof CONFIG.value.email(props)).toBe('object');
    });
    it('contains required properties for dateOfBirth', () => {
      const props = { id: 1 };
      expect(typeof CONFIG.value.dateOfBirth(props)).toBe('object');
    });
    it('contains required properties personId', () => {
      const props = { id: 1 };
      expect(typeof CONFIG.value.personId.keyPath(props)).toBe('object');
      expect(CONFIG.value.personId.getter([1])).toEqual(1);
    });
  });
  describe('loading', () => {
    describe('isLoading', () => {
      it('exists', () => {
        expect(CONFIG.isLoading.isFetching.getter(1, 0)).toEqual(1);
        expect(CONFIG.isLoading.isFetching.getter(0, 2)).toEqual(2);
      });
    });
  });
});
