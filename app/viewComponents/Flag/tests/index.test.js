import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Flag } from '..';

describe('<Flag />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      root: 'root',
      paddingRight: 'paddingRight',
    },
    paddingRight: true,
  });

  beforeEach(() => {
    wrapper = shallow(<Flag {...makeProps()} />);
  });

  it('exists', () => {
    expect(Flag).toBeDefined();
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
