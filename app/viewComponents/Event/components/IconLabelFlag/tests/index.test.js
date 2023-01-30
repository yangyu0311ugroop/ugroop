/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { IconLabelFlag } from '..';

describe('<IconLabelFlag />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      root: 'root',
      item: 'item',
      p: 'p',
    },
    children: 'Some children',
  });

  beforeEach(() => {
    wrapper = shallow(<IconLabelFlag {...makeProps()} />);
  });

  it('exists', () => {
    expect(IconLabelFlag).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
