/**
 * Created by edil on 8/8/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import ImageUtility from 'utils/imageUtils';
import { persist, UGProfilePicture } from '../index';

describe('<UGProfilePicture />', () => {
  let wrapper;
  let instance;
  let mockResaga;
  let mockUploadFile;
  let mockOnUploading;
  beforeEach(() => {
    mockOnUploading = jest.fn();
    mockResaga = { analyse: jest.fn(), setValue: jest.fn() };
    mockUploadFile = {
      enqueueData: jest.fn(),
      subscribeSuccess: jest.fn(),
    };
    wrapper = shallow(
      <UGProfilePicture
        resaga={mockResaga}
        uploadFile={mockUploadFile}
        onUploading={mockOnUploading}
        classes={{}}
      />,
    );
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onStoreLocally  ', () => {
    it('should call onStoreLocally properly', () => {
      const form = wrapper.instance();
      persist.createPersistor = jest.fn();
      form.onStoreLocally();
      expect(persist.createPersistor).toBeCalled();
      persist.createPersistor.mockClear();
    });
  });
  describe('uploadImage', () => {
    it('should unset state.showCropper and call hoc.enqueue', () => {
      const data = 'Test';
      const type = 'text/plain';
      const blob = new Blob([data], { type });
      const file = { name: 'sample.txt' };
      instance.setState = jest.fn().mockImplementation((updater, callback) => {
        callback();
      });
      instance.uploadImage(blob, file);
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

  describe('componentWillMount', () => {
    it('should set state properly', () => {
      const mockCachedAvatar = {
        profilePhotoUrl: 'some_url',
        metaInfo: '{"x":0.1,"y":0.1,"width":0.1,"height":0.1,"scale":2.7}',
      };
      wrapper.setProps({ cachedAvatar: mockCachedAvatar });
      wrapper.instance().componentWillMount();
      expect(wrapper.state().hasUploaded).toBe(true);
    });
    it('calls props.uploadFile.subscribeSuccess()', () => {
      instance.componentWillMount();
      expect(instance.props.uploadFile.subscribeSuccess).toBeCalledWith(
        instance.handleImageUploadSuccess,
      );
    });
  });

  describe('#handleImageUploadSuccess()', () => {
    it('sets state.showCropper and state.uploadImageData', () => {
      const size = 123;
      const url = 'http://url.com';
      const blob = 'someBlob';
      const existingImageData = [1];
      const newImageData = { blob, imageSize: size, url };
      instance.setState({ uploadImageData: existingImageData });
      instance.setState = jest.fn();
      instance.onStoreLocally = jest.fn();
      instance.handleImageUploadSuccess({ size, url, blob });
      expect(instance.onStoreLocally).toBeCalled();
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({
          showCropper: true,
          uploadImageData: [...existingImageData, newImageData],
        }),
      );
    });
  });
  describe('cancelUploadImage', () => {
    it('uploadImageData should still be empty ', () => {
      wrapper.instance().cancelUploadImage();
      expect(wrapper.instance().state.uploadImageData).toEqual([]);
    });
    it('uploadImageData should have one data remain after cancel ', () => {
      const data = { blob: '1', imageSize: {}, url: 'abc' };
      const data2 = { blob: '2', imageSize: {}, url: 'abc2' };
      wrapper.setState({
        uploadImageData: [data, data2],
      });
      wrapper.instance().cancelUploadImage();
      expect(wrapper.instance().state.uploadImageData).toEqual([data]);
    });
    it('uploadImageData should still be empty after cancel', () => {
      const data = { blob: '1', imageSize: {}, url: 'abc' };
      wrapper.setState({
        uploadImageData: [data],
      });
      wrapper.instance().cancelUploadImage();
      expect(wrapper.instance().state.uploadImageData).toEqual([]);
    });
  });
  describe('saveImagePosition', () => {
    let mockFn;
    beforeEach(() => {
      mockFn = jest.fn(() => ({ then: cb => cb('image') }));
      ImageUtility.cropImage = mockFn;
    });
    afterEach(() => {
      mockFn.mockClear();
    });
    it('should call correctly', () => {
      const cropRect = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
      };
      const scale = 1;
      wrapper.setProps({
        handleUploadPhoto: jest.fn(),
      });
      wrapper.setState({
        uploadImageData: [],
      });
      const mockCachedAvatar = {
        profilePhotoUrl: 'origURL',
        metaInfo: '{"x":0.1,"y":0.1,"width":0.1,"height":0.1,"scale":2.7}',
      };
      wrapper.setProps({ cachedAvatar: mockCachedAvatar });
      wrapper.instance().saveImagePosition({
        cropRect,
        scale,
        originalImageBlob: 'blob',
        size: { width: 1, height: 2 },
      });
      expect(wrapper.instance().state.editImage).toBe('image');
      const metaInfo = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
        scale: 1,
      };
      expect(mockResaga.setValue).toHaveBeenCalledWith({
        avatar: {
          profilePhotoUrl: 'origURL',
          metaInfo: JSON.stringify(metaInfo),
        },
      });
      expect(wrapper.instance().props.handleUploadPhoto).toHaveBeenCalledWith({
        url: 'origURL',
        cropRect,
        scale,
      });
    });
    it('should call with undefined', () => {
      const cropRect = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
      };
      const scale = 1;
      wrapper.setProps({
        updateAccountAvatar: jest.fn(),
        handleUploadPhoto: jest.fn(),
      });
      wrapper.setState({
        uploadImageData: [],
      });
      const mockCachedAvatar = {
        profilePhotoUrl: 'origURL',
        metaInfo: '{"x":0.1,"y":0.1,"width":0.1,"height":0.1,"scale":2.7}',
      };
      wrapper.setProps({ cachedAvatar: mockCachedAvatar });
      wrapper
        .instance()
        .saveImagePosition({ cropRect, scale, size: { width: 1, height: 2 } });
      expect(wrapper.instance().state.editImage).toBe('image');
      const metaInfo = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
        scale: 1,
      };
      expect(mockResaga.setValue).toHaveBeenCalledWith({
        avatar: {
          profilePhotoUrl: undefined,
          metaInfo: JSON.stringify(metaInfo),
        },
      });
      expect(wrapper.instance().props.handleUploadPhoto).toHaveBeenCalledWith({
        url: undefined,
        cropRect,
        scale,
      });
    });
    it('with uploadImageData, should call correctly', () => {
      const data = { blob: '1', imageSize: {}, url: 'abc' };
      const data2 = { blob: '2', imageSize: {}, url: 'abc2' };

      const cropRect = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
      };
      const scale = 1;
      const mockCachedAvatar = {
        profilePhotoUrl: 'origURL',
        metaInfo: '{"x":0.1,"y":0.1,"width":0.1,"height":0.1,"scale":2.7}',
      };
      wrapper.setProps({
        handleUploadPhoto: jest.fn(),
        cachedAvatar: mockCachedAvatar,
      });
      wrapper.setState({
        uploadImageData: [data, data2],
        originalUrl: 'origURL',
      });
      wrapper.instance().saveImagePosition({
        cropRect,
        scale,
        originalImageBlob: 'blob',
        size: { width: 1, height: 2 },
      });
      expect(wrapper.instance().state.editImage).toBe('image');
      const metaInfo = {
        x: 1,
        y: 1,
        width: 1,
        height: 2,
        scale: 1,
      };
      expect(mockResaga.setValue).toHaveBeenCalledWith({
        avatar: { profilePhotoUrl: 'abc2', metaInfo: JSON.stringify(metaInfo) },
      });
      expect(wrapper.instance().props.handleUploadPhoto).toHaveBeenCalledWith({
        url: 'abc2',
        cropRect,
        scale,
      });
    });
  });
});
