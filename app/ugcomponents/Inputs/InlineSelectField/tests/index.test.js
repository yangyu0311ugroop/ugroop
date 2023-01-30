/**
 * Created by stephenkarpinskyj on 2/6/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { InlineSelectField } from '..';

describe('<InlineSelectField />', () => {
  let wrapper;

  const makeProps = () => ({
    options: [{ value: 'x', children: 'display' }],
    classes: { select: 'select' },
  });

  beforeEach(() => {
    wrapper = shallow(<InlineSelectField {...makeProps()} />);
  });

  it('exists', () => {
    expect(InlineSelectField).toBeDefined();
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
