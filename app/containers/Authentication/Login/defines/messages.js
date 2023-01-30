/**
 * Created by quando on 21/3/17.
 * Login Messages
 *
 * This contains all the text for the SamplePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  subTitle: {
    id: 'app.containers.Form.Login.subTitle',
    defaultMessage: 'Enter your email address and password',
  },
  emailLabel: {
    id: 'app.containers.Form.Login.emailLabel',
    defaultMessage: 'Email',
  },
  emailIsEmail: {
    id: 'app.containers.Form.Login.emailIsEmail',
    defaultMessage: 'Please enter a valid email address',
  },
  passwordLabel: {
    id: 'app.containers.Form.Login.passwordLabel',
    defaultMessage: 'Password',
  },
  passwordNotValid: {
    id: 'app.containers.Form.Login.passwordNotValid',
    defaultMessage:
      'Minimum 8 characters including at least one numeral, one lowercase and one uppercase letter.',
  },
  forgetPassword: {
    id: 'app.containers.Form.Login.forgetPassword',
    defaultMessage: 'Forgot your password?',
  },
  validButton: {
    id: 'app.containers.Form.Login.validButton',
    defaultMessage: 'Login',
  },
  invalidButton: {
    id: 'app.containers.Form.Login.requiredButton',
    defaultMessage: 'invalid email/password',
  },
  sendingButton: {
    id: 'app.containers.Form.Login.sendingButton',
    defaultMessage: 'Logging in..',
  },
  requiredButton: {
    id: 'app.containers.Form.Login.requiredButton',
    defaultMessage: 'all fields are required',
  },
  successButton: {
    id: 'app.containers.Form.Login.successButton',
    defaultMessage: 'Authenticated successfully..',
  },
  noAccount: {
    id: 'app.containers.Form.Login.noAccount',
    defaultMessage: "Don't have an account yet? ",
  },
  clickHere: {
    id: 'app.containers.Form.Login.clickHere',
    defaultMessage: 'click here',
  },
  toCreateOne: {
    id: 'app.containers.Form.Login.toCreateOne',
    defaultMessage: ' to register',
  },
  invitationSender: {
    id: 'app.containers.Form.Login.invitationSender',
    defaultMessage: '{sender} from {org}',
  },
  invitationInfo: {
    id: 'app.containers.Form.Login.invitationInfo',
    defaultMessage:
      ' invited you to work on their tour {tourName} as their {tourRole}. Please login to respond.',
  },
  loginAs: {
    id: 'app.containers.Form.Login.loginAs',
    defaultMessage: 'You will be logged in as {invitee}. ',
  },
  noValidationEmail: {
    id: 'app.containers.Form.Login.noValidationEmail',
    defaultMessage: 'Click Resend',
  },
  verificationMessageError: {
    id: 'app.containers.Form.Login.verificationMessageError',
    defaultMessage:
      'Before you can use your account please verify your email address from the uGroop Verification Link email sent to you. ' +
      'Please check your Spam folder if you cannot see it in your Inbox otherwise Click Resend for another verification email.',
  },
});
