import { INVITATION_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    createdAt: ({ token, sortBy = 'updatedAt' }) => [
      INVITATION_STORE,
      'shares',
      token,
      sortBy,
    ],
  },
  setValue: {},
};
