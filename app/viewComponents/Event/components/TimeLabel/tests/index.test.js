/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EventTimeLabel } from '..';

describe('<EventTimeLabel />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {},
    calculatedTime: MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
  });

  beforeEach(() => {
    wrapper = shallow(<EventTimeLabel {...makeProps()} />);
  });

  it('exists', () => {
    expect(EventTimeLabel).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot without time', () => {
      wrapper.setProps({
        calculatedTimeMode: NODE_CONSTANTS.TIME_MODES.fixedDate,
        omitDate: true,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot without time and showEmpty', () => {
      wrapper.setProps({
        calculatedTimeMode: NODE_CONSTANTS.TIME_MODES.fixedDate,
        omitDate: true,
        showEmpty: true,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot with prefix', () => {
      wrapper.setProps({
        renderPrefix: () => 'Some prefix',
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
