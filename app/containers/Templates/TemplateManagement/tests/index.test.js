import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import {
  FETCH_EVENTS,
  GET_PEOPLE,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_TAB_DETAIL,
  TEMPLATE_API,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import tabHelper from 'datastore/templateManagementStore/helpers/tab';
import templateHelper from 'datastore/templateManagementStore/helpers/template';
import DATASTORE_UTILS from 'datastore/utils';
/**
 * Created by quando on 1/9/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import {
  PARTICIPANT_LINKEE,
  REACTION,
  TAB_GALLERY,
  TAB_OTHER,
} from 'utils/modelConstants';
import { TEMPLATE_API_EVENT_UTILS } from '../../../../apis/components/Template/utils/events';
import { recentActivityIds, TemplateManagement } from '../index';

jest.mock('modernizr', () => 'mock');
jest.mock('react-device-detect', () => ({ getUA: 'abcd' }));

describe('Templates/TemplateManagement/tests/index.test.js', () => {
  const fireBaseMock = {
    unsubscribeTourLiveUpdate: jest.fn(),
    subscribeTourLiveUpdate: jest.fn(),
  };

  const resagaMock = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const params = { id: 1, userId: 1 };
  const templateId = 999;
  const location = { pathname: 'pathname', query: 'query' };
  const match = { params: { id: 2 } };
  let rendered;
  let instance;
  beforeEach(() => {
    MOMENT_HELPERS.getNow = jest.fn(() => 'now');
    tabHelper.upsert = jest.fn();
    templateHelper.insertTabId = jest.fn();
    templateHelper.removeTabId = jest.fn();
    rendered = shallow(
      <TemplateManagement
        history={history}
        id={templateId}
        params={params}
        location={location}
        resaga={resagaMock}
        firebase={fireBaseMock}
        match={match}
        classes={{}}
      />,
    );
    instance = rendered.instance();
    instance.getPeopleSuccess = jest.fn();
    jest.clearAllMocks();
  });

  describe('<TemplateManagement />', () => {
    it('should exists', () => {
      expect(TemplateManagement).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('renderChatComponent', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        location: {
          search: '?messenger=true',
          pathname: '/tours/1535',
        },
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderChatComponent);
    });
  });

  describe('componentDidMount()  ', () => {
    it('should call fetchData', () => {
      instance.tourIdFromURL = jest.fn(() => 1);
      instance.fetchData = jest.fn();

      instance.componentDidMount();

      expect(instance.tourIdFromURL).toHaveBeenCalled();
      expect(instance.fetchData).toHaveBeenCalled();
    });

    it('should call fetchData', () => {
      instance.tourIdFromURL = jest.fn(() => 0);
      instance.fetchData = jest.fn();

      instance.componentDidMount();

      expect(instance.tourIdFromURL).toHaveBeenCalled();
      expect(instance.fetchData).not.toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps()  ', () => {
    it('should call handleFetchData', () => {
      rendered.setProps({
        match: { params: { id: 1 } },
      });
      const nextProps = {
        match: { params: { id: 2 } },
      };

      instance.handleFetchData = jest.fn();
      rendered.setProps({ location: { pathname: '1' } });
      instance.componentWillReceiveProps(nextProps);
      expect(instance.handleFetchData).toHaveBeenCalled();
    });
    it('should call opendrawer', () => {
      const nextProps = {
        location: { pathname: '2', search: '3' },
        match: { params: { id: 2 } },
      };
      instance.openDiscussionDrawFromQueryString = jest.fn();
      rendered.setProps({ location: { pathname: '1', search: '2' } });
      instance.componentWillReceiveProps(nextProps);
      expect(instance.openDiscussionDrawFromQueryString).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount()  ', () => {
    it('should call resetData', () => {
      instance.resetData = jest.fn();

      instance.componentWillUnmount();

      expect(instance.resetData).toBeCalledWith();
      expect(fireBaseMock.unsubscribeTourLiveUpdate).toHaveBeenCalled();
    });
  });

  describe('fetchEventCalls()  ', () => {
    it('should call dispatchTo', () => {
      instance.handleGetTreeSuccess = jest.fn();
      instance.fetchEvents(1, 1)();
      expect(resagaMock.dispatchTo).toBeCalledWith(TEMPLATE_API, FETCH_EVENTS, {
        payload: { templateId: 1 },
        onSuccess: instance.handleGetTreeSuccess(1),
      });
    });
  });

  describe('handleFetchData()', () => {
    it('should handleFetchData', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleFetchData);
    });
    it('should handleFetchData if !this.debouncedFetchData', () => {
      instance.debouncedFetchData = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.handleFetchData);
    });
  });

  describe('refreshTourData', () => {
    it('shall call resagaMock.setValue and set live update box state to be true', () => {
      instance.refreshTourData();

      expect(instance.state.showLiveUpdateBox).toBe(false);
      expect(resagaMock.setValue).toHaveBeenCalled();
    });
  });

  describe('onCloseTransferModal', () => {
    it('should call setValue', () => {
      instance.onCloseTransferModal();

      expect(resagaMock.setValue).toBeCalled();
      expect(resagaMock.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('closeSnackBar', () => {
    it('shall call fetch data and set live update box state to be true', () => {
      instance.state.showLiveUpdateBox = true;
      instance.closeSnackBar(null, 'clickaway');
      expect(instance.state.showLiveUpdateBox).toBe(true);
      instance.closeSnackBar(null, '');
      expect(instance.state.showLiveUpdateBox).toBe(false);
    });
  });

  describe('handleGetTreeSuccess', () => {
    it('shall call right method', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      instance.handleGetTreeSuccess(1)();
      expect(NODE_API_HELPERS.getTreeAndTimes).toHaveBeenCalledWith(
        { id: 1 },
        instance.props,
      );
    });
  });

  describe('renderSnackBarIcon', () => {
    it('shall match snapshot', () => {
      const data = instance.renderSnackBarIcon();
      expect(toJSON(data)).toMatchSnapshot();
    });
  });

  describe('renderSnackContent', () => {
    it('shall match snapshot', () => {
      const data = instance.renderSnackContent();
      expect(toJSON(data)).toMatchSnapshot();
    });
  });

  describe('shallLiveUpdate check userId', () => {
    it('shall match snapshot', () => {
      const data = instance.shallLiveUpdate(1, 1);
      expect(data).toBe(false);
      const data2 = instance.shallLiveUpdate(undefined, 1);
      expect(data2).toBe(true);
      const data3 = instance.shallLiveUpdate(2, 1);
      expect(data3).toBe(true);
    });
  });
  describe('handleLiveUpdate', () => {
    it('DO NOTHING with different user agent', () => {
      instance.handleLiveUpdate(1)({ response: { userAgent: 'abcd' } });
      expect(resagaMock.dispatchTo).not.toHaveBeenCalled();
    });
    it('shall call right method 1', () => {
      NODE_API_HELPERS.getNode = jest.fn();
      instance.handleLiveUpdate(1)({
        response: { userAgent: 'abcsd', method: 'tourInvitation' },
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_API,
        GET_PEOPLE,
        {
          payload: { id: 999 },
          onSuccess: instance.getPeopleSuccess,
        },
      );
    });
    it('shall call right method 2', () => {
      instance.handleLiveUpdate(1)({
        response: { userAgent: 'abcsd', method: 'acceptTourInvitation' },
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_API,
        GET_PEOPLE,
        {
          payload: { id: 999 },
          onSuccess: instance.getPeopleSuccess,
        },
      );
    });
    it('shall call right method 3', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'abcsd',
          method: 'Node.updateNode',
          type: 'participant',
          id: 3,
        },
      });
      expect(NODE_API_HELPERS.getNode).toHaveBeenCalled();
    });
    it('shall call right method 3a', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'abcsd',
          method: 'Node.updateNode',
          type: 'activity',
          id: 3,
        },
      });
      expect(resagaMock.setValue).toHaveBeenCalled();
    });
    it('shall call right method 4', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'abcsd',
          method: 'Node.createChild',
          type: 'participant',
          id: 3,
        },
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_API,
        GET_TEMPLATE_DETAIL,
        { payload: { id: 999 } },
      );
    });
    it('shall call right method 5', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'abcsd',
          method: 'other',
          type: 'participant',
          id: 3,
        },
      });
      expect(instance.state.showLiveUpdateBox).toBe(1);
    });
    it('should call getParticipants if there is participant_linkee in userNodes', () => {
      rendered.setProps({
        id: 1,
      });
      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'acceptTourInvitation',
          userNodes: [
            {
              nodeId: 2,
              role: 'another_role',
            },
            {
              nodeId: 1,
              role: PARTICIPANT_LINKEE,
            },
          ],
        },
      });

      expect(TEMPLATE_API_HELPERS.getParticipants).toBeCalled();
      expect(TEMPLATE_API_HELPERS.getParticipants.mock.calls).toMatchSnapshot();
    });
    it('should call getParticipants and template detail if method is Pub.pubCreateInterest', () => {
      rendered.setProps({
        id: 1,
      });
      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'Pub.pubCreateInterest',
          result: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      });
      expect(TEMPLATE_API_HELPERS.getParticipants).toBeCalled();
      expect(TEMPLATE_API_HELPERS.getParticipants.mock.calls).toMatchSnapshot();
    });
    it('should call template detail if method is Pub.pubCreateInterest without ids', () => {
      rendered.setProps({
        id: 1,
      });
      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'Pub.pubCreateInterest',
          result: [],
        },
      });
      expect(TEMPLATE_API_HELPERS.getParticipants).not.toBeCalled();
    });
    it('should call addImagesInGallerySuccess', () => {
      rendered.setProps({
        id: 1,
      });
      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'addImagesInGallerySuccess',
          galleryId: 1,
        },
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_TAB_API,
        GET_TEMPLATE_TAB_DETAIL,
        {
          payload: { tab: { id: 1, type: TAB_GALLERY } },
        },
      );
    });
    it('should call Template.deleteEvent', () => {
      rendered.setProps({
        id: 1,
      });
      const deleteFn = jest.fn();
      TEMPLATE_API_EVENT_UTILS.deleteEvent = jest.fn(() => deleteFn);

      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'Template.deleteEvent',
          result: [],
        },
      });
      expect(deleteFn).toBeCalled();
    });
    it('should call Node.deleteChildren', () => {
      rendered.setProps({
        id: 1,
      });

      instance.handleLiveUpdate(1)({
        response: {
          method: 'Node.deleteChildren',
          type: TAB_OTHER,
        },
      });

      TEST_HELPERS.expectCalled(resagaMock.setValue);
    });
    it('should call Template.createEvent', () => {
      rendered.setProps({
        id: 1,
      });

      instance.handleLiveUpdate(1)({
        response: {
          method: 'Template.createEvent',
          type: TAB_OTHER,
        },
      });
      expect(resagaMock.dispatchTo).toMatchSnapshot();
    });
    it('should call InternalWebhook.createEvent', () => {
      rendered.setProps({
        id: 1,
      });

      instance.handleLiveUpdate(1)({
        response: {
          method: 'InternalWebhook.createEvent',
          type: TAB_OTHER,
        },
      });
      expect(resagaMock.dispatchTo).toMatchSnapshot();
    });
    it('should call Node.createNextNode', () => {
      instance.handleLiveUpdate(1)({
        response: {
          method: 'Node.createNextNode',
          type: TAB_OTHER,
        },
      });

      TEST_HELPERS.expectCalled(resagaMock.setValue);
    });
    it('shall setValue if link type is reaction', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
      DATASTORE_UTILS.upsertArray = jest.fn(() => jest.fn(() => 'upsertArray'));
      MOMENT_HELPERS.getNow = jest.fn(() => 'now');
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'aaaa',
          method: 'Node.createLink',
          id: 3,
          result: {
            content: { type: 'like' },
            id: 1,
            userNode: [{ id: 2 }],
            prevNodeId: 11,
            nextNodeId: 111,
            type: REACTION,
          },
        },
      });
      expect(resagaMock.setValue).toBeCalled();
      expect(resagaMock.setValue.mock.calls).toMatchSnapshot();
    });

    it('shall not setValue if link type is not reaction', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
      DATASTORE_UTILS.upsertArray = jest.fn(() => jest.fn(() => 'upsertArray'));
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'aaaa',
          method: 'Node.createLink',
          id: 3,
          result: {
            content: { type: 'like' },
            id: 1,
            userNode: [{ id: 2 }],
            prevNodeId: 11,
            nextNodeId: 111,
          },
        },
      });
      expect(resagaMock.setValue).not.toBeCalled();
    });

    it('should not call setValue if linkType is not reaction', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'aaaa',
          method: 'Node.deleteLink',
          id: 3,
          result: {
            id: 5,
            linkId: 5,
            linkType: 'other',
          },
        },
      });
      expect(resagaMock.setValue).not.toBeCalled();
    });

    it('should not call setValue if linkType is not reaction', () => {
      instance.handleLiveUpdate(1)({
        response: {
          userAgent: 'aaaa',
          method: 'Node.deleteLink',
          id: 3,
          result: {
            id: 5,
            linkId: 5,
            linkType: REACTION,
          },
        },
      });
      expect(resagaMock.setValue).toBeCalled();
      expect(resagaMock.setValue.mock.calls).toMatchSnapshot();
    });

    it('should call get people with decline tour invitation', () => {
      instance.getPeopleSuccess = jest.fn();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'declineTourInvitation',
          type: TAB_OTHER,
        },
      });
      expect(resagaMock.dispatchTo).toBeCalled();
    });
  });

  describe('resetData()  ', () => {
    it('should call resaga.setValue', () => {
      instance.resetData();
      instance.handleLiveUpdate(1)({
        response: {
          method: 'Template.createNextNode',
          type: TAB_OTHER,
        },
      });
      expect(resagaMock.setValue).toBeCalled();
    });
  });

  describe('fetchData()  ', () => {
    it('should call resaga.dispatch', () => {
      instance.fetchData();

      expect(resagaMock.dispatchTo).toHaveBeenCalled();
      expect(resagaMock.dispatch.mock.calls).toMatchSnapshot();
    });

    it('should NOT call resaga.dispatch', () => {
      rendered.setProps({ id: 0 });

      instance.fetchData();

      expect(resagaMock.dispatch).not.toBeCalled();
    });

    it('should call resaga.dispatch with event Data', () => {
      instance.fetchData(1, 1, true);

      expect(resagaMock.dispatchTo).toHaveBeenCalled();
      expect(resagaMock.dispatch.mock.calls).toMatchSnapshot();
    });
  });

  describe('onSuccessFetchData', () => {
    it('should setValue', () => {
      instance.openDiscussionDrawFromQueryString = jest.fn();
      const templates = {
        1: { templatesettings: { value: true, customData: {} } },
      };

      instance.onSuccessFetchData(1)({ templates });

      expect(instance.openDiscussionDrawFromQueryString).toBeCalled();
    });

    it('should call unsubscribeTourLiveUpdate', () => {
      instance.onSuccessFetchData(1, 1)({});

      expect(resagaMock.dispatchTo).toBeCalled();
      expect(fireBaseMock.unsubscribeTourLiveUpdate).toBeCalledWith(1);
    });

    it('should call subscribeTourLiveUpdate', () => {
      instance.onSuccessFetchData(2)({});

      expect(resagaMock.dispatchTo).toBeCalled();
      expect(fireBaseMock.subscribeTourLiveUpdate).toBeCalled();
    });
  });

  describe('updateRecentTours()', () => {
    it('should updateRecentTours()', () => {
      instance.updateRecentTours(2233);

      TEST_HELPERS.expectCalledAndMatchSnapshot(resagaMock.setValue);
    });
  });

  describe('fetchOrgInfo', () => {
    it('should return null', () => {
      rendered.setProps({ id: 1, orgId: 444 });

      expect(instance.fetchOrgInfo({ id: 2233 })).toBe(null);
    });

    it('should dispatchTo', () => {
      rendered.setProps({ id: 1, orgId: 444, organisationIds: [999] });
      ability.can = jest.fn(() => true);

      instance.fetchOrgInfo({
        id: 1,
        node: { calculated: { organisationId: 999 } },
      });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resagaMock.dispatchTo);
    });
    it('should not dispatchTo', () => {
      rendered.setProps({ id: 1, orgId: -1 });

      expect(instance.fetchOrgInfo({ id: 1 })).toBe(true);
    });
  });

  describe('fetchError()  ', () => {
    it('should call resaga.setValue', () => {
      instance.fetchError();
      expect(history.push).toHaveBeenCalled();
    });
  });

  describe('getOrgSuccess()  ', () => {
    it('should setvalue to be called', () => {
      instance.getOrgSuccess({ preferenceData: { 1: { paxLabel: 'pax' } } });
      expect(resagaMock.setValue).toHaveBeenCalled();
    });
    it('should still setvalue to be called', () => {
      instance.getOrgSuccess({});
      expect(resagaMock.setValue).toHaveBeenCalled();
    });
  });

  describe('render()  ', () => {
    it('render loading', () => {
      rendered.setProps({ id: 0 });

      expect(rendered).toBeDefined();
    });

    it('error true', () => {
      resagaMock.isLoading = jest.fn(() => false);
      rendered.setProps({ error: 'some error', id: 2, orgId: 22 });

      expect(rendered).toBeDefined();
    });

    it('otherwise', () => {
      resagaMock.isLoading = jest.fn(() => false);
      rendered.setProps({
        id: 2,
        orgId: 22,
        error: '',
      });

      expect(rendered).toBeDefined();
    });
  });

  describe('openDiscussionDrawFromQueryString with templateId', () => {
    it('set template data', () => {
      instance.openDiscussionDrawFromQueryString(
        'drawer=999&discussion=2',
        templateId,
      );
      expect(resagaMock.setValue).toBeCalledWith({
        discussionDrawerNodeId: 999,
        discussionDrawerNodeStore: 'templates',
        discussionDrawerSelectedFeedback: 2,
      });
    });
    it('set day data', () => {
      instance.openDiscussionDrawFromQueryString(
        'drawer=1&discussion=2',
        templateId,
      );
      expect(resagaMock.setValue).toBeCalledWith({
        discussionDrawerNodeId: 1,
        discussionDrawerNodeStore: 'days',
        discussionDrawerSelectedFeedback: 2,
      });
    });
  });

  describe('recentActivityIds()', () => {
    it('set default', () => {
      expect(recentActivityIds(1)()).toEqual([1]);
    });

    it('set new', () => {
      expect(recentActivityIds(1)([2, 3])).toEqual([1, 2, 3]);
    });

    it('move to first', () => {
      expect(recentActivityIds(1)([2, 1, 3])).toEqual([1, 2, 3]);
    });
  });
});
