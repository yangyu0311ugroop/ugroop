/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { Duration } from '..';

describe('<Duration />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    intl: {
      formatMessage: () => 'Message',
    },
    startTimeMoment: MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
    endTimeMoment: MOMENT_HELPERS.createUtc('2018-01-02T12:00:00.000Z'),
    endMode: NODE_CONSTANTS.TIME_MODES.relativeStart,
  });

  beforeEach(() => {
    wrapper = shallow(<Duration {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Duration).toBeDefined();
  });

  describe('#getDuration()', () => {
    it('returns null', () => {
      wrapper.setProps({ endMode: NODE_CONSTANTS.TIME_MODES.relative });
      expect(instance.getDuration()).toBeNull();
    });
  });

  describe('#renderPart()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderLabelPrefix()', () => {
    it('renders null', () => {
      wrapper.setProps({ omitPrefix: true });
      expect(instance.renderLabelPrefix()).toBeNull();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabel()).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });

  describe('#renderLabelValueFlag()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelValueFlag()).toMatchSnapshot();
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
