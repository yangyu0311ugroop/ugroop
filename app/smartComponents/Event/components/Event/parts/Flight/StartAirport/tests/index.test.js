/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { StartAirport } from '..';

describe('<StartAirport />', () => {
  let wrapper;

  const makeProps = () => ({
    intl: {
      formatMessage: (...args) => args,
    },
  });

  beforeEach(() => {
    wrapper = shallow(<StartAirport {...makeProps()} />);
  });

  it('exists', () => {
    expect(StartAirport).toBeDefined();
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
