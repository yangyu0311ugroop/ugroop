import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableSelect, renderDefaultValue, ANONYMOUS_FUNC } from '../index';

describe('<EditableSelect />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<EditableSelect name="Select" classes={{}} />);
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableSelect).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('defaultProps', () => {
    it('return default renderValue', () => {
      expect(renderDefaultValue('test')).toBe('test');
    });
    describe('ANONYMOUS_FUNC', () => {
      it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
    });
  });

  describe('setStates', () => {
    it('handleChange', () => {
      const onChange = jest.fn();
      rendered.setProps({ onChange });

      instance.handleChange('test');
      expect(rendered.state()).toMatchSnapshot();
      expect(onChange).toBeCalledWith('test');
    });
    it('handleEditableClick', () => {
      instance.handleEditableClick();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleMenuOpen', () => {
      instance.stopPropagation = jest.fn();
      instance.handleMenuOpen('test');
      expect(rendered.state()).toMatchSnapshot();
      expect(instance.stopPropagation).toBeCalledWith('test');
    });
    it('handleMenuClose', () => {
      const onClose = jest.fn();
      instance.stopPropagation = jest.fn();
      rendered.setProps({ onClose });

      instance.handleMenuClose('test');
      expect(onClose).toBeCalled();
      expect(rendered.state()).toMatchSnapshot();
      expect(instance.stopPropagation).toBeCalledWith('test');
    });
  });

  describe('instance', () => {
    it('stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };
      instance.stopPropagation(event);
      expect(event.stopPropagation).toBeCalled();
    });
  });
});
