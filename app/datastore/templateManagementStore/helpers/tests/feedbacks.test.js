import dotProp from 'dot-prop-immutable';
import helpers from '../feedbacks';

describe('Feedback helpers', () => {
  const store = {
    1: { id: 1, content: 'abcd', feedbacks: [11] },
    2: { id: 2, content: 'efgh', feedbacks: [] },
  };
  const feedbacks = {
    11: { id: 11, comments: [], status: 'open' },
    12: { id: 12, comments: [121, 122] },
    1233: { id: 1233, comments: [121, 122] },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insertFeedbackId', () => {
    it('should insertFeedbackId', () => {
      expect(helpers.insertFeedbackId(1, 12)(store)).toEqual(
        dotProp.set(store, `${1}.feedbacks`, fbs => [12, ...fbs]),
      );
    });

    it('should insertFeedbackId if no current feedbacks', () => {
      expect(helpers.insertFeedbackId(2, 12)(store)).toEqual(
        dotProp.set(store, `${2}.feedbacks`, [12]),
      );
    });

    it('should NOT insertFeedbackId if feedbackId exist', () => {
      expect(helpers.insertFeedbackId(1, 11)(store)).toEqual(store);
    });
  });

  describe('insertCommentId', () => {
    it('should create new feedback', () => {
      expect(helpers.insertCommentId(13, 131)(feedbacks)).toEqual({
        ...feedbacks,
        13: { id: 13, comments: [131] },
      });
    });

    it('should add new comment', () => {
      expect(helpers.insertCommentId(11, 111)(feedbacks)).toEqual(
        dotProp.merge(feedbacks, `${11}.comments`, [111]),
      );
    });

    it('should NOT do anything', () => {
      expect(helpers.insertCommentId(12, 121)(feedbacks)).toEqual(feedbacks);
    });
  });

  describe('insertFeedbackData', () => {
    it('should create new feedback', () => {
      expect(
        helpers.insertFeedbackData({
          id: 1233,
          content: 'new topic',
          expect: 'not override comments',
        })(feedbacks),
      ).toEqual({
        ...feedbacks,
        1233: {
          id: 1233,
          content: 'new topic',
          expect: 'not override comments',
          comments: [121, 122],
        },
      });
    });
  });

  describe('removeFeedbackData', () => {
    it('should delete feedback', () => {
      expect(helpers.removeFeedbackData(11)(feedbacks)).toEqual(
        dotProp.delete(feedbacks, `${11}`),
      );
    });
  });

  describe('removeFeedbackId', () => {
    it('should delete feedback from store', () => {
      expect(helpers.removeFeedbackId(1, 0)(store)).toEqual(
        dotProp.delete(store, `${1}.feedbacks.${0}`),
      );
    });
  });

  describe('updateFeedbackData', () => {
    it('should update feedback data', () => {
      expect(
        helpers.updateFeedbackData(11, { status: 'resolved' })(feedbacks),
      ).toEqual(dotProp.merge(feedbacks, `${11}`, { status: 'resolved' }));
    });
  });

  describe('updateFeedbackStatus', () => {
    it('should update feedback status', () => {
      expect(helpers.updateFeedbackStatus(11, 'resolved')(feedbacks)).toEqual(
        dotProp.set(feedbacks, `${11}.status`, 'resolved'),
      );
    });

    it('should NOT update feedback status', () => {
      expect(helpers.updateFeedbackStatus(11, 'open')(feedbacks)).toEqual(
        feedbacks,
      );
    });
  });

  describe('updateComment', () => {
    it('should update comments', () => {
      expect(
        helpers.updateComment({ id: 1, content: 'testsss' })(store),
      ).toEqual(dotProp.set(store, `${1}`, { id: 1, content: 'testsss' }));
    });
  });

  describe('removeCommentId', () => {
    it('should removeCommentId', () => {
      expect(helpers.removeCommentId(12, 0)(feedbacks)).toEqual(
        dotProp.delete(feedbacks, `${12}.comments.${0}`),
      );
    });
  });

  describe('removeCommentById', () => {
    it('should removeCommentById', () => {
      expect(helpers.removeCommentById(12, 121)(feedbacks)).toEqual(
        dotProp.delete(feedbacks, `${12}.comments.${0}`),
      );
    });
  });

  describe('removeFeedbackById', () => {
    it('should removeFeedbackById', () => {
      expect(helpers.removeFeedbackById(1, 11)(store)).toEqual(
        dotProp.delete(store, `${1}.feedbacks.${0}`),
      );
    });
    it('should not faile removeFeedbackById', () => {
      expect(helpers.removeFeedbackById(1, 999)(store)).toEqual(store);
    });
  });

  describe('insertCommentData', () => {
    it('should not insert if exist', () => {
      expect(helpers.insertCommentData({ id: 1 })(store)).toEqual(store);
    });

    it('should insertCommentData', () => {
      expect(
        helpers.insertCommentData({ id: 3, content: '333' }, true)(store),
      ).toEqual({ ...store, 3: { id: 3, content: '333', fromStream: true } });
    });
  });

  describe('removeCommentData', () => {
    it('should removeCommentData', () => {
      expect(helpers.removeCommentData(1)(store)).toEqual(
        dotProp.delete(store, `${1}`),
      );
    });
  });
});
