/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { CREATE_NEW } from '../../../utils';
import { FieldBooking } from '..';

describe('<FieldBooking />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    value: 1,
    flightBookingIds: [1],
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    wrapper = shallow(<FieldBooking {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FieldBooking).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns state.value if present', () => {
      const value = 0;
      wrapper.setProps({ value });
      expect(instance.getValue()).toEqual(value);
    });
  });

  describe('#getCurrentValue()', () => {
    it('returns state.value if present', () => {
      const value = 'value';
      instance.setState({ value });
      expect(instance.getCurrentValue()).toEqual(value);
    });
  });

  describe('#openFlightBookingCreate()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.openFlightBookingCreate();
    });
  });

  describe('#openFlightBookingEdit()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.openFlightBookingEdit();
    });
  });

  describe('#handleFlightBookingCreate()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.model = {};
      instance.handleFlightBookingCreate(1);
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('not calls TEMPLATE_API_HELPERS.patchEvent if no createId', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleFlightBookingCreate();
      expect(TEMPLATE_API_HELPERS.patchEvent).not.toBeCalled();
    });
  });

  describe('#handleFlightBookingCreate()', () => {
    let booking;
    let value;

    beforeEach(() => {
      booking = { setValue: jest.fn() };
      instance.setState({ booking });
      value = instance.props.value.toString();
    });

    it('sets state.value if booking exists', () => {
      instance.setState = jest.fn();
      instance.handleFlightBookingCreate();
      expect(instance.setState).toBeCalledWith({ value });
    });

    it('calls booking.setValue if booking exists', () => {
      instance.handleFlightBookingCreate();
      expect(booking.setValue).toBeCalledWith(value);
    });
  });

  describe('#handleFieldChange()', () => {
    it('calls openFlightBookingCreate if value=CREATE_NEW', () => {
      const value = CREATE_NEW;
      instance.openFlightBookingCreate = jest.fn();
      instance.handleFieldChange(value);
      expect(instance.openFlightBookingCreate).toBeCalled();
    });

    it('sets state.value if value!=CREATE_NEW', () => {
      const value = 1;
      instance.setState = jest.fn();
      instance.handleFieldChange(value);
      expect(instance.setState).toBeCalledWith({ value });
    });
  });

  describe('#handleEditFlightBookingButton()', () => {
    it('calls openFlightBookingEdit', () => {
      instance.openFlightBookingEdit = jest.fn();
      instance.handleEditFlightBookingButton();
      expect(instance.openFlightBookingEdit).toBeCalled();
    });
  });

  describe('handleRef()', () => {
    const key = 'key';
    const ref = 'ref';

    it('sets state[key]', () => {
      instance.setState = jest.fn();
      instance.handleRef(key)(ref);
      expect(instance.setState).toBeCalledWith({ [key]: ref });
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
