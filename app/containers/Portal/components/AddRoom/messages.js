import { defineMessages } from 'react-intl';

export default defineMessages({
  roomCountLabelSub: {
    id: 'app.containers.Portal.components.AddRoom.roomCountLabelSub',
    defaultMessage:
      'How many rooms do you want to add?. You can add more rooms at the same time.',
  },
  roomCountLabel: {
    id: 'app.containers.Portal.components.AddRoom.roomCountLabel',
    defaultMessage: 'Number of Rooms to Add',
  },
  guestCountLabelSub: {
    id: 'app.containers.Portal.components.AddRoom.guestCountLabelSub',
    defaultMessage: 'How many Pax can the room accomodate.',
  },
  bedCountLabelSub: {
    id: 'app.containers.Portal.components.AddRoom.bedCountLabelSub',
    defaultMessage: 'How many Beds.',
  },
  roomTypeLabelSub: {
    id: 'app.containers.Portal.components.AddRoom.roomTypeLabelSub',
    defaultMessage: 'What is the room type you want to add.',
  },
  roomTypeLabel: {
    id: 'app.containers.Portal.components.AddRoom.roomTypeLabel',
    defaultMessage: 'Room Type',
  },
  roomCountLessThanError: {
    id: 'app.components.UGAddTemplateModal.Body.roomCountLessThanError',
    defaultMessage: 'Rooms to add should be less than 10',
  },
  roomCountGreaterThanError: {
    id: 'app.components.UGAddTemplateModal.Body.roomCountGreaterThanError',
    defaultMessage: 'Rooms to add should be greater than 0',
  },
  guestCountLessThanError: {
    id: 'app.components.UGAddTemplateModal.Body.guestCountLessThanError',
    defaultMessage: 'Rooms to add should be less than 50',
  },
  guestCountGreaterThanError: {
    id: 'app.components.UGAddTemplateModal.Body.guestCountGreaterThanError',
    defaultMessage: 'Rooms to add should be greater than 0',
  },
  bedCountLessThanError: {
    id: 'app.components.UGAddTemplateModal.Body.bedCountLessThanError',
    defaultMessage: 'Bed to add should be less than 50',
  },
  bedCountGreaterThanError: {
    id: 'app.components.UGAddTemplateModal.Body.bedCountGreaterThanError',
    defaultMessage: 'Bed to add should be greater than 0',
  },
  titleMinLength: {
    id: 'app.components.UGAddTemplateModal.Body.titleMinLength',
    defaultMessage: 'try a bit longer (min: 5)',
  },
  titleMaxLength: {
    id: 'app.components.UGAddTemplateModal.Body.titleMaxLength',
    defaultMessage: 'too long (max: 100)',
  },
});
