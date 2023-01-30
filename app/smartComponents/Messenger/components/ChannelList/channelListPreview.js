import React, { useState, useEffect, useContext } from 'react';
import { ChatContext } from '@ugr00p/stream-chat-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose } from 'redux';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { connect, useSelector } from 'react-redux';
import useVigilante from '@mollycule/vigilante';
import { makeStyles } from '../../../../components/material-ui';
import GridItem from '../../../../components/GridItem';
import { Span } from '../../../../viewComponents/Typography';
import {
  getChatStreamId,
  isEmptyString,
} from '../../../../utils/stringAdditions';
import {
  setRecentAddChannel,
  setChannelDrawActiveChannel,
} from '../../../../containers/StreamChat/actions';
import { useMessengerContext } from '../../../../containers/StreamChat/messageStateContext';
import {
  makeSelectChannelDrawActiveChannel,
  makeSelectNewChannel,
} from '../../../../datastore/streamChat/selectors';
import { selectCurrentUserAccount } from '../../../../datastore/stormPathStore/selectors';
const styles = ({ colors }) => ({
  listItemStyle: {
    padding: '8px 0px 8px 16px',
  },
  active: {
    background: colors.listActiveColor,
    color: colors.listFontColor,
  },
  hoverOver: {
    background: colors.listMouseOverColor,
  },
});

const useStyles = makeStyles(styles);

export const ifHidden = ({ archivedChannels, cid }) => {
  if (archivedChannels && archivedChannels.includes(cid)) {
    return true;
  }
  return false;
};

function ChannelListPreview(props) {
  const [mouseIn, setMouseIn] = useState(false);
  const [messageState, dispatchCtx] = useMessengerContext();
  const { client, setActiveChannel } = useContext(ChatContext);
  const channelDrawActiveChannelId = useSelector(state =>
    makeSelectChannelDrawActiveChannel(state),
  );
  const newChannelId = useSelector(state => makeSelectNewChannel(state));
  const currentUser = useSelector(state => selectCurrentUserAccount()(state));
  useVigilante('ChannelListPreview', {
    newChannelId,
    channelDrawActiveChannelId,
    messageState: messageState.activeChannelForceUpdate,
    currentUser,
  });

  const updateActiveChannel = id => {
    let cid = '';
    let hasUnread = false;
    if (
      client.activeChannels &&
      _.values(client.activeChannels).length > 0 &&
      currentUser
    ) {
      const streamChatId = getChatStreamId(currentUser.email, currentUser.id);
      const activeChannelArray = _.filter(
        _.values(client.activeChannels),
        o => {
          const isSameTemplateId =
            o.data.templateId === props.channel.data.templateId;
          const partOfChannel = _.keys(o.state.members).includes(streamChatId);
          return isSameTemplateId && partOfChannel;
        },
      );
      const firstUnreadChannel = _.find(
        activeChannelArray,
        o => o.countUnread() >= 1,
      );
      if (firstUnreadChannel) {
        cid = firstUnreadChannel.cid;
        hasUnread = true;
      } else if (activeChannelArray.length > 0) {
        cid = activeChannelArray[0].cid;
      }
    }
    if (_.isEmpty(props.activeChannel) && props.channel.cid === cid) {
      if (hasUnread && isMobile) {
        setActiveChannel(null);
      } else {
        setActiveChannel(props.channel);
      }
    } else if (
      props.activeChannel &&
      props.activeChannel.data &&
      props.activeChannel.data.templateId !== props.channel.data.templateId &&
      props.channel.cid === cid
    ) {
      if (hasUnread && isMobile) {
        setActiveChannel(null);
      } else {
        setActiveChannel(props.channel);
      }
    } else if (
      props.activeChannel &&
      props.activeChannel.data.templateId === props.channel.data.templateId &&
      props.channel.cid === cid &&
      props.activeChannel.cid === id
    ) {
      setActiveChannel(props.channel);
    }
  };

  useEffect(() => {
    updateActiveChannel();
    return function cleanup() {
      dispatchCtx.resetActiveChannelForceUpdate();
    };
  }, []); // only do the setActive when first loaded

  useEffect(() => {
    if (messageState.activeChannelForceUpdate.number > 0) {
      updateActiveChannel(
        messageState.activeChannelForceUpdate.changedActiveChannelId,
      );
    }
  }, [messageState.activeChannelForceUpdate]); // only do the setActive when first loaded

  useEffect(() => {
    if (!isEmptyString(newChannelId) && newChannelId === props.channel.cid) {
      setActiveChannel(props.channel);
      props.setRecentAddChannel({
        templateId: props.channel.data.templateId,
        channelId: null,
      });
    }
    if (
      !isEmptyString(channelDrawActiveChannelId) &&
      channelDrawActiveChannelId === props.channel.cid
    ) {
      setActiveChannel(props.channel);
      props.setChannelDrawActiveChannel({
        templateId: props.channel.data.templateId,
        channelId: null,
      });
    }
  }, [newChannelId, channelDrawActiveChannelId]); // NEW CHAT BE ADDED OR NEW CHAT BE INVITED, OR CLICK FROM CHANNEL DRAW

  const classes = useStyles();
  const isActive = () => props.active;
  const isMouseIn = () => {
    if (mouseIn && !isActive()) {
      return true;
    }
    return false;
  };
  const shouldBold = () => {
    const unreadCount = props.unread;
    return unreadCount >= 1;
  };
  const textWeight = () => {
    if (shouldBold()) {
      return 'black';
    }
    return 'normal';
  };

  const handleMouseOver = () => {
    setMouseIn(true);
  };

  const handleMouseOut = () => {
    setMouseIn(false);
  };

  const onClickItem = e => {
    e.preventDefault();
    setActiveChannel(props.channel);
    if (isMobile) {
      dispatchCtx.toggleChannelSliderValue();
    }
  };
  return (
    <>
      <GridItem
        className={classNames(
          classes.listItemStyle,
          isActive() ? classes.active : null,
          isMouseIn() ? classes.hoverOver : null,
        )}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        clickable
        onClick={onClickItem}
        data-testid="channelListPreview"
      >
        <Span
          weight={textWeight()}
          subtitle={ifHidden({
            cid: props.channel.cid,
            archivedChannels: [],
          })}
        >
          # {props.channel.data.name}
        </Span>
      </GridItem>
    </>
  );
}

ChannelListPreview.propTypes = {
  channel: PropTypes.object,
  activeChannel: PropTypes.object,
  active: PropTypes.bool,
  unread: PropTypes.number,
  setRecentAddChannel: PropTypes.func,
  setChannelDrawActiveChannel: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setRecentAddChannel: data => dispatch(setRecentAddChannel(data)),
    setChannelDrawActiveChannel: data =>
      dispatch(setChannelDrawActiveChannel(data)),
  };
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(React.memo(ChannelListPreview));
