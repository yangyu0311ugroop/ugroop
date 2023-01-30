/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import { ForEachEventType } from 'smartComponents/Event/logics';
import {
  Activity,
  Accommodation,
  Flight,
  Transportation,
} from 'smartComponents/Event/components/Event/layouts';
import {
  EventType,
  EventSubtype,
  EventIcon,
  EventParentNodeId,
} from 'smartComponents/Event/components/Event/parts';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { EVENT_HELPERS } from 'utils/helpers/events';

import m from './messages';
import style from './style';
import { CONFIG } from './config';

export class Create extends React.PureComponent {
  state = {
    dispatching: false,
    typeOpen: false,
    subtypeOpen: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  getType = () => {
    const { formType } = this.props;
    return formType;
  };

  getSubtype = () => {
    const { formSubtype } = this.props;
    return formSubtype;
  };

  getIconType = () => {
    const { formIconOverride } = this.props;
    return formIconOverride;
  };

  getDialogFormProps = () => {
    if (!this.dialogFormProps) {
      const { classes, dialogProps } = this.props;
      this.dialogFormProps = {
        dialogProps: { className: classes.root, ...dialogProps },
        PaperProps: { classes: { root: classes.paperRoot } },
      };
    }
    return this.dialogFormProps;
  };

  handleCreateEventSuccess = () => {
    this.setState({ dispatching: false });
    this.props.onClose();
  };

  handleCreateEventError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model }) => {
    const { templateId } = this.props;
    TEMPLATE_API_HELPERS.createEvent(
      {
        templateId,
        model,
        onSuccess: this.handleCreateEventSuccess,
        onError: this.handleCreateEventError,
      },
      this.props,
    );
    this.setState({ dispatching: true });
  };

  handleOpen = () => {
    const { onOpen } = this.props;

    this.props.resaga.setValue({ form: undefined });
    const open = onOpen();

    this.setState({ dispatching: false, ...open });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleTypeClose = () => {
    this.setState({ typeOpen: false, subtypeOpen: true });
  };

  handleSubtypeClose = () => {
    this.setState({ typeOpen: false, subtypeOpen: false });
  };

  renderNoPart = () => <div />;

  renderPart = (
    Component,
    variant = EVENT_CONSTANTS.VARIANTS.field,
    props = {},
  ) => () => {
    const { templateId, dayId } = this.props;
    return (
      <Component
        templateId={templateId}
        dayId={dayId}
        variant={variant}
        {...props}
      />
    );
  };

  renderFooter = args => {
    const { renderActions, renderSubmitButton, renderCancelButton } = args;
    return renderActions([
      <GridItem key="space" xs />,
      <GridItem key="cancel">{renderCancelButton()}</GridItem>,
      <GridItem key="submit">{renderSubmitButton()}</GridItem>,
    ]);
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderType = () => {
    const { typeOpen } = this.state;

    const props = {
      open: typeOpen,
      onChange: this.handleTypeClose,
      onClose: this.handleTypeClose,
    };
    return (
      <React.Fragment>
        <GridItem>
          <EventHeading>
            <M {...m.headingTypePrefix} />
          </EventHeading>
        </GridItem>
        {this.renderPart(
          EventType,
          EVENT_CONSTANTS.VARIANTS.editableHeading,
          props,
        )()}
      </React.Fragment>
    );
  };

  renderSubtype = () => {
    const { typeOpen, subtypeOpen } = this.state;
    const props = {
      open: subtypeOpen,
      onChange: this.handleSubtypeClose,
      onClose: this.handleSubtypeClose,
    };
    const separator = !typeOpen && (
      <EventHeading>
        <M {...m.headingTypeSubtypeSeparator} />
      </EventHeading>
    );
    return (
      <React.Fragment>
        {separator}
        {this.renderPart(
          EventSubtype,
          EVENT_CONSTANTS.VARIANTS.editableHeading,
          props,
        )()}
      </React.Fragment>
    );
  };

  renderHeading = () => (
    <GridContainer alignItems="baseline">
      {this.renderType()}
      {this.renderSubtype()}
      {this.renderPart(EventIcon, EVENT_CONSTANTS.VARIANTS.editableHeading)()}
    </GridContainer>
  );

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        headingBackground={this.renderHeadingBackground()}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => {
    const { formBatchCreate } = this.props;
    return formBatchCreate ? (
      <M {...m.batchSubmitButtonLabel} />
    ) : (
      <M {...m.submitButtonLabel} />
    );
  };

  renderContent = variant => {
    const { tabId } = this.props;
    return (
      <ForEachEventType
        type={this.getType()}
        subtype={this.getSubtype()}
        renderEvent={this.renderNoPart}
        renderActivity={this.renderPart(Activity, variant, {
          icon: this.getIconType(),
          tabId,
          isCustomDateStart: EVENT_HELPERS.isEventCustomDate(this.getSubtype()),
        })}
        renderFlight={this.renderPart(Flight, variant, {
          tabId,
        })}
        renderAccommodation={this.renderPart(Accommodation, variant, {
          tabId,
        })}
        renderTransportation={this.renderPart(Transportation, variant, {
          tabId,
        })}
      />
    );
  };

  render = () => {
    const { open } = this.props;
    const { dispatching } = this.state;

    return (
      <DialogForm
        open={open}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        onFormValidSubmit={this.handleFormValidSubmit}
        canSubmitForm={!dispatching}
        submitButtonContent={this.renderSubmitButtonContent()}
        {...this.getDialogFormProps()}
      >
        {this.renderContent()}
        <EventParentNodeId />
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
  onOpen: PropTypes.func, // must return object
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,
  type: PropTypes.string,
  subtype: PropTypes.string,

  // resaga value
  templateId: PropTypes.number,
  tabId: PropTypes.number,
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
  formIconOverride: PropTypes.string,
  formBatchCreate: PropTypes.bool,
};

Create.defaultProps = {
  dayId: 0,
  onOpen: () => ({ typeOpen: true, subtypeOpen: false }),
  dialogProps: {},
  type: '',
  subtype: '',

  templateId: 0,
  tabId: 0,
  formType: '',
  formSubtype: '',
  formIconOverride: '',
  formBatchCreate: false,
};

export default compose(
  withStyles(style, { name: 'EventContainer/Event/Create' }),
  resaga(CONFIG),
)(Create);
