import { get } from 'lodash';

export const CONFIG = {
  value: {
    token: {
      getter: ({ match }) => get(match, 'params.token'),
    },
  },
  setValue: {},
};
