/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EventHeading } from '..';

describe('<EventHeading />', () => {
  let wrapper;

  const makeProps = () => ({
    children: 'Some children',
  });

  beforeEach(() => {
    wrapper = shallow(<EventHeading {...makeProps()} />);
  });

  it('exists', () => {
    expect(EventHeading).toBeDefined();
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
