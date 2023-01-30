import {
  INVITATION_API,
  GET_TOKEN,
  CANCEL_INVITATION,
  RESEND_INVITATION,
  DECLINE_INVITATION,
} from 'apis/constants';
import {
  NOTIFICATION_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';
import { DATASTORE_UTILS } from 'datastore';
import { requests } from 'utils/request';

const normaliseInvitationAction = ({
  notificationToken,
  status,
  updatedAt,
}) => {
  const res = {
    shares: DATASTORE_UTILS.upsertObject({
      [notificationToken]: { status, updatedAt },
    }),
    cancelInvitation: notificationToken,
  };
  return res;
};

const processGetToken = result => {
  const { content, nodeShare, organisation, registered, nodeTransfer } = result;
  const invitation = nodeShare || organisation || nodeTransfer;
  const remoteContent = nodeShare
    ? content
    : { ...content, shareTo: content.inviteTo };
  return {
    remoteContent,
    organisation,
    registered,
    ...invitation,
  };
};
const reveal = text => () => revealSnackbar({ text });

export const helpers = {
  normaliseInvitationAction,
  processGetToken,
  reveal,
};

export const CONFIG = {
  name: INVITATION_API,

  requests: {
    [GET_TOKEN]: ({ tokenId }) =>
      requests.fetchWithURL('get', `/${INVITATION_API}/${tokenId}`),
    [CANCEL_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${INVITATION_API}/${token}/cancel`,
        { content },
      ),
    [RESEND_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${INVITATION_API}/${token}/resend`,
        { content },
      ),
    [DECLINE_INVITATION]: ({ tokenId, content }) =>
      requests.fetchWithURL('post', `/${INVITATION_API}/${tokenId}/decline`, {
        content,
      }),
  },

  onError: {
    [CANCEL_INVITATION]: [
      helpers.reveal(
        'Cancel invitation failed. Please reload the page and try again',
      ),
    ],
    [RESEND_INVITATION]: [
      helpers.reveal(
        'Resend invitation failed. Please reload the page and try again',
      ),
    ],
  },

  processResult: {
    [CANCEL_INVITATION]: helpers.normaliseInvitationAction,
    [GET_TOKEN]: helpers.processGetToken,
  },

  setValue: {
    notifications: [NOTIFICATION_DATASTORE, 'notifications'],
    shares: INVITATION_STORE_SELECTORS.shares,
    cancelInvitation: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'cancelInvitation'],
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
