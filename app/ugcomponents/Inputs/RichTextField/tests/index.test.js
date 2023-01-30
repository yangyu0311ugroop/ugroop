/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { RichTextField } from '..';

describe('<RichTextField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    isFormDisabled: () => false,
    setValue: jest.fn(),
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<RichTextField {...makeProps()} />);
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(RichTextField).toBeDefined();
  });

  describe('#isDisabled()', () => {
    it('returns true correctly', () => {
      wrapper.setProps({ isFormDisabled: () => true, disabled: false });
      expect(instance.isDisabled()).toBe(true);
      wrapper.setProps({ isFormDisabled: () => false, disabled: true });
      expect(instance.isDisabled()).toBe(true);
    });
  });

  describe('#handleChange()', () => {
    const value = 'Rich Text';

    it('sets value', () => {
      instance.handleChange(value);
      expect(instance.props.setValue).toHaveBeenCalledWith(value);
    });
  });

  describe('#render()', () => {
    it("doesn't explode", () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
