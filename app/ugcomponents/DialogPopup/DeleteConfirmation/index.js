import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'ugcomponents/Dialog';

export class DeleteConfirmationDialog extends React.PureComponent {
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
        template="delete"
        dialogTitle="Delete"
        confirmButton="Delete"
        headlineTitle="Delete"
        headlineText="Are you sure you want to delete?"
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

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  customClassnames: PropTypes.object,
};

export default DeleteConfirmationDialog;
