import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { Seat } from '../index';

describe('<Seat />', () => {
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
    rendered = shallow(<Seat {...props} />);
  });

  it('should exists', () => {
    expect(Seat).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
