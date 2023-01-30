/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { CurrencyField } from '..';

describe('<CurrencyField />', () => {
  let wrapper;

  const makeProps = () => ({
    name: 'currency',
  });

  beforeEach(() => {
    wrapper = shallow(<CurrencyField {...makeProps()} />);
  });

  it('exists', () => {
    expect(CurrencyField).toBeDefined();
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
