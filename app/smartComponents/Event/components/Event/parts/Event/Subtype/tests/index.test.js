/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { Subtype } from '..';

describe('<Subtype />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Subtype {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Subtype).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns props.formValue if no props.value', () => {
      const formValue = 'formValue';
      wrapper.setProps({ value: '', formValue });
      expect(instance.getValue()).toEqual(formValue);
    });

    it('returns props.value if exists', () => {
      const value = 'value';
      wrapper.setProps({ value });
      expect(instance.getValue()).toEqual(value);
    });
  });

  describe('#renderSubtype()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderSubtype(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('renders Component', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });
  describe('#renderLabel()', () => {
    it('renders Component', () => {
      expect(instance.renderLabel()).toMatchSnapshot();
    });
  });

  describe('#renderData()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderData()).toMatchSnapshot();
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
    it('should renderValueOnly', () => {
      EVENT_HELPERS.getEventSubtypeConstants = jest.fn(() => ({
        name: 'EVENT_HELPERS.getEventSubtypeConstants',
      }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });
});
