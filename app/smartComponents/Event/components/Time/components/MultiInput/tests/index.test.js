import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MultiInput } from '..';

describe('<MultiInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    inputs: {
      mode: { name: 'mode' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<MultiInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(MultiInput).toBeDefined();
  });

  describe('#handleModeChange()', () => {
    it('sets state.mode', () => {
      instance.setState = jest.fn();
      instance.handleModeChange(null);
      expect(instance.setState).toBeCalledWith({ mode: null });
    });
  });

  describe('#renderInput()', () => {
    it('relativeStart still matches snapshot', () => {
      wrapper.setProps({ mode: NODE_CONSTANTS.TIME_MODES.relativeStart });
      expect(instance.renderInput()).toMatchSnapshot();
    });

    it('relativeStart still matches snapshot if props.singleColumn', () => {
      wrapper.setProps({
        mode: NODE_CONSTANTS.TIME_MODES.relativeStart,
        singleColumn: true,
      });
      expect(instance.renderInput()).toMatchSnapshot();
    });
  });

  describe('#renderDefault()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderDefault()}</div>)),
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
