import { INVITATION_STORE, TOUR_INVITATION_TYPE } from 'appConstants';

export const CONFIG = {
  value: {
    createdAt: ({
      token,
      sortBy = 'updatedAt',
      type = TOUR_INVITATION_TYPE.SHARE,
    }) => [INVITATION_STORE, type, token, sortBy],
  },
  setValue: {},
};
