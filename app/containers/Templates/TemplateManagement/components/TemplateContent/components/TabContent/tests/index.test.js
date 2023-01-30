import { ability } from 'apis/components/Ability/ability';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GET_TEMPLATE_TAB_DETAIL, TEMPLATE_TAB_API } from 'apis/constants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
/**
 * Created by quando on 1/9/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TAB_GALLERY, TAB_OTHER, TAB_TIMELINE } from 'utils/modelConstants';
// import TabConversation from '../components/TabConversation';
import TabCustom from '../components/TabCustom';
import { TabContent } from '../index';

jest.mock('modernizr', () => 'mock');
const mockedDateTime = 123454321;
Date.now = jest.fn().mockReturnValue(mockedDateTime);
jest.useFakeTimers();

describe('TabContent/tests/index.test.js', () => {
  const setIsMoving = jest.fn();
  const resagaMock = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn((_, cb) => cb && cb({ hi: 'ho' })),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const tab = { id: 1, type: 'tabother', content: 'this tab' };
  const tabId = 1;
  const customData = { hi: 'ho' };
  const classes = {};

  let rendered;
  let instance;
  beforeEach(() => {
    rendered = shallow(
      <TabContent
        setIsMoving={setIsMoving}
        resaga={resagaMock}
        history={history}
        classes={classes}
        tabId={tabId}
        customData={customData}
        tab={tab}
        layout="list"
      />,
    );
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('<TabContent />', () => {
    it('should exists', () => {
      expect(TabContent).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('componentDidMount()  ', () => {
    it('should call handleFetchTab', () => {
      instance.handleFetchTab = jest.fn();
      instance.componentDidMount();
      expect(instance.handleFetchTab).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps()  ', () => {
    it('should call resaga.analyse', () => {
      instance.tabShouldReload = jest.fn();
      instance.componentWillReceiveProps({ hi: 'ho' });
      expect(instance.tabShouldReload).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('tabShouldReload()  ', () => {
    it('nextProps.tabId !== this.props.tabId', () => {
      const nextProps = { tab: 1, tabId: tabId + 1 };
      instance.handleFetchTab = jest.fn();
      instance.tabShouldReload(nextProps);
      expect(instance.handleFetchTab).toHaveBeenCalled();
    });
    it('nextProps.tabId = this.props.tabId', () => {
      const nextProps = { tabId };
      instance.handleFetchTab = jest.fn();
      instance.tabShouldReload(nextProps);
      expect(instance.handleFetchTab).not.toHaveBeenCalled();
    });
  });

  describe('handleFetchTab()  ', () => {
    it('default tab', () => {
      const onSuccess = instance.fetchSuccess;
      const onError = instance.fetchError;
      instance.handleFetchTab({
        tabId: 22,
        type: 'tabtimeline',
        templateId: 11,
        hashkey: '1',
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_TAB_API,
        GET_TEMPLATE_TAB_DETAIL,
        {
          payload: {
            tab: { id: 22, type: 'tabtimeline' },
            templateId: 11,
            hashkey: '1',
            id: 22,
          },
          onSuccess,
          onError,
        },
      );
    });

    it('invalid tab', () => {
      instance.openTab = jest.fn();

      instance.handleFetchTab();
      expect(instance.openTab).toHaveBeenCalledWith();
    });
    it('should call public template tab', () => {
      instance.handleFetchTab({
        isPublic: true,
        tabId: 22,
        type: 'tabtimeline',
        templateId: 11,
        hashkey: '1',
      });
      expect(resagaMock.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('openTab()  ', () => {
    it('should call openTab with default value', () => {
      rendered.setProps({
        pathname: 'pathnammee',
        location: {},
        loading: true,
      });

      instance.openTab();
      expect(history.push).toHaveBeenCalledWith(`${'pathnammee'}?tab=${0}`);
    });
    it('should call openTab with default value if isPublic', () => {
      rendered.setProps({
        pathname: 'pathnammee',
        location: {},
        loading: true,
        isPublic: true,
      });

      instance.openTab();
      expect(history.push).toHaveBeenCalled();
    });

    it('should call openTab with index value', () => {
      rendered.setProps({
        pathname: 'pathnammee',
        location: {},
        loading: true,
      });

      instance.openTab(99);
      expect(history.push).toHaveBeenCalledWith(`${'pathnammee'}?tab=${99}`);
    });

    it('should not call openTab with index value', () => {
      rendered.setProps({
        pathname: 'pathnammee',
        location: {},
        loading: false,
      });

      instance.openTab(99);
      expect(history.push).not.toHaveBeenCalledWith(
        `${'pathnammee'}?tab=${99}`,
      );
    });
  });

  describe('handleTreeTimes()', () => {
    it('should call setValue', () => {
      rendered.setProps({ layout: '' });
      Date.now = jest.fn(() => 'Date.now');

      instance.handleTreeTimes();
      jest.runAllTimers();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resagaMock.setValue);
    });

    it('should not call setValue', () => {
      rendered.setProps({ layout: 'aaa' });
      Date.now = jest.fn(() => 'Date.now');

      instance.handleTreeTimes();
      jest.runAllTimers();

      expect(resagaMock.setValue).not.toHaveBeenCalled();
    });
  });

  describe('fetchError()  ', () => {
    it('should call openTab', () => {
      instance.openTab = jest.fn();

      instance.fetchError({}, {});

      expect(instance.openTab).toHaveBeenCalledWith();
    });

    it('should call setValue if type = tabother', () => {
      instance.openTab = jest.fn();

      instance.fetchError({}, { type: 'tabother' });

      expect(resagaMock.setValue).toBeCalled();
      expect(resagaMock.setValue.mock.calls).toMatchSnapshot();

      expect(instance.openTab).toHaveBeenCalledWith();
    });
  });

  describe('fetchSuccess()  ', () => {
    it('should call TEMPLATE_API_HELPERS.fetchEvents', () => {
      rendered.setProps({
        type: TAB_TIMELINE,
      });
      TEMPLATE_API_HELPERS.fetchEvents = jest.fn();

      instance.fetchSuccess();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.fetchEvents);
    });

    it('should not call TEMPLATE_API_HELPERS.fetchEvents', () => {
      rendered.setProps({
        type: 'not tab timeline',
      });
      TEMPLATE_API_HELPERS.fetchEvents = jest.fn();

      instance.fetchSuccess();

      TEST_HELPERS.expectNotCalled(TEMPLATE_API_HELPERS.fetchEvents);
    });

    it('fetches events if tab.type=tabtimeline', () => {
      TEMPLATE_API_HELPERS.fetchEvents = jest.fn();
      rendered.setProps({ type: 'tabtimeline' });

      instance.fetchSuccess({});

      expect(TEMPLATE_API_HELPERS.fetchEvents).toBeCalled();
    });
    it('should call PUB_API_HELPERS', () => {
      PUB_API_HELPERS.getTreeAndTimes = jest.fn();
      PUB_API_HELPERS.fetchEvents = jest.fn();

      rendered.setProps({
        type: TAB_TIMELINE,
        isPublic: true,
      });

      instance.fetchSuccess();
      expect(PUB_API_HELPERS.getTreeAndTimes).toHaveBeenCalled();
      expect(PUB_API_HELPERS.fetchEvents).toHaveBeenCalled();
    });
  });

  describe('addNewTab()', () => {
    it('should call PORTAL_HELPERS.openAddTab', () => {
      PORTAL_HELPERS.openAddTab = jest.fn();

      instance.addNewTab();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddTab);
    });
  });

  describe('closeDialog()', () => {
    it('should set state', () => {
      rendered.setState({ addTab: true });

      instance.closeDialog('addTab');

      expect(rendered.state().addTab).toBe(false);
    });
  });

  describe('selectNewTab()', () => {
    it('should history.push', () => {
      instance.selectNewTab();

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('render()  ', () => {
    it('tab other', () => {
      rendered.setProps({ type: TAB_OTHER });
      rendered.setState({ fetching: false, firstTimeFetch: false });

      expect(rendered.find(TabCustom).length).toBe(1);
    });
    it('tab gallery', () => {
      rendered.setProps({ type: TAB_GALLERY });
      rendered.setState({ fetching: false, firstTimeFetch: false });

      expect(rendered.find(TabGallery).length).toBe(1);
    });

    it('should render another tab view if layout is not list', () => {
      rendered.setProps({
        layout: 'card',
        type: TAB_TIMELINE,
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render another tab view if layout is not list and cards', () => {
      rendered.setProps({
        layout: 'timeline',
        type: TAB_TIMELINE,
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render fetching', () => {
      rendered.setProps({
        displayDate: 'startDate',
        layout: '',
      });
      rendered.setState({
        fetching: true,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render maps tab view if layout is maps', () => {
      rendered.setProps({
        layout: 'map',
        type: TAB_TIMELINE,
      });
      rendered.setState({
        fetching: false,
        firstTimeFetch: false,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render no data if layout does not exist', () => {
      ability.can = jest.fn(() => true);

      rendered.setProps({
        layout: 'qqqqw',
        type: TAB_TIMELINE,
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render title tab view if layout is title', () => {
      rendered.setProps({
        layout: 'title',
        type: TAB_TIMELINE,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render gallery tab', () => {
      rendered.setProps({
        type: TAB_TIMELINE,
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render map tab', () => {
      rendered.setProps({
        type: TAB_TIMELINE,
        layout: 'map',
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render risk', () => {
      rendered.setProps({
        type: TAB_TIMELINE,
        layout: 'risk',
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render room', () => {
      rendered.setProps({
        type: TAB_TIMELINE,
        layout: 'room',
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render none if type is not known', () => {
      rendered.setProps({
        type: 'sample_custom_tab_type_not_supported',
      });
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot if no tab', () => {
      rendered.setProps({});
      rendered.setState({ fetching: false, firstTimeFetch: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
