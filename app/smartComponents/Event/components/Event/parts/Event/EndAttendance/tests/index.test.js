/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EndAttendance } from '..';

describe('<EndAttendance />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<EndAttendance {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EndAttendance).toBeDefined();
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
