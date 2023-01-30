/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/layouts/Attendance/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      EVENT_STORE_DATA_SELECTORS.hasAttendance = jest.fn(() => 'hasAttendance');
      const { value } = CONFIG();
      expect(value.hasAttendance).toEqual(
        EVENT_STORE_DATA_SELECTORS.hasAttendance(),
      );
    });
  });
});
