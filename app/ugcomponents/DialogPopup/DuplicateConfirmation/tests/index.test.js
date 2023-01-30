/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DuplicateConfirmationDialog } from '..';

describe('<DuplicateConfirmationDialog />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  beforeEach(() => {
    wrapper = shallow(<DuplicateConfirmationDialog {...makeProps()} />);
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DuplicateConfirmationDialog).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });
  });

  describe('handleConfirm', () => {
    it('should call onConfirm props with handleConfirm', () => {
      expect(instance.handleConfirm()).toMatchSnapshot();
    });
  });

  describe('handleLoad', () => {
    it('should call onConfirm props with handleConfirm', () => {
      expect(instance.handleLoad()).toMatchSnapshot();
    });
  });
});
