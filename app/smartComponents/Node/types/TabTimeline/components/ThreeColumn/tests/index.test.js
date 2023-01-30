import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ThreeColumn } from '../index';

describe('<ThreeColumn />', () => {
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

    rendered = shallow(<ThreeColumn {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ThreeColumn).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('canEdit()', () => {
    it('should return true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ editable: false });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(false);
    });
  });

  describe('canExecuteTab()', () => {
    it('should return true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canExecuteTab()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ editable: false });
      ability.can = jest.fn(() => true);

      expect(instance.canExecuteTab()).toBe(false);
    });
  });

  describe('renderOverview()', () => {
    it('should renderOverview', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOverview);
    });
  });

  describe('renderLeft()', () => {
    it('should renderLeft', () => {
      instance.renderOverview = jest.fn(() => 'renderOverview');

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderDescription()', () => {
    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        { content: 'content' },
      ]);
    });
  });

  describe('canShowTabAccess()', () => {
    it('should canShowTabAccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.canShowTabAccess);
    });
  });

  describe('renderAbout()', () => {
    it('should renderAbout', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAbout);
    });
  });

  describe('renderRight()', () => {
    it('should renderRight', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRight);
    });
  });

  describe('renderDayView()', () => {
    it('should renderDayView', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDayView);
    });
  });

  describe('renderTabView()', () => {
    it('should renderTabView', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTabView);
    });
    it('should renderTabView show checklist', () => {
      instance.isChecklistView = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderTabView);
    });
  });

  describe('renderContent()', () => {
    it('should call LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.renderContent()).toBe('switchCase');
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderRight = jest.fn(() => 'renderRight');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render if mdDown', () => {
      rendered.setProps({ mdDown: true });
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderRight = jest.fn(() => 'renderRight');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render if isPublic', () => {
      rendered.setProps({
        isPublic: true,
      });
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderRight = jest.fn(() => 'renderRight');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
