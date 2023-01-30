import { shallow } from 'enzyme';
import React from 'react';
import { ReactionCount } from '../index';

describe('<ReactionCount />', () => {
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
    rendered = shallow(<ReactionCount {...props} />);
  });

  it('should exists', () => {
    expect(ReactionCount).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should accept children as function', () => {
    expect(props.children).toBeCalledWith(0, false, 0);
  });
});
