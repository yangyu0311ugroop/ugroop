import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Trail } from '../index';

describe('<Trail />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Trail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Trail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderTemplate()', () => {
    it('should return null', () => {
      expect(instance.renderTemplate()).toBe(null);
    });

    it('should return renderTemplate', () => {
      expect(instance.renderTemplate(2233)).toMatchSnapshot();
    });
  });

  describe('renderTrailData()', () => {
    it('should return renderTemplate only if showDayTrail is false', () => {
      rendered.setProps({
        showDayTrail: false,
      });
      instance.renderTemplate = jest.fn(() => 'renderTemplate');

      expect(instance.renderTrailData({ dayId: 0 })).toMatchSnapshot();
    });

    it('should return renderTemplate + renderDay', () => {
      rendered.setProps({
        showDayTrail: true,
      });
      instance.renderTemplate = jest.fn(() => 'renderTemplate');

      expect(instance.renderTrailData({ dayId: 2233 })).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ id: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ id: 1122 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
