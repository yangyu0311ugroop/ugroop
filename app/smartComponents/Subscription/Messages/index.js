import { defineMessages } from 'react-intl';

export default defineMessages({
  CONTRIBUTOR_GUIDE: {
    id: 'app.containers.Buymore.ContributorSeats.Guide',
    defaultMessage:
      'At the tour level, the Org seat calculation = total of active Our Team\n' +
      'total of Contributors that do not belong to active Our Team. The\n' +
      'total number of Contributors can never exceed the plan, but they do\n' +
      'not need to be part of the active org team.',
  },
  CONTRIBUTOR_ORGSEAT: {
    id: 'app.containers.Buymore.ContributorSeats.Guide.ACTIVE',
    defaultMessage:
      'Your organisation plan has {orgSeats} of which there are {activeMember}{pendingMembers}',
  },
  CONTRIBUTOR_RESULT_WITH_OUTSIDEORG_CONTRIBUTOR: {
    id: 'app.containers.Buymore.CONTRIBUTOR_RESULT_WITH_OUTSIDEORG_CONTRIBUTOR',
    defaultMessage:
      'This tour has {outSideConnected} added, resulting in {equation} available seats to be used.',
  },
  CONTRIBUTOR_RESULT: {
    id: 'app.containers.Buymore.ContributorSeats.Guide.RESULT',
    defaultMessage: 'Resulting in {equation} available seats to be used.',
  },
  CONTRIBUTOR_FREE: {
    id: 'app.containers.Buymore.ContributorSeats.Guide.FREE.EXAMPLE',
    defaultMessage:
      'Your free organisation plan allow you to connect one viewer on any tour.',
  },
  confirmBtn: {
    id: 'app.containers.Buymore.ContributorSeats.Guide.confirmBtn',
    defaultMessage: 'Got it',
  },
});
