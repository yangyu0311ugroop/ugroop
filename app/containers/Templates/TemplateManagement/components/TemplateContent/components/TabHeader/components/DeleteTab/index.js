import { NODE_API, DELETE_CHILDREN } from 'apis/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from 'ugcomponents/Dialog';
import { CONFIG } from './config';
import styles from './styles';

export class DeleteTab extends PureComponent {
  state = {
    isDeleteDialogOpen: false,
    isDeleting: false,
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.props.open !== nextProps.open &&
      nextProps.open !== this.state.isDeleteDialogOpen
    ) {
      this.setState({
        isDeleteDialogOpen: nextProps.open,
        isDeleting: !nextProps.open,
      });
    }
  };

  onDeleteConfirm = () => {
    const { tabId, templateId } = this.props;

    this.setState({ isDeleting: true });

    this.props.resaga.dispatchTo(NODE_API, DELETE_CHILDREN, {
      payload: {
        nodeId: tabId,
        keyPath: `${templateId}.children`,
      },
      onSuccess: this.deleteSuccess,
      onError: this.deleteFailed,
    });

    return true;
  };

  onCancelDelete = () => {
    const { onClose } = this.props;

    if (onClose) onClose('deleteTab');
  };

  deleteFailed = () => {
    this.setState({ isDeleting: false });
  };

  deleteSuccess = (result, payload) => {
    const { onSuccess } = this.props;

    if (onSuccess) onSuccess(result, payload);
    this.onCancelDelete();
  };

  render = () => {
    const { classes, content } = this.props;
    const { isDeleteDialogOpen, isDeleting } = this.state;

    return (
      <span className={classes.root}>
        <Dialog
          template="delete"
          open={isDeleteDialogOpen}
          confirmFunc={this.onDeleteConfirm}
          cancelFunc={this.onCancelDelete}
          headlineTitle={content}
          confirmButton="Delete Tab"
          dialogTitle="Delete Tab"
          muiDialogProps={{
            onClose: this.onCancelDelete,
          }}
          disableConfirmButton={isDeleting}
        />
      </span>
    );
  };
}

DeleteTab.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  open: PropTypes.bool,
  tabId: PropTypes.number.isRequired,
  templateId: PropTypes.number.isRequired,

  onSuccess: PropTypes.func,
  onClose: PropTypes.func,

  // resaga props
  content: PropTypes.string,
};

DeleteTab.defaultProps = {
  open: false,
  content: '',
};

export default compose(
  withStyles(styles, { name: 'DeleteTab' }),
  resaga(CONFIG),
)(DeleteTab);
