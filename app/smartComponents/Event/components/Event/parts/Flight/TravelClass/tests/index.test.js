import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { FLIGHT_TRAVEL_CLASSES, FLIGHT_TRAVEL_CLASSES_MAP } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT_UTILS } from 'utils/events';

import { TravelClass } from '../index';

describe('<TravelClass />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TravelClass {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TravelClass).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('handleSubmit', () => {
    it('should make a patch event request', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();

      instance.handleSubmit();

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalledWith(undefined, {
        ...props,
        variant: '',
      });
    });
  });

  describe('renderLabel', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should map the props value to travel classes map', () => {
      rendered.setProps({
        value: FLIGHT_TRAVEL_CLASSES.ECONOMY.value,
      });
      expect(instance.renderValue()).toBe(
        FLIGHT_TRAVEL_CLASSES_MAP[FLIGHT_TRAVEL_CLASSES.ECONOMY.value],
      );
    });
  });

  describe('renderEditable', () => {
    it('should return null', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditable()).toEqual(null);
    });
    it('should match snapshot if can execute event', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
