/**
 * Created by stephenkarpinskyj on 24/7/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { PopoverForm, ANONYMOUS_FUNC } from '..';

describe('<PopoverForm />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    children: 'Some children',
    onClose: jest.fn(),
    onValid: jest.fn(),
    onInvalid: jest.fn(),
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<PopoverForm {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(PopoverForm).toBeDefined();
  });

  describe('#getPopoverProps()', () => {
    it('still matches snapshot', () => {
      expect(instance.getPopoverProps()).toMatchSnapshot();
    });
  });

  describe('#handlePopoverEnter', () => {
    it('should call properly', () => {
      const onEnter = jest.fn();
      wrapper.setProps({ onEnter });
      instance.handlePopoverEnter();
      expect(onEnter).toBeCalled();
      expect(instance.state.formChanged).toBe(false);
    });
  });

  describe('#handleFormChange', () => {
    it('should call properly', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });

      const args = { isChanged: true };
      instance.handleFormChange(args);

      expect(onChange).toBeCalledWith(args);
      expect(instance.state.formChanged).toBe(true);
    });
  });

  describe('#blurFocusedElement()', () => {
    it('calls element.blur()', () => {
      const element = { blur: jest.fn() };
      instance.blurFocusedElement(element);
      expect(element.blur).toHaveBeenCalledTimes(1);
    });

    it('handles no element', () => {
      expect(() => {
        instance.blurFocusedElement();
      }).not.toThrow();
    });
  });

  describe('#handlePopoverClose()', () => {
    beforeEach(() => {
      global.setTimeout = jest.fn(a => a && a());
    });

    it('correctly handles', () => {
      const event = { persist: jest.fn() };
      instance.setState({ formChanged: false });
      instance.blurFocusedElement = jest.fn();
      instance.handlePopoverClose(event);
      expect(instance.blurFocusedElement).toHaveBeenCalledTimes(1);
      expect(event.persist).toHaveBeenCalledTimes(1);
      expect(instance.props.onClose).toHaveBeenCalledTimes(1);
    });

    it('handles event without persist and changed form', () => {
      const event = {};
      instance.setState({ formChanged: true });
      expect(() => {
        instance.handlePopoverClose(event);
      }).not.toThrow();
      expect(instance.props.onClose).not.toBeCalled();
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

  describe('#defaultProps', () => {
    it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
  });
});
