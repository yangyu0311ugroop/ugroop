import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {
  BUS_TYPES,
  COACH_TYPES,
  COACH_TYPES_MAPPING,
} from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Type } from '../index';

describe('<Type />', () => {
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
    rendered = shallow(<Type {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Type).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmit', () => {
    it('should call patchEvent templat helpers', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({});

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should map the value to coach types mapping object', () => {
      const result = instance.renderValue(COACH_TYPES.SELF_DRIVE);

      expect(result).toBe(COACH_TYPES_MAPPING[COACH_TYPES.SELF_DRIVE]);
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if options length is 0', () => {
      rendered.setProps({ options: [] });
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should return value in coach mapping', () => {
      const result = instance.renderValue(COACH_TYPES.SELF_DRIVE);

      expect(result).toBe(COACH_TYPES_MAPPING[COACH_TYPES.SELF_DRIVE]);
    });

    it('should return value in non coach mapping', () => {
      const result = instance.renderValue(BUS_TYPES.CHARTER);

      expect(result).toBe(BUS_TYPES.CHARTER);
    });
  });

  describe('render()', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
