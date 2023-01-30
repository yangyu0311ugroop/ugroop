import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ShareList.components.SeeDetail.messages.title',
    defaultMessage: 'Remove User From Tour',
  },
  removeRoletitle: {
    id: 'ShareList.components.SeeDetail.messages.removeRoletitle',
    defaultMessage: 'Remove User as {role}',
  },
  titleMe: {
    id: 'ShareList.components.SeeDetail.messages.titleMe',
    defaultMessage: 'Leave this Tour',
  },
  removedRoletitleMe: {
    id: 'ShareList.components.SeeDetail.messages.removedRoletitleMe',
    defaultMessage: 'Leave role as {role}',
  },
  headlineDelete: {
    id: 'ShareList.components.SeeDetail.messages.title.headlineDelete',
    defaultMessage: 'You are about to remove: ',
  },
  headlineDeleteRole: {
    id: 'ShareList.components.SeeDetail.messages.title.headlineDeleteRole',
    defaultMessage: 'You are about to remove the role of {roleText} to: ',
  },
  headlineDeleteMe: {
    id: 'ShareList.components.SeeDetail.messages.title.headlineDeleteMe',
    defaultMessage: 'You are about to leave this tour',
  },
  headlineDeleteMeRole: {
    id: 'ShareList.components.SeeDetail.messages.title.headlineDeleteMeRole',
    defaultMessage:
      'You are about to leave  the role of {roleText} to this tour',
  },
  text: {
    id: 'ShareList.components.SeeDetail.messages.text',
    defaultMessage:
      'Are you sure you want to remove {personName} as a {role} from this tour?',
  },
  textMe: {
    id: 'ShareList.components.SeeDetail.messages.text',
    defaultMessage:
      'Are you sure you want to remove yourself as a {role} from this tour?',
  },
  confirmRemoveText: {
    id: 'ShareList.components.SeeDetail.messages.confirmRemoveText',
    defaultMessage: 'Go ahead and remove',
  },
  leaveTourText: {
    id: 'ShareList.components.SeeDetail.messages.confirmRemoveText',
    defaultMessage: 'Leave the tour',
  },
  removeUserText: {
    id: 'ShareList.components.SeeDetail.messages.confirmRemoveText',
    defaultMessage: 'Remove',
  },
  removeUserWarning: {
    id: 'ShareList.components.SeeDetail.messages.removeUserWarning',
    defaultMessage:
      'You are about to remove {personName} entirely from this tour, this means {adj} {person} may not be able to access the tour anymore. ' +
      '{toJoin}. Are you sure you want {final}?.',
  },
});
