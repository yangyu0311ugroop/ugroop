import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { moment } from 'utils';
import { DaySeparator } from '../index';

describe('<DaySeparator />', () => {
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
    rendered = shallow(<DaySeparator {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DaySeparator).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isSameDay()', () => {
    it('should return false if !previousCreatedAt', () => {
      rendered.setProps({ previousCreatedAt: '' });

      expect(instance.isSameDay()).toBe(false);
    });

    it('should return moment.isSameDay', () => {
      moment.isSameDay = jest.fn(() => true);

      rendered.setProps({ previousCreatedAt: 'some day' });

      expect(instance.isSameDay()).toBe(true);
    });
  });

  describe('render()', () => {
    it('should return null if isSameDay', () => {
      instance.isSameDay = jest.fn(() => true);

      expect(instance.render()).toBe(null);
    });

    it('should render correctly', () => {
      instance.isSameDay = jest.fn(() => false);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render first', () => {
      rendered.setProps({ first: true });
      instance.isSameDay = jest.fn(() => false);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
