import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';

import { CopyNumberButton } from '../index';

describe('<CopyNumberButton />', () => {
  let wrapper;
  let instance;

  const props = {
    value: 'value',
    resaga: {},
  };

  beforeEach(() => {
    wrapper = shallow(<CopyNumberButton {...props} />);
    instance = wrapper.instance();
  });

  afterEach(() => jest.clearAllMocks());

  it('exists', () => {
    expect(CopyNumberButton).toBeDefined();
  });

  describe('render', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('handler', () => {
    it('should call stopPropagation', () => {
      const ev = { stopPropagation: jest.fn() };
      instance.handler(ev);
      expect(ev.stopPropagation).toBeCalled();
    });
  });

  describe('handleCopy', () => {
    it('should call SnackbarHelper.openInfoSnackbar with value and resaga', () => {
      SnackbarHelper.openInfoSnackbar = jest.fn();
      instance.handleCopy();
      expect(SnackbarHelper.openInfoSnackbar).toBeCalledWith(
        'Copied value',
        {},
      );
    });
  });
});
