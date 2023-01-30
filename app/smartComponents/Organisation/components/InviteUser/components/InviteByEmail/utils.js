import { EMPTY_RTE } from 'appConstants';
import { ORG_ROLES } from 'datastore/invitationStore/constants';

const makeInvitee = ({ invitation, organisation }, { shareTo }) => {
  const basic = {
    email: shareTo,
  };
  let invitationMapping;
  let organisationMapping;

  // there is already invitation
  if (invitation) {
    invitationMapping = {
      pending: invitation.status === 'pending',
      accepted: invitation.status === 'confirmed',
      role: invitation.role,
    };
  }

  if (organisation) {
    organisationMapping = {
      theirOrganisationName: organisation.name,
    };
  }

  return {
    ...basic,
    ...invitationMapping,
    ...organisationMapping,
  };
};

const makePayload = (
  { inviteToOrganisation, role, pm },
  { id, inviteTo, userId },
) => {
  const content = pm === EMPTY_RTE ? '' : pm;

  return {
    id,
    payload: {
      content,
      inviteTo,
      role,
      roleName: ORG_ROLES[role],
      inviteToOrganisation,
    },
    inviteToUserId: userId,
  };
};

export default {
  makeInvitee,
  makePayload,
};
