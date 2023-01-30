import inputs from 'smartComponents/Organisation/components/InviteUser/components/InviteByEmail/inputs';
import Invitee from 'smartComponents/Organisation/components/InviteUser/components/Invitee';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SimpleRTE, Text } from 'ugcomponents/Inputs';
import { CONFIG, CONFIG_IDS } from './config';
import styles from './styles';
import utils from './utils';

export class Content extends PureComponent {
  componentWillMount = () => {
    const { myEmail, owner, people, pendingInvitations } = this.props;

    this.validations = {
      isEmail: true,
      inviteYourself: utils.inviteYourself(myEmail),
      inviteOwner: utils.inviteOwner(owner, people),
      invitePending: utils.invitePending(owner, pendingInvitations),
    };
  };

  componentDidUpdate(prevProps) {
    const { owner, pendingInvitations } = this.props;
    // Refresh validation data
    if (pendingInvitations.length !== prevProps.pendingInvitations.length) {
      this.validations.invitePending = utils.invitePending(
        owner,
        pendingInvitations,
      );
    }
  }

  isNewInvitee = () => {
    const { userId, owner, pending, accepted, shared, invited } = this.props;

    return !(invited || shared || pending || accepted || owner === userId);
  };

  renderAddPersonalMessage = () => {
    const { classes } = this.props;
    if (!this.isNewInvitee()) return null;

    return (
      <div className={classes.roleContainer}>
        <SimpleRTE name="pm" />
      </div>
    );
  };

  render = () => {
    const {
      classes,
      exist,
      userId,
      email,
      inviteeToken,
      fromOtherOrg,
      invited,
      registered,
    } = this.props;
    if (exist) {
      return (
        <div className={classes.root}>
          <Invitee
            invited={invited}
            registered={registered}
            noanimate
            userId={userId}
            email={email}
            creating={this.isNewInvitee()}
            token={inviteeToken}
            fromOtherOrg={fromOtherOrg}
            isSending={this.props.isSending}
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
  email: PropTypes.string,
  userId: PropTypes.number,
  isSending: PropTypes.bool,

  // resaga props
  myEmail: PropTypes.string,
  owner: PropTypes.number,
  exist: PropTypes.bool,
  pending: PropTypes.bool,
  shared: PropTypes.bool,
  registered: PropTypes.bool,
  invited: PropTypes.bool,
  accepted: PropTypes.bool,
  people: PropTypes.array,
  inviteeToken: PropTypes.string,
  fromOtherOrg: PropTypes.bool,
  pendingInvitations: PropTypes.array,
};

Content.defaultProps = {
  email: '',
  userId: 0,
  myEmail: '',
  owner: 0,
  exist: false,
  pending: false,
  shared: false,
  registered: false,
  invited: false,
  accepted: false,
  people: [],
  inviteeToken: '',
  fromOtherOrg: false,
  pendingInvitations: [],
  isSending: false,
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG_IDS),
  resaga(CONFIG),
)(Content);
