import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EventDay } from '../index';

describe('<EventDay />', () => {
  let rendered;
  let instance;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
    setState: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dayId: 7,
    dayIndex: 1,
  };

  beforeEach(() => {
    rendered = shallow(<EventDay {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventDay).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('onClick', () => {
    it('should pass to the onClick props the value passed to it', () => {
      rendered.setState({
        open: false,
      });
      instance.onClick();
      expect(instance.state.open).toBe(true);
    });
  });
  describe('renderDayTitle', () => {
    it('should render Day Title', () => {
      instance.renderDayTitle();
      rendered.setProps({ startDate: '2018/01/01' });
      const result = instance.renderDayTitle();
      expect(Object.keys(result).length > 0).toBe(true);
    });
  });
});
