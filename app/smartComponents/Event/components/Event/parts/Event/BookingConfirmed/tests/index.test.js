/**
 * Created by stephenkarpinskyj on 20/11/18.
 */
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { BookingConfirmed } from '..';

describe('<BookingConfirmed />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<BookingConfirmed {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BookingConfirmed).toBeDefined();
  });

  describe('renderFlightBookingConfirmed', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderFlightBookingConfirmed()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTransportationBookingConfirmed', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderTransportationBookingConfirmed()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderPart()', () => {
    it('still matches snapshot', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderIcon()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderIcon()).toMatchSnapshot();
    });
  });

  describe('#renderTooltip()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTooltip()).toMatchSnapshot();
    });
  });

  describe('#renderEvent()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEvent()).toMatchSnapshot();
    });
  });

  describe('renderFlightBookingConfirmed()', () => {
    it('should renderFlightBookingConfirmed', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightBookingConfirmed);
    });
  });

  describe('renderTransportationBookingConfirmed()', () => {
    it('should renderTransportationBookingConfirmed', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderTransportationBookingConfirmed,
      );
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
