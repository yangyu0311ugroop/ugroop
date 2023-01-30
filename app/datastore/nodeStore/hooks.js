import {
  LINK_STORE_RESELECTORS,
  NODE_STORE_RESELECTORS,
} from 'datastore/nodeStore/selectorsViaConnect';
import { useSelector } from 'react-redux';
import zip from 'lodash/zip';

export const useNodeGetTravelingWith = id => {
  const groups = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeGroups(state, id),
  );
  const actualGroupIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkNextNodeIds(state, groups),
  );

  const participants = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, actualGroupIds[0]),
  );

  const prevNodeIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkPrevNodeIds(state, participants),
  );

  const linkIdsWithNodeIds = zip(participants, prevNodeIds);
  const travelingWith = linkIdsWithNodeIds.filter(
    linkIdWithNodeId => linkIdWithNodeId[1] !== id,
  );

  return travelingWith;
};

export const useNodeGetTravelingWithByGroupId = id => {
  const participants = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, id),
  );

  const prevNodeIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkPrevNodeIds(state, participants),
  );

  const travelingWith = zip(participants, prevNodeIds);
  return travelingWith;
};

export const useNodeGetParticipantNoGroup = id => {
  const participants = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, id),
  );
  const withIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getParticipantsNotTravellingWith(
      state,
      participants,
    ),
  );
  return withIds;
};

export const useNodeGetTravelingWithGroupId = id => {
  const groupLinkIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeGroups(state, id),
  );
  const groups = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkNextNodeIds(state, groupLinkIds),
  );

  return groups;
};

export const useNodeGetParticipantLinkId = id =>
  useSelector(state => NODE_STORE_RESELECTORS.getNodeGroups(state, id));

export const useNodeGetAllTravellingWithGroups = id =>
  useSelector(state => NODE_STORE_RESELECTORS.getNodeGroups(state, id));

export const NODESTORE_HOOKS = {
  useNodeGetTravelingWith,
  useNodeGetParticipantNoGroup,
  useNodeGetTravelingWithGroupId,
  useNodeGetParticipantLinkId,
  useNodeGetAllTravellingWithGroups,
  useNodeGetTravelingWithByGroupId,
};
