import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { CONFIG } from './config';
import { makeStyles } from '../../../components/material-ui';
import RecentChannelList from './components/recentChannelList';
import { getChatStreamId } from '../../../utils/stringAdditions';
import { selectCurrentUserAccount } from '../../../datastore/stormPathStore/selectors';
import { ChatTypes } from '../../../lib/streamChat/chatType';
import { makeSelectChannelDraw } from '../../../datastore/streamChat/selectors';
import { setRecentChannelDrawStatus } from '../../StreamChat/actions';

const useStyles = makeStyles(styles);
export function ChatDrawer(props) {
  const classes = useStyles();
  const currentUser = props.currentUser;
  const onClose = () => {
    props.setActive(false);
  };
  const filters = {
    type: ChatTypes.UGroop,
    members: {
      $in: [
        getChatStreamId(
          currentUser && currentUser.email,
          currentUser && currentUser.id,
        ),
      ],
    },
  };
  const sort = { last_message_at: -1 };

  const open = props.isChatDrawerOpen || props.isActive;
  return (
    <Drawer
      variant={props.isChatDrawerOpen ? 'persistent' : 'temporary'}
      open={open}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      onClose={onClose}
      data-testid="TourDrawTest"
    >
      <RecentChannelList
        sort={sort}
        filters={filters}
        isActive={props.isActive}
      />
    </Drawer>
  );
}

ChatDrawer.propTypes = {
  isActive: PropTypes.bool,
  currentUser: PropTypes.object,
  isChatDrawerOpen: PropTypes.bool,
  setActive: PropTypes.func,
};

ChatDrawer.defaultProps = {
  isActive: false,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
  isActive: makeSelectChannelDraw(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setActive: data => dispatch(setRecentChannelDrawStatus(data)),
  };
}

export default compose(
  withStyles(styles, { name: 'ChatDrawer' }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  resaga(CONFIG),
)(React.memo(ChatDrawer));
