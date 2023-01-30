/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT_UTILS } from 'utils/events';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Airline } from '..';

describe('<Airline />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Airline {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Airline).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('returns null', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditable()).toEqual(null);
    });
    it('matches snapshot if participant can execute event', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('#renderLabel()', () => {
    it('should still match the snapshot given that value is none', () => {
      expect(instance.renderLabel()).toMatchSnapshot();
    });

    it('should still match the snapshot given that value is not blank', () => {
      wrapper.setProps({
        value: '777',
      });
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
