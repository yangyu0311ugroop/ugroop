import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Profile } from '../index';

describe('<Profile />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const match = {
    params: {
      id: 1,
    },
  };

  const props = {
    classes: {},
    resaga,
    userId: 1,
    match,
  };

  beforeEach(() => {
    rendered = shallow(<Profile {...props} />);
  });

  it('should exists', () => {
    expect(Profile).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
