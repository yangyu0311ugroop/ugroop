import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.viewComponents.People.InterestedPersonDeleteConfirmation.title',
    defaultMessage: 'Remove follower',
  },
  headlineWithName: {
    id:
      'app.viewComponents.People.InterestedPersonDeleteConfirmation.headlineWithName',
    defaultMessage: 'You are about to remove {firstName} {lastName}',
  },
  headlineWithoutName: {
    id:
      'app.viewComponents.People.InterestedPersonDeleteConfirmation.headlineWithoutName',
    defaultMessage: 'You are about to remove a follower',
  },
  text: {
    id: 'app.viewComponents.People.InterestedPersonDeleteConfirmation.text',
    defaultMessage: 'Related participants will not be removed, are you sure?',
  },
  confirmButton: {
    id:
      'app.viewComponents.People.InterestedPersonDeleteConfirmation.confirmButton',
    defaultMessage: 'Go ahead and remove',
  },
});
