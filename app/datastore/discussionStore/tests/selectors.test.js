import {
  DISCUSSION_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { DISCUSSION_STORE_DATA_SELECTORS } from '../selectors';

describe('datastore/discussionStore/utils', () => {
  describe('#normaliseTemplates()', () => {
    it('createdAt', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.createdAt(1)).toEqual([
        DISCUSSION_DATASTORE,
        'comments',
        1,
        'createdAt',
      ]);
    });
    it('createdAt', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.content(1)).toEqual([
        DISCUSSION_DATASTORE,
        'comments',
        1,
        'content',
      ]);
    });
    it('FeedBackcreatedAt', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.FeedBackcreatedAt(1)).toEqual([
        DISCUSSION_DATASTORE,
        'feedbacks',
        1,
        'createdAt',
      ]);
    });
    it('FeedBackContent', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.FeedBackContent([1, 1])).toEqual([
        DISCUSSION_DATASTORE,
        'comments',
        1,
        'content',
      ]);
    });
    it('feedBackSortBy', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.feedBackSortBy({
          parentId: 1,
          sortType: 'comments',
        }),
      ).toEqual([
        TEMPLATE_MANAGEMENT_VIEWSTORE,
        'feedback',
        'comments',
        1,
        'sortBy',
      ]);
    });
    it('feedBackSortOrder', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.feedBackSortOrder({
          parentId: 1,
          sortType: 'comments',
        }),
      ).toEqual([
        TEMPLATE_MANAGEMENT_VIEWSTORE,
        'feedback',
        'comments',
        1,
        'order',
      ]);
    });
    it('FeedBackcreatedAt', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.FeedBackContentCreatedAt([1, 1]),
      ).toEqual([DISCUSSION_DATASTORE, 'comments', 1, 'createdAt']);
    });

    it('tabTimeLine', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.tabTimeLine(1)).toEqual([
        DISCUSSION_DATASTORE,
        'templates',
        1,
        'children',
      ]);
    });
    it('FeedBackcreatedAt', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.FeedBackContentCreatedAt([1, 1]),
      ).toEqual([DISCUSSION_DATASTORE, 'comments', 1, 'createdAt']);
    });
    it('dayIds', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.dayIds(1)).toEqual([
        DISCUSSION_DATASTORE,
        'tabTimelines',
        1,
        'children',
      ]);
    });
    it('feedbackIds', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.feedbackIds(1)).toEqual([
        DISCUSSION_DATASTORE,
        'days',
        1,
        'feedbacks',
      ]);
    });
    it('commentIds', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.commentIds(1)).toEqual([
        DISCUSSION_DATASTORE,
        'feedbacks',
        1,
        'comments',
      ]);
    });
    it('templateFeedbacks', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.templateFeedbacks(1)).toEqual([
        DISCUSSION_DATASTORE,
        'templates',
        1,
        'feedbacks',
      ]);
    });
    it('discussionSortBy', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.discussionSortBy('somestore'),
      ).toEqual(['discussionStore', 'sortBy']);
    });
    it('discussionSortOrder', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.discussionSortOrder('somestore'),
      ).toEqual(['discussionStore', 'order']);
    });
    it('discussionFeedBackcreatedAt', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.discussionFeedBackcreatedAt([1, 1]),
      ).toEqual([DISCUSSION_DATASTORE, 'feedbacks', 1, 'createdAt']);
    });
    it('discussionCommentcreatedAt', () => {
      expect(
        DISCUSSION_STORE_DATA_SELECTORS.discussionCommentcreatedAt([1, 1]),
      ).toEqual([DISCUSSION_DATASTORE, 'comments', 1, 'createdAt']);
    });
    it('feedbackData', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.feedbackData(1)).toEqual([
        DISCUSSION_DATASTORE,
        'feedbacks',
        1,
      ]);
    });
    it('comments', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.comments('somestore')).toEqual([
        'discussionStore',
        'comments',
      ]);
    });
    it('feedbacks', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.feedbacks()).toEqual([
        'discussionStore',
        'feedbacks',
      ]);
    });
    it('days', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.days('somestore')).toEqual([
        'discussionStore',
        'days',
      ]);
    });
    it('templates', () => {
      expect(DISCUSSION_STORE_DATA_SELECTORS.templates('somestore')).toEqual([
        'discussionStore',
        'templates',
      ]);
    });
  });
});
