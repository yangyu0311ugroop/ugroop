/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { PhoneField } from '..';

describe('<PhoneField />', () => {
  let wrapper;

  const makeProps = () => ({
    name: 'name',
  });

  beforeEach(() => {
    wrapper = shallow(<PhoneField {...makeProps()} />);
  });

  it('exists', () => {
    expect(PhoneField).toBeDefined();
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
