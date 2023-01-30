import { INVITATION_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    shareFrom: ({ token }) => [INVITATION_STORE, 'shares', token, 'shareFrom'],
  },
  setValue: {},
};
