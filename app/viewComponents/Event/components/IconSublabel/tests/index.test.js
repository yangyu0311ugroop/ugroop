/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { IconSublabel } from '..';

describe('<IconSublabel />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      p: 'p',
    },
    children: 'Some children',
  });

  beforeEach(() => {
    wrapper = shallow(<IconSublabel {...makeProps()} />);
  });

  it('exists', () => {
    expect(IconSublabel).toBeDefined();
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
