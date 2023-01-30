/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Number } from '..';

describe('<Number />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: { editable: 'editable' },
    value: 'Some value',
  });

  beforeEach(() => {
    wrapper = shallow(<Number {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Number).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchFlightBooking', () => {
      TEMPLATE_API_HELPERS.patchFlightBooking = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(
        TEMPLATE_API_HELPERS.patchFlightBooking.mock.calls,
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('renderLabelValue()', () => {
    it('should return null', () => {
      wrapper.setProps({ value: null });

      expect(instance.renderLabelValue()).toBe(undefined);
    });

    it('should renderLabelValue', () => {
      wrapper.setProps({ value: 'value' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelValue);
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

  describe('renderValueOnly()', () => {
    it('should return null', () => {
      wrapper.setProps({ value: null });

      expect(instance.renderValueOnly()).toBe(null);
    });

    it('should renderValueOnly', () => {
      wrapper.setProps({ value: 'value' });

      TEST_HELPERS.expectDefined(instance.renderValueOnly);
    });
  });
});
