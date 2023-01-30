import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Body } from '../index';

describe('<Body />', () => {
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
    rendered = shallow(<Body {...props} />);
  });

  it('should exists', () => {
    expect(Body).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
