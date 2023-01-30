import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { PARTICIPANTS, PARTICIPANT } from 'utils/modelConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DATASTORE_UTILS } from 'datastore';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Participant } from 'smartComponents/Node/types';
import { Type, Name } from 'smartComponents/Node/parts';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { get, set } from 'lodash';
import m from './messages';
import { CONFIG } from './config';

export class CreateParticipant extends React.PureComponent {
  state = {
    dispatching: false,
    isParticipantStatus: false,
  };

  componentWillUnmount() {
    this.props.resaga.setValue({
      participantWithRelationship: false,
    });
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  handleOpen = () => {
    this.setState({ dispatching: false });
  };

  handleCreateLinkSuccess = () => {
    const { onClose } = this.props;
    this.props.resaga.setValue({
      participantWithRelationship: false,
    });
    this.setState({ dispatching: false });
    onClose();
  };

  handleCreateLink = ({ participantId, relationship }) => {
    const { followerId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: Number(participantId),
        data: {
          nextNodeId: followerId,
          action: 'guardian',
          actionContent: {
            relationship,
          },
        },
        prevNodeChildKey: 'followers',
        nextNodeChildKey: 'participantLinks',
        upsertLinkId: true,
      },
      onSuccess: this.handleCreateLinkSuccess,
    });
  };

  handleCreateLinkInGroup = ({ groupId, participantId }) => {
    this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: Number(participantId),
        data: {
          nextNodeId: groupId,
          action: 'group',
          actionContent: {
            type: 'travelgroup',
          },
        },
        prevNodeChildKey: 'groups',
        nextNodeChildKey: 'participants',
        upsertLinkId: true,
      },
      onSuccess: this.handleCreateLinkInGroupSuccess,
    });
  };

  handleCreateLinkInGroupSuccess = () => {
    const { onClose } = this.props;
    this.props.resaga.setValue({
      groupId: null,
      participantInGroup: false,
    });
    this.setState({ dispatching: false });
    onClose();
  };

  handleCreateSuccess = model => response => {
    this.setState({ dispatching: false });
    // TODO: Allow generic createNode api to update multiple arrays?
    this.props.resaga.setValue({
      calculatedParticipants: DATASTORE_UTILS.upsertArray(
        '',
        DATASTORE_UTILS.getObjectIds(response),
      ),
    });

    const {
      participantWithRelationship,
      participantInGroup,
      groupId,
    } = this.props;

    const keys = Object.keys(response);
    const participantId = keys[0];

    if (participantWithRelationship) {
      // Create link for created participant and the currently opened follower
      this.handleCreateLink({ ...model, participantId });
    } else if (participantInGroup) {
      this.handleCreateLinkInGroup({ participantId, groupId });
    } else {
      this.handleCreateLinkSuccess();
    }
  };

  handleCreateError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model }) => {
    const { templateId, orgId } = this.props;
    const status = get(model, 'node.status', '');
    const filterParticipantStatus = status === 'pending' ? '' : status;
    const newModel = Object.assign(model);
    set(newModel, 'node.status', filterParticipantStatus);
    set(newModel, 'node.customData.personType', null);
    set(newModel, 'node.customData.orgId', orgId);
    this.setState({ dispatching: true });
    NODE_API_HELPERS.createNode(
      {
        parentNodeId: templateId,
        childKey: PARTICIPANTS,
        onSuccess: this.handleCreateSuccess(model),
        onError: this.handleCreateError,
        fetchCalculated: true,
        ...newModel,
      },
      this.props,
    );
  };

  renderPart = (Component, variant, props) => (
    <Component variant={variant} {...props} />
  );

  renderHeading = () => (
    <M {...m.heading} values={{ paxLabel: this.props.paxLabel }} />
  );

  renderSubheading = () => {
    const { templateId, parentNodeId, firstName } = this.props;
    if (parentNodeId !== templateId) {
      if (firstName) {
        return (
          <GridContainer spacing={0}>
            <GridItem style={{ paddingRight: 4 }}>
              <M {...m.interestedPersonWithName} />
            </GridItem>
            <Name id={parentNodeId} variant={VARIANTS.TEXT_ONLY} />
          </GridContainer>
        );
      }
      return <M {...m.interestedPersonWithoutName} />;
    }
    return null;
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        renderSubheading={this.renderSubheading}
        headingBackground={this.renderHeadingBackground()}
        headingUnderline={false}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => (
    <M {...m.submitButtonLabel} values={{ paxLabel: this.props.paxLabel }} />
  );

  handleInvalidSubmit = data => {
    this.setState({
      isParticipantStatus: data.node.status === '',
    });
  };

  render = () => {
    const { open, mode, onClose, participantWithRelationship } = this.props;
    const { isParticipantStatus } = this.state;
    const { dispatching } = this.state;
    return (
      <DialogForm
        open={open}
        onClose={onClose}
        onCancel={onClose}
        renderHeader={this.renderHeader}
        onFormValidSubmit={this.handleFormValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
        canSubmitForm={!dispatching}
        submitButtonContent={this.renderSubmitButtonContent()}
        fullWidth={false}
        size={SIZE_CONSTANTS.SM}
      >
        {this.renderPart(Participant, VARIANTS.FORM, {
          readOnlyStatus: mode === 'readOnlyStatus',
          withRelationshipField: participantWithRelationship,
          isEmptyParticipantStatus: isParticipantStatus,
          isRequired: true,
        })}
        {this.renderPart(Type, VARIANTS.DATA, { defaultType: PARTICIPANT })}
      </DialogForm>
    );
  };
}

CreateParticipant.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number,
  parentNodeId: PropTypes.number,
  open: PropTypes.bool,
  mode: PropTypes.string,
  onClose: PropTypes.func,

  // resaga value
  firstName: PropTypes.string,
  participantWithRelationship: PropTypes.bool,
  followerId: PropTypes.number,
  participantCreateCallbackSuccess: PropTypes.func,
  participantInGroup: PropTypes.bool,
  groupId: PropTypes.number,
  orgId: PropTypes.number,
  paxLabel: PropTypes.string,
};

CreateParticipant.defaultProps = {
  templateId: null,
  parentNodeId: null,
  open: false,
  mode: null,
  onClose: () => {},

  firstName: '',
  participantWithRelationship: false,
  followerId: 0,
};

export default resaga(CONFIG)(CreateParticipant);
