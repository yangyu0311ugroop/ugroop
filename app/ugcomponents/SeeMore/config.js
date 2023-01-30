import { USER_SEE_MORE_DISABLED } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    seeMoreDisabled: ({ userId }) => USER_SEE_MORE_DISABLED({ id: userId }),
  },
  setValue: {},
};
