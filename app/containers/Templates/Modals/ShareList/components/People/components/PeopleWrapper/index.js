import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InviteByOrgUser from 'containers/Templates/Modals/ShareList/components/InviteByOrgUser';
import { ORGANISATION_API, GET_ORG_MEMBERS } from 'apis/constants';
import Button from 'viewComponents/Button';
import { ORG_MEMBER } from 'datastore/invitationStore/constants';
import InviteUser from 'smartComponents/Organisation/components/InviteUser';
import NavLink from 'ugcomponents/NavLink';
import { URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { ORG_ROLE } from 'apis/components/Ability/roles';
import { inviteListAnchor } from 'utils/constant';
import Scroll from 'react-scroll';

import { CONFIG } from './config';
import styles from './styles';

export class PeopleWrapper extends PureComponent {
  state = {
    fetching: false,
  };

  componentDidMount = () => {
    const { orgPeopleIds } = this.props;
    if (!orgPeopleIds.length && this.props.orgId) {
      this.fetchOrgMemeber(this.props.orgId);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.orgId !== this.props.orgId && this.props.orgId) {
      this.fetchOrgMemeber(this.props.orgId);
    }
  };

  fetchDone = () => this.setState({ fetching: false });

  fetchOrgMemeber = orgId => {
    this.setState({ fetching: true });
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: { id: orgId },
      onSuccess: this.fetchDone,
      onError: this.fetchDone,
    });
  };

  showMore = () => {
    this.props.resaga.setValue({
      showOrgInvite: true,
      shareListFilter: ORG_MEMBER,
      shareListTab: 2,
    });
  };

  renderMoreButton = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.showMore}>
        <Button
          dense
          size="xs"
          variant="inline"
          onClick={this.showMore}
          noPadding
          noMargin
          className={classes.button}
        >
          Show more...
        </Button>
      </GridItem>
    );
  };

  openInviteUser = () => this.setState({ inviteUserDialog: true });

  onCloseModal = () => this.setState({ inviteUserDialog: false });

  renderInvOrg = () => {
    const { orgId, classes } = this.props;
    const { inviteUserDialog } = this.state;
    if (!this.canOrgInvite()) return null;
    return (
      <React.Fragment>
        <GridItem>
          <NavLink
            to={URL_HELPERS.orgPeople(orgId)}
            className={classes.inviteButtonLink}
          >
            {'Invite someone to join your organisation'}
          </NavLink>
        </GridItem>
        <InviteUser
          id={orgId}
          open={inviteUserDialog}
          onClose={this.onCloseModal}
        />
      </React.Fragment>
    );
  };

  renderEmpty = label => {
    const { classes } = this.props;
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem className={classes.empty}>{label}</GridItem>
          {!this.state.fetching && this.renderInvOrg()}
        </GridContainer>
      </GridItem>
    );
  };

  renderPendingPeople = ids =>
    ids.map(userId => {
      const refId = inviteListAnchor(userId);
      return (
        <Scroll.Element name={refId}>
          <GridItem>
            <InviteByOrgUser
              id={this.props.id}
              userId={userId}
              showAsRow={this.props.showConnected}
              orgId={this.props.orgId}
            />
          </GridItem>
        </Scroll.Element>
      );
    });

  isMinimise = () => this.props.variant === ORG_MEMBER;

  canOrgInvite = () => {
    const { ownOrgRole } = this.props;
    return [ORG_ROLE.OWNER, ORG_ROLE.ADMIN].includes(ownOrgRole);
  };

  render = () => {
    const {
      orgPeopleIds,
      me,
      classes,
      createdBy,
      userIds,
      pendingUserIds,
    } = this.props;
    const { fetching } = this.state;

    if (fetching) return this.renderEmpty('Organisation member loading...');

    const filteredIds = orgPeopleIds.filter(
      user =>
        user !== me &&
        user !== createdBy &&
        ![...userIds, ...pendingUserIds].includes(user),
    );

    if (!filteredIds.length) {
      const text = LOGIC_HELPERS.ifElse(
        orgPeopleIds.length > 0,
        'All organisations members have already been invited to this tour.',
        'There is no members yet.',
      );
      return this.renderEmpty(text);
    }

    return (
      <GridContainer spacing={0}>
        <GridItem xs={12} className={!this.isMinimise() && classes.items}>
          <GridContainer direction="column">
            {this.renderPendingPeople(filteredIds)}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

PeopleWrapper.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // resaga
  createdBy: PropTypes.number,
  ownOrgRole: PropTypes.string,

  // parent
  id: PropTypes.number,
  orgId: PropTypes.number,
  me: PropTypes.number,
  orgPeopleIds: PropTypes.array,
  userIds: PropTypes.array,
  showConnected: PropTypes.bool,
  variant: PropTypes.string,
  pendingUserIds: PropTypes.array,
};

PeopleWrapper.defaultProps = {
  orgPeopleIds: [],
  userIds: [],
  showConnected: true,
  pendingUserIds: [],
};

export default compose(
  withStyles(styles, { name: 'PeopleWrapper' }),
  INVITATION_STORE_HOC.selectShareTokens({
    nodeIds: 'id',
    outputProp: 'pendingTokenIds',
  }),
  resaga(CONFIG),
)(PeopleWrapper);
