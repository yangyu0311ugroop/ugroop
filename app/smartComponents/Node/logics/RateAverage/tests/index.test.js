import { shallow } from 'enzyme';
import React from 'react';
import { RateAverage } from '../index';

describe('<RateAverage />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<RateAverage {...props} />);
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(RateAverage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const children = jest.fn();
      rendered.setProps({ children, avg: 1 });

      expect(children).toBeCalledWith(1);
    });
  });
});
