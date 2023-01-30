/**
 * Created by stephenkarpinskyj on 24/7/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Editable } from '..';

jest.useFakeTimers();

describe('<Editable />', () => {
  let wrapper;
  let instance;

  const props = {
    children: 'Children',
    fullWidth: true,
    displayFlex: true,
    onClick: jest.fn(),
    classes: {},
  };

  beforeEach(() => {
    wrapper = shallow(<Editable {...props} />);
    instance = wrapper.instance();
  });

  afterEach(() => jest.clearAllMocks());

  it('exists', () => {
    expect(Editable).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });

    it('still matches snapshot if no props.children', () => {
      wrapper.setProps({ children: null });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClick()', () => {
      expect(() => {
        Editable.defaultProps.onClick();
      }).not.toThrow();
    });
  });
});
