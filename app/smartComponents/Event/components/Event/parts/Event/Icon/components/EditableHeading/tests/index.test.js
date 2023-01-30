/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { IconEditableHeading } from '..';

describe('<IconEditableHeading />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
    },
    name: 'name',
  });

  beforeEach(() => {
    wrapper = shallow(<IconEditableHeading {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(IconEditableHeading).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleTypeChange', () => {
      const prevProps = { formSubtype: 'type' };
      instance.handleTypeChange = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleTypeChange).toBeCalled();
    });

    it('not calls handleTypeChange', () => {
      const prevProps = { formSubtype: instance.props.formSubtype };
      instance.handleTypeChange = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleTypeChange).not.toBeCalled();
    });
  });

  describe('#getValue()', () => {
    it('returns props.formValue if present', () => {
      expect(instance.getValue()).toEqual('');
    });

    it('returns props.value if props.type exists', () => {
      const value = 'value';
      wrapper.setProps({ type: 'type', value });
      expect(instance.getValue()).toEqual(value);
    });
  });

  describe('#getProp()', () => {
    it('returns formValue if present', () => {
      const formValue = 'formValue';
      expect(instance.getProp(formValue)).toEqual(formValue);
    });
  });

  describe('#handleTypeChange()', () => {
    const value = 'value';

    beforeEach(() => {
      instance.icon = {
        setValue: jest.fn(),
        props: { onChange: jest.fn() },
      };
      wrapper.setProps({ value });
    });

    it('calls icon.setValue', () => {
      instance.handleTypeChange(value);
      expect(instance.icon.setValue).toBeCalledWith(value);
    });

    it('calls icon.props.onChange', () => {
      instance.handleTypeChange(value);
      expect(instance.icon.props.onChange).toBeCalledWith(value);
    });
  });

  describe('#handleChange()', () => {
    const value = 'value';

    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleChange(value);
    });

    it('calls props.onChange', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      instance.handleChange(value);
      expect(instance.props.onChange).toBeCalledWith(value);
    });
  });

  describe('#handleIconRef()', () => {
    it('sets this.icon', () => {
      const ref = 'ref';
      instance.handleIconRef(ref);
      expect(instance.icon).toBe(ref);
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderValue(value)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
