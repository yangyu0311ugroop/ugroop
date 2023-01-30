/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { Booking } from '..';

describe('<Booking />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: null,
  });

  beforeEach(() => {
    wrapper = shallow(<Booking {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Booking).toBeDefined();
  });

  describe('#renderPart()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ value: 'value' });
      expect(instance.renderLabel()).toMatchSnapshot();
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

  describe('renderCard()', () => {
    it('should return null', () => {
      wrapper.setProps({ value: null });

      expect(instance.renderCard()).toBe(null);
    });

    it('should renderCard', () => {
      wrapper.setProps({ value: 123 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('renderLabelHeading()', () => {
    it('should return null', () => {
      wrapper.setProps({ value: null });

      expect(instance.renderLabelHeading()).toBe(null);
    });

    it('should renderLabelHeading', () => {
      wrapper.setProps({ value: 123 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelHeading);
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
