import { NODE_API_UTILS } from 'apis/components/Node/utils';
import {
  ADD_IMAGE_SUCCESS,
  ADD_ROLE,
  BATCH_RECENT_ACTIVITY,
  CHANGE_ROLE,
  CREATE_EVENT,
  CREATE_EVENT_ATTACHMENT,
  CREATE_FLIGHT_BOOKING,
  DELETE_EVENT,
  DELETE_EVENT_ATTACHMENT,
  DELETE_FLIGHT_BOOKING,
  FETCH_EVENTS,
  FIND_ORGANISATION_ID,
  GET_PARTICIPANTS,
  GET_PEOPLE,
  GET_PERSON,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_FEATURED_LIST,
  GET_TEMPLATE_HASHKEY,
  INIT_TEMPLATE_SETTINGS,
  PATCH_EVENT,
  PATCH_EVENT_ATTACHMENT,
  PATCH_FLIGHT_BOOKING,
  REMOVE_TEMPLATE,
  REMOVE_USER_FROM_TOUR,
  UPSERT_TEMPLATE_SETTING,
  UPDATE_HASHKEY,
  ACCEPT_TOUR_OWNERSHIP,
  POST_HASHKEY,
  REMOVE_HASHKEY,
  LIST_TEMPLATE_CUSTOM_DATA,
  PATCH_TEMPLATE_CUSTOM_DATA,
  ADD_MY_OWN_ROLE,
  EMAIL_ME_EVENT_ADDRESS,
  CHANGE_CUSTOM_USER_ROLE,
  GET_ORG_MEMBERS,
} from 'apis/constants';
import { NODE_STORE } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import dotProp from 'dot-prop-immutable';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DAY, TAB_GALLERY, TEMPLATE } from 'utils/modelConstants';
import { requests } from 'utils/request';
import {
  CONFIG,
  convertChecklists,
  convertChildren,
  onUpdate,
} from '../config';
import { TEMPLATE_API_HELPERS } from '../helpers';

jest.mock('dot-prop-immutable', () => ({
  set: () => ({ id: 1 }),
}));

describe('apis/Template/config', () => {
  requests.fetchWithAuthorisation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.days).toEqual([NODE_STORE, 'nodes']);
    });
  });

  describe('#requests', () => {
    it('still matches snapshot', () => {
      CONFIG.requests[FETCH_EVENTS]({ id: 123 });
      CONFIG.requests[GET_TEMPLATE_DETAIL]({ id: 123 });
      CONFIG.requests[GET_TEMPLATE_HASHKEY]({ id: 123 });
      CONFIG.requests[GET_TEMPLATE_FEATURED_LIST]();
      CONFIG.requests[CREATE_EVENT]({ id: 123, data: { x: 1 } });
      CONFIG.requests[PATCH_EVENT]({
        id: 123,
        eventNodeId: 456,
        data: { x: 1 },
      });
      CONFIG.requests[DELETE_EVENT]({ id: 123, eventNodeId: 456 });
      CONFIG.requests[CREATE_FLIGHT_BOOKING]({
        templateId: 123,
        data: { x: 1 },
      });
      CONFIG.requests[PATCH_FLIGHT_BOOKING]({
        dataId: 456,
        templateId: 123,
        data: { x: 1 },
      });
      CONFIG.requests[DELETE_FLIGHT_BOOKING]({ dataId: 456, templateId: 123 });
      CONFIG.requests[BATCH_RECENT_ACTIVITY]({ id: 123 });
      CONFIG.requests[GET_PEOPLE]({ id: 123 });
      CONFIG.requests[GET_PERSON]({ id: 123, email: 'that@guy' });
      CONFIG.requests[CHANGE_ROLE]({
        id: 123,
        userId: 456,
        role: 'tour_viewer',
      });
      CONFIG.requests[REMOVE_TEMPLATE]({ id: 123 });
      CONFIG.requests[FIND_ORGANISATION_ID]({ id: 123 });

      CONFIG.requests[CREATE_EVENT_ATTACHMENT]({
        templateId: 123,
        eventId: 123,
        data: { x: 1 },
      });
      CONFIG.requests[CREATE_EVENT_ATTACHMENT]({
        templateId: 123,
        eventId: 123,
        data: [{ x: 1 }, { x: 2 }],
      });
      CONFIG.requests[DELETE_EVENT_ATTACHMENT]({
        attachmentId: 123,
        templateId: 123,
        eventId: 123,
        data: { x: 1 },
      });
      CONFIG.requests[PATCH_EVENT_ATTACHMENT]({
        attachmentId: 123,
        templateId: 123,
        eventId: 123,
        data: { x: 1 },
      });

      CONFIG.requests[REMOVE_USER_FROM_TOUR]({
        id: 123,
        userId: 1236,
        data: { token: '112' },
      });
      CONFIG.requests[INIT_TEMPLATE_SETTINGS]({ id: 123 });
      CONFIG.requests[UPSERT_TEMPLATE_SETTING]({
        id: 123,
        settingId: 3344,
        data: { some: 'data' },
      });
      CONFIG.requests[ADD_ROLE]({ role: 123, note: 'test' });

      CONFIG.requests[GET_PARTICIPANTS]({ id: 123 });
      CONFIG.requests[GET_PARTICIPANTS]({ id: 123, ids: [1, 2] });
      CONFIG.requests[ADD_IMAGE_SUCCESS]({ id: 123, ids: [1, 2] });
      CONFIG.requests[UPDATE_HASHKEY]({
        id: 123,
        payload: { description: 'description' },
      });
      CONFIG.requests[ACCEPT_TOUR_OWNERSHIP]({ id: 123, data: { x: 1 } });
      CONFIG.requests[POST_HASHKEY]({ id: 123 });
      CONFIG.requests[REMOVE_HASHKEY]({ id: 123 });
      CONFIG.requests[LIST_TEMPLATE_CUSTOM_DATA]({ where: { email: 'a' } });
      CONFIG.requests[PATCH_TEMPLATE_CUSTOM_DATA]({
        id: 1,
        data: { email: 'a' },
      });
      CONFIG.requests[ADD_MY_OWN_ROLE]({ id: 123, payload: { x: 1 } });
      CONFIG.requests[EMAIL_ME_EVENT_ADDRESS]({ id: 123, payload: { x: 1 } });
      CONFIG.requests[CHANGE_CUSTOM_USER_ROLE]({
        id: 123,
        userId: 1,
        payload: { x: 1 },
      });
      CONFIG.requests[GET_ORG_MEMBERS]({ id: 123 });

      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
  });

  describe('#processResult', () => {
    it('CHANGE_ROLE', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      expect(
        CONFIG.processResult[CHANGE_ROLE](
          { role: 'tour_viewer' },
          { token: 'some token' },
        ),
      ).toEqual({
        share: 'upsertObject',
        userNodes: 'upsertObject',
      });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith({
        'some token': { role: 'tour_viewer' },
      });
    });

    it('should process result of GET_TEMPLATE_DETAIL', () => {
      NODE_API_UTILS.getGalleryId = jest.fn(() => 11);
      NODE_API_UTILS.getTimelineId = jest.fn(() => 12);

      const template = {
        content: 'content',
        id: 1,
        customData: {
          shortDescription: 'shortDescription',
        },
        reactions: [],
        checklists: [],
        participants: [],
        interestedPeople: [
          {
            id: 1542,
            participantLinks: [
              {
                id: 5052,
                type: 'guardian',
                follower: {
                  id: 1542,
                },
              },
            ],
          },
        ],
      };
      TEMPLATE_API_HELPERS.getIds = jest.fn(() => [1, 2, 3]);

      CONFIG.processResult[GET_TEMPLATE_DETAIL](template);
    });

    it('FIND_ORGANISATION_ID', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      const result = CONFIG.processResult[FIND_ORGANISATION_ID]({
        id: 2233,
        calculated: { organisationId: 3311 },
      });

      expect(result).toMatchSnapshot();
      expect(
        result.nodes({ 2233: { content: 'some content' } })[2233],
      ).toMatchSnapshot();
    });
    it('GET_TEMPLATE_HASHKEY', () => {
      const hashkey = { hashkey: 'abcd', nodeId: 1, description: 'abcd' };
      expect(CONFIG.processResult[GET_TEMPLATE_HASHKEY](hashkey)).toEqual({
        nodes: 'upsertObject',
      });
    });
    it('GET_TEMPLATE_FEATURED_LIST', () => {
      const toursArray = [
        { id: 1, content: 'Tour 1' },
        { id: 2, content: 'Tour 2' },
      ];
      expect(
        CONFIG.processResult[GET_TEMPLATE_FEATURED_LIST](toursArray),
      ).toMatchSnapshot();
    });
    it('UPDATE_HASHKEY', () => {
      const getHashKeyDescription = {
        1: { haskeyDescription: 'abcd' || null },
      };
      expect(
        CONFIG.processResult[UPDATE_HASHKEY](getHashKeyDescription),
      ).toEqual({
        nodes: 'upsertObject',
      });
    });
    it('ACCEPT_TOUR_OWNERSHIP', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      expect(
        CONFIG.processResult[ACCEPT_TOUR_OWNERSHIP]({ notification: 1 }),
      ).toEqual({
        nodeTransfers: 'upsertObject',
      });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith(1);
    });
    it('CHANGE_CUSTOM_USER_ROLE', () => {
      expect(
        CONFIG.processResult[CHANGE_CUSTOM_USER_ROLE]({ id: 1 }, {}),
      ).toEqual({
        userNodes: 'upsertObject',
      });
      expect(
        CONFIG.processResult[CHANGE_CUSTOM_USER_ROLE](null, {
          userNodeId: 1,
          data: { userRole: 'user' },
        }),
      ).toEqual({
        userNodes: 'upsertObject',
      });
    });
  });

  describe('convertChildren', () => {
    it('should convert children', () => {
      arrays.convert = jest.fn();

      convertChildren([1, 2]);

      TEST_HELPERS.expectCalledAndMatchSnapshot(arrays.convert);
    });
  });

  describe('convertChecklists', () => {
    it('should convertChecklistsToArray', () => {
      arrays.convertChecklistsToArray = jest.fn(
        () => 'convertChecklistsToArray',
      );

      expect(convertChecklists()).toEqual('convertChecklistsToArray');
    });
  });

  describe('onUpdate', () => {
    it('should onUpdate DAY', () => {
      dotProp.set = jest.fn(() => 'dotProp.set');

      expect(onUpdate({ type: DAY })).toEqual('dotProp.set');
      TEST_HELPERS.expectCalledAndMatchSnapshot(dotProp.set);
    });

    it('should onUpdate TAB_GALLERY', () => {
      dotProp.set = jest.fn(() => 'dotProp.set');

      expect(onUpdate({ type: TAB_GALLERY })).toEqual('dotProp.set');
      TEST_HELPERS.expectCalledAndMatchSnapshot(dotProp.set);
    });

    it('should onUpdate others', () => {
      dotProp.set = jest.fn(() => 'dotProp.set');

      expect(onUpdate({ type: TEMPLATE })).toEqual('dotProp.set');
      TEST_HELPERS.expectCalledAndMatchSnapshot(dotProp.set);
    });
  });
});
