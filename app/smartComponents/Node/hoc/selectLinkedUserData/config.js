import _ from 'lodash';
import { PENDING } from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = ({ outputProp }) => ({
  value: {
    shareToUserId: {
      keyPath: [
        ({ shareTokens }) =>
          INVITATION_STORE_SELECTORS.shareShareToUserId({
            id: _.first(shareTokens),
          }),
        ({ shareTokens }) =>
          INVITATION_STORE_SELECTORS.shareStatus({ id: _.first(shareTokens) }),
        ({ userNodeIds }) =>
          INVITATION_STORE_SELECTORS.userNodeUserId({
            id: _.first(userNodeIds),
          }),
      ],
      props: [
        ({ shareTokens }) => shareTokens,
        ({ userNodeIds }) => userNodeIds,
      ],
      getter: (
        shareToUserId,
        shareStatus,
        userNodeUserId,
        shareTokens,
        userNodeIds,
      ) => {
        const shareToken = _.first(shareTokens);
        const userNodeId = _.first(userNodeIds);
        const invitationPending = shareStatus === PENDING;
        const userConnected = !!userNodeId;
        let userId;
        if (invitationPending) userId = shareToUserId;
        if (userConnected) userId = userNodeUserId;
        return {
          [outputProp]: userId,
          shareToken,
          userNodeId,
          invitationPending,
          userConnected,
        };
      },
      spreadObject: true,
    },
  },
});
