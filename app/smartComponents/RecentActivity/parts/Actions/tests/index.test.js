import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Actions } from '../index';

describe('<Actions />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Actions {...props} />);
    instance = rendered.instance();
  });
  it('to match with Snapshot', () => {
    expect(toJSON(instance.render())).toMatchSnapshot();
  });
});
