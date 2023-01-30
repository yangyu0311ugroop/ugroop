/**
 * Created by stephenkarpinskyj on 16/11/18.
 */
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { BookingNumber } from '..';

describe('<BookingNumber />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({ classes: {} });

  beforeEach(() => {
    wrapper = shallow(<BookingNumber {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BookingNumber).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(instance.renderField())).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      ability.can = jest.fn(() => true);
      expect(toJSON(instance.renderEditable())).toMatchSnapshot();
    });
    it('should return null', () => {
      ability.can = jest.fn(() => false);
      expect(instance.renderEditable()).toEqual(null);
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

  describe('renderLabelValue()', () => {
    it('should renderLabelValue', () => {
      wrapper.setProps({
        value: 'val',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelValue);
    });
  });

  describe('renderValueOnly()', () => {
    it('should return null', () => {
      wrapper.setProps({ value: null });

      expect(instance.renderValueOnly()).toBe(null);
    });

    it('should renderValueOnly', () => {
      wrapper.setProps({ value: 'value' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });
});
