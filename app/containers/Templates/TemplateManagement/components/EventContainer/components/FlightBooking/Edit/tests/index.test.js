/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Edit } from '..';

describe('<FlightBookingEdit />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      paperRoot: 'paperRoot',
    },
    resaga: {},
    open: false,
    id: 1,
    onClose: jest.fn(),
    templateId: 2,
  });

  beforeEach(() => {
    wrapper = shallow(<Edit {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Edit).toBeDefined();
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

  describe('#getValue()', () => {
    it('returns formValue if present', () => {
      const formValue = 'formValue';
      expect(instance.getValue(formValue)).toEqual(formValue);
    });

    it('returns value if no formValue present', () => {
      const formValue = undefined;
      const value = 'value';
      expect(instance.getValue(formValue, value)).toEqual(value);
    });
  });

  describe('#handlePatchBookingSuccess()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handlePatchBookingSuccess();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose', () => {
      instance.handlePatchBookingSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handlePatchBookingError()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handlePatchBookingError();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleFormValidSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent if changed', () => {
      TEMPLATE_API_HELPERS.patchFlightBooking = jest.fn();
      instance.handleFormValidSubmit({ model: 'model', isChanged: true });
      expect(
        TEMPLATE_API_HELPERS.patchFlightBooking.mock.calls,
      ).toMatchSnapshot();
    });

    it('sets dispatching if changed', () => {
      instance.setState = jest.fn();
      instance.handleFormValidSubmit({ isChanged: true });
      expect(instance.setState).toBeCalledWith({ dispatching: true });
    });

    it('calls props.onClose if not changed', () => {
      instance.handleFormValidSubmit({ isChanged: false });
      expect(instance.props.onClose).toBeCalled();
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
