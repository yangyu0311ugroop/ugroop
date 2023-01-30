/**
 * Created by stephenkarpinskyj on 14/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';

import { THE_BIG_DOT } from 'appConstants';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { withStyles } from 'components/material-ui';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogActions from 'components/Dialog/UGDialogAction';
import { FlightBookingDeleteConfirmation } from 'viewComponents/Event';
import { withCanEditFlightBooking } from 'smartComponents/Event/hoc';
import { withKey } from 'smartComponents/Dialog/hoc';
import FlightBooking from 'smartComponents/Event/components/FlightBooking/layouts';
import { FlightBookingNumber } from 'smartComponents/Event/components/FlightBooking/parts';
import {
  Title,
  TitleHeading,
  CloseButton,
} from 'ugcomponents/DialogForm/Complex';

import m from './messages';
import style from './style';
import { CONFIG } from './config';

export class View extends React.PureComponent {
  state = {
    confirmingDelete: false,
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

  handleDeleteBookingSuccess = () => {
    this.setState({ confirmingDelete: false });
    this.props.onClose();
  };

  handleDeleteBookingError = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteConfirm = () => {
    const { dataId, templateId } = this.props;
    TEMPLATE_API_HELPERS.deleteFlightBooking(
      {
        dataId,
        templateId,
        onSuccess: this.handleDeleteBookingSuccess,
        onError: this.handleDeleteBookingError,
      },
      this.props,
    );
  };

  handleDeleteCancel = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteClick = e => {
    e.preventDefault();
    this.setState({ confirmingDelete: true });
  };

  handleEditClick = () => {
    const { dataId } = this.props;
    this.props.resaga.setValue({
      flightBookingEdit: EVENT_STORE_HELPERS.setFlightBookingEdit(true, dataId),
    });
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  renderPart = (Component, variant = EVENT_CONSTANTS.VARIANTS.editableForm) => {
    const { canEditFlightBooking, dataId, templateId } = this.props;
    return (
      <Component
        dataId={dataId}
        templateId={templateId}
        variant={variant}
        readOnly={!canEditFlightBooking}
      />
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeading = () => <M {...m.heading} />;

  renderDeleteButton = () => (
    <GridItem key="delete">
      <Button
        size="small"
        variant="outline"
        color="alert"
        iconButton
        icon="lnr-trash2"
        dense
        title={<M {...m.deleteButtonLabel} />}
        onClick={this.handleDeleteClick}
      />
    </GridItem>
  );

  renderEditButton = () => (
    <GridItem key="edit">
      <Button
        size="small"
        variant="outline"
        color="primary"
        iconButton
        icon="lnr-pencil3"
        dense
        title={<M {...m.editButtonLabel} />}
        onClick={this.handleEditClick}
      />
    </GridItem>
  );

  renderActions = () => {
    const { canEditFlightBooking } = this.props;
    return (
      canEditFlightBooking && [
        this.renderDeleteButton(),
        this.renderEditButton(),
      ]
    );
  };

  renderTitle = () => (
    <GridContainer alignItems="baseline">
      <GridItem>
        <Title
          heading={this.renderHeading()}
          headingBackground={this.renderHeadingBackground()}
        />
      </GridItem>
      <GridItem>
        <TitleHeading>{THE_BIG_DOT}</TitleHeading>
      </GridItem>
      <GridItem xs>
        <TitleHeading title="Booking Reference">
          {this.renderPart(FlightBookingNumber)}
        </TitleHeading>
      </GridItem>
      <CloseButton onClick={this.handleCloseClick} />
    </GridContainer>
  );

  render = () => {
    const { open, onClose, dialogProps, name } = this.props;
    const { confirmingDelete } = this.state;
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={this.getPaperProps()}
          {...dialogProps}
        >
          <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
          <DialogContent>{this.renderPart(FlightBooking)}</DialogContent>
          <DialogActions>{this.renderActions()}</DialogActions>
        </Dialog>
        <FlightBookingDeleteConfirmation
          name={name}
          open={confirmingDelete}
          onConfirm={this.handleDeleteConfirm}
          onCancel={this.handleDeleteCancel}
        />
      </React.Fragment>
    );
  };
}

View.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  canEditFlightBooking: PropTypes.bool.isRequired,

  // parent
  open: PropTypes.bool.isRequired,
  dataId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,

  // resaga value
  templateId: PropTypes.number,
  name: PropTypes.string,
};

View.defaultProps = {
  dataId: 0,
  dialogProps: {},

  templateId: 0,
  name: null,
};

export default compose(
  withStyles(style, { name: 'EventContainer/FlightBooking/View' }),
  withKey(),
  withCanEditFlightBooking,
  resaga(CONFIG),
)(View);
