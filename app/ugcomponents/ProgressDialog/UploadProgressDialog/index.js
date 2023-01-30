import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UploadProgressDialogUI from './dialogUI';
import {
  AWAITING_UPLOAD,
  UPLOADING,
  DONE_UPLOAD,
  BEAT_LENGTH,
  DELTA,
} from './constants';

/**
 * Guesstimate: Assuming that the upload speed is a constant 2 Mbps (244.14 KB/sec):
 *              Given a beat length of `beatLength` milliseconds, the amount of bytes
 *              uploaded per beat will be `beatLength` * 250 bytes, neglecting network
 *              latency stuff and other factors.
 ** */

export class UploadProgressDialog extends PureComponent {
  state = {
    bytesUploaded: 0,
    progress: 0,
  };

  componentDidMount = () => {
    this.componentIsMounted = true;
  };

  componentWillReceiveProps = nextProps => {
    if (!this.componentIsMounted) {
      return;
    }

    if (nextProps.dialogState === UPLOADING) {
      this.setState({ progress: 0 });
      this.interval = setInterval(this.updateProgress, BEAT_LENGTH);
    } else if (nextProps.dialogState === DONE_UPLOAD) {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

      this.setState({ progress: 100 });
      if (this.props.onClose) this.props.onClose();
    }
  };

  componentWillUnmount = () => {
    // Kill all timers if they still exist

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.componentIsMounted = false;
  };

  timer = null;

  interval = null;

  componentIsMounted = false;

  updateProgress = () => {
    if (this.componentIsMounted) {
      const { bytesUploaded } = this.state;
      const totalUploaded = bytesUploaded + DELTA;
      const progress = this.computeProgress(totalUploaded, this.props.fileSize);

      this.setState({ bytesUploaded: totalUploaded, progress });
    }
  };

  computeProgress = (bytesUploaded, fileSize) =>
    Math.min((bytesUploaded * 100) / fileSize, 99);

  render = () => {
    const {
      filename,
      fileSize,
      dialogState,
      onClose,
      captionMessageId,
      ...props
    } = this.props;

    return (
      <UploadProgressDialogUI
        dialogState={dialogState}
        filename={filename}
        progress={this.state.progress}
        captionMessageId={captionMessageId}
        {...props}
      />
    );
  };
}

UploadProgressDialog.propTypes = {
  filename: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  dialogState: PropTypes.oneOf([AWAITING_UPLOAD, UPLOADING, DONE_UPLOAD]),
  onClose: PropTypes.func,
  captionMessageId: PropTypes.string,
};

UploadProgressDialog.defaultProps = {
  dialogState: AWAITING_UPLOAD,
  captionMessageId: 'uploadingFile',
};

export default UploadProgressDialog;
