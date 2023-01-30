import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { DEFAULT, PERSON_CONTAINER } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FileDropzone } from 'ugcomponents/File';
import withUploadFile from 'ugcomponents/File/hoc/withUploadFile';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class UploadButton extends PureComponent {
  componentDidMount = () => {
    this.props.uploadFile.subscribeSuccess(this.handleUploadSuccess);
  };

  handleSuccess = () => {
    SNACKBAR_HELPER.openSuccessSnackbar(
      <M {...m.successMessage} />,
      this.props.resaga,
    );
  };

  handleError = () => {
    SNACKBAR_HELPER.openErrorSnackbar(
      <M {...m.errorMessage} />,
      this.props.resaga,
    );
  };

  handleUploadSuccess = ({ name, url }) => {
    const { templateId, eventId } = this.props;
    const data = {
      name,
      link: url,
    };
    const payload = {
      eventId,
      templateId,
      data,
      onSuccess: this.handleSuccess,
      onError: this.handleError,
    };

    TEMPLATE_API_HELPERS.createEventAttachment(payload, this.props.resaga);
  };

  handleDrop = files => {
    const { uploadFile } = this.props;
    files.forEach(file => uploadFile.enqueueFile(file, file.name));
  };

  renderDropZone = () => (
    <FileDropzone hasTextWidth={false} onDrop={this.handleDrop} />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDropZone,
    });
  };
}

UploadButton.propTypes = {
  // hoc props
  uploadFile: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  eventId: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
};

UploadButton.defaultProps = {
  variant: '',
  eventId: 0,
  templateId: 0,
};

export default compose(
  withStyles(styles, { name: 'UploadButton' }),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
)(UploadButton);
