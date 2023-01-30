/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Create } from '..';

describe('<FlightBookingCreate />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      paperRoot: 'paperRoot',
    },
    resaga: {},
    open: false,
    onClose: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Create {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Create).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });

    it('not calls handleOpen', () => {
      wrapper.setProps({ open: false });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).not.toBeCalled();
    });
  });

  describe('#handleCreateBookingSuccess()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateBookingSuccess({ flightBookings: null });
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose with null', () => {
      instance.handleCreateBookingSuccess({ flightBookings: null });
      expect(instance.props.onClose).toBeCalledWith(null);
    });

    it('calls props.onClose with first flightBooking id', () => {
      const id = 1;
      instance.handleCreateBookingSuccess({ flightBookings: { [id]: null } });
      expect(instance.props.onClose).toBeCalledWith(id);
    });
  });

  describe('#handleCreateBookingError()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateBookingError();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleFormValidSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.createFlightBooking', () => {
      TEMPLATE_API_HELPERS.createFlightBooking = jest.fn();
      instance.handleFormValidSubmit({ model: 'model' });
      expect(
        TEMPLATE_API_HELPERS.createFlightBooking.mock.calls,
      ).toMatchSnapshot();
    });

    it('sets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleFormValidSubmit({});
      expect(instance.setState).toBeCalledWith({ dispatching: true });
    });
  });

  describe('#handleOpen()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleOpen();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleClose()', () => {
    it('calls props.onClose', () => {
      instance.handleClose();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#renderHeader()', () => {
    it('still matches snapshot', () => {
      const args = {
        renderCloseButton: () => 'closeButton',
      };
      expect(
        toJSON(shallow(<div>{instance.renderHeader(args)}</div>)),
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
