import { USER_API, FORGET_PWD, RESET_PWD } from '../../../../apis/constants';

/**
 * Created by Yang on 5/4/17.
 */

export const CONFIG = {
  isLoading: {
    resetPasswordLoading: [USER_API, RESET_PWD],
    sendForgetPwdCodeLoading: [USER_API, FORGET_PWD],
  },
};
