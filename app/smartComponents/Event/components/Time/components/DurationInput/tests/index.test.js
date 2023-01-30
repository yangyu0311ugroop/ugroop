/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DurationInput } from '..';

describe('<DurationInput />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      root: 'root',
    },
    inputs: {
      tempDay: { name: 'tempDay' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<DurationInput {...makeProps()} />);
  });

  it('exists', () => {
    expect(DurationInput).toBeDefined();
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
