import { schema } from 'normalizr';

export const KEYS = {
  TEMPLATES: 'templates',
  TAB_TIMELINES: 'tabTimelines',
  DAYS: 'days',
  FEEDBACKS: 'feedbacks',
  COMMENTS: 'comments',
};

export const feedbackStrat = (value, parent) => ({
  ...value,
  nodeId: parent.nodeId,
});

const comments = new schema.Entity(
  KEYS.COMMENTS,
  {},
  { processStrategy: feedbackStrat },
);
const feedbacks = new schema.Entity(KEYS.FEEDBACKS, {
  comments: [comments],
});
// const day = new schema.Entity(KEYS.DAYS);
const day = new schema.Entity(KEYS.DAYS, { feedbacks: [feedbacks] });

const tabTimeline = new schema.Entity(KEYS.TAB_TIMELINES, {
  children: [day],
});

const template = new schema.Entity(KEYS.TEMPLATES, {
  children: [tabTimeline],
  feedbacks: [feedbacks],
});

export default {
  templates: [template],
};
