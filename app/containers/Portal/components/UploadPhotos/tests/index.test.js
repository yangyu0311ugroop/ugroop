import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import dotProp from 'dot-prop-immutable';
import { shallow } from 'enzyme';
import React from 'react';
import { FILE_HELPERS } from 'ugcomponents/File';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { UPLOAD_PHOTO_UTILS } from '../helpers';
import { UploadPhotos } from '../index';
import { ADD_IMAGE_SUCCESS, TEMPLATE_API } from '../../../../../apis/constants';

describe('<UploadPhotos />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const uploadFile = {
    enqueuePhoto: jest.fn(),
    subscribeSuccess: jest.fn(),
    subscribeError: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
    tourId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<UploadPhotos {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UploadPhotos).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call handleDrop', () => {
      instance.handleDrop = jest.fn();
      rendered.setProps({ newFiles: 'newFiles' });

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.handleDrop);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call handleDrop', () => {
      instance.handleDrop = jest.fn();
      rendered.setProps({ newFiles: 1 });

      instance.handleDrop.mockClear();
      instance.componentWillReceiveProps({ newFiles: 2 });

      TEST_HELPERS.expectCalled(instance.handleDrop);
    });

    it('should NOT call handleDrop', () => {
      instance.handleDrop = jest.fn();
      rendered.setProps({ newFiles: 22 });

      instance.handleDrop.mockClear();
      instance.componentWillReceiveProps({ newFiles: 22 });

      TEST_HELPERS.expectNotCalled(instance.handleDrop);
    });
  });

  describe('handleUploadSuccess()', () => {
    it('should setState', () => {
      instance.handleUploadSuccess(123);

      expect(rendered.state().uploading).toBe(false);
    });
  });

  describe('handleUploadError()', () => {
    it('should call handleUploadErrorState', () => {
      instance.handleUploadErrorState = jest.fn();

      instance.handleUploadError(123);

      TEST_HELPERS.expectCalled(instance.handleUploadErrorState);
    });
  });

  describe('handleUploadErrorState()', () => {
    it('should setState', () => {
      instance.handleUploadErrorState(123);

      expect(rendered.state().uploading).toBe(false);
    });
  });

  describe('handleCloseDialog()', () => {
    it('should setState', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog(123);

      expect(rendered.state().uploading).toBe(false);
      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('handleMinimiseDialog()', () => {
    it('should setState', () => {
      instance.handleMinimiseDialog(123);

      expect(rendered.state().minimise).toBe(true);
    });
  });

  describe('handleMaximiseDialog()', () => {
    it('should setState', () => {
      instance.handleMaximiseDialog(123);

      expect(rendered.state().minimise).toBe(false);
    });
  });

  describe('uploadedURL()', () => {
    it('should return null', () => {
      rendered.setState({ uploadedFiles: { 1: false } });

      expect(instance.uploadedURL()).toBe(null);
    });

    it('should uploadedURL', () => {
      rendered.setState({ uploadedFiles: { 1: { url: 'url' } } });

      TEST_HELPERS.expectDefined(instance.uploadedURL, [1]);
    });
  });

  describe('handleDrop()', () => {
    it('should setState', () => {
      FILE_HELPERS.normaliseDrop = jest.fn(() => ({}));
      instance.uploadNext = jest.fn();

      instance.handleDrop(123);

      expect(rendered.state().minimise).toBe(false);
      TEST_HELPERS.expectCalledAndMatchSnapshot(
        FILE_HELPERS.normaliseDrop,
        123,
      );
    });
  });

  describe('uploadNext()', () => {
    it('should return null', () => {
      rendered.setState({ uploading: true });

      expect(instance.uploadNext()).toBe(null);
    });

    it('should call enqueuePhoto', () => {
      rendered.setState({
        uploading: false,
        droppedIds: [1, 2],
        uploadedIds: [1],
        droppedFiles: { 2: { requestFile: { size: 1 } } },
      });

      instance.uploadNext();

      TEST_HELPERS.expectCalledAndMatchSnapshot(uploadFile.enqueuePhoto);
    });
  });

  describe('removePhoto()', () => {
    it('should removePhoto', () => {
      rendered.setState({
        droppedIds: [1, 2],
        uploadedIds: { 1: 1123, 2: 2234 },
      });

      instance.removePhoto(1)();

      expect(rendered.state().droppedIds).toEqual([2]);
      expect(rendered.state().uploadedIds).toEqual({ 2: 2234 });
    });
  });

  describe('rotateLeft()', () => {
    it('should rotateLeft', () => {
      dotProp.set = jest.fn();

      instance.rotateLeft(1)();

      TEST_HELPERS.expectCalled(dotProp.set);
    });
  });

  describe('rotateRight()', () => {
    it('should rotateRight', () => {
      dotProp.set = jest.fn();

      instance.rotateRight(1)();

      TEST_HELPERS.expectCalled(dotProp.set);
    });
  });

  describe('confirmCancel()', () => {
    it('should call handleCloseDialog', () => {
      instance.handleCloseDialog = jest.fn();

      rendered.setState({ droppedIds: [] });

      instance.confirmCancel({ stopPropagation: jest.fn() });

      TEST_HELPERS.expectCalled(instance.handleCloseDialog);
    });

    it('should call confirmCancelUploadPhotos', () => {
      PORTAL_HELPERS.confirmCancelUploadPhotos = jest.fn();

      rendered.setState({ droppedIds: [1] });

      instance.confirmCancel({ stopPropagation: jest.fn() });

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmCancelUploadPhotos);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should not do anything while creating', () => {
      rendered.setState({ creating: true });

      expect(instance.handleValidSubmit()).toBe(null);
    });

    it('should handleCloseDialog if !data', () => {
      rendered.setState({ creating: false, droppedIds: [] });
      instance.handleCloseDialog = jest.fn();

      instance.handleValidSubmit();

      TEST_HELPERS.expectCalled(instance.handleCloseDialog);
    });

    it('should set state', () => {
      rendered.setState({ creating: false, droppedIds: [1, 2] });
      UPLOAD_PHOTO_UTILS.normaliseSubmitData = jest.fn(() => () => [{ id: 1 }]);

      instance.handleValidSubmit();

      expect(rendered.state().creating).toBe(true);
    });
  });

  describe('createNext()', () => {
    it('should call handleSubmitSuccess', () => {
      rendered.setState({ addCount: 3 });
      instance.handleSubmitSuccess = jest.fn();

      instance.createNext([1, 2, 3])();

      TEST_HELPERS.expectCalled(instance.handleSubmitSuccess);
    });

    it('should dispatch', () => {
      rendered.setState({ addCount: 0 });

      instance.createNext([1, 2, 3])();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess()', () => {
      rendered.setState({ addCount: 0 });

      instance.handleCreateSuccess({})({ node: {} });

      expect(rendered.state().addCount).toBe(1);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should call handleCloseDialog', () => {
      rendered.setProps({ id: 1 });
      rendered.setState({ droppedIds: [1] });
      instance.handleCloseDialog = jest.fn(() => 'handleCloseDialog');
      UPLOAD_PHOTO_UTILS.normaliseSubmitData = jest.fn(() => () => []);

      expect(instance.handleValidSubmit()).toBe('handleCloseDialog');
    });

    it('should handleValidSubmit', () => {
      rendered.setProps({ id: 1 });
      rendered.setState({ droppedIds: [1] });
      UPLOAD_PHOTO_UTILS.normaliseSubmitData = jest.fn(() => () => [1]);

      instance.handleValidSubmit();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('handleSubmitSuccess()', () => {
    it('should call handleCloseDialog', () => {
      rendered.setState({ addingToGallery: true });
      instance.fetchTabGallery = jest.fn();
      instance.handleCloseDialog = jest.fn();
      instance.notifyAddImageSuccess = jest.fn();

      instance.handleSubmitSuccess();

      expect(rendered.state().addingToGallery).toBe(false);
      TEST_HELPERS.expectCalled(instance.fetchTabGallery);
      TEST_HELPERS.expectCalled(instance.handleCloseDialog);
      TEST_HELPERS.expectCalled(instance.notifyAddImageSuccess);
    });
  });

  describe('handleSubmitError()', () => {
    it('should set state addingToGallery', () => {
      rendered.setState({ addingToGallery: true });

      instance.handleSubmitError();

      expect(rendered.state().addingToGallery).toBe(false);
    });
  });

  describe('fetchTabGallery()', () => {
    it('should call getNode', () => {
      NODE_API_HELPERS.getNode = jest.fn();

      instance.fetchTabGallery();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.getNode);
    });
  });

  describe('notifyAddImageSuccess()', () => {
    it('should call getNode', () => {
      instance.notifyAddImageSuccess([1, 2]);
      expect(resaga.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_API,
        ADD_IMAGE_SUCCESS,
        {
          payload: {
            id: 1,
            ids: [1, 2],
          },
        },
      );
    });

    it('should NOT call getNode', () => {
      instance.notifyAddImageSuccess([]);
      expect(resaga.dispatchTo).not.toHaveBeenCalled();
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      rendered.setState({ droppedIds: [1], droppedFiles: { 1: {} } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto, [1]);
    });
  });

  describe('renderUploadButton()', () => {
    it('should renderUploadButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUploadButton);
    });
  });

  describe('renderDropZone()', () => {
    it('should renderDropZone', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDropZone);
    });
  });

  describe('renderDropZoneCard()', () => {
    it('should renderDropZoneCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDropZoneCard);
    });
  });

  describe('renderDropZoneCard()', () => {
    it('should renderDropZoneCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDropZoneCard);
    });
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('renderDialog()', () => {
    it('should renderDialog', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDialog);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('renderMinimiseUploadPhotos()', () => {
    it('should renderMinimiseUploadPhotos', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMinimiseUploadPhotos);
    });
  });

  describe('render()', () => {
    it('should renderDialog', () => {
      rendered.setState({ minimise: false });
      instance.renderDialog = jest.fn(() => 'renderDialog');

      expect(instance.render()).toBe('renderDialog');
    });

    it('should renderMinimiseUploadPhotos', () => {
      rendered.setState({ minimise: true });
      instance.renderMinimiseUploadPhotos = jest.fn(
        () => 'renderMinimiseUploadPhotos',
      );

      expect(instance.render()).toBe('renderMinimiseUploadPhotos');
    });
  });
});
