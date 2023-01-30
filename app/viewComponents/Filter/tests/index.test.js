import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Filter } from '..';

describe('<Filter />', () => {
  it('exists', () => {
    expect(Filter).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(shallow(<Filter />))).toMatchSnapshot();
    });

    it('still matches snapshot if props.selected', () => {
      expect(toJSON(shallow(<Filter selected />))).toMatchSnapshot();
    });
  });
});
