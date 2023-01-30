import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { BookingPersonCount } from '..';

describe('<BookingPersonCount />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<BookingPersonCount {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BookingPersonCount).toBeDefined();
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
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditableValue(1)).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
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
      wrapper.setProps({ value: 12 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      ability.can = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
