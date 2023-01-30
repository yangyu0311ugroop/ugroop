/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { SubtypeEditableHeadingForm } from '..';

describe('<SubtypeEditableHeadingForm />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      selectMenuPaper: 'selectMenuPaper',
    },
    name: 'name',
  });

  beforeEach(() => {
    wrapper = shallow(<SubtypeEditableHeadingForm {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SubtypeEditableHeadingForm).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderValue(value)).toMatchSnapshot();
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
