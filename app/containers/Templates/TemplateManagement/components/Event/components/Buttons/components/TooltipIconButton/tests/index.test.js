/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import { RENDER_PROP } from 'appConstants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import mockStylesheet from 'utils/mockStylesheet';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import {
  ACCOMMODATIONS,
  EVENT_CONSTANTS,
  EVENTS,
} from 'utils/constants/events';
import { EVENT_UTILS } from 'utils/events';
import {
  EventTime,
  EventDuration,
} from 'smartComponents/Event/components/Event/parts';
import { UGEventTooltipIconButton } from '..';
import { EVENT_ICON_HELPERS } from '../helpers';
import style from '../../style';

const mockStyle = mockStylesheet('UGEventTooltipIconButton', style);

describe('<UGEventTooltipIconButton />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeEvent = () => ({
    id: 123,
    type: EVENTS.ACCOMMODATION.type,
    subtype: ACCOMMODATIONS.APARTMENT.type,
    dayId: 54321,
  });
  const makeProps = (id = 123, dataId = 456, event = makeEvent()) => ({
    id,
    dataId,
    event,
    classes: {},
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        (key, type, obj) =>
          doResagaSnapshot && expect({ key, type, obj }).toMatchSnapshot(),
      ),
      analyse: jest.fn(
        (nextProps, requests) =>
          doResagaSnapshot && expect({ nextProps, requests }).toMatchSnapshot(),
      ),
    },
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<UGEventTooltipIconButton {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = true;
  });

  it('exists', () => {
    expect(UGEventTooltipIconButton).toBeDefined();
  });

  describe('getTriangleClass', () => {
    it('if no need to show triangle', () => {
      const res = instance.getTriangleClass(null, mockStyle);
      expect(res).toMatchSnapshot();
    });
    it('if show triangle but not checkout', () => {
      const res = instance.getTriangleClass(
        true,
        mockStyle,
        'Accommodation',
        'Motel',
        false,
      );
      expect(res).toMatchSnapshot();
    });
    it('if show triangle with checkout', () => {
      const res = instance.getTriangleClass(
        true,
        mockStyle,
        'Accommodation',
        'Motel',
        true,
      );
      expect(res).toMatchSnapshot();
    });
  });

  describe('getSublabelComponent', () => {
    it('returns EventTime if subLabelType=time', () => {
      EVENT_UTILS.getSublabelType = jest.fn(
        () => EVENT_CONSTANTS.SUBLABEL_TYPES.time,
      );
      expect(instance.getSublabelComponent()).toEqual(EventTime);
    });
    it('returns EventDuration if subLabelType=duration', () => {
      EVENT_UTILS.getSublabelType = jest.fn(
        () => EVENT_CONSTANTS.SUBLABEL_TYPES.duration,
      );
      expect(instance.getSublabelComponent()).toEqual(EventDuration);
    });
    it('returns null by default', () => {
      EVENT_UTILS.getSublabelType = jest.fn(() => null);
      expect(instance.getSublabelComponent()).toBeNull();
    });
  });

  describe('isCircleIcon', () => {
    it('returns true if !showLabel and subtype=FLIGHT', () => {
      expect(
        instance.isCircleIcon(
          null,
          EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
          false,
        ),
      ).toBe(false);
      // ).toBe(true);
    });
  });

  describe('isCheckOut', () => {
    it('returns true if type=ACCOMMODATION and position=end', () => {
      expect(
        instance.isCheckOut(
          EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type,
          NODE_CONSTANTS.POSITIONS.end,
        ),
      ).toBe(false);
      // ).toBe(true);
    });
  });

  describe('isLanding', () => {
    it('returns true if type=TRANSPORTATION and subtype=FLIGHT and position=end', () => {
      expect(
        instance.isLanding(
          EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
          EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
          NODE_CONSTANTS.POSITIONS.end,
        ),
      ).toBe(false);
      // ).toBe(true);
    });
  });

  describe('isDropoff', () => {
    it('should return true if type=TRANSPORTATION and subtype=COACH and position=end', () => {
      expect(
        instance.isDropoff(
          EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
          EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
          NODE_CONSTANTS.POSITIONS.end,
        ),
      ).toBe(false);
      // ).toBe(true);
    });
  });

  describe('#handleIconButtonClick()', () => {
    it('still matches snapshot', () => {
      const e = { preventDefault: jest.fn() };
      instance.setState = jest.fn();
      instance.handleIconButtonClick(e);
      expect(instance.setState.mock.calls).toMatchSnapshot();
      expect(instance.props.resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleEventView()', () => {
    it('still matches snapshot', () => {
      const e = { preventDefault: jest.fn() };
      instance.setState = jest.fn();
      instance.handleEventView(e);
      expect(instance.setState.mock.calls).toMatchSnapshot();
      expect(instance.props.resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleTooltipOpen()', () => {
    it('sets state.tooltipOpen', () => {
      instance.setState = jest.fn();
      instance.handleTooltipOpen();
      expect(instance.setState).toHaveBeenCalledWith(
        expect.objectContaining({ tooltipOpen: true }),
      );
    });
  });

  describe('#handleTooltipClose()', () => {
    it('unsets state.tooltipOpen', () => {
      instance.setState = jest.fn();
      instance.handleTooltipClose();
      expect(instance.setState).toHaveBeenCalledWith(
        expect.objectContaining({ tooltipOpen: false }),
      );
    });
  });

  describe('#handleTooltipContentMouseEnter()', () => {
    it('sets state.tooltipContentHover', () => {
      instance.setState = jest.fn();
      instance.handleTooltipContentMouseEnter();
      expect(instance.setState).toHaveBeenCalledWith(
        expect.objectContaining({ tooltipContentHover: true }),
      );
    });
  });

  describe('#handleTooltipContentMouseLeave()', () => {
    it('unsets state.tooltipContentHover', () => {
      instance.setState = jest.fn();
      instance.handleTooltipContentMouseLeave();
      expect(instance.setState).toHaveBeenCalledWith(
        expect.objectContaining({ tooltipContentHover: false }),
      );
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

  describe('#resize()', () => {
    it('shall set content width properly', () => {
      const mockedBounds = {
        bounds: {
          width: 100,
        },
      };
      instance.resize(mockedBounds);
      expect(instance.state.dimensions.width).toBe(100);
    });
  });

  describe('renderBookingConfirmed()', () => {
    it('should renderBookingConfirmed', () => {
      wrapper.setProps({ showTick: true, event: {} });
      instance.renderPart = jest.fn(() => 'renderPart');

      expect(instance.renderBookingConfirmed()).toBe('renderPart');
    });
  });

  describe('#renderButton', () => {
    let mesRef;
    let event;
    beforeAll(() => {
      mesRef = {
        measureRef: {},
      };
      event = makeEvent();
    });
    it('match snapshot', () => {
      instance.isDropoff = jest.fn(() => false);
      const res = instance.renderButton(event, true, {})(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });

    it('match snapshot if subtype is coach', () => {
      instance.isDropoff = jest.fn(() => true);
      const res = instance.renderButton(
        { ...event, subtype: EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type },
        true,
        {},
      )(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });

    it('match snapshot if subtype is coach', () => {
      instance.isDropoff = jest.fn(() => true);
      const res = instance.renderButton(
        { ...event, subtype: EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type },
        true,
        {},
      )(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });

    it('should use size props and use xs classes', () => {
      wrapper.setProps({
        size: 'xs',
      });
      const res = instance.renderButton(event, true, {})(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });

    it('should use size props and use small classes', () => {
      wrapper.setProps({
        size: 'small',
      });
      const res = instance.renderButton(event, true, {})(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });

    it('not explodes when showLabel', () => {
      wrapper.setProps({ showLabel: true });
      instance.setState({ dimensions: { width: 200 } });
      const res = instance.renderButton(event, true, { checkIn: true })(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });
    it('still matches snapshot if event has no type', () => {
      const event2 = makeEvent();
      delete event2.type;
      const res = instance.renderButton(event2, true, {})(mesRef);
      expect(toJSON(res)).toMatchSnapshot();
    });
  });

  describe('renderTooltipButton()', () => {
    it('should renderTooltipButton', () => {
      instance.renderIconButton = jest.fn(() => 'renderIconButton');

      wrapper.setProps({ hideTooltip: true });

      expect(instance.renderTooltipButton()).toBe('renderIconButton');
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('not explodes when dragging', () => {
      wrapper.setProps({ dragging: true });
      expect(shallow(instance.render())).toHaveLength(1);
    });
    it('still matches snapshot', () => {
      instance.getEditable = jest.fn(() => true);

      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if props.showSublabel', () => {
      wrapper.setProps({ showSublabel: true });
      instance.renderTooltipButton = jest.fn(() => 'renderTooltipButton');
      instance.renderSublabel = jest.fn(() => 'renderSublabel');
      expect(toJSON(shallow(instance.render()))).toBeDefined();
    });

    it('should not pass function in onClick of IconButton is editable is false', () => {
      wrapper.setProps({
        editable: false,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should display checkmark if eventDetail bookingNumber has value', () => {
      wrapper.setProps({
        event: {
          eventDetail: {
            bookingNumber: 1234,
          },
        },
        showTick: true,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('getIconSize()', () => {
    it('should return medium ', () => {
      wrapper.setProps({ size: 'medium' });

      expect(instance.getIconSize()).toBe('medium');
    });
  });

  describe('#renderPart()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)).toMatchSnapshot();
    });
  });

  describe('renderProp()', () => {
    it('should return null', () => {
      wrapper.setProps({ event: undefined });

      expect(instance.renderProp()).toBe(null);
    });

    it('should renderProp', () => {
      const renderEvent = jest.fn();
      instance.renderEventIcon = jest.fn(() => 'renderEventIcon');
      wrapper.setProps({ event: {}, detail: {}, renderEvent });

      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
      TEST_HELPERS.expectCalledAndMatchSnapshot(renderEvent);
    });
  });

  describe('render()', () => {
    it('should renderProp', () => {
      instance.renderProp = jest.fn(() => 'renderProp');
      wrapper.setProps({ variant: RENDER_PROP });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('EVENT_ICON_HELPERS()', () => {
    it('should return false by default', () => {
      expect(EVENT_ICON_HELPERS.showSubIconFn()).toBe(false);
    });

    it('should return true', () => {
      expect(
        EVENT_ICON_HELPERS.showSubIconFn(
          '',
          EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type,
          { showSubIcon: true },
        ),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(
        EVENT_ICON_HELPERS.showSubIconFn(
          '',
          EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
          { showSubIcon: true },
        ),
      ).toBe(false);
    });
  });
});
