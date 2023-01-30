import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { scroller } from 'react-scroll';
import { DayCell } from '../dayCell';

describe('DayCell component', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  const props = {
    row: 1,
    dayId: 1,
    className: 'as',
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<DayCell {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('didSelectRowAt', () => {
    scroller.scrollTo = jest.fn();
    instance.dispatchSelectRow = jest.fn();
    instance.didSelectRowAt();
    expect(instance.dispatchSelectRow).toBeCalledWith(1);
    scroller.scrollTo.mockClear();
  });
  it('dispatchSelectRow', () => {
    instance.dispatchSelectRow(1);
    expect(resaga.setValue).toBeCalledWith({ selectDayId: 1 });
  });
  describe('render', () => {
    it('cover render case one', () => {
      rendered.setProps({
        dayContent: 'day content',
      });
      rendered.setProps({
        selectDayId: 1,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('cover render case two', () => {
      rendered.setProps({
        dayContent: '',
      });
      rendered.setProps({
        selectDayId: 1,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('cover render case three', () => {
      rendered.setProps({
        dayContent: 'day content',
      });
      rendered.setProps({
        row: 0,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
