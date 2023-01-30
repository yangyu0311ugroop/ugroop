/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { BookingConfirmed } from '..';

describe('<BookingConfirmed />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<BookingConfirmed {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BookingConfirmed).toBeDefined();
  });

  describe('#renderPart()', () => {
    it('still matches snapshot', () => {
      const Component = () => <div />;
      expect(instance.renderPart(Component)()).toMatchSnapshot();
    });
  });

  describe('#renderIcon()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderIcon()).toMatchSnapshot();
    });
  });

  describe('#renderTooltip()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTooltip()).toMatchSnapshot();
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
