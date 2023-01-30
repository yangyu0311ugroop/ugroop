/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Duration } from '..';

describe('<Duration />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    intl: {
      formatMessage: () => 'Message',
    },
    startTimeValue: '2018-01-01T12:00:00.000Z',
    endTimeValue: '2018-01-02T12:00:00.000Z',
  });

  beforeEach(() => {
    wrapper = shallow(<Duration {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Duration).toBeDefined();
  });

  describe('#renderLabelPrefix()', () => {
    it('renders null', () => {
      wrapper.setProps({ omitPrefix: true });
      expect(instance.renderLabelPrefix()).toBeNull();
    });
  });

  describe('#renderLabelSuffix()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ omitPrefix: true });
      expect(instance.renderLabelSuffix()).toMatchSnapshot();
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

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
