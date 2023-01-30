/**
 * Created by stephenkarpinskyj on 2/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EVENT_HELPERS } from 'utils/helpers/events';
import { FlightBookings } from '..';

describe('<FlightBookings />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      item: 'item',
      itemBottom: 'itemBottom',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    flightIds: [1],
    flightBookingIds: [2],
    bottom: true,
  });

  Date.now = jest.fn(() => 'now');
  EVENT_HELPERS.canCreateEvent = jest.fn(() => true);

  beforeEach(() => {
    wrapper = shallow(<FlightBookings {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FlightBookings).toBeDefined();
  });

  describe('show()', () => {
    it('should return false', () => {
      wrapper.setProps({ flightIds: [], flightBookingIds: [] });

      expect(instance.show()).toBe(false);
    });

    it('should return true', () => {
      wrapper.setProps({ flightIds: [1, 2], flightBookingIds: [] });

      expect(instance.show()).toBe(true);
    });
  });

  describe('#handleFlightBookingCreate()', () => {
    it('resaga.setValue still matches snapshot if dataId', () => {
      const dataId = 'dataId';
      doResagaSnapshot = true;
      instance.handleFlightBookingCreate(dataId);
    });

    it('not calls resaga.setValue if no dataId', () => {
      instance.handleFlightBookingCreate();
      expect(instance.props.resaga.setValue).not.toBeCalled();
    });
  });

  describe('#handleCreateFlightBookingClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCreateFlightBookingClick();
    });
  });

  describe('#handleEditableClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      const dataId = 'dataId';
      doResagaSnapshot = true;
      instance.handleEditableClick(dataId)();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if no props.flightBookingIds', () => {
      wrapper.setProps({ flightBookingIds: [] });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if card', () => {
      wrapper.setProps({ card: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if no props.flightIds or props.flightBookingIds', () => {
      wrapper.setProps({ flightIds: [], flightBookingIds: [] });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
