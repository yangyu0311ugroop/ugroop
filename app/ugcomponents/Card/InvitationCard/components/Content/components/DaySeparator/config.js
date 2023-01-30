import { INVITATION_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    createdAt: ({ token, sortBy = 'updatedAt' }) => [
      INVITATION_STORE,
      'shares',
      token,
      sortBy,
    ],
    previousCreatedAt: ({ previousToken, sortBy = 'updatedAt' }) => [
      INVITATION_STORE,
      'shares',
      previousToken,
      sortBy,
    ],
  },
  setValue: {},
};
