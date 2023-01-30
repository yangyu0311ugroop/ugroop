import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_CONTRIBUTOR_ROLE } from './roles';

const logicalUserRole = (allowedRoles, tourRole, role) => {
  if (!allowedRoles.includes(role)) {
    return LOGIC_HELPERS.ifElse(
      tourRole === TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
      tourRole,
      '',
    );
  }

  return role;
};

const enableCheckbox = (id, ownerCanAccess, canCreate, isAccessible) =>
  LOGIC_HELPERS.ifElse(
    [id && ownerCanAccess, canCreate, isAccessible],
    true,
    false,
    true,
  );

const showNote = (id, ownerCanAccess, canCreate, isAccessible) => {
  const checkboxEnabled = enableCheckbox(
    id,
    ownerCanAccess,
    canCreate,
    isAccessible,
  );

  return LOGIC_HELPERS.ifElse([id, !checkboxEnabled], true, false);
};

const getRoleUsingRelatedIds = (relatedIds, id) => {
  let role = '';
  const filterRelatedIds = relatedIds.filter(array => array[2] === id);
  if (filterRelatedIds.length === 0) {
    return role;
  }

  const filterRole = filterRelatedIds.filter(
    array => array[1] === 'tour_organizer',
  );
  role = filterRole.length === 0 ? role : filterRole[0][1];
  return role;
};

const showCheckbox = (canCreate, hasOrgAccess, isTabCreator) =>
  canCreate || hasOrgAccess || isTabCreator;

export const ABILITY_HELPERS = {
  logicalUserRole,
  enableCheckbox,
  showNote,
  showCheckbox,
  getRoleUsingRelatedIds,
};
