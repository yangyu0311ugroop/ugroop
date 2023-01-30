import { INVITATION_STORE } from 'appConstants';

export const CONFIG = {
  setValue: {},

  value: {
    userId: {
      keyPath: ({ token }) => [
        INVITATION_STORE,
        'shares',
        token,
        'shareToUserId',
      ],
      getter: (shareToUserId, { userId }) => userId || shareToUserId,
    },
  },
};
