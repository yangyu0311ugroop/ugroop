import { UPLOADED } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { FILE_HELPERS } from 'ugcomponents/File';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Attachments } from '../index';

describe('<Attachments />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const uploadFile = {
    subscribeSuccess: jest.fn(),
    subscribeError: jest.fn(),
    enqueueFile: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Attachments {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachments).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should componentWillUnmount()', () => {
      const valueRef = jest.fn();

      rendered.setProps({ valueRef });

      instance.componentWillUnmount();

      TEST_HELPERS.expectCalled(valueRef);
    });
  });

  describe('value()', () => {
    it('should value()', () => {
      rendered.setState({ uploadedIds: 1, uploadedFiles: 2 });

      expect(instance.value()).toEqual({ uploadedIds: 1, uploadedFiles: 2 });
    });
  });

  describe('handleUploadProgress()', () => {
    it('should handleUploadProgress()', () => {
      instance.setState = jest.fn();

      instance.handleUploadProgress({});

      TEST_HELPERS.expectCalled(instance.setState);
    });
  });

  describe('handleUploadSuccess()', () => {
    it('should handleUploadSuccess()', () => {
      instance.setState = jest.fn(cb => cb({}));

      instance.handleUploadSuccess({ url: 'sample.com', name: 'file' });

      TEST_HELPERS.expectCalled(instance.setState);
    });
    it('should handleUploadSuccess() inline', () => {
      const uploadFileSuccess = jest.fn();
      rendered.setProps({ inline: true, uploadFileSuccess });
      instance.inlineAfterUpload = jest.fn();

      instance.handleUploadSuccess({ url: 'sample.com', name: 'file' });

      TEST_HELPERS.expectCalled(uploadFileSuccess);
    });
  });

  describe('handleEnqueueError()', () => {
    it('should handleEnqueueError()', () => {
      instance.handleUploadErrorState = jest.fn(() => '');

      instance.handleEnqueueError(1)();

      TEST_HELPERS.expectCalled(instance.handleUploadErrorState);
    });
  });

  describe('handleUploadError()', () => {
    it('should handleUploadError()', () => {
      instance.handleUploadErrorState = jest.fn();

      instance.handleUploadError();

      TEST_HELPERS.expectCalled(instance.handleUploadErrorState);
    });
  });

  describe('handleUploadErrorState()', () => {
    it('should handleUploadErrorState()', () => {
      instance.setState = jest.fn();

      instance.handleUploadErrorState();

      TEST_HELPERS.expectCalled(instance.setState);
    });
  });

  describe('handleDrop()', () => {
    it('should handleDrop()', () => {
      instance.setState = jest.fn(cb => cb({}));
      FILE_HELPERS.normaliseDrop = jest.fn(() => ({
        droppedFiles: {},
        droppedIds: [],
      }));

      instance.handleDrop();

      TEST_HELPERS.expectCalled(instance.setState);
    });
  });

  describe('uploadNext()', () => {
    it('should return null', () => {
      rendered.setState({ uploading: true });

      expect(instance.uploadNext()).toBe(null);
    });

    it('should finish uploading', () => {
      rendered.setState({ uploading: false, droppedIds: [] });

      instance.uploadNext();

      expect(rendered.state().uploadingId).toBe('');
      expect(rendered.state().uploading).toBe(false);
    });

    it('should call enqueuePhoto', () => {
      rendered.setState({
        uploading: false,
        droppedIds: [1, 2],
        uploadedIds: [1],
        droppedFiles: { 2: { requestFile: { size: 1 } } },
      });

      instance.uploadNext();

      TEST_HELPERS.expectCalledAndMatchSnapshot(uploadFile.enqueueFile);
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

  describe('handleRemoveFile()', () => {
    it('should handleRemoveFile', () => {
      rendered.setState({
        droppedIds: [1, 2],
        uploadedIds: { 1: 1123, 2: 2234 },
      });

      instance.handleRemoveFile(1)();

      expect(rendered.state().droppedIds).toEqual([2]);
      expect(rendered.state().uploadedIds).toEqual({ 2: 2234 });
    });
  });

  describe('renderDroppedFile()', () => {
    it('should renderDroppedFile', () => {
      rendered.setState({
        droppedFiles: { 1: { status: UPLOADED, requestFile: {} } },
        uploadedFiles: { 1: { errorMessage: 'file too large' } },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppedFile, [1, 0]);
    });
  });
  describe('inlineAfterUpload()', () => {
    it('should inlineAfterUpload', () => {
      rendered.setState({
        droppedFiles: { 1: { status: UPLOADED, requestFile: {} } },
        uploadedFiles: { 1: { errorMessage: 'file too large' } },
      });

      const parm = {
        uploadedIds: [1],
        uploadedFiles: {},
        droppedFiles: [1],
        uploadingId: 1,
        file: {},
        droppedIds: [1],
      };

      TEST_HELPERS.expectMatchSnapshot(instance.inlineAfterUpload(parm), [1]);
    });
  });
  //
  // describe('renderDroppedFile()', () => {
  //   it('should return null', () => {
  //     rendered.setState({ droppedFiles: { 1: { status: UPLOADED } } });
  //
  //     expect(instance.renderDroppedFile(22)).toBe(null);
  //   });
  //
  //   it('should renderDroppedFile UPLOADED', () => {
  //     rendered.setState({
  //       droppedFiles: { 1: { status: UPLOADED, requestFile: {} } },
  //     });
  //
  //     TEST_HELPERS.expectMatchSnapshot(instance.renderDroppedFile, [1]);
  //   });
  //
  //   it('should renderDroppedFile UPLOADED errorMessage', () => {
  //     rendered.setState({
  //       droppedFiles: { 1: { status: UPLOADED, requestFile: {} } },
  //       uploadedFiles: { 1: { errorMessage: 'file too large' } },
  //     });
  //
  //     TEST_HELPERS.expectMatchSnapshot(instance.renderDroppedFile, [1]);
  //   });
  //
  //   it('should renderDroppedFile UPLOADING', () => {
  //     rendered.setState({
  //       droppedFiles: { 1: { status: UPLOADING, requestFile: {} } },
  //       remainingTime: 2,
  //       uploadProgress: 30,
  //     });
  //
  //     TEST_HELPERS.expectMatchSnapshot(instance.renderDroppedFile, [1]);
  //   });
  // });

  describe('renderUploadButton()', () => {
    it('should renderUploadButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUploadButton);
    });
  });

  describe('renderBrowserButton()', () => {
    it('should renderBrowserButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBrowserButton);
    });
  });

  describe('renderDropZone()', () => {
    it('should return null', () => {
      instance.renderBrowserButton = jest.fn(() => 'renderBrowserButton');
      rendered.setState({ droppedIds: [] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDropZone);
    });

    it('should renderDropZone', () => {
      instance.renderDroppedFile = jest.fn(() => 'renderDroppedFile');

      rendered.setState({ droppedIds: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDropZone);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderDropZone = jest.fn(() => 'renderDropZone');
      rendered.setState({ uploadProgress: 99, uploadSpeed: 10 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render simple', () => {
      instance.renderDropZone = jest.fn(() => 'renderDropZone');
      rendered.setState({
        uploadProgress: 99,
        uploadSpeed: 10,
        uploadingId: 1,
      });
      rendered.setProps({ simple: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
