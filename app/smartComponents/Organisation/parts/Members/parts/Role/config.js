import {
  getMemberRole,
  getInviteStatus,
  getInviteRole,
} from 'datastore/orgStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  value: {
    role: RESAGA_HELPERS.subscribeIfNotGiven(getMemberRole, 'role'),
    inviteStatus: props => getInviteStatus({ id: props.token }),
    inviteRole: props => getInviteRole({ id: props.token }),
  },
  setValue: {
    updatedAt: ({ token }) =>
      INVITATION_STORE_SELECTORS.updatedAt({ id: token }),
    ...SET_VALUE,
  },
};
