/**
 * Error Dialog Container embed inside the Component
 */
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import Dialog from 'ugcomponents/Dialog';
import { FormattedMessage as M } from 'react-intl';
import { resetError } from 'containers/App/actions';
import { withStyles } from '@material-ui/core/styles';
import { config } from './config';
import m from './defines/message';
import styleSheet from './styles';

export class ErrorDialog extends PureComponent {
  sessionExpired = () => {
    const {
      classes,
      showErrorDialog: openDialog,
      resetError: closeDialog,
    } = this.props;
    const confirmButton = <M {...m.login} />;
    const headlineTitle = <M {...m.sessionExpired} />;
    const headlineText = <M {...m.sessionExpiredMessage} />;
    const dialogTitle = <M {...m.sessionExpiredDialogTitle} />;
    const headerTextStyle = { content: classes.root };

    return (
      <Dialog
        open={openDialog}
        button={1}
        dialogTitle={dialogTitle}
        headlineIcon="lnr-clock2"
        headlineTitle={headlineTitle}
        headlineText={headlineText}
        confirmButton={confirmButton}
        confirmFunc={closeDialog}
        cancelFunc={closeDialog}
        customClassnames={headerTextStyle}
      />
    );
  };

  render() {
    return <div>{this.sessionExpired()}</div>;
  }
}

ErrorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  showErrorDialog: PropTypes.bool,
  resetError: PropTypes.func,
};

ErrorDialog.defaultProps = {};

export function mapDispatchToProps(dispatch) {
  return {
    resetError: () => dispatch(resetError()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  resaga(config),
  withStyles(styleSheet, { name: 'ErrorDialog' }),
)(ErrorDialog);
