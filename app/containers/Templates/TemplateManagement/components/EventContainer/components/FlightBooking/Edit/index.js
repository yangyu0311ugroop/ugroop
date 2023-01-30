/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { withStyles } from 'components/material-ui';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import FlightBooking from 'smartComponents/Event/components/FlightBooking/layouts';

import m from './messages';
import style from './style';
import { CONFIG } from './config';

export class Edit extends React.PureComponent {
  state = {
    dispatching: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  getPaperProps = () => {
    if (!this.PaperProps) {
      const { classes } = this.props;
      this.PaperProps = {
        classes: { root: classes.paperRoot },
      };
    }
    return this.PaperProps;
  };

  getValue = (formValue, value) =>
    formValue === undefined ? value : formValue;

  handlePatchBookingSuccess = () => {
    this.setState({ dispatching: false });
    this.props.onClose();
  };

  handlePatchBookingError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model, isChanged }) => {
    if (isChanged) {
      TEMPLATE_API_HELPERS.patchFlightBooking(
        {
          model,
          onSuccess: this.handlePatchBookingSuccess,
          onError: this.handlePatchBookingError,
        },
        this.props,
      );
      this.setState({ dispatching: true });
    } else {
      this.props.onClose();
    }
  };

  handleOpen = () => {
    this.setState({ dispatching: false });
  };

  handleClose = () => {
    this.props.onClose();
  };

  renderPart = (Component, variant = EVENT_CONSTANTS.VARIANTS.field) => {
    const { dataId, templateId } = this.props;
    return (
      <Component dataId={dataId} templateId={templateId} variant={variant} />
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeading = () => <M {...m.heading} />;

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        headingBackground={this.renderHeadingBackground()}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => <M {...m.submitButtonLabel} />;

  render = () => {
    const { open, dialogProps } = this.props;
    const { dispatching } = this.state;
    return (
      <React.Fragment>
        <DialogForm
          open={open}
          onClose={this.handleClose}
          onCancel={this.handleClose}
          renderHeader={this.renderHeader}
          onFormValidSubmit={this.handleFormValidSubmit}
          canSubmitForm={!dispatching}
          submitButtonContent={this.renderSubmitButtonContent()}
          dialogProps={dialogProps}
          PaperProps={this.getPaperProps()}
        >
          {this.renderPart(FlightBooking)}
        </DialogForm>
      </React.Fragment>
    );
  };
}

Edit.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  open: PropTypes.bool.isRequired,
  dataId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,

  // resaga value
  templateId: PropTypes.number,
};

Edit.defaultProps = {
  dataId: 0,
  dialogProps: {},

  templateId: 0,
};

export default compose(
  withStyles(style, { name: 'EventContainer/FlightBooking/Edit' }),
  resaga(CONFIG),
)(Edit);
