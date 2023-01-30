import {
  COMPLETED_MESSAGE,
  ICON,
  ICON_BUTTON,
  PERCENTAGE,
  PROGRESS_BAR,
  TEXT,
  TOTAL,
} from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { BadgeProgress } from '../index';

describe('<BadgeProgress />', () => {
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
    rendered = shallow(<BadgeProgress {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BadgeProgress).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('done()', () => {
    it('should return false', () => {
      rendered.setProps({ percentage: 50 });

      expect(instance.done()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ percentage: 100 });

      expect(instance.done()).toBe(true);
    });
  });

  describe('icon()', () => {
    it('should return icon', () => {
      rendered.setProps({ icon: 'some-icon' });

      expect(instance.icon()).toBe('some-icon');
    });

    it('should return empty', () => {
      rendered.setProps({ percentage: 0 });

      expect(instance.icon()).toBe('square');
    });

    it('should return square', () => {
      rendered.setProps({ percentage: 50 });

      expect(instance.icon()).toBe('check-square');
    });
  });

  describe('color()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      rendered.setProps({ percentage: 50 });
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.color();

      expect(LOGIC_HELPERS.ifElse).toBeCalled();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('text()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.text(5);

      expect(LOGIC_HELPERS.ifElse).toBeCalled();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('progressBarPrimaryColor()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      rendered.setProps({ percentage: 50 });
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.progressBarPrimaryColor();

      expect(LOGIC_HELPERS.ifElse).toBeCalled();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderIcon()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderText()', () => {
    it('should render correctly', () => {
      rendered.setProps({ completed: 5, total: 9 });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should render correctly', () => {
      rendered.setProps({ completed: 5, total: 9 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPercentage()', () => {
    it('should render correctly', () => {
      rendered.setProps({ percentage: 80 });

      const snapshot = shallow(<div>{instance.renderPercentage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderProgressBar()', () => {
    it('should render correctly', () => {
      rendered.setProps({ percentage: 80 });

      const snapshot = shallow(<div>{instance.renderProgressBar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCompletedMessage()', () => {
    it('should return null if < 100', () => {
      rendered.setProps({ percentage: 99 });

      expect(instance.renderCompletedMessage()).toBe(null);
    });

    it('should render correctly', () => {
      rendered.setProps({ percentage: 100 });

      const snapshot = shallow(<div>{instance.renderCompletedMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButton()', () => {
    it('should return button', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderButton(123, 456, 789);

      expect(instance.renderButton(123, 456, 789)).toBe(456);
    });

    it('should renderButton', () => {
      const snapshot = shallow(
        <div>{instance.renderButton(jest.fn, 123, 456)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSummary()', () => {
    it('should renderSummary', () => {
      rendered.setProps({ percentage: 60, total: 5, completed: 3 });
      instance.renderButton = jest.fn(() => 'renderButton');

      const snapshot = shallow(<div>{instance.renderSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOutstandingShort()', () => {
    it('should return 99+', () => {
      rendered.setProps({ remaining: 100 });

      expect(instance.renderOutstandingShort()).toBe('99+');
    });

    it('should return remaining', () => {
      rendered.setProps({ total: 99, remaining: 39 });

      expect(instance.renderOutstandingShort()).toBe(39);
    });

    it('should return 0', () => {
      rendered.setProps({ total: 0 });

      expect(instance.renderOutstandingShort()).toBe(0);
    });

    it('should return renderOutstandingShort', () => {
      rendered.setProps({ total: 99, remaining: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderOutstandingShort);
    });
  });

  describe('renderRemaining()', () => {
    it('should return null if !total', () => {
      rendered.setProps({ total: 0 });

      const snapshot = shallow(<div>{instance.renderRemaining()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return null if !remaining', () => {
      rendered.setProps({
        remaining: 0,
        total: 5,
        showCompletedMessage: false,
      });

      expect(instance.renderRemaining()).toBe(null);
    });

    it('should render if showCompletedMessage', () => {
      rendered.setProps({ remaining: 0, total: 5, showCompletedMessage: true });

      const snapshot = shallow(<div>{instance.renderRemaining()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderRemaining', () => {
      rendered.setProps({ total: 5, remaining: 3 });

      const snapshot = shallow(<div>{instance.renderRemaining()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderCompletedMessage', () => {
      rendered.setProps({ variant: COMPLETED_MESSAGE });

      instance.renderCompletedMessage = jest.fn(() => 'renderCompletedMessage');

      expect(instance.render()).toBe('renderCompletedMessage');
    });

    it('should renderPercentage', () => {
      rendered.setProps({ variant: PERCENTAGE });

      instance.renderPercentage = jest.fn(() => 'renderPercentage');

      expect(instance.render()).toBe('renderPercentage');
    });

    it('should renderProgressBar', () => {
      rendered.setProps({ variant: PROGRESS_BAR });

      instance.renderProgressBar = jest.fn(() => 'renderProgressBar');

      expect(instance.render()).toBe('renderProgressBar');
    });

    it('should renderIcon', () => {
      rendered.setProps({ variant: ICON });

      instance.renderIcon = jest.fn(() => 'renderIcon');

      expect(instance.render()).toBe('renderIcon');
    });

    it('should renderText', () => {
      rendered.setProps({ variant: TEXT });

      instance.renderText = jest.fn(() => 'renderText');

      expect(instance.render()).toBe('renderText');
    });
    it('should renderTotal', () => {
      rendered.setProps({ variant: TOTAL });

      instance.renderTotal = jest.fn(() => 'renderTotal');

      expect(instance.render()).toBe('renderTotal');
    });
    it('should renderTotal w tasks', () => {
      rendered.setProps({ total: 5, variant: TOTAL });
      instance.renderTotal = jest.fn(() => 'renderTotal');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTotal);
    });
    it('should renderIconButton', () => {
      rendered.setProps({
        total: 5,
        variant: ICON_BUTTON,
        isSelected: true,
        status: 'closed',
        remaining: 1,
      });
      instance.renderIconButton = jest.fn(() => 'renderIconButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderIconButton);
    });

    describe('renderUpNext()', () => {
      it('should renderUpNext no task', () => {
        rendered.setProps({ total: 0 });
        instance.renderTitle = jest.fn(() => 'renderTitle');

        TEST_HELPERS.expectMatchSnapshot(instance.renderUpNext);
      });

      it('should renderUpNext w tasks', () => {
        rendered.setProps({ total: 5 });
        instance.renderTitle = jest.fn(() => 'renderTitle');

        TEST_HELPERS.expectMatchSnapshot(instance.renderUpNext);
      });
    });

    it('should renderDefault', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');

      expect(instance.render()).toBe('renderDefault');
    });
  });
});
