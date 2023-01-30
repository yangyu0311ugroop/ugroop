import { MENU_ITEM, TAB } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TAB_GALLERY, TAB_PEOPLE, TAB_TIMELINE } from 'utils/modelConstants';
import { TabItem } from '../index';

describe('<TabItem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TabItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderLayout()', () => {
    it('should renderLayout', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayout);
    });
  });

  describe('renderTabTimeLine()', () => {
    it('should renderTabTimeLine', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderLayout = jest.fn(() => 'renderLayout');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTabTimeLine);
    });
  });

  describe('renderPeople', () => {
    it('should match snapshot()', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      const snapshot = shallow(<div>{instance.renderPeople()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderGallery()', () => {
    it('should renderGallery', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ ids: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGallery);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.isOnlyMeTab = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent', () => {
      instance.isOnlyMeTab = jest.fn(() => true);
      rendered.setProps({
        content:
          'this is a example of long name this is a example of long name  this is a example of long name ',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent menu item', () => {
      instance.isOnlyMeTab = jest.fn(() => true);
      rendered.setProps({ variant: 'MENU_ITEM' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent mobile', () => {
      instance.isOnlyMeTab = jest.fn(() => true);
      rendered.setProps({ variant: 'MENU_ITEM', active: true, isMobile: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent mobile and not menu', () => {
      instance.isOnlyMeTab = jest.fn(() => true);
      instance.isOnlyOrgTab = jest.fn(() => true);
      rendered.setProps({ variant: 'tab', active: true, isMobile: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('renderTab()', () => {
    it('should return children', () => {
      rendered.setProps({ children: 'children' });

      expect(instance.renderTab()).toBe('children');
    });

    it('should renderTabTimeLine', () => {
      instance.renderTabTimeLine = jest.fn(() => 'renderTabTimeLine');
      rendered.setProps({ type: TAB_TIMELINE });

      expect(instance.renderTab()).toBe('renderTabTimeLine');
    });

    it('should renderGallery', () => {
      instance.renderGallery = jest.fn(() => 'renderGallery');
      rendered.setProps({ type: TAB_GALLERY });

      expect(instance.renderTab()).toBe('renderGallery');
    });

    it('should render Tab People', () => {
      instance.renderPeople = jest.fn(() => 'renderPeople');
      rendered.setProps({ subtype: TAB_PEOPLE });

      expect(instance.renderTab()).toBe('renderPeople');
    });

    it('should renderTab', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      rendered.setProps({ type: 'other' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTab);
    });
  });

  describe('render()', () => {
    it('should renderTab', () => {
      instance.renderTab = jest.fn(() => 'renderTab');
      rendered.setProps({ variant: MENU_ITEM });

      expect(instance.renderTab()).toBe('renderTab');
    });

    it('should renderTabItem', () => {
      rendered.setProps({ variant: TAB, active: true, last: true });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderTab = jest.fn(() => 'renderTab');
      rendered.setProps({ popper: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
