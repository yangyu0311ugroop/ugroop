import { CONFIRMED } from 'appConstants';
import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  CONFIG,
  GET_PARENT_NODE_ID,
  FILTER_CONFIRMED_PARTICIPANTS,
  GET_EVENT_FLIGHT_SEATS,
  FILTER_PARTICIPANTS_WITH_NO_SEATS,
  FILTER_PARTICIPANTS_WITH_SEATS,
} from '../config';

describe('ParticipantData/config.js', () => {
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

describe('GET_EVENT_FLIGHT_SEATS', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_FLIGHT_SEATS).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_FLIGHT_SEATS.value).toBe('object');
    });
  });
});

describe('GET_PARENT_NODE_ID', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_PARENT_NODE_ID).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_PARENT_NODE_ID.value).toBe('object');
    });

    describe('id', () => {
      describe('props', () => {
        it('should return null', () => {
          expect(GET_PARENT_NODE_ID.value.id.props()).toEqual(null);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey', () => {
          expect(GET_PARENT_NODE_ID.value.id.cacheKey({ eventNodeId: 1 })).toBe(
            NODE_STORE_CACHE_KEYS.parentNodeIdViaTrail({
              idProp: 'eventNodeId',
            })({ eventNodeId: 1 }),
          );
        });
      });

      describe('getter', () => {
        it('should return empty array if trail is not array', () => {
          expect(GET_PARENT_NODE_ID.value.id.getter()).toEqual([]);
        });

        it('should return last item of trail if trail is array', () => {
          expect(GET_PARENT_NODE_ID.value.id.getter([1, 2])).toBe(2);
        });
      });
    });
  });
});

describe('FILTER_CONFIRMED_PARTICIPANTS,', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof FILTER_CONFIRMED_PARTICIPANTS).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof FILTER_CONFIRMED_PARTICIPANTS.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof FILTER_CONFIRMED_PARTICIPANTS.value).toBe('object');
    });

    describe('filteredIds', () => {
      describe('keyPath', () => {
        it('should return array of keypath shapes', () => {
          const participantIds = [1, 2, 3];
          const result = FILTER_CONFIRMED_PARTICIPANTS.value.filteredIds.keyPath(
            { participantIds },
          );
          const expectedResult = participantIds.map(id =>
            NODE_STORE_SELECTORS.status({ id }),
          );

          expect(result).toEqual(expectedResult);
        });
      });

      describe('props', () => {
        it('should return participantIds', () => {
          const participantIds = [1, 2];

          expect(
            FILTER_CONFIRMED_PARTICIPANTS.value.filteredIds.props({
              participantIds,
            }),
          ).toEqual(participantIds);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey shape', () => {
          expect(
            FILTER_CONFIRMED_PARTICIPANTS.value.filteredIds.cacheKey({
              participantIds: [1, 2],
            }),
          ).toEqual(
            NODE_STORE_CACHE_KEYS.confirmedParticipants({
              idsProp: 'participantIds',
            })({ participantIds: [1, 2] }),
          );
        });
      });

      describe('getter', () => {
        it('should return ids that have confirmed status', () => {
          const ids = [1, 2, 3];
          const status = [CONFIRMED, null, null];
          const result = FILTER_CONFIRMED_PARTICIPANTS.value.filteredIds.getter(
            ...status,
            ids,
          );

          expect(result).toEqual([1]);
        });
      });
    });
  });
});

describe('FILTER_PARTICIPANTS_WITH_NO_SEATS', () => {
  describe('value', () => {
    describe('availParticipantIds', () => {
      describe('keyPath', () => {
        it('should return array of keyPaths based on participantIds', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.keyPath(
              { filteredIds: [1, 2] },
            ),
          ).toMatchSnapshot();
        });

        it('should not crash if filteredIds is undefined', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.keyPath(
              { filteredIds: undefined },
            ),
          ).toMatchSnapshot();
        });
      });

      describe('props', () => {
        it('should return filteredIds and eventSeats', () => {
          const props = { filteredIds: [1], eventSeats: [2] };
          const expected = [[1], [2]];
          const result = FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.props.map(
            prop => prop(props),
          );
          expect(result).toEqual(expected);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey value', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.cacheKey(
              { filteredIds: [1, 2], eventNodeId: 2 },
            ),
          ).toEqual(
            NODE_STORE_CACHE_KEYS.participantsWithoutSeats({
              idsProp: 'filteredIds',
              secondIdProp: 'eventNodeId',
            })({ filteredIds: [1, 2], eventNodeId: 2 }),
          );
        });
      });

      describe('getter', () => {
        it('should only return ids that do not seats yet', () => {
          const args = [[], [], [1], undefined, [1, 2, 3, 4], [1]];

          const result = FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.getter(
            ...args,
          );

          expect(result).toEqual([1, 2, 4]);
        });

        it('should not crash if eventSeats is undefined', () => {
          const args = [[], [], [1], undefined, [1, 2, 3, 4], undefined];

          const result = FILTER_PARTICIPANTS_WITH_NO_SEATS.value.participantWithoutSeats.getter(
            ...args,
          );

          expect(result).toEqual([1, 2, 3, 4]);
        });
      });
    });
  });
});

describe('FILTER_PARTICIPANTS_WITH_SEATS', () => {
  describe('value', () => {
    describe('availParticipantIds', () => {
      describe('keyPath', () => {
        it('should return array of keyPaths based on filteredIds', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.keyPath({
              filteredIds: [1, 2],
            }),
          ).toMatchSnapshot();
        });

        it('should not crash if filteredIds is undefined', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.keyPath({
              filteredIds: undefined,
            }),
          ).toMatchSnapshot();
        });
      });

      describe('props', () => {
        it('should return filteredIds and eventSeats', () => {
          const props = { filteredIds: [1], eventSeats: [2] };
          const expected = [[1], [2]];
          const result = FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.props.map(
            prop => prop(props),
          );
          expect(result).toEqual(expected);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey value', () => {
          expect(
            FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.cacheKey({
              filteredIds: [1, 2],
            }),
          ).toEqual(
            NODE_STORE_CACHE_KEYS.participantsWithSeats({
              idsProp: 'filteredIds',
            })({ filteredIds: [1, 2] }),
          );
        });
      });

      describe('getter', () => {
        it('should only return ids that do have seats yet', () => {
          const args = [[], [], [1], undefined, [1, 2, 3, 4], [1]];

          const result = FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.getter(
            ...args,
          );

          expect(result).toEqual([3]);
        });

        it('should not crash if eventSeats is undefined', () => {
          const args = [[], [], [1], undefined, [1, 2, 3, 4], undefined];

          const result = FILTER_PARTICIPANTS_WITH_SEATS.value.participantWithSeats.getter(
            ...args,
          );

          expect(result).toEqual([]);
        });
      });
    });
  });
});
