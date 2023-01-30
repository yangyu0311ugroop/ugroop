import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { CreatedAt } from '../index';

describe('<CreatedAt />', () => {
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
    rendered = shallow(<CreatedAt {...props} />);
  });

  it('to match with Snapshot', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
