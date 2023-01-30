import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'ugcomponents/Dialog';

export class DuplicateConfirmationDialog extends React.PureComponent {
  state = {
    loading: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  };

  handleOpen = () => {
    this.setState({ loading: false });
  };

  handleConfirm = ev => {
    const { onConfirm } = this.props;
    this.setState({ loading: true });
    onConfirm(ev, { onLoad: this.handleLoad });
  };

  handleLoad = () => {
    this.setState({ loading: false });
  };

  render = () => {
    const {
      open,
      onConfirm,
      onCancel,
      customClassnames,
      ...props
    } = this.props;
    const { loading } = this.state;
    return (
      <Dialog
        open={open}
        template="confirm"
        dialogTitle="Confirm"
        confirmButton="Confirm"
        headlineTitle="Confirm"
        headlineText="Are you sure you want to copy?"
        simplifyDialog
        confirmFunc={this.handleConfirm}
        cancelFunc={onCancel}
        customClassnames={customClassnames}
        loading={loading}
        {...props}
      />
    );
  };
}

DuplicateConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  customClassnames: PropTypes.object,
};

export default DuplicateConfirmationDialog;
