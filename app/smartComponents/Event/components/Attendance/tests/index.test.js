/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Attendance } from '..';

describe('<Attendance />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    inputs: { name: 'name' },
  });

  beforeEach(() => {
    wrapper = shallow(<Attendance {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Attendance).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent if changed', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot if value=true', () => {
      const value = true;
      expect(
        toJSON(shallow(<div>{instance.renderEditableValue(value)}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if value=false', () => {
      const value = false;
      expect(
        toJSON(shallow(<div>{instance.renderEditableValue(value)}</div>)),
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
