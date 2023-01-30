import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { InterestLevel } from '..';

describe('<InterestLevel />', () => {
  let wrapper;
  let instance;

  const props = {
    value: 'value',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<InterestLevel {...props} />);
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

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextField()).toMatchSnapshot();
    });
  });

  describe('#checkUpdateValue()', () => {
    it('should checkUpdateValue', () => {
      instance.checkUpdateValue('n/a');
      expect(props.onChange).toBeCalledWith(false);
      expect(instance.state.isEmptyInterestLevelState).toBe(false);
    });
  });

  describe('#getValue()', () => {
    it('matches snapshot required', () => {
      wrapper.setProps({
        value: undefined,
      });
      expect(instance.getValue()).toMatchSnapshot();
    });
    it('still matches snapshot when not require', () => {
      wrapper.setProps({
        value: undefined,
        required: true,
      });
      expect(instance.getValue()).toMatchSnapshot();
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
