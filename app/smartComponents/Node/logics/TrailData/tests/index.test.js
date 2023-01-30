import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TrailData } from '../index';

describe('<TrailData />', () => {
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

  const children = jest.fn();

  beforeEach(() => {
    rendered = shallow(<TrailData {...props}>{children}</TrailData>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TrailData).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('dayId()', () => {
    it('should return null', () => {
      rendered.setProps({ types: ['template', 'tabother'] });

      expect(instance.dayId()).toBe(null);
    });

    it('should return dayId', () => {
      rendered.setProps({
        trail: [1, 2, 333, 444, 555],
        types: ['template', 'tabother', 'day', 'day', 'day'],
      });

      expect(instance.dayId()).toBe(333);
    });
  });

  describe('templateId()', () => {
    it('should return null', () => {
      rendered.setProps({ types: ['day', 'tabother'] });

      expect(instance.templateId()).toBe(null);
    });

    it('should return templateId', () => {
      rendered.setProps({
        trail: [1, 2, 333, 444, 555],
        types: ['template', 'tabother', 'day', 'day', 'day'],
      });

      expect(instance.templateId()).toBe(1);
    });
  });

  describe('dayIndex()', () => {
    it('should return null', () => {
      rendered.setProps({ types: ['template', 'tabother'] });

      expect(instance.dayIndex()).toBe(0);
    });

    it('should return dayIndex', () => {
      rendered.setProps({
        types: ['template', 'tabother', 'day', 'day', 'day'],
      });

      expect(instance.dayIndex()).toBe(3);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.dayId = jest.fn(() => 'dayId');
      instance.templateId = jest.fn(() => 'templateId');
      instance.dayIndex = jest.fn(() => 'dayIndex');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
  });
});
