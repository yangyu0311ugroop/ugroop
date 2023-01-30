/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EndTime } from '..';

describe('<EndTime />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<EndTime {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EndTime).toBeDefined();
  });

  describe('#renderPart()', () => {
    it('renders Component', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
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
