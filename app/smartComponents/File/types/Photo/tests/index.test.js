import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {
  CANVAS_SIZE,
  CANVAS_SIZE_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { UID_HELPERS } from 'utils/helpers/uid';
import ImageUtility from 'utils/imageUtils';
import { VARIANTS } from 'variantsConstants';

import { Photo } from '../index';

jest.useFakeTimers();

describe('<Photo />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const uploadFile = {
    handleDelete: () => {},
    subscribeSuccess: () => {},
    enqueueData: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
    onUpload: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    UID_HELPERS.generateUID = jest.fn(() => 1);
    LOGIC_HELPERS.ifFunction = jest.fn();
    ImageUtility.convertFormData = jest.fn(() => 'convertFormData');
    rendered = shallow(<Photo {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Photo).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getCanvasSize()', () => {
    it('should return canvas size for small', () => {
      rendered.setProps({
        canvasSize: CANVAS_SIZE_CONSTANTS.SMALL,
      });
      const value = instance.getCanvasSize();
      expect(value).toBe(CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.SMALL]);
    });
    it('should return canvas size for medium', () => {
      rendered.setProps({
        canvasSize: CANVAS_SIZE_CONSTANTS.MEDIUM,
      });
      const value = instance.getCanvasSize();
      expect(value).toBe(CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.MEDIUM]);
    });
    it('should return canvas size for large', () => {
      rendered.setProps({
        canvasSize: CANVAS_SIZE_CONSTANTS.LARGE,
      });
      const value = instance.getCanvasSize();
      expect(value).toBe(CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LARGE]);
    });

    it('should return canvas size for landscape medium', () => {
      rendered.setProps({
        canvasSize: CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD,
      });
      const value = instance.getCanvasSize();
      expect(value).toBe(CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD]);
    });

    it('should return canvas size for landscape small', () => {
      rendered.setProps({
        canvasSize: CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM,
      });
      const value = instance.getCanvasSize();
      expect(value).toBe(CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM]);
    });
  });

  describe('cancelUploadImage()', () => {
    it('should remove the recently added data in the uploadImageData state', () => {
      rendered.setState({
        uploadImageData: [
          {
            url: 'url',
            imageSize: 1,
            blob: 'blob',
          },
        ],
      });
      instance.cancelUploadImage();
      expect(rendered.state().uploadImageData).toEqual([]);
    });
  });

  describe('dispatchUpload()', () => {
    it('should set show to false and call enqueue data prop function', () => {
      rendered.setState({
        show: true,
      });
      instance.dispatchUpload('blob', {
        name: 'file.txt',
      });
      jest.runAllTimers();
      expect(rendered.state().show).toBe(false);
      expect(props.uploadFile.enqueueData).toBeCalledWith(
        'convertFormData',
        'file.txt',
        { blob: 'blob' },
      );
    });
  });

  describe('saveImagePosition()', () => {
    const mockParam = {
      cropRect: {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
      },
      rotate: 1,
      scale: 1,
      size: 1,
      originalImageBlob: 'originalBlob',
    };
    beforeEach(() => {
      instance.crop = jest.fn();
    });
    it('should use uploadImageData state data to be passed in the crop function', () => {
      rendered.setState({
        uploadImageData: [
          {
            imageSize: 1,
            url: 'http://url.com',
            blob: 'blob',
          },
        ],
      });
      instance.saveImagePosition(mockParam);
      expect(instance.crop).toBeCalledWith('http://url.com', {
        imageSize: 1,
        scale: mockParam.scale,
        rotate: mockParam.rotate,
        cropRect: mockParam.cropRect,
      });
    });
    it('should use size and photo props for imageSize and url if originalImageBlob exist', () => {
      rendered.setProps({
        photo: 'photo',
      });
      instance.saveImagePosition(mockParam);
      expect(instance.crop).toBeCalledWith('photo', {
        imageSize: mockParam.size,
        scale: mockParam.scale,
        cropRect: mockParam.cropRect,
        rotate: mockParam.rotate,
      });
    });
    it('should pass to crop undefined url and undefined imageSize', () => {
      instance.saveImagePosition({
        ...mockParam,
        originalImageBlob: undefined,
      });
      expect(instance.crop).toBeCalledWith(undefined, {
        imageSize: undefined,
        scale: mockParam.scale,
        cropRect: mockParam.cropRect,
        rotate: mockParam.rotate,
      });
    });
  });

  describe('crop()', () => {
    const mockUrl = 'http://url.com';
    const mockCropImageParam = {
      scale: 1,
      rotate: 1,
      cropRect: {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
      },
    };
    it('should run ifFunction given the onUpload props and array of things to be passed', () => {
      instance.crop(mockUrl, mockCropImageParam);
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith(props.onUpload, [
        mockUrl,
        {
          x: mockCropImageParam.cropRect.x,
          y: mockCropImageParam.cropRect.y,
          width: mockCropImageParam.cropRect.width,
          height: mockCropImageParam.cropRect.height,
          rotate: mockCropImageParam.rotate,
          scale: mockCropImageParam.scale,
        },
      ]);
    });
    it('should not call LOGIC HELPERS ifFunction', () => {
      instance.crop(undefined, mockCropImageParam);
      expect(LOGIC_HELPERS.ifFunction).not.toBeCalled();
    });
  });

  describe('renderImageOnly', () => {
    it('should be called if photo is not empty string', () => {
      rendered.setProps({
        photo: 'photo',
      });
      const snapshot = shallow(<div>{instance.renderImageOnly()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should be called if photo is empty string', () => {
      rendered.setProps({
        photo: '',
      });
      instance.getFinalPlaceholder = jest.fn(() => 'getFinalPlaceholder');
      const snapshot = shallow(<div>{instance.renderImageOnly()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('uploadSuccess()', () => {
    it('should set show to true and update uploadImageData state', () => {
      const param = {
        size: 'large',
        url: 'http://qq.com',
        blob: 'blob',
      };
      instance.uploadSuccess(param);
      expect(rendered.state().show).toBe(true);
      expect(rendered.state().uploadImageData.length).toBe(1);
      expect(rendered.state().uploadImageData).toEqual([
        {
          blob: param.blob,
          imageSize: param.size,
          url: param.url,
        },
      ]);
    });

    it('should call saveImagePosition immediately if skipDialog props is true', () => {
      rendered.setProps({
        skipDialog: true,
      });
      instance.saveImagePosition = jest.fn();
      const param = {
        size: 'large',
        url: 'http://qq.com',
        blob: 'blob',
      };
      instance.uploadSuccess(param);

      expect(instance.saveImagePosition).toBeCalledWith({
        cropRect: { x: 0, y: 0, height: 1, width: 1 },
        rotate: null,
        scale: null,
        originalImageBlob: param.blob,
        uploadImageData: [
          { blob: param.blob, imageSize: param.size, url: param.url },
        ],
      });
    });
  });

  describe('deleteSuccess()', () => {
    it('should change uploadImageData state', () => {
      rendered.setState({
        uploadImageData: [{ id: 1 }],
      });
      instance.deleteSuccess();
      expect(rendered.state().uploadImageData.length).toBe(0);
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith(props.onDelete);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is read only and photo is not empty', () => {
      rendered.setProps({
        variant: VARIANTS.READ_ONLY,
      });
      rendered.setProps({
        photo: '/path-to-file',
      });
      instance.renderImageOnly = jest.fn(() => 'renderImageOnly');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is read only and photo is empty', () => {
      rendered.setProps({
        variant: VARIANTS.READ_ONLY,
      });
      rendered.setProps({
        photo: '',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
