import {
  DISCUSSION_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
const SORT_TYPE = {
  TOPIC: 'feedbacks',
  COMMENTS: 'comments',
};

const feedbacks = () => [DISCUSSION_DATASTORE, 'feedbacks'];
const comments = () => [DISCUSSION_DATASTORE, 'comments'];
const createdAt = id => [DISCUSSION_DATASTORE, 'comments', id, 'createdAt'];
const content = id => [DISCUSSION_DATASTORE, 'comments', id, 'content'];
const FeedBackcreatedAt = id => [
  DISCUSSION_DATASTORE,
  'feedbacks',
  id,
  'createdAt',
];
const tabTimeLine = id => [DISCUSSION_DATASTORE, 'templates', id, 'children'];
const dayIds = id => [DISCUSSION_DATASTORE, 'tabTimelines', id, 'children'];
const feedbackIds = id => [DISCUSSION_DATASTORE, 'days', id, 'feedbacks'];
const commentIds = id => [DISCUSSION_DATASTORE, 'feedbacks', id, 'comments'];
const feedbackData = id => [DISCUSSION_DATASTORE, 'feedbacks', id];
const templateFeedbacks = id => [
  DISCUSSION_DATASTORE,
  'templates',
  id,
  'feedbacks',
];
const FeedBackContent = id => [
  DISCUSSION_DATASTORE,
  'comments',
  id[0],
  'content',
];
const FeedBackContentCreatedAt = id => [
  DISCUSSION_DATASTORE,
  'comments',
  id[0],
  'createdAt',
];

const discussionFeedBackcreatedAt = id => [
  DISCUSSION_DATASTORE,
  'feedbacks',
  id[0],
  'createdAt',
];
const discussionCommentcreatedAt = id => [
  DISCUSSION_DATASTORE,
  'comments',
  id[0],
  'createdAt',
];
const days = () => [DISCUSSION_DATASTORE, 'days'];
const templates = () => [DISCUSSION_DATASTORE, 'templates'];

const createAtSelect = {
  [SORT_TYPE.COMMENTS]: createdAt,
  [SORT_TYPE.TOPIC]: FeedBackcreatedAt,
};
const contentSelect = {
  [SORT_TYPE.COMMENTS]: content,
  [SORT_TYPE.TOPIC]: FeedBackContentCreatedAt,
};
const feedBackSortBy = ({
  parentId,
  sortType,
  viewStore = TEMPLATE_MANAGEMENT_VIEWSTORE,
}) => [viewStore, 'feedback', sortType, parentId, 'sortBy'];
const feedBackSortOrder = ({
  parentId,
  sortType,
  viewStore = TEMPLATE_MANAGEMENT_VIEWSTORE,
}) => [viewStore, 'feedback', sortType, parentId, 'order'];

const discussionSortBy = ({ viewStore = DISCUSSION_DATASTORE }) => [
  viewStore,
  'sortBy',
];
const discussionSortOrder = ({ viewStore = DISCUSSION_DATASTORE }) => [
  viewStore,
  'order',
];

export const DISCUSSION_STORE_DATA_SELECTORS = {
  createdAt,
  content,
  feedBackSortBy,
  feedBackSortOrder,
  feedbacks,
  createAtSelect,
  contentSelect,
  FeedBackcreatedAt,
  FeedBackContent,
  FeedBackContentCreatedAt,
  discussionSortBy,
  discussionSortOrder,
  tabTimeLine,
  dayIds,
  feedbackIds,
  commentIds,
  discussionFeedBackcreatedAt,
  discussionCommentcreatedAt,
  templateFeedbacks,
  feedbackData,
  days,
  templates,
  comments,
};
