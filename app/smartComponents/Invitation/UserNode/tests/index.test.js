import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UserNode } from '../index';

describe('<UserNode />', () => {
  let rendered;

  const props = {
    classes: {},
    userId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<UserNode {...props} />);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(UserNode).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
