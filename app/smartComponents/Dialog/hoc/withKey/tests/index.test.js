/**
 * Created by stephenkarpinskyj on 29/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withKey from '../index';

describe('smartComponents/hoc/withKey', () => {
  let wrapper;
  let instance;

  const Component = () => <div />;
  const Hoc = withKey()(Component);

  const makeProps = () => ({
    time: 123,
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(withKey).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    const time = 456;

    it('sets state.key if props[keyProp] changes while open', () => {
      instance.setState = jest.fn();
      const prevProps = instance.props;
      wrapper.setProps({ open: true, time });
      instance.componentDidUpdate(prevProps);
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ key: time }),
      );
    });

    it('not sets state.key if props[keyProp] changes while not open', () => {
      instance.setState = jest.fn();
      const prevProps = instance.props;
      wrapper.setProps({ open: false, time });
      instance.componentDidUpdate(prevProps);
      expect(instance.setState).not.toBeCalled();
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
