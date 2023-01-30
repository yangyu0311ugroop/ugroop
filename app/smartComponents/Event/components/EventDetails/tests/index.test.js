import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NODE_POSITIONS } from 'utils/constants/nodes';
import { EVENT_DETAILS_VARIANT, EVENT_CONSTANTS } from 'utils/constants/events';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EventDetails } from '../index';

describe('<EventDetails />', () => {
  let rendered;
  let instance;
  const resaga = {
    setValue: jest.fn(),
  };
  const props = {
    resaga,
    classes: {},
    id: 1,
    position: NODE_POSITIONS.middle,
    singleDayEvent: true,
    event: {
      location: { name: 'location.name' },
    },
    active: true,
  };

  beforeEach(() => {
    rendered = shallow(<EventDetails {...props} />);
    instance = rendered.instance();
    Date.now = jest.fn(() => 1);
  });

  it('should exists', () => {
    expect(EventDetails).toBeDefined();
  });

  describe('renderTime()', () => {
    it('still matches snapshot if no times', () => {
      instance.isFlight = jest.fn(() => true);
      instance.hasStartTime = jest.fn(() => true);
      instance.hasEndTime = jest.fn(() => true);

      rendered.setProps({
        position: null,
        singleDayEvent: false,
        event: { type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type },
      });
      expect(instance.renderTime()).toMatchSnapshot();
    });
    it('still matches snapshot if end time and no start time', () => {
      instance.isFlight = jest.fn(() => true);
      instance.hasStartTime = jest.fn(() => false);
      instance.hasEndTime = jest.fn(() => true);
      rendered.setProps({
        position: NODE_POSITIONS.start,
        singleDayEvent: false,
      });
      expect(instance.renderTime()).toMatchSnapshot();
    });
    it('still matches snapshot if start time and no end time', () => {
      rendered.setProps({
        position: NODE_POSITIONS.start,
        singleDayEvent: false,
      });
      expect(instance.renderTime()).toMatchSnapshot();
    });
    it('still matches snapshot if its transportation', () => {
      expect(instance.renderTime()).toMatchSnapshot();
    });
  });
  describe('renderLocationList()', () => {
    it('still matches snapshot if no times', () => {
      rendered.setProps({
        event: { type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type },
      });
      expect(instance.renderLocationList()).toMatchSnapshot();
    });

    it('still matches snapshot if start time and no end time', () => {
      expect(instance.renderLocationList()).toMatchSnapshot();
    });
  });
  describe('renderTimeAsRange()', () => {
    it('still matches snapshot if no times', () => {
      rendered.setProps({ position: null, singleDayEvent: false });
      MOMENT_HELPERS.renderTime = jest.fn(() => 'sometime');
      expect(instance.renderTimeAsRange()).toMatchSnapshot();
    });

    it('still matches snapshot if start time and no end time', () => {
      MOMENT_HELPERS.renderTime = jest.fn(() => 'sometime');
      instance.hasActualEndTime = jest.fn(() => false);
      rendered.setProps({
        position: NODE_POSITIONS.start,
        singleDayEvent: false,
      });
      expect(instance.renderTimeAsRange()).toMatchSnapshot();
    });
  });
  describe('renderPrefix()', () => {
    it('Must return param', () => {
      expect(instance.renderPrefix('test')()).toMatchSnapshot();
    });
  });
  describe('renderLocation()', () => {
    it('still match snapshot if no location', () => {
      expect(instance.renderLocation()).toMatchSnapshot();
    });
  });
  describe('hasEndTime()', () => {
    it('still match snapshot if no location', () => {
      rendered.setProps({ event: { detail: { type: 'RiseAndShine' } } });
      const result = instance.hasEndTime();
      expect(result).toEqual(false);
    });
  });
  describe('hasActualEndTime()', () => {
    it('still match snapshot if no location', () => {
      rendered.setProps({ event: { detail: { type: 'RiseAndShine' } } });
      const result = instance.hasActualEndTime();
      expect(result).toEqual(false);
    });
  });

  describe('renderAirport()', () => {
    it('still match snapshot if position=end', () => {
      rendered.setProps({ position: NODE_POSITIONS.end });
      expect(instance.renderAirport()).toMatchSnapshot();
    });
    it('still match snapshot if position=start', () => {
      rendered.setProps({ position: NODE_POSITIONS.start });
      expect(instance.renderAirport()).toMatchSnapshot();
    });
  });
  describe('renderAirportLocationStart()', () => {
    it('still match snapshot if position=end', () => {
      rendered.setProps({ position: NODE_POSITIONS.end });
      expect(instance.renderAirportLocationStart()).toMatchSnapshot();
    });
    it('still match snapshot if position=start', () => {
      rendered.setProps({ position: NODE_POSITIONS.start });
      expect(instance.renderAirportLocationStart()).toMatchSnapshot();
    });
  });
  describe('renderAirportLocationEnd()', () => {
    it('still match snapshot if position=end', () => {
      rendered.setProps({ position: NODE_POSITIONS.end });
      expect(instance.renderAirportLocationEnd()).toMatchSnapshot();
    });
    it('still match snapshot if position=start', () => {
      rendered.setProps({ position: NODE_POSITIONS.start });
      expect(instance.renderAirportLocationEnd()).toMatchSnapshot();
    });
  });
  describe('openViewDialog()', () => {
    it('setValue to be called', () => {
      expect(instance.openViewDialog()).toMatchSnapshot();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('eventClicked()', () => {
    it('openViewDialog to be called', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      instance.openViewDialog = jest.fn();
      instance.eventClicked(event);
      expect(instance.openViewDialog).toBeCalled();
    });
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('openViewDialog()', () => {
    it('setValue to be called', () => {
      expect(instance.openViewDialog()).toMatchSnapshot();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('#handleButtonFocus()', () => {
    it('not throws', () => {
      expect(() => {
        instance.handleButtonFocus();
      }).not.toThrow();
    });
  });
  describe('#handleButtonEnter()', () => {
    it('still matches snapshot', () => {
      instance.handleButtonEnter();
      expect(instance.props.resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleButtonLeave()', () => {
    it('still matches snapshot', () => {
      instance.handleButtonLeave();
      expect(instance.props.resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('still default matches snapshot', () => {
      instance.isFlight = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render list if variant is LIST', () => {
      rendered.setProps({
        variant: EVENT_DETAILS_VARIANT.LIST,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
