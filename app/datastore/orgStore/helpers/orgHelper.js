import { ability } from 'apis/components/Ability/ability';
import { ASSIGNABLE_ORG_ROLES } from 'datastore/invitationStore/constants';
import { ORG_USER } from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const getAssignableRole = () => {
  const roles = Object.keys(ASSIGNABLE_ORG_ROLES).reduce((result, key) => {
    const can = ability.can('execute', {
      type: ORG_USER,
      role: ASSIGNABLE_ORG_ROLES[key].toLowerCase(),
    });
    return LOGIC_HELPERS.ifElse(
      can,
      { ...result, [key]: ASSIGNABLE_ORG_ROLES[key] },
      result,
    );
  }, {});
  return roles;
};

export const ORGANISATION_HELPER = {
  getAssignableRole,
};
