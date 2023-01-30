/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Activity } from '..';

describe('<Activity />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Activity {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Activity).toBeDefined();
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
  });
  describe('#renderDestination()', () => {
    it('still matches snapshot', () => {
      instance.isCycling = jest.fn(() => true);
      expect(
        toJSON(shallow(<div>{instance.renderDestination()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderActivityStartEnd()', () => {
    it('still matches snapshot', () => {
      instance.isCycling = jest.fn(() => true);
      expect(
        toJSON(shallow(<div>{instance.renderActivityStartEnd()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEventDetails()', () => {
    it('still matches snapshot', () => {
      instance.isCycling = jest.fn(() => true);
      expect(
        toJSON(shallow(<div>{instance.renderEventDetails()}</div>)),
      ).toMatchSnapshot();
    });
    it('still matches snapshot', () => {
      instance.isCycling = jest.fn(() => false);
      wrapper.setProps({ isCustomDateStart: true });
      expect(
        toJSON(shallow(<div>{instance.renderActivityStartEnd()}</div>)),
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
