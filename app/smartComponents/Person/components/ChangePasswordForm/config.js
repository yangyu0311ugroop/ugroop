import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { CHANGE_PWD, USER_API } from '../../../../apis/constants';
export const CONFIG = {
  value: {},
  setValue: {
    ...SET_VALUE,
  },
  isLoading: {
    isLoading: [USER_API, CHANGE_PWD],
  },
};
