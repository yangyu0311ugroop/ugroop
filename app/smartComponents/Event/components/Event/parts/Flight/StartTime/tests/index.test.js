/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { StartTime } from '..';

describe('<StartTime />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    intl: {
      formatMessage: (...args) => args,
    },
  });

  beforeEach(() => {
    wrapper = shallow(<StartTime {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(StartTime).toBeDefined();
  });

  describe('#renderDefault()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderDefault()).toMatchSnapshot();
    });
  });

  describe('#renderLabelPrefix()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelPrefix()).toMatchSnapshot();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabel()).toMatchSnapshot();
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
