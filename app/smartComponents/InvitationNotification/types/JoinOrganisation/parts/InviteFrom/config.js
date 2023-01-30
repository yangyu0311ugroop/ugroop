import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    inviteFrom: RESAGA_HELPERS.subscribeIfNotGiven(
      INVITATION_STORE_SELECTORS.inviteFrom,
      'inviteFrom',
    ),
  },
  setValue: {},
};
