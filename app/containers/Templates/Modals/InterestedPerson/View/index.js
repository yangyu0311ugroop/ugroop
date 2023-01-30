import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import {
  INTERESTED_PEOPLE,
  INTERESTED_PERSON,
  TOUR_INTERESTED,
  INTERESTED_LINKEE,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { NODE_API, REMOVE_NODE } from 'apis/constants';
import { ability } from 'apis/components/Ability/ability';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import Hr from 'components/Hr';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import { H5 } from 'viewComponents/Typography';
import { EditableLabel } from 'viewComponents/Editable';
import { InterestedPersonDeleteConfirmation } from 'viewComponents/People';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import Node from 'smartComponents/Node';
import {
  CreatedAt,
  EditableRTE,
  Status,
  CreatedBy,
} from 'smartComponents/Node/parts';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import LinkedUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import m from './messages';

export class ViewInterestedPerson extends React.PureComponent {
  state = {
    confirmingDelete: false,
  };

  componentWillUnmount = () => {
    this.props.resaga.setValue({ linkedUser: {} });
  };

  isContributor = () => ability.can('execute', INTERESTED_PERSON);

  showLinkedUser = () => {
    const { invitationPending, userConnected } = this.props;
    return this.isContributor() || (invitationPending || userConnected);
  };

  upsertNodes = toUpsert => nodes => ({ ...nodes, ...toUpsert });

  handleDeleteSuccess = () => {
    this.setState({ confirmingDelete: false });
    this.handleClose();
  };

  handleDeleteError = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteConfirm = () => {
    const { id: nodeId, templateId } = this.props;
    this.props.resaga.dispatchTo(NODE_API, REMOVE_NODE, {
      payload: {
        nodeId,
        keyPath: `${templateId}.${INTERESTED_PEOPLE}`,
        newParentId: templateId,
      },
      onSuccess: this.handleDeleteSuccess,
      onError: this.handleDeleteError,
    });
  };

  handleDeleteCancel = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteClick = e => {
    e.preventDefault();
    this.setState({ confirmingDelete: true });
  };

  handleClose = () => {
    this.props.resaga.setValue({ linkedUser: {} });
    this.props.onClose();
  };

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.props} variant={variant} {...props} />
  );

  renderDeleteButton = () => {
    const { invitationPending, userConnected } = this.props;
    return (
      !invitationPending &&
      !userConnected && (
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
      )
    );
  };

  isFromRyi = () => !this.props.createdBy;

  renderHeading = heading => (
    <GridContainer alignItems="center">
      <GridItem>{heading}</GridItem>
      <GridItem>
        <H5 dense>
          <M
            {...LOGIC_HELPERS.ifElse(
              this.isFromRyi(),
              m.subheadingPrefix,
              m.subheadingPrefixFromTour,
            )}
            values={{
              addedBy: this.renderPart(CreatedBy, VARIANTS.TEXT_ONLY),
              date: this.renderPart(CreatedAt, VARIANTS.TEXT_ONLY, {
                showFromNow: true,
              }),
            }}
          />
        </H5>
      </GridItem>
      <GridItem xs />
      {this.renderLinkedUser()}
    </GridContainer>
  );

  renderLinkedUser = () => {
    const {
      id,
      templateId,
      userId,
      shareToken,
      userNodeId,
      invitationPending,
      userConnected,
    } = this.props;
    return (
      this.showLinkedUser() && (
        <GridItem>
          <LinkedUser
            id={id}
            templateId={templateId}
            role={TOUR_INTERESTED}
            linkeeRole={INTERESTED_LINKEE}
            userId={userId}
            shareToken={shareToken}
            userNodeId={userNodeId}
            invitationPending={invitationPending}
            userConnected={userConnected}
          />
        </GridItem>
      )
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={<M {...m.heading} />}
        headingBackground={this.renderHeadingBackground()}
        renderHeading={this.renderHeading}
      />
      <CloseButton onClick={this.handleClose} />
    </React.Fragment>
  );

  renderNote = () => (
    <GridItem>
      <EditableLabel>
        <M {...m.noteLabel} />
      </EditableLabel>
      {this.renderPart(EditableRTE, VARIANTS.EDITABLE, {
        nodePath: NODE_PATHS.note,
        patch: true,
        showHeader: false,
        dense: true,
        emptyPlaceholder: 'Click to add note',
      })}
    </GridItem>
  );

  renderContributorSection = () =>
    this.isContributor() && (
      <GridContainer alignItems="flex-end">
        {this.renderNote()}
        <GridItem xs />
        {this.renderDeleteButton()}
        {this.renderPart(Status, VARIANTS.ACTIONS)}
      </GridContainer>
    );

  render = () => {
    const { open, firstName, lastName, userId } = this.props;
    const { confirmingDelete } = this.state;
    return (
      <React.Fragment>
        <Dialog open={open} onClose={this.handleClose} fullWidth>
          <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
          <DialogContent>
            {this.renderPart(Node, VARIANTS.EDITABLE, {
              noName: !!userId,
              readOnlyStatus: !this.isContributor(),
              mode: 'forms',
            })}
          </DialogContent>
          {this.isContributor() && <Hr noMarginTop />}
          <DialogActions noPaddingTop disableActionSpacing>
            {this.renderContributorSection()}
          </DialogActions>
        </Dialog>
        <InterestedPersonDeleteConfirmation
          firstName={firstName}
          lastName={lastName}
          open={confirmingDelete}
          onConfirm={this.handleDeleteConfirm}
          onCancel={this.handleDeleteCancel}
        />
      </React.Fragment>
    );
  };
}

ViewInterestedPerson.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number.isRequired,
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga value
  userId: PropTypes.number,
  shareToken: PropTypes.string,
  userNodeId: PropTypes.number,
  invitationPending: PropTypes.bool,
  userConnected: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  participants: PropTypes.array,
  createdBy: PropTypes.number,
};

ViewInterestedPerson.defaultProps = {
  id: null,
  open: false,
  onClose: () => {},

  userId: null,
  shareToken: null,
  userNodeId: null,
  invitationPending: false,
  userConnected: false,
  firstName: null,
  lastName: null,
  participants: [],
  createdBy: null,
};

export default compose(
  selectLinkedUserData({ nodeIdProp: 'id', roles: [INTERESTED_LINKEE] }),
  resaga(CONFIG),
)(ViewInterestedPerson);
