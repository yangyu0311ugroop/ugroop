/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import { DESTROY_FILE, FILE_CONTAINER_API, UPLOAD_FILE } from 'apis/constants';
import { MAX_FILE_SIZE } from 'appConstants';
import Queue from 'js-queue';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  AWAITING_UPLOAD,
  DONE_UPLOAD,
  UPLOADING,
} from 'ugcomponents/ProgressDialog/UploadProgressDialog/constants';
import UploadProgressDialogUI from 'ugcomponents/ProgressDialog/UploadProgressDialog/dialogUI';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { photoType } from 'utils/constant';
import helper from 'utils/helpers/dataUriToBlob';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import ImageUtility from 'utils/imageUtils';
import utils from './utils';

/**
 * Provides file upload functionality via props + parent resaga.
 */
const withUploadFile = ({ container, hideUploading }) => WrappedComponent => {
  class WithUploadFile extends React.Component {
    state = {
      uploading: null,
      status: AWAITING_UPLOAD,
      uploadProgress: 0,
      uploadSpeed: 0,
      remainingTime: 0,
    };

    componentWillMount = () => {
      this.queue = new Queue();
      this.queue.autoRun = false;

      this.uploadFileProps = {
        enqueueFile: this.enqueueFile,
        enqueueData: this.enqueueData,
        enqueuePhoto: this.enqueuePhoto,
        subscribeSuccess: this.subscribeSuccess,
        subscribeError: this.subscribeError,
        handleDelete: this.handleDelete,
      };
    };

    componentWillUnmount = () => {
      this.queue.clear();
    };

    handleUploadProgress = ({ onUploadProgress } = {}) => progressEvent => {
      const { uploadedTime } = this.state;

      const uploadProgress = (progressEvent.loaded / progressEvent.total) * 100;

      const timeTaken = Date.now() - uploadedTime;
      const remaining = progressEvent.total - progressEvent.loaded;
      const uploadSpeed =
        Math.floor((progressEvent.loaded * 10) / timeTaken) / 10;
      const remainingTime = Math.ceil(remaining / uploadSpeed / 1000);

      this.setState({
        uploadProgress,
        uploadSpeed,
        remainingTime,
      });

      LOGIC_HELPERS.ifFunction(onUploadProgress, [
        {
          uploadProgress,
          uploadSpeed,
          remainingTime,
        },
      ]);
    };

    getUploading = () => ({
      size: this.state.uploading ? this.state.uploading.size : 0,
      name: this.state.uploading ? this.state.uploading.name : '',
    });

    upload = (data, name, opts, options = {}) => () => {
      const requestFile = data.get('file-to-upload');
      const uploading = { size: requestFile.size, name };

      this.props.resaga.dispatchTo(FILE_CONTAINER_API, UPLOAD_FILE, {
        payload: {
          container,
          data,
          uploadOptions: {
            onUploadProgress: this.handleUploadProgress(options),
          },
        },
        onSuccess: this.handleUploadSuccess({
          requestFile,
          ...uploading,
          ...opts,
        }),
        onError: this.handleUploadError({ requestFile, ...uploading, ...opts }),
      });
      this.setState({ uploadedTime: Date.now(), uploading, status: UPLOADING });
      this.queue.stop = true;
    };

    finishUploading = () => {
      this.setState({
        status: DONE_UPLOAD,
      });
      setTimeout(this.uploadNext, 1); // So user can see the progress bar complete
    };

    uploadNext = () => {
      this.queue.stop = false;
      if (this.queue.contents.length) {
        this.queue.next();
      } else {
        this.setState({ uploading: null, status: AWAITING_UPLOAD });
      }

      this.setState({
        uploadProgress: 0,
        uploadSpeed: 0,
        remainingTime: 0,
      });
    };

    handleDelete = (file, handleDeleteSuccess, opts = {}) => () => {
      if (opts.manual) {
        LOGIC_HELPERS.ifFunction(opts.handleDelete, [file, container]);
      } else {
        this.props.resaga.dispatchTo(FILE_CONTAINER_API, DESTROY_FILE, {
          payload: {
            container,
            file,
          },
          onSuccess: handleDeleteSuccess,
        });
      }
    };

    handleUploadSuccess = args => ({ result }) => {
      const downloadUrl = result.files['file-to-upload'].downloadURL;
      const responseFile = result.files['file-to-upload'];
      if (this.onSuccess) {
        this.onSuccess({ ...args, url: downloadUrl, responseFile });
      }
      this.finishUploading();
    };

    handleUploadError = args => error => {
      const formattedError = `HTTP ${error.status}: ${utils.parseError(error)}`;
      if (this.onError) {
        this.onError({ ...args, error: formattedError, raw: error });
      }
      this.finishUploading();
    };

    enqueueFile = (file, filename = file.name, opts, options = {}) => {
      if (file.size > MAX_FILE_SIZE) {
        LOGIC_HELPERS.ifFunction(options.onUploadError, [
          'Max file size of 10mb exceeded',
        ]);
        return SNACKBAR_HELPER.openErrorSnackbar(
          'Max file size of 10mb exceeded',
          this.props.resaga,
        );
      }
      return this.enqueueData(utils.fileToData(file), filename, opts, options);
    };

    enqueuePhoto = requestFile => {
      const reader = new FileReader();
      reader.onload = this.compressFile(reader, requestFile.name);
      reader.readAsDataURL(requestFile);
    };

    compressFile = (reader, filename) => () => {
      ImageUtility.resizeImagePromise(reader.result)
        .promise.then(this.compressFileSuccess(filename))
        .catch(this.handleUploadError({}));
    };

    compressFileSuccess = filename => file => {
      const { resource } = file;
      const blob = helper.dataUriToBlob(resource, photoType.jpeg);
      const data = ImageUtility.convertFormData(blob, { filename });

      return this.enqueueData(data, filename, { blob });
    };

    enqueueData = (data, filename, opts, options) => {
      this.queue.add(this.upload(data, filename, opts, options));
      this.queue.next();
    };

    subscribeSuccess = onSuccess => {
      this.onSuccess = onSuccess;
    };

    subscribeError = onError => {
      this.onError = onError;
    };

    renderUploading = () => {
      const { status, uploadProgress, remainingTime, uploadSpeed } = this.state;
      const uploading = this.getUploading();

      return (
        <UploadProgressDialogUI
          dialogState={status}
          filename={uploading.name}
          progress={uploadProgress}
          remaining={remainingTime}
          speed={uploadSpeed}
        />
      );
    };

    render = () => (
      <Fragment>
        <WrappedComponent uploadFile={this.uploadFileProps} {...this.props} />
        {!hideUploading && this.renderUploading()}
      </Fragment>
    );
  }

  WithUploadFile.propTypes = {
    // hoc
    resaga: PropTypes.object.isRequired,
  };

  WithUploadFile.defaultProps = {};

  return WithUploadFile;
};

export default withUploadFile;
