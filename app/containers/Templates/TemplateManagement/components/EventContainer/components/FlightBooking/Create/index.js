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

export class Create extends React.PureComponent {
  state = {
    dispatching: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  getDialogFormProps = () => {
    if (!this.dialogFormProps) {
      const { classes, dialogProps } = this.props;
      this.dialogFormProps = {
        dialogProps,
        PaperProps: { classes: { root: classes.paperRoot } },
      };
    }
    return this.dialogFormProps;
  };

  handleCreateBookingSuccess = ({ flightBookings }) => {
    const id = flightBookings
      ? Number.parseInt(Object.keys(flightBookings)[0], 10)
      : null;
    this.setState({ dispatching: false });
    this.props.onClose(id);
  };

  handleCreateBookingError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model }) => {
    const { templateId } = this.props;
    TEMPLATE_API_HELPERS.createFlightBooking(
      {
        templateId,
        model,
        onSuccess: this.handleCreateBookingSuccess,
        onError: this.handleCreateBookingError,
      },
      this.props,
    );
    this.setState({ dispatching: true });
  };

  handleOpen = () => {
    this.setState({ dispatching: false });
  };

  handleClose = () => {
    this.props.onClose(null);
  };

  renderPart = (
    Component,
    variant = EVENT_CONSTANTS.VARIANTS.field,
    props = {},
  ) => {
    const { templateId } = this.props;
    return <Component templateId={templateId} variant={variant} {...props} />;
  };

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={<M {...m.heading} />}
        headingBackground={<M {...m.headingBackground} />}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => <M {...m.submitButtonLabel} />;

  render = () => {
    const { open } = this.props;
    const { dispatching } = this.state;
    return (
      <DialogForm
        open={open}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        renderHeader={this.renderHeader}
        onFormValidSubmit={this.handleFormValidSubmit}
        canSubmitForm={!dispatching}
        submitButtonContent={this.renderSubmitButtonContent()}
        {...this.getDialogFormProps()}
      >
        {this.renderPart(FlightBooking)}
      </DialogForm>
    );
  };
}

Create.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  open: PropTypes.bool.isRequired,
  dayId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,

  // resaga value
  templateId: PropTypes.number,
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

Create.defaultProps = {
  dayId: 0,
  dialogProps: {},

  templateId: 0,
  formType: '',
  formSubtype: '',
};

export default compose(
  withStyles(style, { name: 'EventContainer/FlightBooking/Create' }),
  resaga(CONFIG),
)(Create);
