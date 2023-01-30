/**
 * Created by edil on 8/8/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import ImageUtility from 'utils/imageUtils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { UGImageCropper } from '../index';
import CoolTheme from '../../../theme/coolTheme';

jest.mock('utils/request', () => ({
  fetchImage: jest.fn(() => ({
    then: cb => {
      cb({
        blob: {
          then: callb => {
            callb('blob');
          },
        },
        size: { width: 1, height: 1 },
      });
    },
  })),
}));

describe('<UGImageCropper />', () => {
  let wrapper;
  const fakeCanvas = {
    toDataURL: () => 'image',
  };
  const fakeEditor = {
    getImageScaledToCanvas: () => fakeCanvas,
    getCroppingRect: () => ({
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    }),
  };

  const mockedDispatch = jest.fn();
  const saveImagePosition = jest.fn();
  const cancelUploadImage = jest.fn();
  const dataUri = 'data:image/png;base64, sample';
  let UGImageCropperProps = {};
  beforeEach(() => {
    const placeholder = <div>Test</div>;
    const placeholderProps = {
      imgSrc: dataUri,
      placeholder,
      imgStyle: 'round-button-img',
    };
    UGImageCropperProps = {
      classes: {},
      fileId: '',
      dispatchUpload: mockedDispatch,
      placeholderProps,
      saveImagePosition,
      cancelUploadImage,
    };

    wrapper = shallow(<UGImageCropper {...UGImageCropperProps} />);
  });
  it('should render something', () => {
    const a = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImageCropper {...UGImageCropperProps} />
      </MuiThemeProvider>,
    );
    expect(a.render()).toBeDefined();
  });
  it('onSave, should set state properly', () => {
    const instance = wrapper.instance();
    instance.setState({
      scale: 1,
      originalImageBlob: 'blob',
      originalImageSize: 'size',
    });
    instance.setEditorRef(fakeEditor);
    instance.onSave();
    expect(saveImagePosition).toBeCalledWith({
      cropRect: {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
      },
      scale: 1,
      rotate: 0,
      size: 'size',
      originalImageBlob: 'blob',
    });
    expect(instance.state.showDialog).toBe(false);
    expect(instance.state.fileImageData).toBe(null);
  });
  it('onSliderChange, shall set scale properly', () => {
    const instance = wrapper.instance();
    const onSliderChange = instance.onSliderChange;
    onSliderChange(100);
    expect(instance.state.scale).toBe(1);
  });
  it('should cancel promise if set', () => {
    const component = wrapper.instance();
    const mockedFn = jest.fn();
    const cancelablePromise = {
      cancel: mockedFn,
    };
    component.cancelablePromise = cancelablePromise;
    component.componentWillUnmount();
    expect(mockedFn).toHaveBeenCalled();
  });
  it('do nothing', () => {
    const component = wrapper.instance();
    component.componentWillUnmount();
  });
  describe('onCloseDialog', () => {
    it('onCloseDialog, should set state properly', () => {
      const instance = wrapper.instance();
      wrapper.setState({
        loadFromUrl: true,
      });
      instance.onCloseDialog();
      expect(instance.state.showDialog).toBe(false);
      expect(instance.state.scale).toBe(1);
      expect(instance.state.fileImageData).toBe(null);
    });
  });

  describe('onRotateImage ', () => {
    it('should set state properly (1)', () => {
      const instance = wrapper.instance();
      wrapper.setState({
        orientation: 0,
      });

      instance.onRotateImage();

      expect(wrapper.state().orientation).toBe(90);
    });

    it('should set state properly (2)', () => {
      const instance = wrapper.instance();
      wrapper.setState({
        orientation: 90,
      });

      instance.onRotateImage();

      expect(wrapper.state().orientation).toBe(180);
    });

    it('should set state properly (3)', () => {
      const instance = wrapper.instance();
      wrapper.setState({
        orientation: 270,
      });

      instance.onRotateImage();

      expect(wrapper.state().orientation).toBe(0);
    });
  });

  describe('resizeSize()', () => {
    it('should resizeSize()', () => {
      wrapper.setProps({ resizeSize: undefined });
      const instance = wrapper.instance();
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      expect(instance.resizeSize()).toBe('LOGIC_HELPERS.switchCase');
    });
    it('should return resizeSize and type if there is resizeSize', () => {
      wrapper.setProps({
        resizeSize: 10,
        type: 'image',
      });
      const instance = wrapper.instance();
      expect(instance.resizeSize()).toEqual({ resizeSize: 10, type: 'image' });
    });
  });

  describe('renderPhotoPlaceHolder()', () => {
    it('should render coverPhotoPlaceholder', () => {
      const instance = wrapper.instance();
      wrapper.setProps({
        coverPhotoPlaceholder: true,
        placeholderProps: { editable: true },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoPlaceHolder);
    });

    it('should render PhotoPlaceHolder', () => {
      const instance = wrapper.instance();
      wrapper.setProps({ coverPhotoPlaceholder: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoPlaceHolder);
    });
  });

  describe('fileInputValueChange', () => {
    it('fileInputValueChange, should set state properly', () => {
      const mockResizedImage = {
        size: { width: 2, height: 2 },
        resource: 'data:text/plain;charset=utf-8;base64,cmVzaXplSW1hZ2U=',
      };
      const mockFn = jest.fn(() => ({
        promise: {
          then: cb => {
            cb(mockResizedImage);
            return { catch: c => c({}) };
          },
        },
      }));
      ImageUtility.resizeImagePromise = mockFn;
      const instance = wrapper.instance();
      const file = { name: 'abd', size: 11 };
      instance.fileInputValueChange(file, mockResizedImage);
      expect(instance.state.showDialog).toBe(true);
      expect(instance.state.fileImageData).toEqual(mockResizedImage);
    });
    it('fileInputValueChange with error', () => {
      const mockFn = jest.fn(() => ({
        promise: { then: () => ({ catch: c => c({ error: 'error' }) }) },
      }));
      ImageUtility.resizeImagePromise = mockFn;
      const instance = wrapper.instance();
      const file = { name: 'abd' };
      instance.fileInputValueChange(file, 'image');
      expect(instance.state.showDialog).toBe(false);
      expect(instance.state.fileImageData).toBe(null);
    });
    it('fileInputValueChange with cancel', () => {
      const mockFn = jest.fn(() => ({
        promise: { then: () => ({ catch: c => c({ isCanceled: true }) }) },
      }));
      ImageUtility.resizeImagePromise = mockFn;
      const instance = wrapper.instance();
      const file = { name: 'abd' };
      instance.fileInputValueChange(file, 'image');
    });
  });
  describe('reposition', () => {
    it('with org url', () => {
      const component = wrapper.instance();
      wrapper.setProps({
        originalImageUrl: 'url',
      });
      component.reposition();
      expect(component.state.showDialog).toBe(true);
      expect(component.state.loadFromUrl).toBe(true);
      expect(component.state.originalImageBlob).toBe('blob');
      expect(component.state.originalImageSize).toEqual({
        width: 1,
        height: 1,
      });
    });
    it('without org url', () => {
      const component = wrapper.instance();
      wrapper.setProps({
        originalImageUrl: null,
      });
      component.reposition();
      expect(component.state.showDialog).toBe(true);
    });
  });

  describe('render', () => {
    it('should showDialog', () => {
      wrapper.setProps({ showDialog: true });
      const instance = wrapper.instance();

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should match snapshot', () => {
      wrapper.setProps({
        show: true,
        type: 'template',
      });
      wrapper.setState({
        showDialog: true,
        fileImageData: 'fileImageData',
        loadFromUrl: 'loadFromUrl',
        orientation: 'orientation',
        scale: 'scale',
        originalImageBlob: 'originalImageBlob',
      });
      const instance = wrapper.instance();
      instance.renderPhotoPlaceHolder = jest.fn(() => 'renderPhotoPlaceHolder');
      instance.setEditorRef = jest.fn(() => 'setEditorRef');
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
