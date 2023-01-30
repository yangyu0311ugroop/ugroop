import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { GuestCount } from '..';

describe('<GuestCount />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<GuestCount {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls NODE_API_HELPERS.updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({
        model: 'model',
        onSuccess: 'onSuccess',
        onError: 'onError',
      });
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditableValue('value')).toMatchSnapshot();
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextField()).toMatchSnapshot();
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
