import { schema } from 'normalizr';

const eventAttachment = new schema.Entity('attachments');
const eventAttachments = [eventAttachment];
const activityDetail = new schema.Entity('activityDetail');
const event = new schema.Entity('events', {
  eventAttachments: [eventAttachment],
  detail: {
    activityDetails: [activityDetail],
  },
});
const events = [event];

const flightBooking = new schema.Entity('flightBookings');
const flightBookings = [flightBooking];

export const EVENT_SCHEMA = {
  events,
  flightBookings,
  attachment: eventAttachment,
  attachments: eventAttachments,
};
