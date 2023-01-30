import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Header images={['image']} />);
  });

  describe('render', () => {
    it('should match snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
