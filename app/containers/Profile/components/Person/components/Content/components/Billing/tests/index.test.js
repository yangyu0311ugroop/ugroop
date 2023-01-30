import { shallow } from 'enzyme';
import React from 'react';
import { Billing } from '../index';

describe('<Billing />', () => {
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
    rendered = shallow(<Billing {...props} />);
  });

  it('should exists', () => {
    expect(Billing).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
});
