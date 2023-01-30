import { shallow } from 'enzyme';
import React from 'react';
import { RateCount } from '../index';

describe('<RateCount />', () => {
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
    rendered = shallow(<RateCount {...props} />);
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(RateCount).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        count: 1,
      });

      expect(props.children).toBeCalledWith(1);
    });
  });
});
