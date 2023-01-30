import { defineMessages } from 'react-intl';

export default defineMessages({
  alreadyMember: {
    id:
      'app.containers.Templates.Modals.ShareList.components.Invitee.alreadyMember',
    defaultMessage:
      '{knownAs} is already {memberRole, select, admin {an} other {a}} {role} with {orgName} and as such may already have access to this tour. If you would like to add them as a contributor then use Join button in team members section below.',
  },
});
