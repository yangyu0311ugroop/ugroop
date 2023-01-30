/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EventHomeTimeLabel } from '..';

describe('<EventHomeTimeLabel />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      text: 'text',
      prefixItem: 'prefixItem',
    },
    calculatedMode: NODE_CONSTANTS.TIME_MODES.fixedDateTime,
    calculatedTime: MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
    timeZoneId: 'Europe/Paris',
  });

  beforeEach(() => {
    wrapper = shallow(<EventHomeTimeLabel {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EventHomeTimeLabel).toBeDefined();
  });

  describe('#renderHomeTime()', () => {
    it('renders null without time component', () => {
      wrapper.setProps({ calculatedMode: NODE_CONSTANTS.TIME_MODES.fixedDate });
      expect(instance.renderHomeTime()).toBeNull();
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
