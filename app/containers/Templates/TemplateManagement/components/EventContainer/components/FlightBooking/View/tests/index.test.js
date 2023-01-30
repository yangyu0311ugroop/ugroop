/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { View } from '..';

describe('<FlightBookingView />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      paperRoot: 'paperRoot',
      headerActions: 'headerActions',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    canEditFlightBooking: false,
    open: false,
    id: 1,
    onClose: jest.fn(),
    dataId: 3,
    templateId: 2,
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    wrapper = shallow(<View {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(View).toBeDefined();
  });

  describe('#getPaperProps()', () => {
    it('returns PaperProps', () => {
      const PaperProps = 'PaperProps';
      instance.PaperProps = PaperProps;
      expect(instance.getPaperProps()).toEqual(PaperProps);
    });
  });

  describe('#handleDeleteBookingSuccess()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteBookingSuccess();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });

    it('calls props.onClose', () => {
      instance.handleDeleteBookingSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleDeleteBookingError()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteBookingError();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteConfirm()', () => {
    it('calls TEMPLATE_API_HELPERS.deleteFlightBooking', () => {
      TEMPLATE_API_HELPERS.deleteFlightBooking = jest.fn();
      instance.handleDeleteConfirm();
      expect(
        TEMPLATE_API_HELPERS.deleteFlightBooking.mock.calls,
      ).toMatchSnapshot();
    });
  });

  describe('#handleDeleteCancel()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteCancel();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteClick()', () => {
    it('sets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteClick({ preventDefault: jest.fn() });
      expect(instance.setState).toBeCalledWith({ confirmingDelete: true });
    });
  });

  describe('#handleEditClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleEditClick();
    });
  });

  describe('#handleCloseClick()', () => {
    it('calls props.onClose', () => {
      instance.handleCloseClick();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#renderActions()', () => {
    it('still matches snapshot if props.canEditFlightBooking', () => {
      wrapper.setProps({ canEditFlightBooking: true });
      expect(instance.renderActions()).toMatchSnapshot();
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
