import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DialNumberButton } from '../index';

describe('<DialNumberButton />', () => {
  let wrapper;
  let instance;

  const props = {
    value: 'value',
  };

  beforeEach(() => {
    wrapper = shallow(<DialNumberButton {...props} />);
    instance = wrapper.instance();
  });

  afterEach(() => jest.clearAllMocks());

  it('exists', () => {
    expect(DialNumberButton).toBeDefined();
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

  describe('handleCall', () => {
    it('should call handler and window.open', () => {
      instance.handler = jest.fn();
      window.open = jest.fn();

      instance.handleCall();
      expect(instance.handler).toBeCalled();
      expect(window.open).toBeCalled();
    });
  });
});
