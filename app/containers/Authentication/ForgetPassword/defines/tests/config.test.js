/**
 * Created by Jay on 1/7/17.
 */
import { CONFIG } from '../config';
import { FORGET_PWD, RESET_PWD, USER_API } from '../../../../../apis/constants';

describe('containers/ForgetPassword/defines/config', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('CONFIG', () => {
    it('resetPasswordLoading', () => {
      expect(CONFIG.isLoading.resetPasswordLoading).toEqual([
        USER_API,
        RESET_PWD,
      ]);
    });
    it('sendForgetPwdCodeLoading', () => {
      expect(CONFIG.isLoading.sendForgetPwdCodeLoading).toEqual([
        USER_API,
        FORGET_PWD,
      ]);
    });
  });
});
