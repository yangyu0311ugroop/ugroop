/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { LogoutLink } from '..';

describe('<LogoutLink />', () => {
  let wrapper;

  const makeProps = () => ({
    logout: jest.fn(),
    children: 'children',
  });

  beforeEach(() => {
    wrapper = shallow(<LogoutLink {...makeProps()} />);
  });

  it('exists', () => {
    expect(LogoutLink).toBeDefined();
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
