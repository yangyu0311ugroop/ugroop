/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { DataField } from '..';

describe('<DataField />', () => {
  let wrapper;
  let instance;

  const getValue = jest.fn(() => 1);
  const setValue = jest.fn();
  const onChange = jest.fn();

  const makeProps = () => ({
    name: 'someName',
    currentValue: 1,
    getValue,
    setValue,
    onChange,
  });

  beforeEach(() => {
    wrapper = shallow(<DataField {...makeProps()} />);
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DataField).toBeDefined();
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      instance.checkCurrentValue = jest.fn(() => '');

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.checkCurrentValue);
    });
  });

  describe('componentDidUpdate()', () => {
    it('should componentDidUpdate()', () => {
      instance.checkCurrentValue = jest.fn(() => '');

      instance.componentDidUpdate();

      TEST_HELPERS.expectCalled(instance.checkCurrentValue);
    });
  });

  describe('checkCurrentValue()', () => {
    it('should checkCurrentValue() currentValue not change', () => {
      wrapper.setProps({ currentValue: 1 });

      instance.checkCurrentValue();

      TEST_HELPERS.expectNotCalled(onChange);
    });

    it('should checkCurrentValue() getValue != currentValue', () => {
      wrapper.setProps({ currentValue: 12 });

      instance.checkCurrentValue();

      TEST_HELPERS.expectCalled(onChange);
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
