/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FlightBookingDetails } from '..';

describe('<FlightBookingDetails />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<FlightBookingDetails {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(FlightBookingDetails).toBeDefined();
  });

  describe('#renderDefault()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderDefault()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
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
