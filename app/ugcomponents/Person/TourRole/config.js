import { INVITATION_STORE } from 'appConstants';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  setValue: {
    updatedAt: ({ token }) =>
      INVITATION_STORE_SELECTORS.updatedAt({ id: token }),
    ...SET_VALUE,
  },

  value: {
    role: {
      keyPath: ({ token }) => [INVITATION_STORE, 'shares', token, 'role'],
      getter: (tokenRole, { role }) => role || tokenRole,
    },
    status: ({ token }) => [INVITATION_STORE, 'shares', token, 'status'],
  },
};
