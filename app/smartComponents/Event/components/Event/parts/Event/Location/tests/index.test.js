/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Location } from '..';

describe('<Location />', () => {
  let wrapper;

  const makeProps = () => ({
    intl: {
      formatMessage: (...args) => args,
    },
  });

  beforeEach(() => {
    wrapper = shallow(<Location {...makeProps()} />);
  });

  it('exists', () => {
    expect(Location).toBeDefined();
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
