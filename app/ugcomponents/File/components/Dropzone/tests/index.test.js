/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Dropzone from 'react-dropzone';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { FileDropzone } from '..';

describe('<FileDropzone />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: { root: 'root' },
    onDrop: jest.fn(),
    showClear: true,
  });

  beforeEach(() => {
    wrapper = shallow(<FileDropzone {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FileDropzone).toBeDefined();
  });

  describe('#handleDrop()', () => {
    it('calls props.onDrop', () => {
      const acceptedFiles = [1];
      instance.handleDrop(acceptedFiles);
      expect(instance.props.onDrop).toBeCalledWith(acceptedFiles);
    });

    it('not calls props.onDrop', () => {
      instance.handleDrop([]);
      expect(instance.props.onDrop).not.toBeCalled();
    });
  });

  describe('#renderText()', () => {
    it('still matches snapshot if props.compact', () => {
      wrapper.setProps({ compact: true });
      expect(instance.renderText()).toMatchSnapshot();
    });
  });
  describe('#handlePaste()', () => {
    it('handlePaste still matches snapshot ', () => {
      wrapper.setProps({ allowPaste: true });
      const e = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        clipboardData: {
          items: [{ getAsFile: jest.fn(() => ({ type: 'image' })) }],
        },
      };
      expect(instance.handlePaste(e)).toMatchSnapshot();
    });
    it('handlePaste should return null if not an image', () => {
      wrapper.setProps({ allowPaste: true });
      const e = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        clipboardData: {
          items: [{ getAsFile: jest.fn(() => ({ type: 'video' })) }],
        },
      };
      expect(instance.handlePaste(e)).toMatchSnapshot();
    });
    it('handlePaste should not explode if item is not a function ', () => {
      wrapper.setProps({ allowPaste: true });
      const e = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        clipboardData: {
          items: [{ getAsFile: jest.fn() }],
        },
      };
      expect(instance.handlePaste(e)).toMatchSnapshot();
    });
    it('still matches snapshot if props.compact', () => {
      // wrapper.setProps({ compact: true });
      wrapper.setProps({ allowPaste: true });
      expect(instance.handlePaste()).toMatchSnapshot();
    });
    it('still matches snapshot if props.compact', () => {
      // wrapper.setProps({ compact: true });
      expect(instance.handlePaste()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render children', () => {
      const children = jest.fn(() => 'children');
      wrapper.setProps({ children });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('still matches snapshot', () => {
      Dropzone.displayName = 'Dropzone';
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClear()', () => {
      expect(() => {
        FileDropzone.defaultProps.onClear();
      }).not.toThrow();
    });
  });
});
