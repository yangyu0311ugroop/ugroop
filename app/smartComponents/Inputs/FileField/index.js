import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import get from 'lodash/get';
import resaga from 'resaga';
import { DEFAULT, PERSON_CONTAINER } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { FileDropzone, withUploadFile } from 'ugcomponents/File';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export class FileField extends PureComponent {
  state = {
    name: '',
  };

  componentDidMount = () => {
    const { uploadFile, setValue, value } = this.props;
    uploadFile.subscribeSuccess(this.handleUploadSuccess);
    setValue(value);
    this.setState({ name: value.name || undefined });
  };

  handleUploadSuccess = result => {
    const type = get(result, 'responseFile.type', '');
    const name = get(result, 'name', '');
    const fileSize = get(result, 'size', 0);
    const url = get(result, 'url', '');

    this.props.setValue({
      type,
      name,
      fileSize,
      url,
    });
    this.setState({ name });
  };

  handleDrop = files => {
    this.props.uploadFile.enqueueFile(files[0]);
  };

  handleClear = () => {
    const { setValue } = this.props;
    setValue({
      type: '',
      name: '',
      fileSize: 0,
      url: '',
    });
    this.setState({ name: undefined });
  };

  renderDefault = () => {
    const { name } = this.state;
    const { showClear } = this.props;
    return (
      <FileDropzone
        multiple={false}
        containerHasNoStyle
        text={name}
        onDrop={this.handleDrop}
        onClear={this.handleClear}
        showClear={showClear}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

FileField.propTypes = {
  // hoc props
  uploadFile: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  showClear: PropTypes.bool,
  // parent props
  variant: PropTypes.string,
  value: PropTypes.object,

  // resaga props
};

FileField.defaultProps = {
  variant: '',
  value: {
    name: '',
    type: '',
    fileSize: 0,
    url: '',
  },
  showClear: true,
};

export default compose(
  resaga({
    setValue: {
      ...SET_VALUE,
    },
  }),
  withUploadFile({ container: PERSON_CONTAINER }),
  withFormsy,
)(FileField);
