import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import React, { PureComponent } from 'react';
import NavItem from 'ugcomponents/NaviBar/AdminNavBar/components/NavItem';
import resaga from 'resaga';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Invitations from './components/Invitations';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import WhatsNew from './components/WhatsNew';
import { CONFIG } from './config';
import { setRecentChannelDrawStatus } from '../../../../../containers/StreamChat/actions';

export class RightMenu extends PureComponent {
  toggleReviewDrawer = () => {
    if (!this.props.isChatDrawerOpen) {
      this.props.isReviewDrawerActive(true);
    }
  };

  renderWhatsNew = () => <WhatsNew />;

  renderNotifications = () => <Notifications />;

  renderInvitations = () => <Invitations />;

  renderDiscussions = () => (
    <NavItem
      icon="lnr-bubbles"
      title="Chats"
      onClick={this.toggleReviewDrawer}
      count={this.props.totalUnread}
    />
  );

  renderProfile = () => <Profile />;

  render = () => (
    <GridContainer alignItems="center" noWrap spacing={0}>
      <GridItem>{this.renderWhatsNew()}</GridItem>
      <GridItem>{this.renderNotifications()}</GridItem>
      <GridItem>{this.renderInvitations()}</GridItem>
      <GridItem>{this.renderDiscussions()}</GridItem>
      <GridItem>{this.renderProfile()}</GridItem>
    </GridContainer>
  );
}

RightMenu.propTypes = {
  // hoc props
  isReviewDrawerActive: PropTypes.func,
  isChatDrawerOpen: PropTypes.bool,
  totalUnread: PropTypes.number,
  // parent props

  // resaga props
};

RightMenu.defaultProps = {};

export function mapDispatchToProps(dispatch) {
  return {
    isReviewDrawerActive: data => dispatch(setRecentChannelDrawStatus(data)),
  };
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  resaga(CONFIG),
)(RightMenu);
