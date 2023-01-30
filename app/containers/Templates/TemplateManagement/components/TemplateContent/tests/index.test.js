/**
 * Created by quando on 1/9/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { TemplateContent } from '../index';

jest.mock('modernizr', () => 'mock');

describe('TemplateContent/tests/index.test.js', () => {
  const activeTab = 1;
  const template = { id: 1, customData: { hi: 'ho' } };
  const data = [1, 2, 3];
  const location = {
    pathname: 'http://sample',
    search: '?tab=1',
  };
  const resaga = {
    setValue: jest.fn(),
  };

  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <TemplateContent
        activeTab={activeTab}
        template={template}
        data={data}
        location={location}
        id={1}
        resaga={resaga}
      />,
    );
    instance = rendered.instance();
  });

  describe('<TemplateContent />', () => {
    it('should exists', () => expect(TemplateContent).toBeDefined());
    it('should render without exploding', () =>
      expect(rendered.length).toBe(1));
  });

  describe('props', () => {
    it('should be set correctly', () => {
      const prop = instance.props;
      expect(prop.activeTab).toBe(activeTab);
      expect(prop.template).toBe(template);
      expect(prop.data).toBe(data);
    });
  });

  describe('handleSuccess', () => {
    it('should set isStillCalculating state to false', () => {
      instance.handleSuccess();

      expect(rendered.state().isStillCalculating).toBe(false);
    });
  });

  describe('tabId()', () => {
    it('should tabId()', () => {
      expect(
        instance.tabId({
          visibleChildren: [1, 2, 3],
          location: { search: '?tab=1' },
        }),
      ).toEqual({ activeTab: 1, tabId: 2 });
    });

    it('should tabId() 0', () => {
      expect(
        instance.tabId({ visibleChildren: [1, 2, 3], location: {} }),
      ).toEqual({ activeTab: 0, tabId: 1 });
    });

    it('should tabId() tabId', () => {
      expect(
        instance.tabId({
          visibleChildren: [1, 2, 3],
          hiddenIds: [2233],
          location: { search: '?tabId=2233' },
        }),
      ).toEqual({ activeTab: undefined, tabId: 2233 });
    });
    it('should tabId() tabId get the first value in index', () => {
      expect(
        instance.tabId({
          visibleChildren: [1, 2, 3],
          hiddenIds: [],
          location: { search: '?tabId=2233' },
        }),
      ).toEqual({ activeTab: 1, tabId: 1 });
    });
    it('should tabId() tabId return 0', () => {
      expect(
        instance.tabId({
          visibleChildren: [],
          hiddenIds: [],
          location: { search: '?tabId=2233' },
        }),
      ).toEqual({ activeTab: undefined, tabId: 0 });
    });
    it('should should use people tab id when from participant', () => {
      rendered.setProps({ peopleTabId: 2 });
      expect(
        instance.tabId({
          visibleChildren: [1, 2, 3],
          hiddenIds: [],
          location: { search: '?participant=1' },
          peopleTabId: 2,
        }),
      ).toEqual({ activeTab: undefined, tabId: 2 });
    });
    it('should should use tabid tab id when redirect from participant', () => {
      rendered.setProps({ peopleTabId: 2 });
      expect(
        instance.tabId({
          visibleChildren: [1, 2, 3],
          hiddenIds: [],
          location: { search: '?participant=1' },
        }),
      ).toEqual({ activeTab: 1, tabId: 1 });
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({ firstDayId: 2233, lastDayId: 3344 });

      expect(instance.render()).toBeDefined();
    });
    it('should render and return null', () => {
      rendered.setProps({
        firstDayId: 2233,
        lastDayId: 3344,
        location: { search: '?messenger=true' },
      });

      expect(instance.render()).toEqual(null);
    });

    it('should render tab content if isStillCalculating is false', () => {
      rendered.setProps({ firstDayId: 2233, lastDayId: 3344 });
      rendered.setState({ isStillCalculating: false });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('component did update', () => {
    it('shall set value when tour id is changed', () => {
      rendered.setProps({ subscriptionTourSeats: 2233 });
      instance.componentDidMount();
      expect(resaga.setValue).toBeCalledWith({
        subscriptionSeats: 2233,
      });
    });
    it('shall set value when tour id is changed', () => {
      instance.componentDidUpdate({ id: 2 });
      expect(resaga.setValue).toBeCalledWith({
        subscriptionSeats: 2233,
      });
    });
  });
});
