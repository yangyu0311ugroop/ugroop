/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DailyAttendance } from '..';

describe('<DailyAttendance />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<DailyAttendance {...makeProps()} />);
  });

  it('exists', () => {
    expect(DailyAttendance).toBeDefined();
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
