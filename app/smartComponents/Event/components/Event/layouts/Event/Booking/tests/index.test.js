/**
 * Created by stephenkarpinskyj on 16/11/18.
 */
import { ability } from 'apis/components/Ability/ability';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EventBooking } from '..';

describe('<EventBooking />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<EventBooking {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EventBooking).toBeDefined();
  });

  describe('#renderDefault()', () => {
    it('still matches snapshot', () => {
      instance.renderPart = jest.fn(() => '');
      ability.can = jest.fn(() => true);
      expect(
        toJSON(shallow(<div>{instance.renderDefault()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
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
