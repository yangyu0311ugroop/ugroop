import { defineMessages } from 'react-intl';

export default defineMessages({
  sessionExpiredDialogTitle: {
    id: 'app.containers.ErrorDialog.sessionExpiredDialogTitle',
    defaultMessage: 'Session Expired',
  },
  sessionExpired: {
    id: 'app.containers.ErrorDialog.sessionExpired',
    defaultMessage: 'Your session has been expired',
  },
  sessionExpiredMessage: {
    id: 'app.containers.ErrorDialog.sessionExpiredMessage',
    defaultMessage:
      'For data security reasons you have been logged out of your uGroop account due to inactivity. You can change this time limit within the settings in your personal profile. Please login to your account again to continue.',
  },
  login: {
    id: 'app.containers.ErrorDialog.login',
    defaultMessage: 'Login',
  },
});
