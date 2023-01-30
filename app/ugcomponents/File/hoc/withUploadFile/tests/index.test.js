import { MAX_FILE_SIZE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React, { Component } from 'react';
import {
  AWAITING_UPLOAD,
  UPLOADING,
} from 'ugcomponents/ProgressDialog/UploadProgressDialog/constants';
import helper from 'utils/helpers/dataUriToBlob';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import ImageUtility from 'utils/imageUtils';
import withUploadFile from '..';

describe('ugcomponents/File/hoc/withUploadFile', () => {
  class MockComponent extends Component {
    componentDidMount = () => {};

    render = () => <div />;
  }

  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeFile = () => ({
    size: 123,
    name: 'some name',
  });
  const makeBigFile = () => ({
    size: MAX_FILE_SIZE + 1000,
    name: 'some name',
  });
  const makeUploading = () => ({
    size: 123,
    name: 'some name',
  });

  const makeData = (size = 123) => ({
    get: () => ({ size }),
  });

  const makeConfig = () => ({
    container: 'someContainer',
  });

  const makeHocProps = () => ({
    resaga: {
      dispatchTo: jest.fn(
        (key, type, obj) =>
          doResagaSnapshot &&
          expect({ dispatchTo: { key, type, obj } }).toMatchSnapshot(),
      ),
      setValue: jest.fn(
        obj =>
          doResagaSnapshot && expect({ setValue: { obj } }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    LOGIC_HELPERS.ifFunction = jest.fn();
    const Hoc = withUploadFile(makeConfig())(MockComponent);
    wrapper = shallow(<Hoc {...makeHocProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
  });

  it('exists', () => {
    expect(withUploadFile).toBeDefined();
  });

  it('default state still matches snapshot', () => {
    expect(instance.state).toMatchSnapshot();
  });

  describe('#componentWillMount()', () => {
    it('initialises queue', () => {
      instance.componentWillMount();
      expect(instance.queue).toBeDefined();
      expect(instance.queue.autoRun).toBe(false);
    });
    it('initialises uploadFileProps', () => {
      instance.componentWillMount();
      expect(instance.uploadFileProps).toBeDefined();
      expect(instance.uploadFileProps).toEqual({
        enqueueFile: instance.enqueueFile,
        enqueueData: instance.enqueueData,
        enqueuePhoto: instance.enqueuePhoto,
        subscribeSuccess: instance.subscribeSuccess,
        subscribeError: instance.subscribeError,
        handleDelete: instance.handleDelete,
      });
    });
  });
  describe('#componentWillUnmount()', () => {
    it('clears queue', () => {
      instance.componentWillUnmount();
      expect(instance.queue.contents).toEqual([]);
    });
  });

  describe('handleUploadProgress()', () => {
    it('should handleUploadProgress()', () => {
      instance.handleUploadProgress()({ loaded: 70, total: 100 });

      expect(wrapper.state().uploadProgress).toBe(70);
    });
  });

  describe('#getUploading()', () => {
    it('returns empty', () => {
      instance.componentWillUnmount();
      expect(instance.getUploading()).toEqual({ size: 0, name: '' });
    });
    it('returns not empty', () => {
      const uploading = makeUploading();
      instance.setState({ uploading });
      instance.componentWillUnmount();
      expect(instance.getUploading()).toEqual(uploading);
    });
  });
  describe('#upload()', () => {
    it('still matches snapshot', () => {
      doResagaSnapshot = true;
      const data = makeData();
      const filename = 'some filename';
      const opts = { x: 1 };
      instance.handleUploadSuccess = () => 'handleUploadSuccess';
      instance.handleUploadError = () => 'handleUploadError';
      instance.upload(data, filename, opts)();
    });

    it('sets state for upload', () => {
      const data = makeData();
      const name = 'some name';
      instance.setState = jest.fn();
      instance.upload(data, name)();
      expect(instance.setState).toBeCalled();
    });

    it('stops queue', () => {
      const data = makeData();
      instance.upload(data)();
      expect(instance.queue.stop).toBe(true);
    });
  });
  describe('#finishUploading()', () => {
    it('sets state for finish upload', () => {
      instance.setState = jest.fn();
      instance.finishUploading();
      expect(instance.setState).toBeCalled();
    });

    it('calls uploadNext()', () => {
      global.setTimeout = jest.fn();
      instance.finishUploading();
      expect(global.setTimeout).toBeCalledWith(instance.uploadNext, 1);
    });
  });
  describe('#uploadNext()', () => {
    it('unsets queue.stop', () => {
      instance.uploadNext();
      expect(instance.queue.stop).toBe(false);
    });

    it('calls queue.next() if has contents', () => {
      instance.queue = {
        next: jest.fn(),
        contents: { length: 1 },
      };
      instance.uploadNext();
      expect(instance.queue.next).toBeCalled();
    });

    it('sets state for no upload', () => {
      instance.setState = jest.fn();
      instance.uploadNext();
      expect(instance.setState).toBeCalledWith({
        uploading: null,
        status: AWAITING_UPLOAD,
      });
    });
  });

  describe('#handleUploadSuccess()', () => {
    const args = makeUploading();
    const url = 'http://url.com';
    const responseFile = { downloadURL: url };
    const result = { files: { 'file-to-upload': responseFile } };

    it('calls onSuccess()', () => {
      instance.onSuccess = jest.fn();
      instance.handleUploadSuccess(args)({ result });
      expect(instance.onSuccess).toBeCalledWith({ ...args, url, responseFile });
    });

    it('calls finishUploading()', () => {
      instance.finishUploading = jest.fn();
      instance.handleUploadSuccess(args)({ result });
      expect(instance.finishUploading).toBeCalled();
    });
  });
  describe('#handleUploadError()', () => {
    const args = makeUploading();
    const error = {
      status: 9001,
      response: { statusText: 'some error response status text' },
    };

    it('calls onError()', () => {
      instance.onError = jest.fn();
      instance.handleUploadError(args)(error);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.onError);
    });

    it('calls finishUploading()', () => {
      instance.finishUploading = jest.fn();
      instance.handleUploadError(args)(error);
      expect(instance.finishUploading).toBeCalled();
    });
  });

  describe('#enqueueFile()', () => {
    it('enqueues correctly', () => {
      const file = makeFile();
      instance.enqueueData = jest.fn();
      instance.enqueueFile(file);
      expect(instance.enqueueData).toBeCalled();
    });

    it('should call setValue if fileSize exceeds MAX_FILE_SIZE', () => {
      doResagaSnapshot = true;
      const file = makeBigFile();
      instance.enqueueData = jest.fn();
      instance.enqueueFile(file);
    });
  });

  describe('#enqueuePhoto()', () => {
    it('enqueues correctly', () => {
      instance.compressFile = jest.fn();
      const blob = new Blob(['test'], { type: 'image/' });

      instance.enqueuePhoto(blob);

      TEST_HELPERS.expectCalled(instance.compressFile);
    });
  });

  describe('#compressFile()', () => {
    it('should resizeImagePromise', () => {
      ImageUtility.resizeImagePromise = jest.fn(() => ({
        promise: {
          then: jest.fn(cb => cb()),
        },
      }));
      instance.compressFileSuccess = jest.fn(() => () => ({
        catch: jest.fn(),
      }));
      instance.handleUploadError = jest.fn();

      instance.compressFile({})();

      TEST_HELPERS.expectCalled(ImageUtility.resizeImagePromise);
      TEST_HELPERS.expectCalled(instance.compressFileSuccess);
      TEST_HELPERS.expectCalled(instance.handleUploadError);
    });
  });

  describe('#compressFileSuccess()', () => {
    it('should resizeImagePromise', () => {
      helper.dataUriToBlob = jest.fn();
      ImageUtility.convertFormData = jest.fn();
      instance.enqueueData = jest.fn();

      instance.compressFileSuccess()({});

      TEST_HELPERS.expectCalled(instance.enqueueData);
    });
  });

  describe('#enqueueData()', () => {
    it('enqueues correctly', () => {
      const uploadResult = 'upload';
      instance.queue = {
        add: jest.fn(),
        next: jest.fn(),
      };
      instance.upload = jest.fn().mockImplementation(() => uploadResult);
      instance.enqueueData();
      expect(instance.queue.add).toBeCalledWith(uploadResult);
      expect(instance.queue.next).toBeCalled();
    });
  });
  describe('#subscribeSuccess()', () => {
    it('sets onSuccess', () => {
      const onSuccess = 'onSuccess';
      instance.subscribeSuccess(onSuccess);
      expect(instance.onSuccess).toBe(onSuccess);
    });
  });
  describe('#subscribeError()', () => {
    it('sets onError', () => {
      const onError = 'onError';
      instance.subscribeError(onError);
      expect(instance.onError).toBe(onError);
    });
  });

  describe('handleDelete()', () => {
    it('should call dispatchTo', () => {
      doResagaSnapshot = true;
      instance.handleDelete('file', 'handleDeleteSuccess')();
    });

    it('should call ifFunction of LOGIC_HELPER and call custom handle delete', () => {
      const handleDelete = jest.fn();
      instance.handleDelete('file', null, {
        manual: true,
        handleDelete,
      })();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot while uploading', () => {
      instance.setState({ uploading: makeUploading(), status: UPLOADING });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
