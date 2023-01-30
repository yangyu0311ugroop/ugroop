/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { BookingConfirmed } from '..';

describe('<BookingConfirmed />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      iconRoot: 'iconRoot',
      cardRoot: 'cardRoot',
      checkmark: 'checkmark',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<BookingConfirmed {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BookingConfirmed).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      instance.renderIconAndLabel = jest.fn(() => '');
      expect(toJSON(instance.render)).toMatchSnapshot();
    });

    it('still matches snapshot if props.iconOnly', () => {
      wrapper.setProps({ iconOnly: true });
      instance.renderIconOnly = jest.fn(() => '');
      expect(toJSON(instance.render)).toMatchSnapshot();
    });
    it('still matches snapshot if props.iconOnly', () => {
      wrapper.setProps({ iconOnly: false, iconAndValue: true });
      instance.renderIconAndValue = jest.fn(() => '');
      expect(toJSON(instance.render)).toMatchSnapshot();
    });
  });

  describe('renderIconAndValue()', () => {
    it('should renderIconAndValue', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIconAndValue);
    });
  });
});
