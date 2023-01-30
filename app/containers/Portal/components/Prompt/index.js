import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Dialog from 'ugcomponents/Dialog';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class Prompt extends PureComponent {
  state = {
    loading: false,
  };

  componentWillMount = () => {
    this.dialogProps = {
      onEscapeKeyDown: this.handleClose,
    };
  };

  componentWillUnmount = () => {
    this.setState({ loading: false });
  };

  handleConfirm = () => {
    const { closeOnConfirm, onConfirm } = this.props;

    LOGIC_HELPERS.ifFunction(onConfirm);

    if (closeOnConfirm) {
      PORTAL_HELPERS.close(this.props);
    }

    this.setState({ loading: true });
  };

  handleClose = () => {
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return PORTAL_HELPERS.close(this.props);
  };

  render = () => {
    const { type, ...props } = this.props;
    const { loading } = this.state;

    return (
      <Dialog
        open
        confirmFunc={this.handleConfirm}
        cancelFunc={this.handleClose}
        muiDialogProps={this.dialogProps}
        loading={loading}
        {...props}
      />
    );
  };
}

Prompt.propTypes = {
  // hoc props

  // parent props
  headlineTitle: PropTypes.string,
  dialogTitle: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,

  // resaga props

  // customisable props
  closeOnConfirm: PropTypes.bool,
};

Prompt.defaultProps = {
  headlineTitle: 'Delete',
  dialogTitle: 'Delete',

  closeOnConfirm: true, // close dialog once confirm button is clicked
};

// export default Prompt;
export default compose(resaga(CONFIG))(Prompt);
