import inputs from 'containers/Templates/Modals/ShareList/components/InviteByEmail/inputs';
import Invitee from 'containers/Templates/Modals/ShareList/components/Invitee';
import { withStyles } from '@material-ui/core/styles';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SimpleRTE, Text } from 'ugcomponents/Inputs';
import { CONFIG_1, CONFIG_2 } from './config';
import styles from './styles';
import utils from './utils';

export class Content extends PureComponent {
  componentWillMount = () => {
    const { myEmail, ownerEmail, people } = this.props;
    this.validations = {
      isEmail: true,
      inviteYourself: utils.inviteYourself(myEmail),
      inviteOwner: utils.inviteOwner(ownerEmail, people),
    };
  };

  // If connected, not pending
  getPending = () => {
    const { connected, pending } = this.props;
    return !connected && pending;
  };

  // If connected, not invited
  getInviteeToken = () => {
    const { connected, inviteeToken } = this.props;
    return !connected ? inviteeToken : null;
  };

  isNewInvitee = () => {
    const { userId, owner, accepted, shared } = this.props;
    const pending = this.getPending();
    return !(shared || pending || accepted || owner === userId);
  };

  renderAddPersonalMessage = () => {
    const { classes, connected, isPartOfOrg } = this.props;
    if (!this.isNewInvitee() || connected || isPartOfOrg) return '';

    return (
      <div className={classes.roleContainer}>
        <SimpleRTE name="pm" />
      </div>
    );
  };

  render = () => {
    const { classes, exist, userId, email, templateId } = this.props;

    if (exist) {
      return (
        <div className={classes.root}>
          <Invitee
            noanimate
            userId={userId}
            email={email}
            templateId={templateId}
            token={this.getInviteeToken()}
            creating={this.isNewInvitee()}
          />
          {this.renderAddPersonalMessage()}
        </div>
      );
    }

    return <Text {...inputs.EMAIL} validations={this.validations} />;
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  shared: PropTypes.bool,
  connected: PropTypes.bool,
  email: PropTypes.string,
  userId: PropTypes.number,
  templateId: PropTypes.number,
  inviteeToken: PropTypes.string,

  // resaga props
  myEmail: PropTypes.string,
  owner: PropTypes.number,
  ownerEmail: PropTypes.string,
  people: PropTypes.array,
  token: PropTypes.string,
  exist: PropTypes.bool,
  pending: PropTypes.bool,
  accepted: PropTypes.bool,
  isPartOfOrg: PropTypes.bool,
};

Content.defaultProps = {
  shared: false,
  connected: false,
  email: '',
  userId: 0,
  inviteeToken: null,

  myEmail: null,
  owner: null,
  ownerEmail: null,
  people: [],
  exist: false,
  pending: false,
  accepted: false,
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'people',
  }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(Content);
