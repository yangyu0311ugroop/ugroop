/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EVENT_CONSTANTS } from 'utils/constants/events';
import { ForEachEventType } from '..';

describe('<ForEachEventType />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<ForEachEventType {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(ForEachEventType).toBeDefined();
  });

  describe('#getType()', () => {
    it('returns props.storeType if dataId present', () => {
      const storeType = 'storeType';
      wrapper.setProps({
        dataId: 1,
        storeType,
      });
      expect(instance.getType()).toEqual(storeType);
    });
  });

  describe('#getSubtype()', () => {
    it('returns props.storeSubtype if dataId present', () => {
      const storeSubtype = 'storeSubtype';
      wrapper.setProps({
        dataId: 1,
        storeSubtype,
      });
      expect(instance.getSubtype()).toEqual(storeSubtype);
    });
  });

  describe('#renderFirst()', () => {
    it('renders props.renderFirst if renderFunc=null', () => {
      const renderEvent = 'renderEvent';
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.ACTIVITY.type,
        renderEvent: () => renderEvent,
        renderActivity: null,
      });
      expect(instance.renderFirst(null)).toEqual(renderEvent);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('#render()', () => {
      it('renders null by default', () => {
        expect(instance.render()).toBeNull();
      });
    });

    it('renders props.renderActivity if type=activity', () => {
      const renderActivity = 'renderActivity';
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.ACTIVITY.type,
        renderActivity: jest.fn(() => renderActivity),
      });
      expect(instance.render()).toEqual(renderActivity);
    });

    it('renders props.renderAccommodation if type=accommodation', () => {
      const renderAccommodation = 'renderAccommodation';
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type,
        renderAccommodation: jest.fn(() => renderAccommodation),
      });
      expect(instance.render()).toEqual(renderAccommodation);
    });

    it('renders props.renderAccommodation if type=transportation & subtype=flight', () => {
      const renderFlight = 'renderFlight';
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
        renderFlight: jest.fn(() => renderFlight),
      });
      expect(instance.render()).toEqual(renderFlight);
    });

    it('renders props.renderTransportation if type=transportation & subtype is non flight', () => {
      const nonFlightTransportations = [
        EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.TAXI.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.CAR.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.CAB.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.RIDESHARE.type,
      ];

      nonFlightTransportations.forEach(subtype => {
        const renderTransportation = 'renderTransportation';
        wrapper.setProps({
          type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
          subtype,
          renderTransportation: jest.fn(() => renderTransportation),
        });
        expect(instance.render()).toEqual(renderTransportation);
      });
    });

    it('renders props.renderEvent if type=transportation & subtype=default', () => {
      const renderEvent = 'renderEvent';
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        renderEvent: jest.fn(() => renderEvent),
      });
      expect(instance.render()).toEqual(renderEvent);
    });
  });
});
