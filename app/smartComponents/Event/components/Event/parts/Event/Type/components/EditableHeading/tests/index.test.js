/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TypeEditableHeading } from '..';

describe('<TypeEditableHeading />', () => {
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
  });

  beforeEach(() => {
    wrapper = shallow(<TypeEditableHeading {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(TypeEditableHeading).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns formValue if present', () => {
      const formValue = 'formValue';
      wrapper.setProps({ formValue });
      instance.setState({ value: null });
      expect(instance.getValue()).toEqual(formValue);
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
      expect(instance.props.onClose).toBeCalled();
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
