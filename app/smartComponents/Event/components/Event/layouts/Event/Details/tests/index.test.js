/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EventDetails } from '..';

describe('<EventDetails />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<EventDetails {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(EventDetails).toBeDefined();
  });

  describe('#renderTitle()', () => {
    it('still matches snapshot if props.descriptionOnly', () => {
      wrapper.setProps({ descriptionOnly: true });
      expect(
        toJSON(shallow(<div>{instance.renderTitle()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderDefault()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderDefault()}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if props.descriptionOnly', () => {
      wrapper.setProps({ descriptionOnly: true });
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
