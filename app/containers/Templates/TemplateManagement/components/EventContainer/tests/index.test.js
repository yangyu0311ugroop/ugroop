/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EventContainer } from '..';
import * as components from '../components';

describe('<EventContainer />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    createDayId: 1,
    viewId: 2,
    editId: 3,
    flightBookingViewId: 4,
    flightBookingEditId: 5,
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    wrapper = shallow(<EventContainer {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(EventContainer).toBeDefined();
  });

  describe('#handleCloseEventCreate()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseEventCreate();
    });
  });

  describe('#handleCloseEventView()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseEventView();
    });
  });

  describe('#handleCloseEventEdit()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseEventEdit();
    });
  });

  describe('#handleCloseFlightBookingCreate()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseFlightBookingCreate(0);
    });

    it('flightBookingCreateHandler is called with id', () => {
      const flightBookingCreateHandler = jest.fn();
      wrapper.setProps({ flightBookingCreateHandler });
      instance.handleCloseFlightBookingCreate(1);
      expect(flightBookingCreateHandler).toBeCalledWith('1');
    });
  });

  describe('#handleCloseFlightBookingView()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseFlightBookingView();
    });
  });

  describe('#handleCloseFlightBookingEdit()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCloseFlightBookingEdit();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      instance.handleCloseEventCreate = 'handleCloseEventCreate';
      instance.handleCloseEventView = 'handleCloseEventView';
      instance.handleCloseEventEdit = 'handleCloseEventEdit';
      instance.handleCloseFlightBookingCreate =
        'handleCloseFlightBookingCreate';
      instance.handleCloseFlightBookingEdit = 'handleCloseFlightBookingEdit';

      components.EventCreate.displayName = 'EventCreate';
      components.EventView.displayName = 'EventView';
      components.EventEdit.displayName = 'EventEdit';
      components.FlightBookingCreate.displayName = 'FlightBookingCreate';
      components.FlightBookingEdit.displayName = 'FlightBookingEdit';

      expect(instance.render()).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#flightBookingCreateHandler()', () => {
      expect(() => {
        EventContainer.defaultProps.flightBookingCreateHandler();
      }).not.toThrow();
    });
  });
});
