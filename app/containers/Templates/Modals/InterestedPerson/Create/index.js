import { CREATE_LINK, NODE_API } from 'apis/constants';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { INTERESTED_PEOPLE, INTERESTED_PERSON } from 'utils/modelConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { Type, Status } from 'smartComponents/Node/parts';
import { InterestedPerson } from 'smartComponents/Node/types';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { CONFIG } from './config';
import m from './messages';
import { EMERGENCY_CONTACT_VALUES } from '../../../../../appConstants';

export class CreateInterestedPerson extends React.PureComponent {
  state = {
    dispatching: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  handleOpen = () => {
    this.setState({ dispatching: false });
  };

  handleCreateLinkSuccess = () => {
    this.props.resaga.setValue({
      interestedPersonCreateParticipantId: 0,
    });
    this.setState({ dispatching: false });
    this.props.onClose();
  };

  handleCreateLink = ({ followerId, relationship, emergencyContact }) => {
    const { interestedPersonCreateParticipantId: participantId } = this.props;
    this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: Number(participantId),
        data: {
          nextNodeId: followerId,
          action: 'guardian',
          actionContent: {
            relationship,
            emergencyContact,
          },
        },
        prevNodeChildKey: 'followers',
        nextNodeChildKey: 'participantLinks',
        upsertLinkId: true,
      },
      onSuccess: this.handleCreateLinkSuccess,
    });
  };

  handleCreateSuccess = ({
    relationship,
    otherRelationship,
    emergencyContact,
  }) => result => {
    const { interestedPersonCreateParticipantId } = this.props;
    if (interestedPersonCreateParticipantId > 0) {
      const keys = Object.keys(result);
      const followerId = Number(keys[0]);
      // proceed with creating link directly with participant
      const finalRelationship = LOGIC_HELPERS.ifElse(
        relationship === 'other',
        otherRelationship,
        relationship,
      );
      this.handleCreateLink({
        followerId,
        relationship: finalRelationship,
        emergencyContact,
      });
    } else {
      this.setState({ dispatching: false });
      this.props.onClose();
    }
  };

  handleCreateError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model }) => {
    const { templateId } = this.props;
    const { otherRelationship, relationship, emergencyContact } = model;
    NODE_API_HELPERS.createNode(
      {
        parentNodeId: templateId,
        childKey: INTERESTED_PEOPLE,
        onSuccess: this.handleCreateSuccess({
          relationship,
          otherRelationship,
          emergencyContact: emergencyContact
            ? EMERGENCY_CONTACT_VALUES.YES
            : EMERGENCY_CONTACT_VALUES.NO,
        }),
        onError: this.handleCreateError,
        fetchCalculated: true,
        ...model,
      },
      this.props,
    );
    this.setState({ dispatching: true });
  };

  handleCloseModal = () => {
    const { onClose } = this.props;
    this.props.resaga.setValue({
      interestedPersonCreateParticipantId: 0,
    });
    onClose();
  };

  renderPart = (Component, variant = VARIANTS.FORM, props = {}) => {
    const { templateId } = this.props;
    return <Component templateId={templateId} variant={variant} {...props} />;
  };

  renderHeading = () => <M {...m.heading} />;

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        headingBackground={this.renderHeadingBackground()}
        headingUnderline={false}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => <M {...m.submitButtonLabel} />;

  render = () => {
    const { open, interestedPersonCreateParticipantId } = this.props;
    const { dispatching } = this.state;
    return (
      <DialogForm
        open={open}
        onClose={this.handleCloseModal}
        onCancel={this.handleCloseModal}
        renderHeader={this.renderHeader}
        onFormValidSubmit={this.handleFormValidSubmit}
        canSubmitForm={!dispatching}
        submitButtonContent={this.renderSubmitButtonContent()}
        size={SIZE_CONSTANTS.SM}
      >
        {this.renderPart(InterestedPerson, undefined, {
          withRelationshipField: interestedPersonCreateParticipantId > 0,
        })}
        {this.renderPart(Type, VARIANTS.DATA, {
          defaultType: INTERESTED_PERSON,
        })}
        {this.renderPart(Status, VARIANTS.DATA, { type: INTERESTED_PERSON })}
      </DialogForm>
    );
  };
}

CreateInterestedPerson.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga
  interestedPersonCreateParticipantId: PropTypes.number,
};

CreateInterestedPerson.defaultProps = {
  open: false,
  onClose: () => {},
  interestedPersonCreateParticipantId: 0,
};

export default resaga(CONFIG)(CreateInterestedPerson);
