import { CLOSED, COMPLETED, OPEN, OUTSTANDING } from 'appConstants';
import { CHECKITEM, CHECKLIST } from 'utils/modelConstants';
import { CHECKLIST_HELPERS } from '../utils';

describe('CHECKLIST_HELPERS', () => {
  describe('CHECKITEM toggleStatus()', () => {
    it('should return null', () => {
      expect(
        CHECKLIST_HELPERS.toggleStatus(
          {
            status: COMPLETED,
            customData: {},
          },
          { me: 123 },
        ),
      ).toBe(null);
    });

    it('should return toggled status node', () => {
      const node = CHECKLIST_HELPERS.toggleStatus(
        {
          type: CHECKITEM,
          status: OUTSTANDING,
          customData: {},
        },
        { me: 123 },
      );
      expect(node.status).toBe(COMPLETED);
    });
  });

  describe('CHECKLIST toggleStatus()', () => {
    it('should return toggled status node #1', () => {
      const node = CHECKLIST_HELPERS.toggleStatus(
        {
          type: CHECKLIST,
          status: OPEN,
          customData: {},
        },
        { me: 123 },
      );
      expect(node.status).toBe(CLOSED);
    });

    it('should return toggled status node #2', () => {
      const node = CHECKLIST_HELPERS.toggleStatus(
        {
          type: CHECKLIST,
          status: CLOSED,
          customData: {},
        },
        { me: 123 },
      );
      expect(node.status).toBe(OPEN);
    });
  });
});
