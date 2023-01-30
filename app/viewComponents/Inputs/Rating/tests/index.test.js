import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Rating } from '../index';

describe('<Rating />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Rating {...props} />);
  });

  it('should exists', () => {
    expect(Rating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
