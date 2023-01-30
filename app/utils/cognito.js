import AwsLib from 'lib/awsLib';

const signIn = data =>
  AwsLib.Auth.signIn(data.username, data.password)
    .then(user => user)
    .catch(error => {
      throw error;
    });

const signOut = onSignOut =>
  AwsLib.Auth.signOut()
    .then(onSignOut)
    .catch(error => {
      throw error;
    });

const forgetPassword = payload =>
  AwsLib.Auth.forgotPassword(payload.username)
    .then(data => data)
    .catch(error => {
      throw error;
    });

const resetPassword = payload =>
  AwsLib.Auth.forgotPasswordSubmit(
    payload.username,
    payload.code,
    payload.password,
  )
    .then(data => data)
    .catch(error => {
      throw error;
    });

const resendSignUp = payload =>
  AwsLib.Auth.resendSignUp(payload.username)
    .then(data => data)
    .catch(error => {
      throw error;
    });

const changePassword = payload =>
  AwsLib.Auth.currentAuthenticatedUser()
    .then(user =>
      AwsLib.Auth.changePassword(
        user,
        payload.oldPassword,
        payload.newPassword,
      ),
    )
    .catch(err => {
      throw err;
    });

export const AwsApi = {
  signIn,
  signOut,
  forgetPassword,
  resetPassword,
  resendSignUp,
  changePassword,
};
