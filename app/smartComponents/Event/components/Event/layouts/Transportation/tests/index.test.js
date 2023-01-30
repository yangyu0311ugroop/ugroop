import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { Transportation } from '../index';

describe('<Transportation />', () => {
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
    rendered = shallow(<Transportation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Transportation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getOptions', () => {
    it('should return bus type options if subtype is bus', () => {
      rendered.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type,
      });
      const result = instance.getOptions();

      expect(result).toMatchSnapshot();
    });

    it('should return undefined if subtype is not bus', () => {
      rendered.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type,
      });
      const result = instance.getOptions();

      expect(result).toEqual(undefined);
    });
  });

  describe('getDestinationProps', () => {
    it('should return props needed if subtype is vehicle hire', () => {
      rendered.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type,
      });
      const result = instance.getDestinationProps();

      expect(result).toMatchSnapshot();
    });

    it('should return empty object if subtype is not vehicle hire', () => {
      rendered.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type,
      });
      const result = instance.getDestinationProps();

      expect(result).toMatchSnapshot();
    });
  });

  describe('hasType', () => {
    it('should return true if subtype is bus or coach', () => {
      const types = [
        EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
      ];
      types.forEach(subtype => {
        rendered.setProps({
          subtype,
        });
        const result = instance.hasType();

        expect(result).toBe(true);
      });
    });

    it('should return false if subtype is not bus or coach', () => {
      rendered.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type,
      });
      const result = instance.hasType();

      expect(result).toBe(false);
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderPart('div')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
