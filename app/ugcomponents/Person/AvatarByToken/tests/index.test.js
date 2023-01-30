import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AvatarByToken } from '../index';

describe('AvatarByToken/tests/index.test.js', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<AvatarByToken {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<Avatar />', () => {
    it('should exists', () => {
      expect(AvatarByToken).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should render default', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
