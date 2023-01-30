import {
  DISCUSSION_DATASTORE,
  CREATED_AT,
  DEFAULT,
  ASC,
  DESC,
  CONTENT,
} from 'appConstants';
import { ARRAY_MODE } from 'utils/helpers/upsertStore';
import { COMMENT_STATUS } from 'containers/Templates/TemplateManagement/components/Comment/constants';
import utils, { KEYS, DISCUSSION_STORE_SORT_HELPER } from '../utils';

const makeFeedbacks = () => [
  { status: COMMENT_STATUS.OPEN, createdAt: '2018-05-28T16:23:45.6789' },
];
const makeDay = (id = 3) => ({
  id,
  feedbacks: makeFeedbacks(),
});
const makeTabTimeline = (id = '2', children = [makeDay()]) => ({
  id,
  children,
});
const makeTemplate = (id = 1, children = [makeTabTimeline()]) => ({
  id,
  children,
  feedbacks: makeFeedbacks(),
});
const makeTemplates = (
  templates = [makeTemplate(1), makeTemplate(10, makeTabTimeline(20))],
) => [...templates];

describe('datastore/discussionStore/utils', () => {
  describe('#normaliseTemplates()', () => {
    it('normalised data still matches snapshot', () => {
      const data = makeTemplates();
      const result = utils.normaliseTemplates(data);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#makeSetValueObj()', () => {
    const makeSnapshot = obj => {
      const snapshot = {};
      Object.entries(obj).forEach(kv => {
        snapshot[kv[0]] = kv[1]();
      });
      return snapshot;
    };

    it('still matches snapshot in default mode', () => {
      const data = makeTemplates();
      const normalised = utils.normaliseTemplates(data);
      const obj = utils.makeSetValueObj(normalised);
      expect(makeSnapshot(obj)).toMatchSnapshot();
    });

    it('returns correct TEMPLATE_IDS in SET mode', () => {
      const data = makeTemplates();
      const normalised = utils.normaliseTemplates(data);
      const obj = utils.makeSetValueObj(normalised, ARRAY_MODE.SET);
      expect(makeSnapshot(obj)[KEYS.TEMPLATE_IDS]).toEqual(['1', '10']);
    });

    it('returns correct TEMPLATE_IDS in APPEND mode', () => {
      const data = makeTemplates();
      const normalised = utils.normaliseTemplates(data);
      const obj = utils.makeSetValueObj(normalised, ARRAY_MODE.APPEND);
      expect(makeSnapshot(obj)[KEYS.TEMPLATE_IDS]).toEqual(['1', '10']);
    });

    it('returns correct TEMPLATE_IDS in PREPEND mode', () => {
      const data = makeTemplates();
      const normalised = utils.normaliseTemplates(data);
      const obj = utils.makeSetValueObj(normalised, ARRAY_MODE.PREPEND);
      expect(makeSnapshot(obj)[KEYS.TEMPLATE_IDS]).toEqual(['10', '1']);
    });
  });

  describe('#makeSetValueConfig()', () => {
    it('still matches snapshot', () => {
      expect(utils.makeSetValueConfig()).toMatchSnapshot();
    });
  });

  describe('#selectTemplateIds()', () => {
    it('returns correct key path', () => {
      expect(utils.selectTemplateIds()).toEqual([
        DISCUSSION_DATASTORE,
        KEYS.TEMPLATE_IDS,
      ]);
    });
  });
  describe('#selectTemplate()', () => {
    it('returns correct key path', () => {
      const templateId = 1;
      expect(utils.selectTemplate(templateId)).toEqual([
        DISCUSSION_DATASTORE,
        KEYS.TEMPLATES,
        templateId,
      ]);
    });
  });
  describe('#selectTabTimelines()', () => {
    it('returns correct key path', () => {
      expect(utils.selectTabTimelines()).toEqual([
        DISCUSSION_DATASTORE,
        KEYS.TAB_TIMELINES,
      ]);
    });
  });
  describe('#selectDay()', () => {
    it('returns correct key path', () => {
      const dayId = 1;
      expect(utils.selectDay(dayId)).toEqual([
        DISCUSSION_DATASTORE,
        KEYS.DAYS,
        dayId,
      ]);
    });
  });
  describe('#selectDays()', () => {
    it('returns correct key path', () => {
      expect(utils.selectDays()).toEqual([DISCUSSION_DATASTORE, KEYS.DAYS]);
    });
  });
  describe('#selectNode()', () => {
    it('returns correct key path', () => {
      const nodeId = 1;
      const nodeTypeTemplate = 'template';
      const nodeTypeDay = 'day';
      expect(utils.selectNode(nodeId, nodeTypeTemplate)).toEqual(
        utils.selectTemplate(nodeId),
      );
      expect(utils.selectNode(nodeId, nodeTypeDay)).toEqual(
        utils.selectDay(nodeId),
      );
    });
  });

  describe('#getDayIds()', () => {
    it('returns correct value', () => {
      const dayIds = [3, 4];
      const tabId = 2;
      const template = makeTemplate(1, [tabId]);
      const tabs = { [tabId]: makeTabTimeline(tabId, dayIds) };
      expect(utils.getDayIds(template, tabs)).toEqual(dayIds);
    });
  });

  describe('#getUnresolvedFeedbackCountForNode()', () => {
    it('returns correct count', () => {
      expect(utils.getUnresolvedFeedbackCountForNode(makeTemplate())).toEqual(
        1,
      );
    });

    it('returns correct count when no template', () => {
      expect(utils.getUnresolvedFeedbackCountForNode()).toEqual(0);
    });
  });

  describe('#getUnresolvedFeedbackCountForTemplateAndDays()', () => {
    it('returns correct count', () => {
      const dayIds = [3, 4, 30];
      const tabIds = [2, 20];
      const template = makeTemplate(1, tabIds);
      const tabs = {
        [tabIds[0]]: makeTabTimeline(tabIds[0], dayIds),
        [tabIds[1]]: null,
      };
      const days = {
        [dayIds[0]]: makeDay(dayIds[0]),
        [dayIds[1]]: makeDay(dayIds[1]),
        [dayIds[2]]: null,
      };
      expect(
        utils.getUnresolvedFeedbackCountForTemplateAndDays(
          template,
          tabs,
          days,
        ),
      ).toEqual(3);
    });

    it('returns correct count when no template', () => {
      expect(utils.getUnresolvedFeedbackCountForTemplateAndDays()).toEqual(0);
    });
  });
  describe('#getLatestDiscussionForTemplateAndDays()', () => {
    it('returns latest discussion date', () => {
      const dayIds = [3, 4, 30];
      const tabIds = [2, 20];
      const template = makeTemplate(1, tabIds);
      const tabs = {
        [tabIds[0]]: makeTabTimeline(tabIds[0], dayIds),
        [tabIds[1]]: { children: [30] },
      };
      const days = {
        [dayIds[0]]: makeDay(dayIds[0]),
        [dayIds[1]]: makeDay(dayIds[1]),
        [dayIds[2]]: { feedbacks: [] },
      };
      expect(
        utils.getLatestDiscussionForTemplateAndDays(template, tabs, days),
      ).toMatchSnapshot();
    });

    it('w/o template feedback', () => {
      const tabIds = [2];
      const dayIds = [3, 4];
      const template = { feedbacks: [], children: [1, 2] };
      const tabs = { [tabIds[0]]: makeTabTimeline(tabIds[0], [3, 4, 5]) };
      const days = {
        [dayIds[0]]: makeDay(dayIds[0]),
        [dayIds[1]]: makeDay(dayIds[1]),
      };
      expect(
        utils.getLatestDiscussionForTemplateAndDays(template, tabs, days),
      ).toMatchSnapshot();
    });

    it('returns none', () => {
      expect(utils.getLatestDiscussionForTemplateAndDays()).toEqual('');
    });
  });
  describe('DISCUSSION_STORE_SORT_HELPER()', () => {
    it('#getSortOrderSelector', () => {
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderSelector(
          CREATED_AT,
          'comments',
        ),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderSelector(CONTENT, 'comments'),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderSelector(DEFAULT, 'comments'),
      ).toMatchSnapshot();
    });
  });
  describe('DISCUSSION_MAIN_STORE_SORT_HELPER()', () => {
    it('#getSortOrderDiscussionSelector', () => {
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderDiscussionSelector(
          'createdAt',
        ),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderDiscussionSelector('content'),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortOrderDiscussionSelector('default'),
      ).toMatchSnapshot();
    });
  });
  describe('sortTime()', () => {
    const date1 = '1234-12-21 13:34:56.789';
    const date2 = '2345-12-21 13:34:56.789';
    it('should sort ASC', () => {
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(ASC)([date1], [])).toBe(1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(ASC)([], [date1])).toBe(-1);

      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(ASC)([date1], [date2])).toBe(
        -1,
      );
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(ASC)([date1], [date1])).toBe(
        -1,
      );
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(ASC)([date2], [date1])).toBe(
        1,
      );
    });

    it('should sort DESC', () => {
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(DESC)([date1], [])).toBe(-1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortTime(DESC)([], [date1])).toBe(1);

      expect(
        DISCUSSION_STORE_SORT_HELPER.sortTime(DESC)([date1], [date2]),
      ).toBe(1);
      expect(
        DISCUSSION_STORE_SORT_HELPER.sortTime(DESC)([date1], [date1]),
      ).toBe(-1);
      expect(
        DISCUSSION_STORE_SORT_HELPER.sortTime(DESC)([date2], [date1]),
      ).toBe(-1);
    });
  });
  describe('sortValue()', () => {
    it('should sort ASC', () => {
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(ASC)([1], [])).toBe(1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(ASC)([], [1])).toBe(-1);

      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(ASC)([1], [2])).toBe(-1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(ASC)([1], [1])).toBe(-1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(ASC)([2], [1])).toBe(1);
    });

    it('should sort DESC', () => {
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(DESC)([1], [])).toBe(-1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(DESC)([], [1])).toBe(1);

      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(DESC)([1], [2])).toBe(1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(DESC)([1], [1])).toBe(-1);
      expect(DISCUSSION_STORE_SORT_HELPER.sortValue(DESC)([2], [1])).toBe(-1);
    });
  });
  describe('getSortFunction()', () => {
    it('should return selector', () => {
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortFunction(CREATED_AT),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortFunction(CREATED_AT),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortFunction(CONTENT),
      ).toMatchSnapshot();
      expect(
        DISCUSSION_STORE_SORT_HELPER.getSortFunction('some other value'),
      ).toMatchSnapshot();
    });
  });
  describe('getSortFunction()', () => {
    it('should return selector', () => {
      expect(utils.getVal([[1]], 0, 0)).toEqual(1);
    });
  });
});
