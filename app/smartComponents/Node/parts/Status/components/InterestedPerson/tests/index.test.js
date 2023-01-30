import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { InterestedPerson } from '..';

describe('<InterestedPerson />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<InterestedPerson {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls NODE_API_HELPERS.updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      const value = 'value';
      instance.handleSubmit(value)();
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderData()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderData()).toMatchSnapshot();
    });
  });

  describe('#renderActions()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderActions()).toMatchSnapshot();
    });

    it('still matches snapshot if props.status', () => {
      wrapper.setProps({ status: 'status' });
      expect(instance.renderActions()).toMatchSnapshot();
    });

    it('renders nothing if props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(instance.renderActions()).toBeNull();
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
