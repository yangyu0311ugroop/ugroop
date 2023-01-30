import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PUB_API, GET_PUB_TEMPLATE_TAB } from 'apis/constants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import Days from '../components/Days';
import TabCustom from '../components/TabCustom';
import TabGallery from '../components/TabGallery';
import { PublicTabContent } from '../index';

describe('PublicTabContent/tests/index.test.js', () => {
  const mockedSaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    isLoading: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn((_, cb) => cb && cb({ hi: 'ho' })),
  };
  const tab = { id: 1, type: 'tabother', content: 'this tab' };
  const tabId = 1;
  const customData = { hi: 'ho' };
  const classes = {};

  let rendered;
  let instance;
  beforeEach(() => {
    rendered = shallow(
      <PublicTabContent
        resaga={mockedSaga}
        classes={classes}
        tabId={tabId}
        currentQueryDayId={2}
        customData={customData}
        tab={tab}
      />,
    );
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<PublicTabContent />', () => {
    it('should exists', () => {
      expect(PublicTabContent).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('render()  ', () => {
    it('!tab', () => {
      rendered.setProps({ tab: null });
      expect(rendered.html()).toMatch('no data');
    });
    it('tab time line', () => {
      const tabTimeLine = { id: 1, type: 'tabtimeline', content: 'this tab' };
      rendered = shallow(
        <PublicTabContent
          resaga={mockedSaga}
          classes={classes}
          tabId={tabId}
          customData={customData}
          tab={tabTimeLine}
        />,
      );
      expect(rendered.find(Days).length).toBe(1);
    });
    it('renders tabmap', () => {
      rendered.setProps({
        tabs: [1, 2],
        tabId: -1,
      });
      rendered = shallow(<div>{instance.render()}</div>);
      expect(toJSON(shallow)).toMatchSnapshot();
    });
    it('renders tabmap that passes 0 as tabId', () => {
      rendered.setProps({
        tabs: false,
        tabId: -1,
      });
      rendered = shallow(<div>{instance.render()}</div>);
      expect(toJSON(shallow)).toMatchSnapshot();
    });
    it('renders tabmap if there are no tabs', () => {
      rendered.setProps({
        tabs: undefined,
      });
      rendered = shallow(<div>{instance.render()}</div>);
      expect(toJSON(shallow)).toMatchSnapshot();
    });
    it('tab other', () => {
      const tabTimeLine = {
        id: 1,
        type: 'tabother',
        content: 'this tab',
        customData: {},
      };
      rendered = shallow(
        <PublicTabContent
          resaga={mockedSaga}
          classes={classes}
          tabId={tabId}
          sectionIds={[]}
          tab={tabTimeLine}
        />,
      );
      expect(rendered.find(TabCustom).length).toBe(1);
    });
    it('tab gallery', () => {
      const tabTimeLine = {
        id: 1,
        type: 'tabgallery',
        content: 'this tab',
        customData: {},
      };
      rendered = shallow(
        <PublicTabContent
          resaga={mockedSaga}
          classes={classes}
          tabId={tabId}
          sectionIds={[]}
          tab={tabTimeLine}
        />,
      );
      expect(rendered.find(TabGallery).length).toBe(1);
    });
    it('tab none if private', () => {
      const tabTimeLine = {
        id: 1,
        type: 'none',
        content: 'this tab',
        customData: { private: true },
      };
      rendered = shallow(
        <PublicTabContent
          resaga={mockedSaga}
          classes={classes}
          tabId={tabId}
          sectionIds={[]}
          tab={tabTimeLine}
        />,
      );
      expect(rendered.html()).toContain('no data');
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should call fetchData and setValue', () => {
      const nextProps = {
        tabs: [1],
        tabId: 123,
      };
      rendered.setProps({
        tabs: [1, 2],
        tabId: -1,
      });
      instance.fetchData = jest.fn();
      instance.componentWillReceiveProps(nextProps);
      expect(instance.fetchData).toHaveBeenCalled();
      expect(mockedSaga.setValue).toHaveBeenCalled();
    });
    it('should call analyse', () => {
      const nextProps = {
        tabs: [1],
        tabId: 123,
      };
      rendered.setProps({
        tabs: [1],
        tabId: 123,
      });
      instance.componentWillReceiveProps(nextProps);
      expect(mockedSaga.analyse).toHaveBeenCalled();
    });
  });

  describe('fetch Data', () => {
    it('with hashkey', () => {
      rendered.setProps({ hashkey: 'abcd' });
      const onSuccess = instance.fetchSuccess;
      instance.fetchData(1);
      expect(mockedSaga.dispatchTo).toBeCalledWith(
        PUB_API,
        GET_PUB_TEMPLATE_TAB,
        {
          payload: {
            id: 1,
            hashkey: 'abcd',
            templateId: 0,
          },
          onSuccess,
        },
      );
    });
    it('without hashkey', () => {
      instance.fetchData(1);
      expect(mockedSaga.dispatch).not.toBeCalled();
    });
  });

  describe('fetchSuccess', () => {
    it('with hashkey', () => {
      rendered.setProps({ hashkey: 'abcd' });
      const normalisedResults = {
        sections: [],
        events: [],
        days: [],
        photos: [],
        attachments: [],
        ids: [],
        nodes: [],
      };
      PUB_API_HELPERS.getTreeAndTimes = jest.fn();
      PUB_API_HELPERS.fetchEvents = jest.fn();
      instance.fetchSuccess(normalisedResults);
      expect(
        PUB_API_HELPERS.getTreeAndTimes.mock.calls[0][0],
      ).toMatchSnapshot();
      expect(PUB_API_HELPERS.fetchEvents.mock.calls[0][0]).toMatchSnapshot();
      expect(mockedSaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('without hashkey', () => {
      const normalisedResults = {
        sections: [],
        events: [],
        days: [],
        photos: [],
        attachments: [],
        ids: [],
        nodes: [],
      };
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      TEMPLATE_API_HELPERS.fetchEvents = jest.fn();
      instance.fetchSuccess(normalisedResults);
      expect(
        NODE_API_HELPERS.getTreeAndTimes.mock.calls[0][0],
      ).toMatchSnapshot();
      expect(
        TEMPLATE_API_HELPERS.fetchEvents.mock.calls[0][0],
      ).toMatchSnapshot();
      expect(mockedSaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
});
