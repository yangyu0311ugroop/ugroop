import { CONFIRMED } from 'appConstants';
import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';

export const GET_PARENT_NODE_ID = {
  value: {
    id: {
      keyPath: RESAGA_HELPERS.mapToId(
        NODE_STORE_SELECTORS.calculatedTrail,
        'eventNodeId',
      ),
      props: () => null,
      cacheKey: NODE_STORE_CACHE_KEYS.parentNodeIdViaTrail({
        idProp: 'eventNodeId',
      }),
      getter: trail => {
        if (!Array.isArray(trail)) return [];
        return trail[trail.length - 1];
      },
    },
  },
};

export const CONFIG = {
  value: {
    participantIds: NODE_STORE_SELECTORS.calculatedParticipants,
  },
};

export const FILTER_CONFIRMED_PARTICIPANTS = {
  value: {
    filteredIds: {
      keyPath: ({ participantIds }) =>
        participantIds.map(participantId =>
          NODE_STORE_SELECTORS.status({ id: participantId }),
        ),
      props: ({ participantIds }) => participantIds,
      cacheKey: NODE_STORE_CACHE_KEYS.confirmedParticipants({
        idsProp: 'participantIds',
      }),
      getter: (...args) => {
        const participantStatus = dropRight(args, 1);
        const [ids] = takeRight(args, 1);
        const filteredIds = ids.filter(
          (_, index) => participantStatus[index] === CONFIRMED,
        );
        return filteredIds;
      },
    },
  },
  setValue: {},
};

export const GET_EVENT_FLIGHT_SEATS = {
  value: {
    eventSeats: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.seats,
      'eventNodeId',
    ),
  },
};

export const FILTER_PARTICIPANTS_WITH_SEATS = {
  value: {
    participantWithSeats: {
      keyPath: ({ filteredIds = [] }) =>
        filteredIds.map(participantId =>
          NODE_STORE_SELECTORS.seats({ id: participantId }),
        ),
      props: [({ filteredIds }) => filteredIds, ({ eventSeats }) => eventSeats],
      cacheKey: NODE_STORE_CACHE_KEYS.participantsWithSeats({
        idsProp: 'filteredIds',
        secondIdProp: 'eventNodeId',
      }),
      getter: (...args) => {
        const seats = dropRight(args, 2);
        const [ids, eventSeats = []] = takeRight(args, 2);
        const filteredIds = ids.filter(
          (_, index) =>
            seats[index] &&
            seats[index].filter(seatId => eventSeats.includes(seatId)).length >=
              1,
        );
        return filteredIds;
      },
    },
  },
};

export const FILTER_PARTICIPANTS_WITH_NO_SEATS = {
  value: {
    participantWithoutSeats: {
      keyPath: ({ filteredIds = [] }) =>
        filteredIds.map(participantId =>
          NODE_STORE_SELECTORS.seats({ id: participantId }),
        ),
      props: [({ filteredIds }) => filteredIds, ({ eventSeats }) => eventSeats],
      cacheKey: NODE_STORE_CACHE_KEYS.participantsWithoutSeats({
        idsProp: 'filteredIds',
        secondIdProp: 'eventNodeId',
      }),
      getter: (...args) => {
        const seats = dropRight(args, 2);
        const [ids, eventSeats = []] = takeRight(args, 2);
        const filteredIds = ids.filter(
          (_, index) =>
            !seats[index] ||
            seats[index].filter(seatId => eventSeats.includes(seatId))
              .length === 0,
        );
        return filteredIds;
      },
    },
  },
};
