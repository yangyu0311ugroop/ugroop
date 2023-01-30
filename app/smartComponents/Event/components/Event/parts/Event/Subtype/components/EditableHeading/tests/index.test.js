/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EVENT_CONSTANTS } from 'utils/constants/events';

import { SubtypeEditableHeading } from '..';

describe('<SubtypeEditableHeading />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      selectMenuPaper: 'selectMenuPaper',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    name: 'name',
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<SubtypeEditableHeading {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(SubtypeEditableHeading).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns formValue if present', () => {
      const formValue = 'formValue';
      expect(instance.getValue(formValue)).toEqual(formValue);
    });
  });

  describe('makeOptions', () => {
    it('should return filtered options if view edit form is opened and type is flight', () => {
      wrapper.setProps({ viewEditOpen: true });

      const options = instance.makeOptions();

      const expected = options.filter(
        option => option.value !== EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      );

      expect(options).toEqual(expected);
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

  describe('#handleClose()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleClose();
    });

    it('calls props.onClose', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      instance.handleClose();
      expect(instance.props.onClose).toBeCalledWith(instance.props.value);
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
