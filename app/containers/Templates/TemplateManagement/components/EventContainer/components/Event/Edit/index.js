/**
 * Created by stephenkarpinskyj on 13/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';

import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { ForEachEventType } from 'smartComponents/Event/logics';
import {
  Activity,
  Accommodation,
  Flight,
  Transportation,
} from 'smartComponents/Event/components/Event/layouts';
import {
  EventSubtype,
  EventIcon,
} from 'smartComponents/Event/components/Event/parts';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { EVENT_HELPERS } from 'utils/helpers/events';

import m from './messages';
import style from './style';
import { CONFIG_IDS, CONFIG_DATA } from './config';

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

  getType = () => {
    const { formType, type } = this.props;
    return this.getValue(formType, type);
  };

  getSubtype = () => {
    const { formSubtype, subtype } = this.props;
    return this.getValue(formSubtype, subtype);
  };

  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  handlePatchEventSuccess = () => {
    this.updateTimes();
    this.setState({ dispatching: false });
    this.props.onClose();
  };

  handlePatchEventError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model, isChanged }) => {
    if (isChanged) {
      TEMPLATE_API_HELPERS.patchEvent(
        {
          model,
          onSuccess: this.handlePatchEventSuccess,
          onError: this.handlePatchEventError,
        },
        this.props,
      );
      this.setState({ dispatching: true });
    } else {
      this.props.onClose();
    }
  };

  handleOpen = () => {
    this.props.resaga.setValue({ form: undefined });
    this.setState({ dispatching: false });
  };

  handleClose = () => {
    this.props.onClose();
  };

  filterOptions = type =>
    !EVENT_HELPERS.isFlightTransportationEvent(type.value);

  renderNoPart = () => <div />;

  renderPart = (
    Component,
    variant = EVENT_CONSTANTS.VARIANTS.field,
    props = {},
  ) => () => {
    const { id, dataId, templateId } = this.props;
    return (
      <Component
        id={id}
        dataId={dataId}
        templateId={templateId}
        variant={variant}
        {...props}
      />
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeading = () => {
    const subtypeProps = {
      readOnly: EVENT_HELPERS.isFlightTransportationEvent(this.getSubtype()),
      filterOptions: this.filterOptions,
    };

    return (
      <GridContainer alignItems="baseline">
        {this.renderPart(
          EventSubtype,
          EVENT_CONSTANTS.VARIANTS.editableHeading,
          subtypeProps,
        )()}
        {this.renderPart(EventIcon, EVENT_CONSTANTS.VARIANTS.editableHeading)()}
      </GridContainer>
    );
  };

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

  renderContent = (type, subtype) => {
    const { id, iconOverride: icon } = this.props;
    return (
      !!id && (
        <ForEachEventType
          type={type}
          subtype={subtype}
          renderEvent={this.renderNoPart}
          renderActivity={this.renderPart(Activity, undefined, {
            icon,
            isCustomDateStart: EVENT_HELPERS.isEventCustomDate(subtype),
          })}
          renderFlight={this.renderPart(Flight)}
          renderAccommodation={this.renderPart(Accommodation)}
          renderTransportation={this.renderPart(Transportation, undefined, {
            subtype,
          })}
        />
      )
    );
  };

  render = () => {
    const { open, id, dataId, dialogProps } = this.props;
    const { dispatching } = this.state;
    const type = this.getType();
    const subtype = this.getSubtype();

    return (
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
        {this.renderContent(type, subtype)}
        <EventPatchData id={id} dataId={dataId} />
      </DialogForm>
    );
  };
}

Edit.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  open: PropTypes.bool.isRequired,
  id: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,

  // resaga value
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  type: PropTypes.string,
  subtype: PropTypes.string,
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
  iconOverride: PropTypes.string,
};

Edit.defaultProps = {
  id: 0,
  dialogProps: {},

  dataId: 0,
  templateId: 0,
  type: null,
  subtype: null,
  formType: undefined,
  formSubtype: undefined,
  iconOverride: '',
};

export default compose(
  withStyles(style, { name: 'EventContainer/Event/Edit' }),
  resaga(CONFIG_IDS),
  resaga(CONFIG_DATA),
)(Edit);
