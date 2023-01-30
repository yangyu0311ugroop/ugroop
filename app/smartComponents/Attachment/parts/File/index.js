import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import inputs from 'smartComponents/Attachment/inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { File } from 'smartComponents/Inputs';
import { CONFIG } from './config';

export class AttachmentFile extends React.PureComponent {
  renderTextField = () => {
    const { url, name, fileSize, showClear } = this.props;
    return (
      <File
        value={{ url, name, fileSize }}
        {...inputs.base}
        showClear={showClear}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextField,
    });
  };
}

AttachmentFile.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,

  // resaga value
  url: PropTypes.string,
  name: PropTypes.string,
  fileSize: PropTypes.number,
  showClear: PropTypes.bool,
};

AttachmentFile.defaultProps = {
  id: null,
  variant: null,

  url: null,
  name: null,
  fileSize: null,
  showClear: true,
};

export default resaga(CONFIG)(AttachmentFile);
