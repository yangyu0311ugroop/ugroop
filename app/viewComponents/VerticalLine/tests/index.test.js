import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';

import { VerticalLine } from 'viewComponents/VerticalLine/index';

describe('<VerticalLine />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<VerticalLine classes={{}} />);
  });

  describe('smoke tests', () => {
    it('should exist', () => {
      expect(VerticalLine).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('render different sizes', () => {
    it('should render base sized vertical line', () => {
      rendered.setProps({
        size: 'base',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render base sized vertical line', () => {
      rendered.setProps({
        size: 'tall',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
