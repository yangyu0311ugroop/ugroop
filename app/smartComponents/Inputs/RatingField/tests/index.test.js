import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RatingField } from '../index';

describe('<RatingField />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    getValue: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<RatingField {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RatingField).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSelect', () => {
    it('should call setValue props', () => {
      const setValue = jest.fn();
      rendered.setProps({ setValue });

      instance.handleSelect(null, 1);

      expect(setValue).toBeCalledWith(1);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
