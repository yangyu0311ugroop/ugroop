import { ORGANISATION_DATA_STORE } from 'appConstants';
import get from 'lodash/get';
import createCachedSelector from 're-reselect';
import dotProp from 'dot-prop';
import { isEmptyString } from '../../utils/stringAdditions';
export const MEMBER_ATTRIBUTE = {
  ROLE: 'role',
  KNOWN_AS: 'knownAs',
};
export const ORGROLE_ATTRIBUTE = {
  ACTIVATED: 'activated',
};

const getOrgUsers = state => state.get(ORGANISATION_DATA_STORE).get('orgUsers');
const getOrganisations = state =>
  state.get(ORGANISATION_DATA_STORE).get('organisations');

const getActiveMembers = state => props => {
  const roles = state.get(ORGANISATION_DATA_STORE).get('roles');
  const data = dotProp.get(roles, `${props.id}.activated`);
  return data ? data.length : 0;
};

const getPendingInvitation = state => props => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('organisations');
  const data = dotProp.get(orgs, `${props.id}.pendingInvitations`);
  return data ? data.length : 0;
};

const getActiveMemberRef = getActiveMembers;
const getPendingInvitationRef = getPendingInvitation;

const getOrganisationSeats = createCachedSelector(
  [getActiveMemberRef, getPendingInvitationRef, (_, props) => props],
  (memberFn, invitationFn, props) => {
    const num1 = memberFn({ id: props.id });
    const num2 = invitationFn({ id: props.id });
    return num1 + num2;
  },
)((_, id) => `organisations.getOrganisationSeats.${id}`);

const getOrganisationPhoto = createCachedSelector(
  getOrganisations,
  (_, id) => id,
  (organisations, id) => get(organisations, `${id}.photo`, null),
)((_, id) => `organisations.getOrganisationPhoto.${id}`);

const getOrgNameLists = createCachedSelector(
  [getOrganisations, (_, props) => props],
  (collections, props) => {
    if (!isEmptyString(props.ids) && collections) {
      const orgIds = JSON.parse(props.ids).filter(o => o !== -1);
      let string = '';
      if (orgIds && orgIds.length > 0) {
        for (let i = 0; i < orgIds.length; i += 1) {
          const id = orgIds[i].toString();
          string = string.concat('|');
          if (collections[id]) {
            string = string.concat(collections[id].name);
          }
        }
        return string;
      }
    }
    return '';
  },
)((_, ids) => `organisations.getOrgNameLists.${ids}`);

const getOrgTypeLists = createCachedSelector(
  [getOrganisations, (_, props) => props],
  (collections, props) => {
    if (!isEmptyString(props.ids) && collections) {
      const orgIds = JSON.parse(props.ids).filter(o => o !== -1);
      let string = '';
      if (orgIds && orgIds.length > 0) {
        for (let i = 0; i < orgIds.length; i += 1) {
          const id = orgIds[i].toString();
          string = string.concat('|');
          if (collections[id]) {
            string = string.concat(collections[id].type);
          }
        }
        return string;
      }
    }
    return '';
  },
)((_, ids) => `organisations.getOrgTypeLists.${ids}`);

const getOrgRoleLists = createCachedSelector(
  [getOrgUsers, (_, props) => props],
  (collections, props) => {
    if (!isEmptyString(props.ids) && collections) {
      const orgIds = JSON.parse(props.ids).filter(o => o !== -1);
      let string = '';
      if (orgIds && orgIds.length > 0) {
        for (let i = 0; i < orgIds.length; i += 1) {
          const id = orgIds[i].toString();
          string = string.concat('|');
          if (collections[id]) {
            string = string.concat(collections[id].role);
          }
        }
        return string;
      }
    }
    return '';
  },
)((_, id) => `organisations.getOrgRoleLists.${id}`);

const getOrgType = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('organisations');
  return dotProp.get(orgs, `${props.id}.type`);
};

const getOrgPreference = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('organisations');
  return dotProp.get(orgs, `${props.id}.preference`);
};

const getPaxLabel = (state, props) => {
  const orgsPreference = state.get(ORGANISATION_DATA_STORE).get('preferences');
  return dotProp.get(orgsPreference, `${props.id}.paxLabel`, 'PAX');
};

const getOrgAttribute = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('organisations');
  return dotProp.get(orgs, `${props.id}.${props.attribute}`);
};

const getOrgUserAttribute = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('orgUsers');
  return dotProp.get(orgs, `${props.id}.${props.attribute}`);
};

const getOrgRolesAttribute = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('roles');
  return dotProp.get(orgs, `${props.id}.${props.attribute}`);
};

const getMemberAttribute = (state, props) => {
  const orgs = state.get(ORGANISATION_DATA_STORE).get('members');
  return dotProp.get(orgs, `${props.id}.${props.attribute}`);
};

export const ORG_DATASTORE_RESELECTORS = {
  getOrgUserAttribute,
  getOrgAttribute,
  getOrganisationPhoto,
  getOrganisationSeats,
  getOrgRoleLists,
  getOrgTypeLists,
  getOrgNameLists,
  getOrgType,
  getOrgRolesAttribute,
  getMemberAttribute,
  getPaxLabel,
  getOrgPreference,
};
