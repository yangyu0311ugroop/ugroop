import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Duration } from '../index';

describe('<Describe />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Duration classes={{}} />);
  });

  describe('render', () => {
    it('should match snapshot if duration is greater than 1 day', () => {
      rendered.setProps({
        duration: 3,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should match snapshot if duration is 1 day', () => {
      rendered.setProps({
        duration: 1,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
