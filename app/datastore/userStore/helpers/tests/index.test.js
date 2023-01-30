import { ACTIVE, CLOSED, OPEN, UPCOMING, PAST } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import {
  COMPLETED,
  CONFIRMED,
  PENDING,
} from 'datastore/invitationStore/constants';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import dotProp from 'dot-prop-immutable';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import {
  ADMIN,
  CHECKITEM,
  CHECKLIST,
  COLLABORATOR,
  OWNER,
  TOUR_ORGANIZER,
  TOUR_PARTICIPANT,
  TOUR_INTERESTED,
  TOUR_COLLABORATOR,
  TOUR_VIEWER,
  TAB_TIMELINE,
  DAY,
  TEMPLATE,
  EVENT_COACH,
} from 'utils/modelConstants';
import momentjs from 'moment';
import userStore, {
  helpers,
  openChecklistReducer,
  isNonContributor,
  accumulateDays,
  aggregateIds,
  convertChildren,
  onUpdate,
} from '../index';

describe('userStore/helpers/tests/index.test.js', () => {
  const users = [
    { email: 'jon@qq', id: 1, orgId: 123 },
    { email: 'foo@qq', id: 2, orgId: 123 },
    { email: 'bar@qq', id: 3, orgId: 123 },
  ];
  const shares = [
    { shareTo: 'jon@qq', status: PENDING },
    { shareTo: 'foo@qq', status: CONFIRMED },
    { shareTo: 'bar@qq', status: PENDING },
  ];

  describe('helpers.normaliseData()', () => {
    it('should return empty if !data', () => {
      expect(helpers.normaliseData('someKey', null)).toEqual({ someKey: {} });
    });

    it('should return normalise', () => {
      expect(helpers.normaliseData('user', users)).toEqual({
        user: {
          1: { email: 'jon@qq', id: 1, orgId: 123 },
          2: { email: 'foo@qq', id: 2, orgId: 123 },
          3: { email: 'bar@qq', id: 3, orgId: 123 },
        },
        result: [1, 2, 3],
      });
    });
  });

  describe('helpers.separateInvitations()', () => {
    it('should return empty', () => {
      expect(helpers.separateInvitations()).toEqual({
        invitationToMe: [],
        invitationFromMe: [],
        completedInvitationFromMe: [],
        completedInvitationToMe: [],
      });
    });

    it('should return normalise', () => {
      expect(
        helpers.separateInvitations(
          {
            1: { token: 1, shareFrom: 123, status: PENDING },
            2: { token: 2, shareFrom: 123 },
            3: { token: 3, shareFrom: 456, status: PENDING },
            4: { token: 4, shareFrom: 456 },
          },
          123,
        ),
      ).toEqual({
        invitationFromMe: [{ token: 1, shareFrom: 123, status: PENDING }],
        completedInvitationFromMe: [{ token: 2, shareFrom: 123 }],
        invitationToMe: [{ token: 3, shareFrom: 456, status: PENDING }],
        completedInvitationToMe: [{ token: 4, shareFrom: 456 }],
      });
    });
  });

  describe('helpers.separateShares()', () => {
    it('should return normalise', () => {
      expect(helpers.separateShares(shares)).toEqual({
        pending: [
          { shareTo: 'jon@qq', status: PENDING },
          { shareTo: 'bar@qq', status: PENDING },
        ],
        confirmed: [{ shareTo: 'foo@qq', status: CONFIRMED }],
      });
    });
  });

  describe('helpers.getInviteeId()', () => {
    it('should return {} if !user', () => {
      expect(helpers.getInviteeId({})).toEqual({});
    });

    it('should return data', () => {
      expect(helpers.getInviteeId({ users: [{ id: 123 }] })).toEqual({
        inviteeId: 123,
      });
    });
  });

  describe('helpers.getFromMeToMe()', () => {
    it('should return {} if !myUserId', () => {
      expect(helpers.getFromMeToMe(null, {})).toEqual({});
    });

    it('should return data - PENDING', () => {
      helpers.separateInvitations = jest.fn(() => ({
        invitationFromMe: [{ notificationToken: 123, shareFrom: 123 }],
        invitationToMe: [{ notificationToken: 456, shareToUserId: 123 }],
      }));

      expect(
        helpers.getFromMeToMe(1, { myUserId: 123, status: PENDING }),
      ).toEqual({
        fromMe: [123],
        toMe: [456],
      });
    });

    it('should return data - COMPLETED', () => {
      helpers.separateInvitations = jest.fn(() => ({
        completedInvitationFromMe: [{ notificationToken: 123, shareFrom: 123 }],
        completedInvitationToMe: [
          { notificationToken: 456, shareToUserId: 123 },
        ],
      }));

      expect(
        helpers.getFromMeToMe(1, { myUserId: 123, status: COMPLETED }),
      ).toEqual({
        completedFromMe: [123],
        completedToMe: [456],
      });
    });

    it('should return data - other', () => {
      helpers.separateInvitations = jest.fn(() => ({}));

      expect(
        helpers.getFromMeToMe(1, { myUserId: 123, status: 'some status' }),
      ).toEqual({});
    });
  });

  describe('helpers.normalise()', () => {
    it('should return data', () => {
      expect(
        helpers.normalise({
          nodeShares: [{ notificationToken: 12, shareFrom: 123 }],
          userNodes: [{ id: 444 }],
          nodeShareSubNode: [{ id: 1 }],
          nodeTransfer: [{ id: 1 }],
          notifications: [{ id: 23, content: 323 }],
          nodes: [{ id: 45, content: 432 }],
          persons: [{ userId: 56, content: 785 }],
          users: [{ id: 67, content: 589 }],
          organisations: [{ orgId: 89, id: 89, content: 421 }],
        }),
      ).toMatchSnapshot();
    });
    it('should return data', () => {
      expect(
        helpers.normalise({
          userNodes: [{ id: 444 }],
          notifications: [{ id: 23, content: 323 }],
          nodes: [{ id: 45, content: 432 }],
          persons: [{ userId: 56, content: 785 }],
          users: [{ id: 67, content: 589 }],
          organisations: [{ orgId: 89, id: 89, content: 421 }],
        }),
      ).toMatchSnapshot();
    });
    it('should return data w/o persons and organisations', () => {
      expect(
        helpers.normalise({
          nodeShares: [{ notificationToken: 12, shareFrom: 123 }],
          notifications: [{ id: 23, content: 323 }],
          nodes: [{ id: 45, content: 432 }],
          users: [{ id: 67, content: 589 }],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('helpers.normaliseChecklists()', () => {
    it('should return data', () => {
      expect(helpers.normaliseChecklists([{ id: 45, content: 432 }])).toEqual({
        45: { id: 45, content: 432 },
      });
    });
  });

  describe('helpers.upsertInvitations()', () => {
    it('should return data', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
      upsertHelpers.array = jest.fn(() => 'array');

      expect(
        helpers.upsertInvitations({
          nodeShare: { 12: { notificationToken: 12, shareFrom: 123 } },
          notification: { 23: { id: 23, content: 323 } },
          node: { 45: { id: 45, content: 432 } },
          person: { 56: { userId: 56, content: 785 } },
          user: { 67: { id: 67, content: 589 } },
          organisation: { 89: { id: 89, content: 421 } },
        }),
      ).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
    it('should return data if transfer', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
      upsertHelpers.array = jest.fn(() => 'array');

      expect(
        helpers.upsertInvitations({
          nodeShare: { 12: { notificationToken: 12, shareFrom: 123 } },
          notification: { 23: { id: 23, content: 323 } },
          node: { 45: { id: 45, content: 432 } },
          person: { 56: { userId: 56, content: 785 } },
          user: { 67: { id: 67, content: 589 } },
          organisation: { 89: { id: 89, content: 421 } },
          fromTransfer: true,
        }),
      ).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();
    });
  });

  describe('normaliseBatchRecentActivity()', () => {
    it('should match expected result', () => {
      const activity = { id: 1, userId: 2, lastAccessAt: '2001-01-01' };
      expect(userStore.normaliseBatchRecentActivity([activity])).toEqual({
        userActivities: { 2: { ...activity } },
      });
    });
    it('should match expected result w/o data', () => {
      expect(userStore.normaliseBatchRecentActivity()).toEqual({
        userActivities: undefined,
      });
    });
  });

  describe('normaliseGetPeople()', () => {
    it('should match expect (check carefully)', () => {
      const normalise = { nodeShare: 'normalise' };
      helpers.normalise = jest.fn(() => normalise);
      helpers.upsertInvitations = jest.fn(() => ({ hey: 'upsertInvitations' }));

      expect(userStore.normaliseGetPeople(999, { id: 999 })).toEqual({
        hey: 'upsertInvitations',
      });

      expect(helpers.normalise).toBeCalledWith(999);
      expect(helpers.upsertInvitations).toBeCalledWith(
        normalise,
        ARRAY_MODE.SET,
      );
    });
  });

  describe('normaliseGetPerson()', () => {
    it('should match expect (check carefully)', () => {
      const normalise = { nodeShare: 'normalise' };
      helpers.normalise = jest.fn(() => normalise);
      helpers.getInviteeId = jest.fn(() => ({ hi: 'getInviteeId' }));
      helpers.upsertInvitations = jest.fn(() => ({ ho: 'upsertInvitations' }));

      expect(userStore.normaliseGetPerson(999)).toEqual({
        hi: 'getInviteeId',
        ho: 'upsertInvitations',
      });

      expect(helpers.normalise).toBeCalledWith(999);
      expect(helpers.getInviteeId).toBeCalledWith(999);
      expect(helpers.upsertInvitations).toBeCalledWith(normalise);
    });
  });

  describe('normaliseGetInvitations()', () => {
    it('should match expect (check carefully)', () => {
      const normalise = { nodeShare: 'normalise' };
      helpers.normalise = jest.fn(() => normalise);
      helpers.getFromMeToMe = jest.fn(() => ({ hi: 'getFromMeToMe' }));
      helpers.upsertInvitations = jest.fn(() => ({ ho: 'upsertInvitations' }));

      expect(userStore.normaliseGetInvitations(999, 123)).toEqual({
        hi: 'getFromMeToMe',
        ho: 'upsertInvitations',
      });

      expect(helpers.normalise).toBeCalledWith(999);
      expect(helpers.getFromMeToMe).toBeCalledWith(normalise.nodeShare, 123);
      expect(helpers.upsertInvitations).toBeCalledWith(normalise);
    });
  });

  describe('normaliseGetTourTransfer()', () => {
    it('should not update node', () => {
      const normalise = { nodeShare: 'normalise', nodeTransfer: { nodeId: 1 } };
      helpers.upsertInvitations = jest.fn(() => normalise);
      expect(
        userStore.normaliseGetTourTransfer({}, { nodeId: 1, linkToken: 'abc' }),
      );
      expect(helpers.upsertInvitations).toBeCalled();
    });
    it('should insert node', () => {
      const normalise = { nodeShare: 'normalise', nodeTransfer: { nodeId: 1 } };
      helpers.upsertInvitations = jest.fn(() => normalise);
      helpers.normalise = jest.fn(() => normalise);
      expect(
        userStore.normaliseGetTourTransfer({}, { nodeId: 1, linkToken: 'abc' }),
      );
      expect(helpers.upsertInvitations).toBeCalled();
    });
    it('should not remove node', () => {
      const normalise = {
        nodeShare: 'normalise',
        nodeTransfer: { abc: 1 },
      };
      helpers.upsertInvitations = jest.fn(() => normalise);
      helpers.normalise = jest.fn(() => normalise);
      expect(
        userStore.normaliseGetTourTransfer({}, { nodeId: 1, linkToken: 'abc' }),
      );
      expect(helpers.upsertInvitations).toBeCalled();
    });
    it('should match expect (check carefully)', () => {
      const normalise = { nodeShare: 'normalise', nodeTransfer: { nodeId: 1 } };
      helpers.upsertInvitations = jest.fn(() => normalise);
      expect(userStore.normaliseGetTourTransfer({}, { nodeId: 1 }));
      expect(helpers.upsertInvitations).toBeCalled();
    });
  });

  describe('helpers.translateRole', () => {
    it('should return string based on role given to it', () => {
      const roles = [ADMIN, OWNER, COLLABORATOR, TOUR_ORGANIZER, 'customRole'];
      roles.forEach(role => {
        const translatedRole = helpers.translateRole(role);
        expect(translatedRole).toMatchSnapshot();
      });
    });
  });
  describe('helpers.updateNodes', () => {
    it('should update nodes', () => {
      expect(typeof helpers.updateNodes(1)({ 1: {} })).toBe('object');
    });
    it('should update nodes', () => {
      expect(typeof helpers.updateNodes(2)({ 1: {} })).toBe('object');
    });
    it('should not break', () => {
      expect(typeof helpers.updateNodes(2)()).toBe('object');
    });
    it('should not break with no nodeid', () => {
      expect(typeof helpers.updateNodes()()).toBe('object');
    });
  });
  describe('helpers.getTourStatus', () => {
    it('should status() PAST', () => {
      const startDate = '2018-05-05T16:23:45.6789Z';
      expect(helpers.getTourStatus({ startDate, duration: 10 })).toBeDefined();
    });
    it('should status() PAST', () => {
      const startDate = '2018-05-05T16:23:45.6789Z';
      const now = momentjs('2020-03-06T16:23:45.6789Z');

      expect(helpers.getTourStatus({ now, startDate, duration: 10 })).toBe(
        PAST,
      );
    });
    it('should status() ACTIVE', () => {
      const startDate = '2020-03-06T16:23:45.6789Z';
      const now = momentjs('2020-03-06T16:23:45.6789Z');
      expect(helpers.getTourStatus({ now, startDate, duration: 10 })).toBe(
        ACTIVE,
      );
    });
    it('should status() UPCOMING', () => {
      const startDate = '2020-03-06T07:24:45.6789Z';
      const now = momentjs('2020-03-05T03:59:59.6789Z');
      expect(helpers.getTourStatus({ now, startDate, duration: 10 })).toBe(
        UPCOMING,
      );
    });
  });
  describe('openChecklistReducer', () => {
    it('should return accumulate', () => {
      expect(
        openChecklistReducer({ 1: { type: CHECKITEM } })('accumulate', 1),
      ).toBe('accumulate');
      expect(
        openChecklistReducer({ 1: { type: CHECKLIST, status: CLOSED } })(
          'accumulate',
          1,
        ),
      ).toBe('accumulate');
      expect(
        openChecklistReducer({
          1: { type: CHECKLIST, status: OPEN, customData: null },
        })('accumulate', 1),
      ).toBe('accumulate');
      expect(
        openChecklistReducer({
          1: { type: CHECKLIST, status: OPEN, customData: { dueDate: null } },
        })('accumulate', 1),
      ).toBe('accumulate');
    });

    it('should return open checklist ids', () => {
      expect(
        openChecklistReducer({
          1: {
            id: 1,
            type: CHECKLIST,
            status: OPEN,
            customData: { dueDate: {} },
          },
        })([22], 1),
      ).toEqual([22, 1]);
    });
  });

  describe('userStore.normaliseGetChecklists', () => {
    it('should return accumulate', () => {
      const result = [
        {
          id: 1,
          type: TEMPLATE,
          customData: {},
          checklists: [
            {
              id: 2,
              type: CHECKLIST,
              status: OPEN,
              customData: { dueDate: {} },
            },
          ],
          children: [
            {
              id: 3,
              type: TAB_TIMELINE,
              children: [
                {
                  id: 4,
                  type: DAY,
                  nextNodes: [
                    {
                      id: 5,
                      type: DAY,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const oldNormaliseChecklists = helpers.normaliseChecklists;
      const oldNormaliseGetDays = helpers.normaliseGetDays;

      helpers.normaliseChecklists = jest.fn(() => ({
        1: { type: CHECKLIST, status: OPEN, customData: { dueDate: {} } },
      }));
      helpers.normaliseGetDays = jest.fn(() => ({
        dayIds: [2, 3],
        eventIds: [4, 5],
      }));

      expect(
        userStore.normaliseGetChecklists(result, { activeOnly: true }),
      ).toMatchSnapshot();
      expect(userStore.normaliseGetChecklists(result)).toMatchSnapshot();

      helpers.normaliseChecklists = oldNormaliseChecklists;
      helpers.normaliseGetDays = oldNormaliseGetDays;
    });

    it('should still work even if setValue returns empty object', () => {
      const result = [
        {
          id: 1,
          type: TEMPLATE,
          customData: {},
          checklists: [
            {
              id: 2,
              type: CHECKLIST,
              status: OPEN,
              customData: { dueDate: {} },
            },
          ],
          children: [
            {
              id: 3,
              type: TAB_TIMELINE,
              children: [
                {
                  id: 4,
                  type: DAY,
                  children: [
                    {
                      id: 3,
                      type: 'eventActivity',
                    },
                  ],
                  nextNodes: [
                    {
                      id: 5,
                      type: DAY,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const oldNormaliseChecklists = helpers.normaliseChecklists;
      const oldNormaliseGetDays = helpers.normaliseGetDays;

      helpers.normaliseChecklists = jest.fn(() => ({
        1: { type: CHECKLIST, status: OPEN, customData: { dueDate: {} } },
      }));
      helpers.normaliseGetDays = jest.fn(() => ({}));

      expect(userStore.normaliseGetChecklists(result)).toMatchSnapshot();

      helpers.normaliseChecklists = oldNormaliseChecklists;
      helpers.normaliseGetDays = oldNormaliseGetDays;
    });
  });

  describe('userStore.normaliseGetOrgInvitations', () => {
    it('should return empty object', () => {
      expect(userStore.normaliseGetOrgInvitations({})).toEqual({});
      expect(
        userStore.normaliseGetOrgInvitations({ orgInvitations: [] }),
      ).toEqual({});
    });

    it('should normalise', () => {
      expect(
        userStore.normaliseGetOrgInvitations({
          notifications: [{ id: 2233, notification: 'some notification' }],
          orgInvitations: [{ id: 2233, orgInvitation: 'some orgInvitation' }],
          organisations: [{ id: 123, organisation: 'some organisation' }],
          persons: [{ id: 3311, person: 'some person' }],
        }),
      ).toMatchSnapshot();
    });
  });
  describe('userStore.removePeople', () => {
    it('should match snapshot', () => {
      const result = userStore.removePeople(
        {
          invitationToken: '',
          removeTourUserNodeIds: [1, 2],
          hadRemovedInvite: false,
          linkeeNodeIds: [
            { role: 'participant', nodeId: 999 },
            { role: 'intereseted', nodeId: 888 },
            { nodeId: 888 },
          ],
        },
        { data: { token: 'abc', userNodeIds: [1] } },
      );
      expect(result).toMatchSnapshot();
      expect(result.shareIds(['abc', 'def'])).toEqual(['abc', 'def']);
    });
  });
  describe('userStore.removePeople', () => {
    it('should return false if role is non-contributor other wise return true', () => {
      expect(isNonContributor(TOUR_ORGANIZER)).toEqual(false);
      expect(isNonContributor(TOUR_COLLABORATOR)).toEqual(false);
      expect(isNonContributor(TOUR_VIEWER)).toEqual(false);
      expect(isNonContributor(TOUR_PARTICIPANT)).toEqual(true);
      expect(isNonContributor(TOUR_INTERESTED)).toEqual(true);
    });
  });
  describe('normaliseUserPreference', () => {
    it('should match snapshot', () => {
      const data = {
        userPreferenceResult: [
          {
            userId: 1,
            code: 'test',
            value: 'some value',
          },
        ],
      };
      expect(userStore.normaliseUserPreference(data)).toMatchSnapshot();
    });

    it('should match snapshot if userPreferenceResult is null', () => {
      const data = {
        userPreferenceResult: null,
      };
      expect(userStore.normaliseUserPreference(data)).toMatchSnapshot();
    });
  });
  describe('normalisePersonalPreference', () => {
    it('should match snapshot', () => {
      const result = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
      };
      const payload = { id: 1 };
      expect(
        userStore.normalisePersonalPreference(result, payload),
      ).toMatchSnapshot();
    });
  });
  describe('normaliseUpdatePersonalPreference', () => {
    it('should match snapshot', () => {
      const result = {
        1: '2',
      };
      const payload = { id: 1 };
      expect(
        userStore.normaliseUpdatePersonalPreference(result, payload),
      ).toMatchSnapshot();
    });
  });
  describe('normaliseUpdateUserPreference', () => {
    it('should match snapshot', () => {
      const data = {
        userPreferenceModel: {
          userId: 1,
          code: 'test',
          value: 'some value',
        },
      };
      expect(userStore.normaliseUpdateUserPreference(data)).toMatchSnapshot();
    });
  });
  describe('normaliseAddRole', () => {
    it('should match snapshot', () => {
      const data = {
        userPreferenceModel: { userId: 1, role: 'test' },
      };
      expect(userStore.normaliseAddRole(data)).toMatchSnapshot();
    });
  });

  describe('aggregatedIds', () => {
    it('should return new array for dayIds if target node is a day', () => {
      const nodes = {
        1: {
          type: DAY,
          id: 1,
        },
      };
      const result = aggregateIds({ nodes, allowedDays: [1], events: [] })(
        { dayIds: [], eventIds: [] },
        1,
      );

      expect(result.dayIds).toEqual([1]);
    });

    it('should return new array for eventIds if target node is an event', () => {
      const nodes = {
        2: {
          type: EVENT_COACH,
          id: 2,
          parentNodeId: 1,
        },
      };
      const result = aggregateIds({
        nodes,
        allowedDays: [1],
        events: [EVENT_COACH],
      })({ dayIds: [], eventIds: [] }, 2);

      expect(result.eventIds).toEqual([2]);
    });

    it('should return empty dayIds and eventIds if node type is not day nor an event', () => {
      const nodes = {
        1: {
          type: TAB_TIMELINE,
          id: 1,
        },
      };
      const result = aggregateIds({
        nodes,
        allowedDays: [1],
        events: [EVENT_COACH],
      })({ dayIds: [], eventIds: [] }, 1);

      expect(result.dayIds).toEqual([]);
      expect(result.eventIds).toEqual([]);
    });
  });

  describe('accumulateDays', () => {
    it('should return added day id if isDayBetween function returns true', () => {
      MOMENT_HELPERS.addDuration = jest.fn();
      MOMENT_HELPERS.isDayBetween = jest.fn(() => true);
      const nodes = {
        1: {
          id: 1,
        },
      };

      const result = accumulateDays('2019-05-15T09:14:24.388Z', nodes)(
        [],
        1,
        1,
      );

      expect(result).toEqual([1]);
    });

    it('should return no added day id if isDayBetween function returns false', () => {
      MOMENT_HELPERS.addDuration = jest.fn();
      MOMENT_HELPERS.isDayBetween = jest.fn(() => false);
      const nodes = {
        2: {
          id: 2,
        },
      };

      const result = accumulateDays('2019-05-15T09:14:24.388Z', nodes)(
        [1],
        2,
        1,
      );

      expect(result).toEqual([1]);
    });
  });

  describe('onUpdate', () => {
    it('should onUpdate DAY', () => {
      dotProp.set = jest.fn(() => 'dotProp.set');

      expect(onUpdate({ type: DAY })).toEqual('dotProp.set');
      TEST_HELPERS.expectCalledAndMatchSnapshot(dotProp.set);
    });

    it('should onUpdate others', () => {
      dotProp.set = jest.fn(() => 'dotProp.set');

      expect(onUpdate({ type: TEMPLATE })).toEqual('dotProp.set');
      TEST_HELPERS.expectCalledAndMatchSnapshot(dotProp.set);
    });
  });

  describe('convertChildren', () => {
    it('should convert children', () => {
      arrays.convert = jest.fn(() => 'arrays.convert');

      const result = convertChildren()();
      expect(result).toEqual('arrays.convert');
    });
  });
  describe('transFormNodeTrasFer', () => {
    it('should onUpdate DAY', () => {
      const nodeTransfer = {
        1: {
          id: 1,
          createdat: '1',
          updatedat: '2',
        },
      };
      expect(typeof userStore.transFormNodeTrasFer(nodeTransfer)).toBe(
        'object',
      );
    });

    it('should onUpdate others', () => {
      expect(typeof userStore.transFormNodeTrasFer()).toBe('object');
    });
  });
});
