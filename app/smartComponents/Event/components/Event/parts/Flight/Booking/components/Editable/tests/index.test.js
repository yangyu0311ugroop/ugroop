/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import dotProp from 'dot-prop-immutable';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { CREATE_NEW } from '../../../utils';
import { EditableBooking } from '..';

describe('<EditableBooking />', () => {
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
    wrapper = shallow(<EditableBooking {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(EditableBooking).toBeDefined();
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

  describe('#openFlightBookingView()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.openFlightBookingView();
    });
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('calls openFlightBookingCreate if value=CREATE_NEW', () => {
      jest.spyOn(dotProp, 'get').mockImplementation(() => CREATE_NEW);
      instance.openFlightBookingCreate = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(instance.openFlightBookingCreate).toBeCalled();
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

  describe('#handleViewFlightBookingButton()', () => {
    it('calls openFlightBookingView', () => {
      instance.openFlightBookingView = jest.fn();
      instance.handleViewFlightBookingButton();
      expect(instance.openFlightBookingView).toBeCalled();
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderValue(value)).toMatchSnapshot();
    });

    it('still matches snapshot with found id', () => {
      const value = instance.props.flightBookingIds[0];
      expect(instance.renderValue(value)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if props.readOnly and not hasCurrentValue', () => {
      wrapper.setProps({ value: null, readOnly: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
