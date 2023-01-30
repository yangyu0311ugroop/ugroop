import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';

const filterSharesByShareToUserId = ({ ids, shareToUserIds }) => ({
  [ids]: idsPropValue,
  [shareToUserIds]: shareToUserIdsPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const nodeIdsValue = SELECTOR_HELPERS.propOrValueArray(
    shareToUserIds,
    shareToUserIdsPropValue,
  );
  return `invitation.${ids}:${idsValue.toString()}.${shareToUserIds}:${nodeIdsValue.toString()}.filterSharesByShareToUserId`;
};

const filterSharesByNodeId = ({ ids, nodeIds }) => ({
  [ids]: idsPropValue,
  [nodeIds]: nodeIdsPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const nodeIdsValue = SELECTOR_HELPERS.propOrValueArray(
    nodeIds,
    nodeIdsPropValue,
  );
  return `invitation.${ids}:${idsValue.toString()}.${nodeIds}:${nodeIdsValue.toString()}.filterSharesByNodeId`;
};

const filterSharesByRole = ({ ids, roles }) => ({
  [ids]: idsPropValue,
  roles: rolesPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const rolesValue = SELECTOR_HELPERS.propOrValueArray(roles, rolesPropValue);
  return `invitation.${ids}:${idsValue.toString()}.${roles}:${rolesValue.toString()}.filterSharesByRole`;
};

const filterSharesByStatus = ({ ids }) => ({ [ids]: idsPropValue }) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  return `invitation.${ids}:${idsValue.toString()}.statuses:pendingStatus.filterSharesByStatus`;
};

const shareSubNodeShareTokens = ({ ids }) => ({ [ids]: idsPropValue }) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  return `invitation.${ids}:${idsValue.toString()}.shareSubNodeShareTokens`;
};

const filterShareSubNodesByNodeId = ({ ids, nodeIds }) => ({
  [ids]: idsPropValue,
  [nodeIds]: nodeIdsPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const nodeIdsValue = SELECTOR_HELPERS.propOrValueArray(
    nodeIds,
    nodeIdsPropValue,
  );
  return `invitation.${ids}:${idsValue.toString()}.${nodeIds}:${nodeIdsValue.toString()}.filterShareSubNodesByNodeId`;
};

const filterShareSubNodesByRole = ({ ids, roles }) => ({
  [ids]: idsPropValue,
  [roles]: rolesPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const rolesValue = SELECTOR_HELPERS.propOrValueArray(roles, rolesPropValue);
  return `invitation.${ids}:${idsValue.toString()}.${roles}:${rolesValue.toString()}.filterShareSubNodesByRole`;
};

const userNodeUserIds = ({ idsProp }) => ({ [idsProp]: ids }) => {
  const idsValue = ARRAY_HELPERS.arrayIfNot(ids);
  return `invitation.${idsProp}:${idsValue}.userNodeUserIds`;
};

const getUserNodeUserIds = ({ idsProp }) => ({ [idsProp]: ids }) => {
  const idsValue = ARRAY_HELPERS.arrayIfNot(ids);
  return `invitation.${idsProp}:${idsValue}.getUserNodeUserIds`;
};

const userNodeUserRoles = ({ idsProp }) => ({ [idsProp]: ids }) => {
  const idsValue = ARRAY_HELPERS.arrayIfNot(ids);
  return `invitation.${idsProp}:${idsValue}.userNodeUserRoles`;
};

const filterUserNodesByUserId = ({ ids, userIds }) => ({
  [ids]: idsPropValue,
  [userIds]: userIdsPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const userIdsValue = SELECTOR_HELPERS.propOrValueArray(
    userIds,
    userIdsPropValue,
  );
  return `invitation.${ids}:${idsValue.toString()}.${userIds}:${userIdsValue.toString()}.filterUserNodesByUserId`;
};

const filterUserNodesByNodeId = ({ ids, nodeIds }) => ({
  [ids]: idsPropValue,
  [nodeIds]: nodeIdsPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const nodeIdsValue = SELECTOR_HELPERS.propOrValueArray(
    nodeIds,
    nodeIdsPropValue,
  );
  return `invitation.${ids}:${idsValue.toString()}.${nodeIds}:${nodeIdsValue.toString()}.filterUserNodesByNodeId`;
};

const filterUserNodesByRole = ({ ids, staticRoles = null }) => ({
  [ids]: idsPropValue,
  roles,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const rolesValue = staticRoles || roles;
  return `invitation.${ids}:${idsValue.toString()}:${
    rolesValue ? rolesValue.toString() : 'null'
  }.filterUserNodesByRole`;
};

export const INVITATION_STORE_CACHE_KEYS = {
  filterSharesByShareToUserId,
  filterSharesByNodeId,
  filterSharesByRole,
  filterSharesByStatus,

  shareSubNodeShareTokens,
  filterShareSubNodesByNodeId,
  filterShareSubNodesByRole,

  userNodeUserIds,
  getUserNodeUserIds,
  userNodeUserRoles,
  filterUserNodesByUserId,
  filterUserNodesByNodeId,
  filterUserNodesByRole,
};
