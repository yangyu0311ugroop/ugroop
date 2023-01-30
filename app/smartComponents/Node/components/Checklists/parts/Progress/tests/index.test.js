import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Progress } from '../index';

describe('<Progress />', () => {
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
    rendered = shallow(<Progress {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Progress).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('showCompletedLabel()', () => {
    it('should render correct strings', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      // case 1 singular
      rendered.setProps({ selected: 1, showCompleted: false });
      instance.showCompletedLabel();

      // case 2 plural
      rendered.setProps({ selected: 2, showCompleted: true });
      instance.showCompletedLabel();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('toggleShowCompleted()', () => {
    it('should call LOGIC_HELPERS.ifFunction', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      rendered.setProps({ toggleShowCompleted: 'toggleShowCompleted' });
      instance.toggleShowCompleted('event');

      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderToggleShowCompleted()', () => {
    it('should return null', () => {
      rendered.setProps({ selected: 0 });

      expect(instance.renderToggleShowCompleted()).toBe(null);
    });

    it('should renderToggleShowCompleted', () => {
      rendered.setProps({ selected: 1 });
      instance.showCompletedLabel = jest.fn(() => 'showCompletedLabel');

      const snapshot = shallow(
        <div>{instance.renderToggleShowCompleted()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderProgress()', () => {
    it('should renderProgress', () => {
      const snapshot = shallow(<div>{instance.renderProgress()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCompletedMessage()', () => {
    it('should return null', () => {
      rendered.setProps({ showCompleted: true });

      expect(instance.renderCompletedMessage()).toBe(null);
    });

    it('should renderCompletedMessage', () => {
      rendered.setProps({ showCompleted: false });

      const snapshot = shallow(<div>{instance.renderCompletedMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderProgress = jest.fn(() => 'renderProgress');
      instance.renderCompletedMessage = jest.fn(() => 'renderCompletedMessage');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ variant: 'total' });
      instance.renderProgress = jest.fn(() => 'renderProgress');
      instance.renderCompletedMessage = jest.fn(() => 'renderCompletedMessage');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
