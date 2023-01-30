/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EventTime } from '..';

describe('<EventTime />', () => {
  let wrapper;

  const makeProps = () => ({
    intl: {
      formatMessage: (...args) => args,
    },
  });

  beforeEach(() => {
    wrapper = shallow(<EventTime {...makeProps()} />);
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

    it('still matches snapshot if position=start', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.start });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if position=middle', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.middle });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if position=end', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.end });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
