import { INVITATION_STORE } from 'appConstants';
import createCachedSelector from 're-reselect';
import { TOUR_ORGANIZER } from 'utils/modelConstants';
import get from 'lodash/get';
import dotProp from 'dot-prop';

export const getTourOrganisersUserIds = createCachedSelector(
  state => state.get(INVITATION_STORE).get('userNodeIds'),
  state => state.get(INVITATION_STORE).get('userNodes'),
  (userNodeIds = [], userNodes) => {
    const organisersNodeIds = userNodeIds.filter(
      userNodeId => userNodes[userNodeId].role === TOUR_ORGANIZER,
    );
    const organiserUserNodeIds = organisersNodeIds.map(
      organiserNodeId => userNodes[organiserNodeId].userId,
    );

    return organiserUserNodeIds;
  },
)((_, id) => `getTourOrganiserUserIds.${id}`);

export const getuserNodes = state =>
  state.get(INVITATION_STORE).get('userNodes');

export const getUserNodeCustomRole = createCachedSelector(
  getuserNodes,
  (_, id) => id,
  (userNodes, id) => get(userNodes, `${id}.userRole`, null),
)((_, id) => `userNodes.getUserNodeCustomRole.${id}`);

export const getUserNodeRole = createCachedSelector(
  getuserNodes,
  (_, id) => id,
  (userNodes, id) => get(userNodes, `${id}.role`, []),
)((_, id) => `userNodes.getUserNodeRole.${id}`);

export const getUserNodeUserId = createCachedSelector(
  getuserNodes,
  (_, id) => id,
  (userNodes, id) => get(userNodes, `${id}.userId`, []),
)((_, id) => `userNodes.getUserNodes.${id}`);

export const getSharesAttribute = (state, props) =>
  dotProp.get(
    state.get(INVITATION_STORE).get('shares'),
    `${props.inviteeToken}.${props.attribute}`,
  );

export const getNotificationTokenAttribute = (state, props) =>
  dotProp.get(
    state.get(INVITATION_STORE).get('notifications'),
    `${props.inviteeToken}.${props.attribute}`,
  );

export const NOTIFICATION_ATTRIBUTE = {
  messageContent: 'content.content',
};
export const INVITATION_STORE_RESELECTORS = {
  getTourOrganisersUserIds,
  getUserNodeCustomRole,
  getUserNodeRole,
  getUserNodeUserId,
  getSharesAttribute,
  getNotificationTokenAttribute,
};
