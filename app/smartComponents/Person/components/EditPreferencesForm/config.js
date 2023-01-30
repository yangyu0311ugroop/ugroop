import {
  USER_REMINDER_ATTEMPTS,
  USER_REMINDER_DISABLED,
  USER_SEE_MORE_DISABLED,
  USER_REMINDER_FREQUENCY_DAYS,
} from 'datastore/userStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    reminderFrequencyDays: ({ userId }) =>
      USER_REMINDER_FREQUENCY_DAYS({ id: userId }),
    reminderAttempts: ({ userId }) => USER_REMINDER_ATTEMPTS({ id: userId }),
    reminderDisabled: ({ userId }) => USER_REMINDER_DISABLED({ id: userId }),
    seeMoreDisabled: ({ userId }) => USER_SEE_MORE_DISABLED({ id: userId }),
  },

  setValue: {
    ...SET_VALUE,
  },
};
