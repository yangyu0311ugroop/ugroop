import {
  USER_REMINDER_FREQUENCY_DAYS,
  USER_REMINDER_ATTEMPTS,
  USER_REMINDER_DISABLED,
  USER_SEE_MORE_DISABLED,
} from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should have reminderFrequencyDays', () => {
      expect(CONFIG.value.reminderFrequencyDays({ userId: 1 })).toEqual(
        USER_REMINDER_FREQUENCY_DAYS({ id: 1 }),
      );
    });
    it('should have reminderAttempts', () => {
      expect(CONFIG.value.reminderAttempts({ userId: 1 })).toEqual(
        USER_REMINDER_ATTEMPTS({ id: 1 }),
      );
    });
    it('should have reminderDisabled', () => {
      expect(CONFIG.value.reminderDisabled({ userId: 1 })).toEqual(
        USER_REMINDER_DISABLED({ id: 1 }),
      );
    });
    it('should have seeMoreDisabled', () => {
      expect(CONFIG.value.seeMoreDisabled({ userId: 1 })).toEqual(
        USER_SEE_MORE_DISABLED({ id: 1 }),
      );
    });
  });
});
