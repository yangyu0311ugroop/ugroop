import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    participantId: NODE_STORE_SELECTORS.firstParticipant,
  },
};

export const GET_TEMPLATE_PARENT = {
  value: {
    templateId: {
      keyPath: RESAGA_HELPERS.mapToId(
        NODE_STORE_SELECTORS.calculatedTrail,
        'parentNodeId',
      ),
      cacheKey: NODE_STORE_CACHE_KEYS.templateIdByTrail({
        idProp: 'parentNodeId',
      }),
      props: () => null,
      getter: trail => (Array.isArray(trail) ? trail[trail.length - 1] : 0),
    },
  },
  setValue: {
    participants: NODE_STORE_SELECTORS.participants,
  },
};
