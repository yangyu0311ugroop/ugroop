import { shallow } from 'enzyme';
import React from 'react';
import { EventCount } from '../index';

describe('<EventCount />', () => {
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
    rendered = shallow(<EventCount {...props} />);
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EventCount).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        ev: 1,
      });

      expect(props.children).toBeCalled();
    });
  });
});
