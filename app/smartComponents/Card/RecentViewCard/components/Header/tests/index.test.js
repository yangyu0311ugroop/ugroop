import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from '../index';

describe('<Header />', () => {
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
    rendered = shallow(<Header {...props} />);
  });

  it('to match with Snapshot', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
