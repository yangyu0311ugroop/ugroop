/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Icon, shallAppendLinearPrefix } from '..';

describe('<Icon />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {},
    bold: true,
    paddingLeft: true,
    paddingRight: true,
  });

  beforeEach(() => {
    wrapper = shallow(<Icon {...makeProps()} />);
  });

  it('exists', () => {
    expect(Icon).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#shallAppendLinearPrefix()', () => {
    it('returns icon with existing lnr prefix', () => {
      const icon = 'lnr-icon';
      expect(shallAppendLinearPrefix(icon)).toEqual(icon);
    });

    it('returns icon with existing ug prefix', () => {
      const icon = 'ug-icon';
      expect(shallAppendLinearPrefix(icon)).toEqual(icon);
    });
  });
});
