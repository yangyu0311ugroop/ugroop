import {
  getOrganisationReminderDisabled,
  getOrganisationReminderFrequency,
  getOrganisationReminderAttempts,
} from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    reminderFrequencyDays: getOrganisationReminderFrequency,
    reminderAttempts: getOrganisationReminderAttempts,
    reminderDisabled: getOrganisationReminderDisabled,
  },
};
