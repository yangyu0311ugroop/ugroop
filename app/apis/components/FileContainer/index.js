import { wrapRequestWithErrorHandler } from 'error-messages';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';

import injectReducer from 'utils/injectReducer';
import {
  FILE_CONTAINER_API,
  UPLOAD_FILE,
  NODE_API,
  CREATE_ATTACHMENT,
} from 'apis/constants';
import { CONFIG } from './config';

export class FileContainer extends Component {
  componentDidMount = () => {
    this.props.resaga.setValue({
      files: {},
    });
  };

  componentWillReceiveProps = nextProps => {
    const requests = {
      [UPLOAD_FILE]: { onSuccess: this.handleUploadFileSuccess },
    };

    this.props.resaga.analyse(
      nextProps,
      wrapRequestWithErrorHandler(requests, this.props.resaga),
    );
  };

  // componentWillReceiveProps = (nextProps) => this.props.resaga.analyse(nextProps);

  shouldComponentUpdate = () => false;

  handleUploadFileSuccess = (result, payload) => {
    if (payload.setValueToStore) {
      this.props.resaga.dispatchTo(NODE_API, CREATE_ATTACHMENT, {
        payload: {
          ...result.result.files['file-to-upload'],
          id: payload.id,
          url: result.result.files['file-to-upload'].downloadURL,
          fileSize: result.result.files['file-to-upload'].size,
          description: payload.description,
          isSection: payload.isSection,
          name: payload.fileName,
        },
      });
    }

    return '';
  };

  render = () => null;
}

FileContainer.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent

  // resaga value
};

FileContainer.defaultProps = {};

export default compose(
  injectReducer({
    key: FILE_CONTAINER_API,
    reducer: reducer(FILE_CONTAINER_API),
  }),
  resaga(CONFIG),
)(FileContainer);
