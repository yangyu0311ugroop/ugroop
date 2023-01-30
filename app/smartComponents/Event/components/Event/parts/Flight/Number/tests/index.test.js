/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT_UTILS } from 'utils/events';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Number } from '..';

describe('<Number />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<Number {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Number).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditable()).toEqual(null);
    });
    it('matches snapshot if can execute event', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });

    it('renders null if no value', () => {
      wrapper.setProps({ value: null });
      expect(instance.renderLabelValue()).toBeNull();
    });
  });

  describe('#renderLabel()', () => {
    it('should still match the snapshot given that value is none', () => {
      wrapper.setProps({
        value: '',
      });
      expect(instance.renderLabel()).toMatchSnapshot();
    });

    it('should still match the snapshot given that value is not blank', () => {
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
