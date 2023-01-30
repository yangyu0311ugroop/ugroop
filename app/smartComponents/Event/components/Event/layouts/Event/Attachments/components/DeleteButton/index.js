import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import DeleteButtonView from 'viewComponents/DeleteButton';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class DeleteButton extends PureComponent {
  handleSuccess = ({ onLoad, onClose }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
    SNACKBAR_HELPER.openSuccessSnackbar(
      <M {...m.successMessage} />,
      this.props.resaga,
    );
  };

  handleError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
    SNACKBAR_HELPER.openErrorSnackbar(
      <M {...m.errorMessage} />,
      this.props.resaga,
    );
  };

  handleDelete = ({ onLoad, onClose }) => {
    const { templateId, eventId, attachmentId } = this.props;
    const payload = {
      templateId,
      eventId,
      attachmentId,
      onSuccess: this.handleSuccess({
        onLoad,
        onClose,
      }),
      onError: this.handleError({ onLoad }),
    };

    TEMPLATE_API_HELPERS.deleteEventAttachment(payload, this.props.resaga);
  };

  render = () => (
    <DeleteButtonView
      dialogTitle="Delete this Attachment"
      headlineText="Are you sure you want to delete this Attachment?"
      confirmButton="Delete Attachment"
      onClick={this.handleDelete}
    />
  );
}

DeleteButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  attachmentId: PropTypes.number,
  eventId: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
};

DeleteButton.defaultProps = {
  attachmentId: 0,
  eventId: 0,
  templateId: 0,
};

export default compose(
  withStyles(styles, { name: 'DeleteButton' }),
  resaga(CONFIG),
)(DeleteButton);
