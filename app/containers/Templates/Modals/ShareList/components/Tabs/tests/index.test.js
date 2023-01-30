import { CONFIRMED, DO_NOTHING } from 'appConstants';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ShareListTabs } from '../index';

describe('<ShareListTabs />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
    pendingPeople: [1],
  };

  beforeEach(() => {
    rendered = shallow(<ShareListTabs {...props} />);
    ability.can = jest.fn(() => true);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ShareListTabs).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleTabChange()', () => {
    it('should set activeTab', () => {
      instance.handleTabChange('', 2);
      expect(resaga.setValue).toHaveBeenCalledWith({ shareListTab: 2 });
    });
  });

  describe('changeFilter()', () => {
    it('should return DO_NOTHING', () => {
      expect(instance.changeFilter(false)()).toBe(DO_NOTHING);
    });

    it('should set value', () => {
      instance.changeFilter(CONFIRMED)();
      expect(resaga.setValue).toHaveBeenCalledWith({
        shareListFilter: CONFIRMED,
      });
    });
  });

  describe('showHelp()', () => {
    it('should show help dialog', () => {
      instance.setState = jest.fn();

      instance.showHelp();

      expect(instance.setState).toHaveBeenCalledWith({ showHelp: true });
    });
  });

  describe('hideHelp()', () => {
    it('should hide help dialog', () => {
      instance.setState = jest.fn();

      instance.hideHelp();

      expect(instance.setState).toHaveBeenCalledWith({ showHelp: false });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderHeading = jest.fn(() => 'renderHeading');
      instance.renderFilter = jest.fn(() => 'renderFilter');
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ orgId: 1 });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.renderHeading = jest.fn(() => 'renderHeading');
      instance.renderFilter = jest.fn(() => 'renderFilter');
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ orgId: 1, showOrgInvite: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBadge()', () => {
    it('should renderBadge', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBadge(true, 'state'));
    });
  });
});
