/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT_UTILS } from 'utils/events';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Name } from '..';

describe('<Name />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      labelValueItem: 'labelValueItem',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<Name {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Name).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ value: 'value' });
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });

  describe('#renderHeadingValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderHeadingValue(value)).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#renderEditableHeadingForm()', () => {
    it('still matches snapshot', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableHeadingForm);
    });
    it('should equal null', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditableHeadingForm()).toEqual(null);
    });
  });

  describe('#renderLabelValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabelValue()).toMatchSnapshot();
    });
  });

  describe('#renderValueOnly()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderValueOnly()).toMatchSnapshot();
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

  describe('renderPlaceholder', () => {
    it('should return props', () => {
      wrapper.setProps({
        editablePlaceholder: 1,
      });
      expect(instance.renderPlaceholder()).toEqual(1);
    });
  });
});
