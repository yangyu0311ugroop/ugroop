/**
 * Created by paulcedrick on 7/13/17.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  ugAddTemplateModalHeader: {
    id: 'app.components.UGAddTemplateModal.ugAddTemplateModalHeader',
    defaultMessage: 'A new adventure',
  },
  ugAddTemplateModalSub: {
    id: 'app.components.UGAddTemplateModal.ugAddTemplateModalSub',
    defaultMessage:
      'The first step in creating an excellent itinerary, enter a few key questions and then start building and sharing with others.',
  },
  startDayPlaceholder: {
    id: 'app.components.UGAddTemplateModal.Body.startDayPlaceholder',
    defaultMessage: 'Start Day',
  },
  templateTitlePlaceholder: {
    id: 'app.components.UGAddTemplateModal.Body.templateTitlePlaceholder',
    defaultMessage: 'Tour Title',
  },
  templateType: {
    id: 'app.components.UGAddTemplateModal.Body.templateType',
    defaultMessage: 'Type',
  },
  templateDescriptionPlaceholder: {
    id: 'app.componets.UGAddTemplateModal.Body.templateDescriptionPlaceholder',
    defaultMessage: 'Tour Description',
  },
  numberOfDaysPlaceholder: {
    id: 'app.components.UGAddTemplateModal.Body.numberOfDaysPlaceholder',
    defaultMessage: 'Tour Description',
  },
  validButton: {
    id: 'app.containers.Form.Login.validButton',
    defaultMessage: 'Create',
  },
  invalidButton: {
    id: 'app.containers.Form.Login.invalidButton',
    defaultMessage: "something's wrong",
  },
  sendingButton: {
    id: 'app.containers.Form.Login.sendingButton',
    defaultMessage: 'sending to server',
  },
  requiredButton: {
    id: 'app.containers.Form.Login.requiredButton',
    defaultMessage: 'all fields marked with an asterisk (*) are required',
  },

  titleLabel: {
    id: 'app.components.UGAddTemplateModal.Body.titleLabel',
    defaultMessage: 'Title',
  },
  titleHelper: {
    id: 'app.components.UGAddTemplateModal.Body.titleHelper',
    defaultMessage: 'please fill in your tour title',
  },
  titleValid: {
    id: 'app.components.UGAddTemplateModal.Body.titleValid',
    defaultMessage: 'looks good',
  },
  titleMinLength: {
    id: 'app.components.UGAddTemplateModal.Body.titleMinLength',
    defaultMessage: 'try a bit longer (min: 5)',
  },
  titleMaxLength: {
    id: 'app.components.UGAddTemplateModal.Body.titleMaxLength',
    defaultMessage: 'too long (max: 100)',
  },

  descLabel: {
    id: 'app.components.UGAddTemplateModal.Body.descLabel',
    defaultMessage: 'Description',
  },
  descHelper: {
    id: 'app.components.UGAddTemplateModal.Body.descHelper',
    defaultMessage: 'worry free, you can change this anytime',
  },

  displayDateLabel: {
    id: 'app.components.UGAddTemplateModal.Body.displayDateLabel',
    defaultMessage: 'When will this Tour start?',
  },
  displayDateNone: {
    id: 'app.components.UGAddTemplateModal.Body.displayDateNone',
    defaultMessage: "I'm not sure yet",
  },
  displayDateWeekDay: {
    id: 'app.components.UGAddTemplateModal.Body.displayDateWeekDay',
    defaultMessage: 'I know the day of week',
  },
  displayDateStartDate: {
    id: 'app.components.UGAddTemplateModal.Body.displayDateStartDate',
    defaultMessage: 'I know the exact date',
  },

  durationLabel: {
    id: 'app.components.UGAddTemplateModal.Body.durationLabel',
    defaultMessage: 'Duration of tour',
  },
  durationHelperText: {
    id: 'app.components.UGAddTemplateModal.Body.durationHelperText',
    defaultMessage: 'worry free, you can change this anytime',
  },
  durationValidText: {
    id: 'app.components.UGAddTemplateModal.Body.durationValidText',
    defaultMessage: "all good, I'll create for you",
  },
  durationExtra1: {
    id: 'app.components.UGAddTemplateModal.Body.durationExtra2',
    defaultMessage: 'We have a limit of 50 days per Tour',
  },
  durationExtra2: {
    id: 'app.components.UGAddTemplateModal.Body.durationExtra2',
    defaultMessage:
      "If you have a longer tour, it's suggested to separate into multiple stages.",
  },

  redirectLabel: {
    id: 'app.components.UGAddTemplateModal.Body.redirectLabel',
    defaultMessage: 'redirect me to Tour page after create.',
  },

  dateLabel: {
    id: 'app.components.UGAddTemplateModal.Body.dateLabel',
    defaultMessage: 'Select Date',
  },
  dateAfterError: {
    id: 'app.components.UGAddTemplateModal.Body.dateValidText',
    defaultMessage: 'should not be in the past',
  },

  dayLabel: {
    id: 'app.components.UGAddTemplateModal.Body.dayLabel',
    defaultMessage: 'Select Day of Week',
  },
  dayAfterError: {
    id: 'app.components.UGAddTemplateModal.Body.dayValidText',
    defaultMessage: 'should not be in the past',
  },

  durationLessThanError: {
    id: 'app.components.UGAddTemplateModal.Body.durationLessThanError',
    defaultMessage: 'Duration should be less than 50',
  },
  durationGreaterThanError: {
    id: 'app.components.UGAddTemplateModal.Body.durationGreaterThanError',
    defaultMessage: 'Duration should be greater than 0',
  },
});
