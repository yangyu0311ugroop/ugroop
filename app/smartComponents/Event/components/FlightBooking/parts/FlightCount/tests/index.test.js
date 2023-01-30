/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FlightBookingFlightCount } from '..';

describe('<FlightBookingFlightCount />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    dataId: 1,
  });

  beforeEach(() => {
    wrapper = shallow(<FlightBookingFlightCount {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(FlightBookingFlightCount).toBeDefined();
  });

  describe('#renderFlightCount()', () => {
    it('still matches snapshot', () => {
      const flightIds = [1];
      expect(instance.renderFlightCount(flightIds)).toMatchSnapshot();
    });
  });

  describe('#renderFlightCountValueOnly()', () => {
    it('still matches snapshot', () => {
      const flightIds = [1];
      expect(instance.renderFlightCountValueOnly(flightIds)).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });

  describe('#renderValueOnly()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderValueOnly()).toMatchSnapshot();
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
