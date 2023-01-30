/**
 * Created by stephenkarpinskyj on 14/4/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { UGEventAddButton } from '..';

describe('<UGEventAddButton />', () => {
  let wrapper;
  let instance;

  const makeProps = (onClick = jest.fn()) => ({
    onClick,
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<UGEventAddButton {...makeProps()} />);
    instance = wrapper.instance();
  });

  describe('#handleButtonClick()', () => {
    let e;

    beforeEach(() => {
      e = { preventDefault: () => {} };
      instance.handleButtonClick(e);
    });

    it('calls props.onClick()', () => {
      expect(instance.props.onClick).toHaveBeenCalled();
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
