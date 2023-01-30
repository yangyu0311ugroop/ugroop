import { USER_DATA_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    photo: ({ id }) => [USER_DATA_STORE, 'people', id, 'photo'],
  },
  setValue: {},
};
