import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { DietaryIcon } from '..';

describe('<DietaryIcon />', () => {
  it('exists', () => {
    expect(DietaryIcon).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<DietaryIcon classes={{}} noDietary />)),
      ).toMatchSnapshot();
    });
  });
});
