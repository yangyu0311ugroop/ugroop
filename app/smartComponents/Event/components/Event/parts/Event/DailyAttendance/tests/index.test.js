/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DailyAttendance } from '..';

describe('<DailyAttendance />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<DailyAttendance {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DailyAttendance).toBeDefined();
  });

  describe('#renderPart()', () => {
    it('still matches snapshot', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
    });
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
