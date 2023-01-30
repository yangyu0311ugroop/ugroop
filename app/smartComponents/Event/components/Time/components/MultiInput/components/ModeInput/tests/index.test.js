import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_CONSTANTS } from 'utils/constants/nodes';

import { MultiModeInput } from '..';

describe('<MultiModeInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      root: 'root',
    },
    onChange: jest.fn(),
    inpsts: {
      mode: { name: 'mode' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<MultiModeInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(MultiModeInput).toBeDefined();
  });

  describe('#handleModeChange()', () => {
    it('calls props.onChange with RELATIVE mode', () => {
      instance.handleModeChange();
      expect(instance.props.onChange).toBeCalledWith(
        NODE_CONSTANTS.TIME_MODES.relative,
      );
    });

    it('calls props.onChange with RELATIVE_START mode', () => {
      instance.handleModeChange(null, true);
      expect(instance.props.onChange).toBeCalledWith(
        NODE_CONSTANTS.TIME_MODES.relativeStart,
      );
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

  describe('#defaultProps', () => {
    it('#onChange()', () => {
      expect(() => {
        MultiModeInput.defaultProps.onChange();
      }).not.toThrow();
    });
  });
});
