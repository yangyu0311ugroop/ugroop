import { defineMessages } from 'react-intl';

export default defineMessages({
  invitationNotForYou: {
    id:
      'app.containers.Dashboard.components.DashboardIndex.invitationNotForYou',
    defaultMessage: 'THE INVITATION YOU OPENED IS NOT FOR THIS ACCOUNT',
  },
  youAreLoggedInAs: {
    id: 'app.containers.Dashboard.components.DashboardIndex.youAreLoggedInAs',
    defaultMessage:
      'You are logged in as {me} while this invitation is for {shareTo}',
  },
  switchAccount: {
    id: 'app.containers.Dashboard.components.DashboardIndex.switchAccount',
    defaultMessage: 'Switch Account',
  },
  ignore: {
    id: 'app.containers.Dashboard.components.DashboardIndex.ignore',
    defaultMessage: 'Ignore',
  },
  welcome: {
    id: 'app.containers.Dashboard.components.DashboardIndex.welcome',
    defaultMessage: 'Welcome, {fullName}',
  },
});
