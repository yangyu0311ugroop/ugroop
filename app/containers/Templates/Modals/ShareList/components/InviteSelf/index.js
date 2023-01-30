import { withStyles } from '@material-ui/core/styles';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ability } from 'apis/components/Ability/ability';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import JText from 'components/JText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { ADMIN } from 'utils/orgRoleConstants';
import { TEMPLATE } from 'utils/modelConstants';
import { ORGANISATION_STORE_HOC } from 'datastore/orgStore/hoc';
import classnames from 'classnames';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
export class InviteSelf extends PureComponent {
  state = {
    error: null,
    sending: false,
  };

  getUserConnected = () => {
    const { userNodeUserIds, userId } = this.props;
    return userNodeUserIds.includes(userId);
  };

  hasAccess = () =>
    ability.can('execute', TEMPLATE) && this.props.orgRole === ADMIN; // TODO: Update ability on auto update and remove this

  canJoin = () => {
    const { userId, ownerId, templateLoading, tourRoles } = this.props;
    return (
      this.hasAccess() &&
      !this.getUserConnected() &&
      ownerId !== userId &&
      !tourRoles.length &&
      !templateLoading
    );
  };

  handleSendInvitation = () => {
    const { id, userId, orgId, myEmail } = this.props;
    const connected = this.getUserConnected();
    this.setState({ sending: true, error: null });

    if (!connected) {
      TEMPLATE_API_HELPERS.addMyOwnRole(
        {
          id,
          shareTo: myEmail,
          shareToUserId: userId,
          shareFromUserId: userId,
          organisationId: orgId,
          role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
          roleName: TOUR_ROLES[TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER],
          onSuccess: this.addMyRoleSuccess,
          onError: this.addMyRoleFailure,
        },
        this.props,
      );
    }
  };

  addMyRoleSuccess = () => this.setState({ sending: false });

  addMyRoleFailure = () =>
    this.setState({
      sending: false,
      error: 'Whoops, something went wrong while joining. Please try again.',
    });

  confirmJoin = () =>
    PORTAL_HELPERS.prompt(
      {
        template: 'confirm',
        confirmation: true,
        simplifyDialog: true,
        headlineText: 'Are you sure you want to join as organiser?',
        dialogTitle: 'Join as organiser',
        confirmButton: 'Continue',
        cancelButton: 'Cancel',
        onConfirm: this.handleSendInvitation,
      },
      this.props,
    );

  // this.setState({ confirmDeleteDialogId });

  joinTour = () => {
    const { classes, smDown } = this.props;
    const { sending, error } = this.state;
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer
              wrap="nowrap"
              alignItems={LOGIC_HELPERS.ifElse(
                smDown,
                'flex-start',
                'flex-end',
              )}
              direction={LOGIC_HELPERS.ifElse(smDown, 'column')}
            >
              <GridItem>
                <Button
                  // color="primary"
                  size="xs"
                  className={classnames(
                    classes.smallText,
                    classes.iphoneWidthBtn,
                  )}
                  onClick={this.confirmJoin}
                  loading={sending}
                >
                  <GridContainer
                    direction="row"
                    alignItems="center"
                    justify="center"
                    wrap="noWrap"
                    className={classes.noWrap}
                  >
                    <GridItem>
                      <Icon size="xsmall" icon="lnr-plus" bold />
                    </GridItem>
                    <GridItem>Join as Organiser</GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
              <GridItem>
                <JText gray italic>
                  Join to see Discussion Groups, Chats, Comments & Posts.
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {!!error && (
            <GridItem>
              <JText italic danger sm>
                {error}
              </JText>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => (this.canJoin() ? this.joinTour() : null);
}

InviteSelf.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,
  userNodeUserIds: PropTypes.array,
  smDown: PropTypes.bool,
  orgRole: PropTypes.string,

  // parent props
  id: PropTypes.number.isRequired, // template id

  // resaga props
  myEmail: PropTypes.string,
  orgId: PropTypes.number,
  userId: PropTypes.number,
  ownerId: PropTypes.number,
  templateLoading: PropTypes.bool,
  tourRoles: PropTypes.array,
};

InviteSelf.defaultProps = {
  userNodeUserIds: [],

  myEmail: '',
  userId: 0,
  tourRoles: [],
};

export default compose(
  withStyles(styles, { name: 'InviteSelf' }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
  }),
  resaga(CONFIG),
  ORGANISATION_STORE_HOC.selectMemberPropByUserId({
    orgId: 'orgId',
    userId: 'userId',
    keyProp: 'role',
    outputProp: 'orgRole',
  }),
  resaga(CONFIG2),
  withSMDown,
)(InviteSelf);
