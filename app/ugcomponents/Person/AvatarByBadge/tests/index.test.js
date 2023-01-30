import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AvatarByBadge } from '../index';

describe('AvatarBadge/tests/index.test.js', () => {
  let rendered;
  let instance;

  const props = {
    profileUrl: { url: 'url' },
  };

  beforeEach(() => {
    rendered = shallow(<AvatarByBadge {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('render()', () => {
    it('should render default', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render default if photoUrl is null', () => {
      rendered.setProps({
        profileUrl: '',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
