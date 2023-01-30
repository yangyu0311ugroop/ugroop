import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import { TEMPLATE_API_NORMALISERS } from '../normalisers';

describe('apis/Template/normalisers', () => {
  describe('fetchEvents', () => {
    it('normalises correctly', () => {
      const result = {
        eventList: [{ id: 1 }],
        flightBookingList: [{ id: 2 }],
      };
      expect(TEMPLATE_API_NORMALISERS.fetchEvents(result)).toEqual({
        events: { 1: { id: 1 } },
        flightBookings: { 2: { id: 2 } },
      });
    });
  });

  describe('createEvent', () => {
    it('normalises correctly', () => {
      const result = {
        data: { id: 1 },
        node: { id: 2 },
      };
      const payload = { templateId: 3 };
      expect(
        TEMPLATE_API_NORMALISERS.createEvent(result, payload),
      ).toBeDefined();
    });
  });

  describe('patchEvent', () => {
    it('normalises correctly', () => {
      const payload = {
        data: {
          batchNode: { operations: [{ id: 2 }] },
          data: { id: 1 },
        },
      };
      expect(
        TEMPLATE_API_NORMALISERS.patchEvent(
          {
            data: {
              eventAttachments: [
                { id: 111, isDeleted: false },
                { id: 123, isDeleted: true },
              ],
            },
          },
          payload,
        ),
      ).toEqual({
        attachments: {
          111: { id: 111, isDeleted: false },
        },
        node: { 2: { id: 2 } },
        events: { 1: { id: 1, eventAttachments: [111] } },
        raw: { id: 1, eventAttachments: [{ id: 111, isDeleted: false }] },
      });
    });

    it('normalises correctly with transportation type', () => {
      const payload = {
        data: {
          batchNode: { operations: [{ id: 2 }] },
          data: { id: 1 },
        },
      };
      const result = {
        data: {
          detail: {
            activityDetails: [{ id: 2 }, { id: 3 }],
            detail: {
              type: 'subtype',
            },
          },
        },
      };

      expect(TEMPLATE_API_NORMALISERS.patchEvent(result, payload)).toEqual({
        activityDetail: { 2: { id: 2 }, 3: { id: 3 } },
        node: { 2: { id: 2 } },
        events: {
          1: {
            id: 1,
            detail: { detail: { type: 'subtype' }, activityDetails: [2, 3] },
          },
        },
        raw: {
          id: 1,
          detail: {
            detail: { type: 'subtype' },
            activityDetails: [{ id: 2 }, { id: 3 }],
          },
        },
      });
    });

    it('normalises correctly without node or data', () => {
      const payload = {
        data: {
          batchNode: { operations: [] },
        },
      };
      NODE_STORE_UTILS.parseEventNodeBatchOperations = jest.fn(() => null);
      expect(TEMPLATE_API_NORMALISERS.patchEvent({}, payload)).toEqual({
        raw: {},
      });
    });
  });

  describe('createFlightBooking', () => {
    it('normalises correctly', () => {
      const result = { id: 1 };
      expect(TEMPLATE_API_NORMALISERS.createFlightBooking(result)).toEqual({
        flightBookings: { 1: { id: 1 } },
      });
    });
  });

  describe('patchFlightBooking', () => {
    it('normalises correctly', () => {
      const result = { id: 1 };
      const payload = { data: { x: 1 } };
      expect(
        TEMPLATE_API_NORMALISERS.patchFlightBooking(result, payload),
      ).toEqual({
        flightBookings: { 1: { id: 1, x: 1 } },
      });
    });
  });

  describe('createEventAttachment', () => {
    it('should normalise attachment correctly', () => {
      const result = {
        id: 1,
        link: 'google.com',
      };
      const eventId = 1;
      const setValue = TEMPLATE_API_NORMALISERS.createEventAttachment(result, {
        eventId,
      });

      expect(setValue.eventAttachments({})).toEqual({
        1: {
          id: 1,
          link: 'google.com',
        },
      });
      expect(
        setValue.events({
          [eventId]: { eventAttachments: [] },
        }),
      ).toEqual({
        [eventId]: {
          eventAttachments: [1],
        },
      });
    });

    it('should normalise attachment correctly', () => {
      const result = [
        {
          id: 1,
          link: 'google.com',
        },
        {
          id: 2,
          link: 'example.com',
        },
      ];
      const eventId = 1;
      const setValue = TEMPLATE_API_NORMALISERS.createEventAttachment(result, {
        eventId,
      });

      expect(
        setValue.events({
          [eventId]: { eventAttachments: [] },
        }),
      ).toEqual({
        [eventId]: {
          eventAttachments: [1, 2],
        },
      });
    });
  });

  describe('patchEventAttachment', () => {
    it('should normalise attachment correctly', () => {
      const result = {
        id: 1,
        link: 'google.com',
      };
      const setValue = TEMPLATE_API_NORMALISERS.patchEventAttachment(result);

      expect(
        setValue.eventAttachments({
          1: {
            id: 1,
            link: 'yahoo.com',
          },
        }),
      ).toEqual({
        1: {
          id: 1,
          link: 'google.com',
        },
      });
    });
  });

  describe('getParticipants', () => {
    it('should return particular object shape', () => {
      const result = TEMPLATE_API_NORMALISERS.getParticipants({
        nodes: [{ id: 1 }],
        people: {},
      });

      expect(result.nodes({})).toEqual({ 1: { id: 1 } });
      expect(result.attachment({})).toEqual({});
    });
  });

  describe('deleteEventAttachment', () => {
    it('should normalise attachment correctly', () => {
      const result = {
        id: 1,
        link: 'google.com',
      };
      const eventId = 1;
      const attachmentId = 1;
      const setValue = TEMPLATE_API_NORMALISERS.deleteEventAttachment(result, {
        eventId,
        attachmentId,
      });

      expect(
        setValue.eventAttachments({
          1: {
            id: 1,
            link: 'yahoo.com',
          },
        }),
      ).toEqual({});

      expect(
        setValue.events({
          [eventId]: { eventAttachments: [1] },
        }),
      ).toEqual({
        [eventId]: {
          eventAttachments: [],
        },
      });
    });
  });
});
