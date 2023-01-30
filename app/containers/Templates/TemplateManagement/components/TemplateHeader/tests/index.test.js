/**
 * Created by quando on 1/9/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TemplateHeader } from '../index';

describe('TemplateHeader/tests/index.test.js', () => {
  const resagaMock = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const template = {
    id: 1,
    title: 'Sample',
    customData: { description: 'Sample again' },
  };
  const fetchData = jest.fn();
  const history = {
    replace: jest.fn(),
    push: jest.fn(),
  };

  const location = {
    search: '?tab=1',
    pathname: '/admin/stuff',
  };

  const props = {
    classes: {},
    history,
    location,
    dayTabIndex: 1,
    resaga: resagaMock,
  };

  let rendered;
  let instance;
  beforeEach(() => {
    rendered = shallow(
      <TemplateHeader
        id={template.id}
        template={template}
        fetchData={fetchData}
        {...props}
      />,
    );
    jest.clearAllMocks();
    instance = rendered.instance();
  });

  describe('<TemplateHeader />', () => {
    it('should exists', () => {
      expect(TemplateHeader).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('componentDidMount', () => {
    it('should set layout redux value to list', () => {
      rendered.setProps({ layout: 'list' });

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(resagaMock.setValue);
    });
  });

  describe('tabId', () => {
    it('should go to first condition', () => {
      rendered.setProps({
        location: { search: '?tab=0&dayView=list&tabId=1' },
        visibleChildren: [1],
      });
      instance.canExecuteTab = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.tabId);
    });
    it('should go to second condition', () => {
      rendered.setProps({
        location: { search: '?tab=0&dayView=list&tabId=1' },
        visibleChildren: [2],
      });
      instance.canExecuteTab = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.tabId);
    });
    it('should go to third condition', () => {
      rendered.setProps({
        location: { search: '?tab=0&dayView=list&tabId=1' },
        visibleChildren: [],
      });
      instance.canExecuteTab = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.tabId);
    });
    it('should use people tab id when from participant', () => {
      rendered.setProps({
        location: { search: '?participant=1' },
        visibleChildren: [1, 2, 3],
        peopleTabId: 2,
      });
      expect(instance.tabId()).toEqual({ activeTab: undefined, tabId: 2 });
    });
    it('should use tab id when from participant', () => {
      rendered.setProps({
        location: { search: '?participant=1' },
        visibleChildren: [1, 2, 3],
      });
      expect(instance.tabId()).toEqual({ activeTab: 1, tabId: 1 });
    });
  });

  describe('render()  ', () => {
    it('customData.displayDate', () => {
      rendered.setProps({
        title: 'hi',
        description: { hi: 'hoo' },
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
