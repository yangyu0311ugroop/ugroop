/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import { DO_NOTHING } from 'appConstants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moment from 'moment/moment';

import { TimeField } from '..';

describe('<TimeField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    name: 'time',
    inputRef: jest.fn(),
    onChange: jest.fn(),
    label: 'Time Label',
    helperText: 'Help text',
    value: moment.utc('0001-01-01 12:35:56.789'),
    getValue: () => moment.utc('0001-01-01 12:35:56.789'),
    setValue: jest.fn(),
    showError: () => false,
    getErrorMessage: () => 'Error message',
    isValidValue: () => true,
    isRequired: () => false,
    defaultValue: moment.utc('0001-01-01 12:35:56.789'),
    classes: {
      pickerButton: 'pickerButton',
    },
    utils: {},
  });

  beforeEach(() => {
    wrapper = shallow(<TimeField {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  describe('#componentDidMount()', () => {
    it('sets moment with moment value', () => {
      instance.componentDidMount();
      expect(instance.moment).toBe(instance.props.value);
    });
    it('calls forceUpdate()', () => {
      instance.forceUpdate = jest.fn();
      instance.componentDidMount();
      expect(instance.forceUpdate).toBeCalled();
    });
  });

  describe('#getInputProps()', () => {
    it('returns null if disabled', () => {
      expect(instance.getInputProps(true)).toBeNull();
    });
    it('returns props if not disabled', () => {
      expect(instance.getInputProps(false)).toEqual({
        endAdornment: instance.renderPickerButton(),
      });
    });
  });

  describe('#getMomentValue()', () => {
    it('returns props.value if not string', () => {
      wrapper.setProps({ value: moment.utc('0002-06-01T09:45:00.000Z') });
      expect(instance.getMomentValue()).toEqual(instance.props.value);
    });
    it('else returns moment value', () => {
      wrapper.setProps({ value: '2p' });
      expect(instance.getMomentValue().format('HH:mm')).toEqual('14:00');
    });
  });

  describe('#getStringValue()', () => {
    it('returns props.value if string', () => {
      wrapper.setProps({ value: 'someString' });
      expect(instance.getStringValue()).toEqual(instance.props.value);
    });
    it('else returns stringified value', () => {
      wrapper.setProps({ value: moment.utc('0002-06-01T09:45:00.000Z') });
      expect(instance.getStringValue()).toEqual('09:45');
    });
  });

  describe('#setValue()', () => {
    it('updates correctly when setText', () => {
      const { setValue, onChange } = instance.props;
      const value = '3p';
      instance.text = { setValue };
      instance.forceUpdate = jest.fn();
      instance.setValue(value, true);
      expect(setValue).toBeCalledWith(value);
      expect(instance.moment).toEqual(instance.stringToMoment(value));
      expect(onChange).toBeCalledWith(value);
      expect(instance.forceUpdate).toBeCalled();
    });
    it('updates correctly when not setText', () => {
      const { setValue, onChange } = instance.props;
      const value = '3p';
      instance.text = { setValue };
      instance.forceUpdate = jest.fn();
      instance.setValue(value, false);
      expect(setValue).not.toBeCalled();
      expect(instance.moment).toEqual(instance.stringToMoment(value));
      expect(onChange).toBeCalledWith(value);
      expect(instance.forceUpdate).not.toBeCalled();
    });

    it('not explodes when no props.onChange', () => {
      wrapper.setProps({ onChange: null });
      expect(() => {
        instance.setValue();
      }).not.toThrow();
    });
  });

  describe('#isFormDisabled()', () => {
    it('returns true correctly', () => {
      instance.text = { props: { isFormDisabled: () => true } };
      expect(instance.isFormDisabled()).toBe(true);
    });
  });

  describe('#stringToMoment()', () => {
    it('returns time moment', () => {
      const s = instance.momentToString(moment.utc('0002-06-01T09:45:00.000Z'));
      const m = instance.stringToMoment(s);
      expect(m.get('h')).toEqual(9);
      expect(m.get('m')).toEqual(45);
      expect(m.get('s')).toEqual(0);
    });
    it('returns null for null/missing/empty string', () => {
      expect(instance.stringToMoment('')).toBeNull();
      expect(instance.stringToMoment(null)).toBeNull();
      expect(instance.stringToMoment()).toBeNull();
    });
  });

  describe('#momentToString()', () => {
    it('returns input text for any moment', () => {
      expect(instance.momentToString(instance.stringToMoment('08:45'))).toEqual(
        '08:45',
      );
      expect(
        instance.momentToString(instance.stringToMoment('8:4INVALID5 AM')),
      ).toEqual('Invalid date');
      expect(
        instance.momentToString(instance.stringToMoment('8:45 AM')),
      ).toEqual('08:45');
    });
    it('returns empty string for null/missing moment', () => {
      expect(instance.momentToString(null)).toEqual('');
      expect(instance.momentToString()).toEqual('');
    });
  });

  describe('#handlePickerRef()', () => {
    it('sets picker', () => {
      const ref = 'picker';
      instance.handlePickerRef(ref);
      expect(instance.picker).toBe(ref);
    });
  });
  describe('#handleTextRef()', () => {
    const ref = 'text';
    it('sets text', () => {
      instance.handleTextRef(ref);
      expect(instance.text).toBe(ref);
      expect(instance.props.inputRef).toBeCalledWith(ref);
    });

    it('calls props.inputRef()', () => {
      instance.handleTextRef(ref);
      expect(instance.props.inputRef).toBeCalledWith(ref);
    });

    it('not explodes when no props.inputRef', () => {
      wrapper.setProps({ inputRef: undefined });
      expect(() => {
        instance.handleTextRef(ref);
      }).not.toThrow();
    });
  });

  describe('#handlePickerButtonClick()', () => {
    it('calls picker.open()', () => {
      const onPickerOpen = jest.fn();
      wrapper.setProps({ onPickerOpen });

      instance.picker = { open: jest.fn() };
      instance.handlePickerButtonClick();
      expect(instance.picker.open).toBeCalled();
    });

    it('should DO_NOTHING', () => {
      wrapper.setProps({ onPickerOpen: undefined });
      instance.picker = { open: jest.fn() };

      expect(instance.handlePickerButtonClick()).toBe(DO_NOTHING);
    });
  });

  describe('#handlePickerChange()', () => {
    it('calls setValue()', () => {
      const onPickerClose = jest.fn();
      wrapper.setProps({ onPickerClose });

      instance.setValue = jest.fn();
      const m = moment.utc('0001-01-01T15:00Z');
      instance.handlePickerChange(m);
      expect(instance.setValue).toBeCalledWith(
        instance.momentToString(m),
        true,
      );
    });

    it('should DO_NOTHING', () => {
      wrapper.setProps({ onPickerClose: undefined });
      instance.picker = { open: jest.fn() };
      instance.setValue = jest.fn();

      expect(instance.handlePickerChange()).toBe(DO_NOTHING);
    });
  });

  describe('#handleTextChange()', () => {
    it('calls setValue()', () => {
      const value = '3p';
      instance.setValue = jest.fn();
      instance.handleTextChange(value);
      expect(instance.setValue).toHaveBeenCalledWith(value, false);
    });
  });

  describe('#handleTextBlur()', () => {
    it('calls setValue() with value converted to display foramt if valid', () => {
      const value = '3p';
      instance.setValue = jest.fn();
      instance.handleTextBlur(value);
      const displayValue = instance.momentToString(
        instance.stringToMoment(value),
      );
      expect(instance.setValue).toHaveBeenCalledWith(displayValue, true);
    });
    it('calls setValue() with value if valid', () => {
      const value = 'not valid';
      instance.setValue = jest.fn();
      instance.handleTextBlur(value);
      expect(instance.setValue).toHaveBeenCalledWith(value, true);
    });
    it('calls setValue() with empty string if no value', () => {
      const value = undefined;
      instance.setValue = jest.fn();
      instance.handleTextBlur(value);
      expect(instance.setValue).toHaveBeenCalledWith('', true);
    });
  });

  describe('#renderPickerButton()', () => {
    let pickerButtonWrapper;

    beforeEach(() => {
      pickerButtonWrapper = shallow(instance.renderPickerButton());
    });

    it('not explodes', () => {
      expect(pickerButtonWrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(pickerButtonWrapper)).toMatchSnapshot();
    });
  });

  describe('#renderPickerTextField()', () => {
    it('renders nothing', () => {
      expect(instance.renderPickerTextField()).toBeNull();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      instance.getValue = () => moment.utc('0001-01-01 12:35:56.789');
      expect(instance.render()).toMatchSnapshot();
    });

    it('still matches snapshot when error', () => {
      wrapper.setProps({
        showError: () => true,
        isValidValue: () => false,
      });
      instance.getValue = () => moment.utc('0001-01-01 12:35:56.789');
      expect(instance.render()).toMatchSnapshot();
    });

    it('not renders when hidden', () => {
      wrapper.setProps({ type: 'hidden' });
      expect(instance.render()).toBeNull();
    });
  });
});
