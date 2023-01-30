import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Photo } from '../index';

describe('<Photo />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const uploadFile = {
    subscribeSuccess: jest.fn(),
    enqueueData: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
  };

  beforeEach(() => {
    rendered = shallow(<Photo {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Photo).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onUploadDispatch', () => {
    it('should unset state.showCropper and call hoc.enqueue', () => {
      const data = 'Test';
      const type = 'text/plain';
      const blob = new Blob([data], { type });
      const file = { name: 'sample.txt' };
      instance.setState = jest.fn().mockImplementation((updater, callback) => {
        callback();
      });
      instance.onUploadDispatch(blob, file);
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ showCropper: false }),
        expect.any(Function),
      );
      expect(instance.props.uploadFile.enqueueData).toBeCalledWith(
        expect.objectContaining({}),
        file.name,
        { blob },
      );
    });
  });

  describe('onUploadSuccessful()', () => {
    it('sets state.showCropper and state.uploadImageData', () => {
      const size = 123;
      const url = 'http://url.com';
      const blob = 'someBlob';
      const existingImageData = [1];
      const newImageData = { blob, imageSize: size, url };
      instance.setState({ uploadImageData: existingImageData });
      instance.onUploadSuccessful({ size, url, blob });
      expect(rendered.state().showCropper).toBe(true);
      expect(rendered.state().uploadImageData).toEqual([1, newImageData]);
    });
  });

  describe('handleDelete', () => {
    it('calls resaga.setValue/dispatchTo', () => {
      instance.handleDelete();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('onUploadTemplateImage', () => {
    it('should call uploadImageData.length > 0', () => {
      instance.onCrop = jest.fn();
      rendered.setState({ uploadImageData: [1] });
      const params = { originalImageBlob: '123' };
      instance.onUploadTemplateImage({ ...params });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onCrop);
    });

    it('should call originalImageBlob)', () => {
      instance.onCrop = jest.fn();
      rendered.setState({ uploadImageData: [] });
      const mockParam = { originalImageBlob: null };

      instance.onUploadTemplateImage(mockParam);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onCrop);
    });

    it('should call other', () => {
      instance.onCrop = jest.fn();
      rendered.setState({ uploadImageData: [] });
      const mockParam = { originalImageBlob: 123 };

      instance.onUploadTemplateImage(mockParam);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onCrop);
    });
  });

  describe('onCropImageSuccess', () => {
    it('should call setValue with image passed inside', () => {
      instance.onCropImageSuccess('qweqwe');
      expect(resaga.setValue).toBeCalledWith({
        photoImg: 'qweqwe',
      });
    });
  });

  describe('onUpdateTemplateImage()', () => {
    it('should onUpdateTemplateImage', () => {
      instance.onUpdateTemplateImage();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('onInsertTemplateImage()', () => {
    it('should onInsertTemplateImage', () => {
      instance.onInsertTemplateImage();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('onCrop()', () => {
    it('should call onUpdateTemplateImage', () => {
      rendered.setProps({ templatePhotoId: 123 });
      instance.onUpdateTemplateImage = jest.fn();

      instance.onCrop('url', { cropRect: {} });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onUpdateTemplateImage);
    });

    it('should call onInsertTemplateImage', () => {
      rendered.setProps({ templatePhotoId: 0 });
      instance.onInsertTemplateImage = jest.fn();

      instance.onCrop('url', { cropRect: {} });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onInsertTemplateImage);
    });

    it('should NOT call', () => {
      instance.onInsertTemplateImage = jest.fn();
      instance.onUpdateTemplateImage = jest.fn();

      instance.onCrop('', {});

      expect(instance.onInsertTemplateImage).not.toBeCalled();
      expect(instance.onUpdateTemplateImage).not.toBeCalled();
    });
  });

  describe('onUpdateImageSuccess', () => {
    it('should call setValue of resaga', () => {
      instance.onUpdateImageSuccess({ id: 1 });
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('onInsertUploadSuccess', () => {
    it('should call setValue of resaga', () => {
      instance.onInsertUploadSuccess({ id: 1 });
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('onUploadCancel', () => {
    it('should remove the the previously added item in originalUploadImageData when this function is called', () => {
      const initUploadImageData = [{ id: 1 }, { id: 2 }];
      rendered.setState({
        uploadImageData: initUploadImageData,
      });
      const length = initUploadImageData.length;
      const expectedImageData = initUploadImageData.slice(0, length - 1);
      instance.onUploadCancel();
      expect(instance.state.uploadImageData).toEqual(expectedImageData);
    });
  });

  describe('fileId()', () => {
    it('should fileId', () => {
      rendered.setProps({ id: 2233 });

      TEST_HELPERS.expectMatchSnapshot(instance.fileId);
    });
  });

  describe('renderImagePreview()', () => {
    it('should renderImagePreview', () => {
      Date.now = jest.fn(() => 'date.now');

      TEST_HELPERS.expectMatchSnapshot(instance.renderImagePreview);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderDialog = jest.fn(() => 'renderDialog');
      rendered.setProps({
        editable: true,
        templatePhotoUrl: 'templatePhotoUrl',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render !templatePhotoUrl', () => {
      instance.renderDialog = jest.fn(() => 'renderDialog');
      rendered.setProps({
        editable: true,
        resizeSize: 24,
        templatePhotoUrl: '',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
