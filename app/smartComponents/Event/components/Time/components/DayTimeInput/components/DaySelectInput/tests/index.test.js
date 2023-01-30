/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { DaySelectInput } from '..';

describe('<DaySelectInput />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    position: NODE_CONSTANTS.POSITIONS.start,
    inputs: {
      tempDay: { name: 'tempDay' },
      mode: { name: 'mode' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<DaySelectInput {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DaySelectInput).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls setCalculatedValues', () => {
      const value = '2018-01-01T12:00:00.000Z';
      wrapper.setProps({ dayDates: [{ id: 1, value }] });
      const prevProps = { dayDates: [] };
      instance.setCalculatedValues = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.setCalculatedValues).toBeCalledWith(null);
    });
  });

  describe('#componentWillUnmount()', () => {
    it('calls unsetCalculatedValues', () => {
      instance.unsetCalculatedValues = jest.fn();
      instance.componentWillUnmount();
      expect(instance.unsetCalculatedValues).toBeCalled();
    });
  });

  describe('#getValue()', () => {
    it('returns dayId by default', () => {
      const dayId = 1;
      wrapper.setProps({ dayId });
      expect(instance.getValue()).toEqual('1');
    });
  });

  describe('#getTabId()', () => {
    it('returns props.tabId', () => {
      const tabId = 1;
      wrapper.setProps({ tabId });
      expect(instance.getTabId()).toEqual('1');
    });
  });

  describe('#unsetCalculatedValues()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.unsetCalculatedValues();
    });
  });

  describe('#handleChange()', () => {
    it('calls props.onChange', () => {
      const value = 'value';
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      instance.handleChange(value);
      expect(instance.props.onChange).toBeCalledWith(value);
    });
  });

  describe('#renderOptions()', () => {
    it('renders empty array', () => {
      const otherFormCalculatedTimeValue = 'otherFormCalculatedTimeValue';
      wrapper.setProps({
        position: NODE_CONSTANTS.POSITIONS.end,
        otherFormCalculatedTimeValue,
      });
      expect(instance.renderOptions()).toEqual([]);
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
    it('#renderDate()', () => {
      expect(() => {
        DaySelectInput.defaultProps.renderDate();
      }).not.toThrow();
    });

    it('#onChange()', () => {
      expect(() => {
        DaySelectInput.defaultProps.onChange();
      }).not.toThrow();
    });
  });
});
