/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Icon } from '..';

describe('<Icon />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Icon {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Icon).toBeDefined();
  });

  describe('#renderIcon()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderIcon(Component)()).toMatchSnapshot();
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
});
