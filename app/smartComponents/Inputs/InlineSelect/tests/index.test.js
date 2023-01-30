import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { InlineSelect } from '../index';

describe('<InlineSelect />', () => {
  let rendered;
  let instance;

  const props = {
    getValue: jest.fn(),
    setValue: jest.fn(),
    onChange: jest.fn(),
    name: 'Select',
    options: [],
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<InlineSelect {...props} />);
    instance = rendered.instance();
  });

  describe('componentDidMount', () => {
    it('calls setValue', () => {
      instance.setValue = jest.fn();
      const currentValue = 'currentValue';
      rendered.setProps({ currentValue });
      instance.componentDidMount();
      expect(instance.setValue).toBeCalledWith(currentValue);
    });
  });

  describe('componentDidUpdate', () => {
    it('not calls setValue if !props.currentValue', () => {
      instance.setValue = jest.fn();
      const currentValue = null;
      rendered.setProps({ currentValue });
      instance.componentDidUpdate(instance.props);
      expect(instance.setValue).not.toBeCalled();
    });
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(InlineSelect).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    it('handleChange', () => {
      const e = { target: { value: 1 } };
      instance.handleChange(e);
      expect(props.onChange).toBeCalledWith(1);
      expect(props.setValue).toBeCalledWith(1);
    });
    it('initial getSelectClasses', () => {
      instance.getSelectClasses();
      expect(instance.selectClasses).toMatchSnapshot();
    });
    it('initial getSelectClasses', () => {
      instance.selectClasses = 1;
      expect(instance.getSelectClasses()).toBe(1);
    });
    it('getValue', () => {
      rendered.setProps({ currentValue: 1 });
      expect(instance.getValue()).toBe(1);
    });
  });

  describe('#defaultProps', () => {
    it('#onChange()', () => {
      expect(() => {
        InlineSelect.defaultProps.onChange();
      }).not.toThrow();
    });
  });
});
