import { DATASTORE_UTILS } from 'datastore/index';
import dotProp from 'dot-prop-immutable';
import { get } from 'lodash';

const insertFeedbackId = (id, feedbackId) => store => {
  const fbs = get(store, `${id}.feedbacks`, []);

  if (fbs.indexOf(feedbackId) === -1 && !!store) {
    return dotProp.set(store, `${id}.feedbacks`, feedbacks =>
      feedbacks.length ? [feedbackId, ...feedbacks] : [feedbackId],
    );
  }

  return store;
};

const insertCommentId = (id, commentId) => feedbacks => {
  const feedbackId = get(feedbacks, `${id}.id`);

  // feedback not exist
  if (!feedbackId) {
    const feedback = { id, comments: [commentId] };
    return { ...feedbacks, [id]: feedback };
  }

  const comments = get(feedbacks, `${id}.comments`, []);

  // insert if comment Id is not already in the list
  if (comments.indexOf(commentId) === -1) {
    return dotProp.merge(feedbacks, `${id}.comments`, [commentId]);
  }

  // otherwise do nothing
  return feedbacks;
};

const insertFeedbackData = feedback =>
  DATASTORE_UTILS.upsertObject(feedback.id, feedback);

const removeFeedbackData = id => feedbacks =>
  dotProp.delete(feedbacks, `${id}`);

const removeFeedbackId = (parentId, index) => store =>
  dotProp.delete(store, `${parentId}.feedbacks.${index}`);

const updateFeedbackData = (id, feedback) => feedbacks =>
  dotProp.merge(feedbacks, `${id}`, feedback);

const updateFeedbackStatus = (id, status) => feedbacks =>
  dotProp.set(feedbacks, `${id}.status`, status);

const updateComment = comment => comments =>
  dotProp.set(comments, `${comment.id}`, comment);

const removeCommentId = (feedbackId, commentIndex) => feedbacks =>
  dotProp.delete(feedbacks, `${feedbackId}.comments.${commentIndex}`);

const removeCommentById = (feedbackId, commentId) => feedbacks => {
  const comments = get(feedbacks, `${feedbackId}.comments`, []);
  const commentIndex = comments.indexOf(commentId);
  return dotProp.delete(feedbacks, `${feedbackId}.comments.${commentIndex}`);
};

const removeFeedbackById = (nodeId, feedbackId) => store => {
  const feedbacks = get(store, `${nodeId}.feedbacks`, []);
  const feedbackIndex = feedbacks.indexOf(feedbackId);
  return feedbackIndex >= 0
    ? dotProp.delete(store, `${nodeId}.feedbacks.${feedbackIndex}`)
    : store;
};

const insertCommentData = (comment, fromStream = false) => comments => {
  if (!get(comments, `${comment.id}.id`)) {
    return { ...comments, [comment.id]: { ...comment, fromStream } };
  }

  return comments;
};

const removeCommentData = commentId => comments =>
  dotProp.delete(comments, `${commentId}`);

export default {
  insertFeedbackId,
  insertCommentId,
  insertFeedbackData,
  removeFeedbackId,
  removeFeedbackById,
  removeFeedbackData,
  updateFeedbackData,
  updateFeedbackStatus,
  updateComment,
  removeCommentId,
  removeCommentById,
  removeCommentData,
  insertCommentData,
};
