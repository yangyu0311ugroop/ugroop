import { CLOSED, COMPLETED } from 'appConstants';
import { NODE_STATUS_HELPERS } from '../helpers';

describe('Status/helpers.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(NODE_STATUS_HELPERS).toMatchSnapshot();
    });
  });

  describe('isClosed()', () => {
    it('should return isClosed', () => {
      expect(NODE_STATUS_HELPERS.isClosed(CLOSED)).toBe(true);
      expect(NODE_STATUS_HELPERS.isClosed(COMPLETED)).toBe(false);
    });
  });

  describe('isCompleted()', () => {
    it('should return isCompleted', () => {
      expect(NODE_STATUS_HELPERS.isCompleted(COMPLETED)).toBe(true);
      expect(NODE_STATUS_HELPERS.isCompleted(CLOSED)).toBe(false);
    });
  });
  describe('isCancelled()', () => {
    it('should return isCancelled', () => {
      expect(NODE_STATUS_HELPERS.isCancelled('cancelled')).toBe(true);
      expect(NODE_STATUS_HELPERS.isCancelled(CLOSED)).toBe(false);
    });
  });
});
