/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { CloseButton } from '..';

describe('DialogForm/Complex/<CloseButton />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      button: 'button',
    },
    children: 'children',
  });

  beforeEach(() => {
    wrapper = shallow(<CloseButton {...makeProps()} />);
  });

  it('exists', () => {
    expect(CloseButton).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClick()', () => {
      expect(() => {
        CloseButton.defaultProps.onClick();
      }).not.toThrow();
    });
  });
});
