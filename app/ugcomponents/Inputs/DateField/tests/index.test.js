import React from 'react';
import { shallow } from 'enzyme';
import MOMENT_HELPERS from 'utils/helpers/moment';

import { DateField } from '..';

describe('<DateField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    setValue: jest.fn(),
    name: 'date',
    value: '0001-01-01T12:35:56.789Z',
    inputRef: jest.fn(),
    label: 'Date Label',
    onChange: jest.fn(),
    minDate: MOMENT_HELPERS.createUtc('0001-01-01T12:34:56.789Z'),
    maxDate: MOMENT_HELPERS.createUtc('0002-01-01T12:34:56.789Z'),
    initialFocusedDate: MOMENT_HELPERS.createUtc('2000-01-01T12:34:56.789Z'),
  });

  beforeEach(() => {
    wrapper = shallow(<DateField {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DateField).toBeDefined();
  });

  describe('#componentDidMount()', () => {
    it('sets moment', () => {
      instance.componentDidMount();
      expect(instance.moment.toISOString()).toEqual(instance.props.value);
    });

    it('calls forceUpdate()', () => {
      instance.forceUpdate = jest.fn();
      instance.componentDidMount();
      expect(instance.forceUpdate).toBeCalled();
    });

    it('calls props.inputRef', () => {
      wrapper.setProps({ inputRef: jest.fn() });
      instance.componentDidMount();
      expect(instance.props.inputRef).toBeCalledWith(instance);
    });
  });

  describe('#componentDidMount()', () => {
    it('calls props.inputRef', () => {
      wrapper.setProps({ inputRef: jest.fn() });
      instance.componentWillUnmount();
      expect(instance.props.inputRef).toBeCalledWith(null);
    });
  });

  describe('#getMomentValue()', () => {
    it('returns props.value as moment', () => {
      wrapper.setProps({ value: '0002-06-01T00:00:00.000Z' });
      expect(instance.getMomentValue().toISOString()).toEqual(
        '0002-06-01T00:00:00.000Z',
      );
    });
  });

  describe('#getMinDate()', () => {
    it('returns props.minDate if not exists', () => {
      wrapper.setProps({ minDate: null });
      expect(instance.getMinDate()).toBeNull();
    });
  });

  describe('#getMaxDate()', () => {
    it('returns props.maxDate if not exists', () => {
      wrapper.setProps({ maxDate: null });
      expect(instance.getMaxDate()).toBeNull();
    });
  });

  describe('#setValue()', () => {
    it('updates correctly', () => {
      const { setValue, onChange } = instance.props;
      const value = '2021-08-14T00:00:00.000Z';
      const m = MOMENT_HELPERS.createUtc(value);
      instance.forceUpdate = jest.fn();
      instance.setValue(m);
      expect(instance.moment).toBe(m);
      expect(setValue).toBeCalledWith(value);
      expect(onChange).toBeCalledWith(value);
      expect(instance.forceUpdate).toBeCalled();
    });
  });

  describe('#stringToMoment()', () => {
    it('returns date moment', () => {
      const s = instance.momentToString(MOMENT_HELPERS.createUtc('0002-06-01'));
      expect(instance.stringToMoment(s).toISOString()).toEqual(
        '0002-06-01T00:00:00.000Z',
      );
    });
    it('returns null for null/missing/empty string', () => {
      expect(instance.stringToMoment('')).toBeNull();
      expect(instance.stringToMoment(null)).toBeNull();
      expect(instance.stringToMoment()).toBeNull();
    });
  });

  describe('#momentToString()', () => {
    it('returns input text for any moment', () => {
      const value = '0002-06-01T00:00:00.000Z';
      const m = MOMENT_HELPERS.createUtc(value);
      expect(instance.momentToString(m)).toEqual(value);
    });
    it('returns empty string for null/missing moment', () => {
      expect(instance.momentToString(null)).toBeNull();
      expect(instance.momentToString()).toBeNull();
    });
  });

  describe('#handlePickerRef()', () => {
    it('sets picker', () => {
      const ref = 'picker';
      instance.handlePickerRef(ref);
      expect(instance.picker).toBe(ref);
    });
  });

  describe('#handlePickerChange()', () => {
    it('calls setValue() and props.onPickerClose()', () => {
      const onPickerClose = jest.fn();
      wrapper.setProps({ onPickerClose });

      instance.setValue = jest.fn();
      const m = MOMENT_HELPERS.createUtc('2001-01-01');
      instance.handlePickerChange(m);
      expect(instance.setValue).toBeCalledWith(m);
      expect(onPickerClose).toBeCalled();
    });

    it('handles no value', () => {
      instance.setValue = jest.fn();
      const m = null;
      instance.handlePickerChange(m);
      expect(instance.setValue).toBeCalledWith(m);
    });
  });

  describe('#renderPickerTextField()', () => {
    it('returns undefined it not hidden', () => {
      expect(instance.renderPickerTextField()).toBe();
    });

    it('returns function rendering null if hidden', () => {
      wrapper.setProps({ type: 'hidden' });
      expect(instance.renderPickerTextField()()).toBeNull();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(instance.render()).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#inputRef()', () => {
      expect(() => {
        DateField.defaultProps.inputRef();
      }).not.toThrow();
    });

    it('#onChange()', () => {
      expect(() => {
        DateField.defaultProps.onChange();
      }).not.toThrow();
    });

    it('#onPickerOpen()', () => {
      expect(() => {
        DateField.defaultProps.onPickerOpen();
      }).not.toThrow();
    });

    it('#onPickerClose()', () => {
      expect(() => {
        DateField.defaultProps.onPickerClose();
      }).not.toThrow();
    });
  });
});
