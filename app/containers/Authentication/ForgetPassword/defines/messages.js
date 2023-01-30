/**
 * Created by quando on 21/3/17.
 * ForgetPasswordPage Messages
 *
 * This contains all the text for the SamplePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  emailLabel: {
    id: 'app.containers.Form.ForgetPasswordPage.emailLabel',
    defaultMessage: 'Enter your email address',
  },
  emailIsEmail: {
    id: 'app.containers.Form.ForgetPasswordPage.emailIsEmail',
    defaultMessage: 'does not look like an email',
  },
  passwordLabel: {
    id: 'app.containers.Form.ForgetPasswordPage.passwordLabel',
    defaultMessage: 'Password',
  },
  validButton: {
    id: 'app.containers.Form.ForgetPasswordPage.validButton',
    defaultMessage: 'Send Security Code',
  },
  validResetButton: {
    id: 'app.containers.Form.ForgetPasswordPage.validResetButton',
    defaultMessage: 'Reset Your Password',
  },
  invalidButton: {
    id: 'app.containers.Form.ForgetPasswordPage.requiredButton',
    defaultMessage: 'invalid email',
  },
  sendingButton: {
    id: 'app.containers.Form.ForgetPasswordPage.sendingButton',
    defaultMessage: 'Sending..',
  },
  requiredButton: {
    id: 'app.containers.Form.ForgetPasswordPage.requiredButton',
    defaultMessage: 'email is required',
  },
  noAccount: {
    id: 'app.containers.Form.ForgetPasswordPage.noAccount',
    defaultMessage: 'I remember my account',
  },
  clickHere: {
    id: 'app.containers.Form.ForgetPasswordPage.clickHere',
    defaultMessage: 'click here',
  },
  toCreateOne: {
    id: 'app.containers.Form.ForgetPasswordPage.toCreateOne',
    defaultMessage: ' to register',
  },
  resetPasswordContentPart1: {
    id: 'ugroop.containers.ForgetPasswordPage.emailSuccessContentP1',
    defaultMessage: 'We have successfully reset your password for ',
  },
  login: {
    id: 'ugroop.containers.ForgetPasswordPage.login',
    defaultMessage: 'Back to Login',
  },
  subTitle: {
    id: 'ugroop.containers.ForgetPasswordPage.subTitle',
    defaultMessage:
      "Enter your email and we'll send you the security code to reset your password.",
  },
  verificationCode: {
    id: 'ugroop.containers.ForgetPasswordPage.securityCode',
    defaultMessage: 'Security Code',
  },
  alreadyHaveCode: {
    id: 'ugroop.containers.ForgetPasswordPage.haveSecurityCode',
    defaultMessage: 'Already have a security code?',
  },
  samePasswordErr: {
    id: 'ugroop.containers.ForgetPasswordPage.samePasswordErr',
    defaultMessage: '',
  },
});
