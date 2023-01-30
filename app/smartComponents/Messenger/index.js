import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import {
  Chat,
  Channel,
  ChannelList,
  MessageInput,
  Thread,
  MessageInputLarge,
  InfiniteScrollPaginator,
} from '@ugr00p/stream-chat-react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import useVigilante from '@mollycule/vigilante';
import ReactResizeDetector from 'react-resize-detector';
import Slide from '@material-ui/core/Slide';
import { StreamChatContext } from '../../lib/streamChat';
import ChannelHeader from './components/ChannelHeader';
import MessageTeam from './components/MessageTeam';
import MessageList from './components/MessageList';
import MessageHeaderComponent from './components/MessageHeaderComponent';
import ChannelListTeam from './components/ChannelList';
import ChatDown from './components/ChatDown';
import ChannelDetail from './components/ChannelDetail';
import ChannelListPreview from './components/ChannelList/channelListPreview';
import Window from './components/Windows';
import EmptyStateIndicator from './components/ChannelList/emptyStateIndicator';
import { makeStyles } from '../../components/material-ui';
import { useMessengerContext } from '../../containers/StreamChat/messageStateContext';
import { getChannel } from '../../containers/StreamChat/utils';
import { getTourId } from '../../utils/stringAdditions';
import { ChatTypes } from '../../lib/streamChat/chatType';
const input = props => {
  // eslint-disable-next-line react/prop-types,camelcase
  const { watcher_count, ...rest } = props;
  return (
    <MessageInputLarge
      watcher_count={0}
      {...rest}
      additionalTextareaProps={{
        style: {
          paddingRight: '10px',
          'min-height': '55px',
        },
      }}
    />
  );
};

const useStyles = () =>
  makeStyles(() => ({
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    slideContainer: {
      position: 'absolute',
      left: 0,
      zIndex: 1200,
    },
  }));

export function Messenger(props) {
  const [dimensions, setDimensions] = useState({ width: -1 });
  const [messagerState, disPatchContext] = useMessengerContext();
  useVigilante('Messenger', {
    filters: props.filters,
    sort: props.sort,
    height: props.height,
  });

  useEffect(() => {
    disPatchContext.setTourChannelDimension({ h: props.height });
  }, [props.height]);

  useEffect(
    () =>
      function cleanup() {
        disPatchContext.resetChannelSliderValue();
      },
    [],
  );

  const classes = useStyles(dimensions)();
  const client = useContext(StreamChatContext);
  const onAddedToChannel = async (setChannelFn, e) => {
    const channel = await getChannel(client, e.channel.type, e.channel.cid);
    // move channel to starting position
    if (props.filters.templateId === channel.data.templateId) {
      setChannelFn(channels => {
        const newChannels = _.uniqBy([...channels, channel]).sort((a, b) => {
          const acompare = a ? a.cid : '';
          const bcompare = b ? b.cid : '';
          return acompare.localeCompare(bcompare);
        });
        return newChannels;
      });
    }
  };

  const onRemovedFromChannel = async (setChannelFn, e) => {
    console.log('onRemovedFromChannel', e);
    const tID = getTourId(e.channel.type, e.channel_id);
    if (props.filters.templateId === tID) {
      setChannelFn(channels =>
        channels.filter(channel => channel.cid !== e.channel.cid),
      );
      delete client.activeChannels[e.channel.cid];
      disPatchContext.forceUpdateActiveChannel(e.channel.cid);
    }
  };

  const onChannelDeleted = async (setChannelFn, e) => {
    console.log('onChannelDeleted', e);
    const tID = getTourId(e.channel.type, e.channel_id);
    if (props.filters.templateId === tID) {
      setChannelFn(channels =>
        channels.filter(channel => channel.cid !== e.channel.cid),
      );
      delete client.activeChannels[e.channel.cid];
      disPatchContext.forceUpdateActiveChannel(e.channel.cid);
    }
  };

  const onChannelHidden = (setChannelFn, e) => {
    console.log('onChannelHidden', e);
    const tID = getTourId(e.channel.type, e.channel_id);
    if (props.filters.templateId === tID) {
      setChannelFn(channels =>
        channels.filter(channel => channel.cid !== e.channel.cid),
      );
    }
    delete client.activeChannels[e.channel.cid];
    disPatchContext.forceUpdateActiveChannel(e.channel.cid);
  };

  // const onChannelVisible = async (setChannelFn, e) => {
  //   console.log('onChannelVisible', e);
  //   const channel = await getChannel(client, e.channel.type, e.channel.cid);
  //   // move channel to starting position
  //   if (props.filters.templateId === channel.data.templateId) {
  //     setChannelFn(channels => {
  //       const newChannels = _.uniqBy([...channels, channel]).sort((a, b) => {
  //         const acompare = a ? a.cid : '';
  //         const bcompare = b ? b.cid : '';
  //         return acompare.localeCompare(bcompare);
  //       });
  //       return newChannels;
  //     });
  //   }
  // };

  const onMessageNew = async (setChannelFn, e) => {
    const channel = await getChannel(client, e.channel.type, e.channel.id);
    // move channel to starting position
    setChannelFn(channels => _.uniqBy([channel, ...channels], 'cid'));
  };

  const onResize = parentWidth => {
    setDimensions({ width: parentWidth });
    disPatchContext.setTourChannelDimension({ w: parentWidth });
  };

  const renderChannelList = () => {
    if (isMobile) {
      return (
        <Slide
          direction="right"
          in={messagerState.tourChannelSlide}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.slideContainer}>
            <ChannelList
              EmptyStateIndicator={EmptyStateIndicator}
              LoadingErrorIndicator={ChatDown}
              List={ChannelListTeam}
              Preview={ChannelListPreview}
              filters={props.filters}
              sort={props.mobileSort}
              setActiveChannelOnMount={false}
              onAddedToChannel={onAddedToChannel}
              onRemovedFromChannel={onRemovedFromChannel}
              onChannelDeleted={onChannelDeleted}
              onChannelHidden={onChannelHidden}
              onMessageNew={onMessageNew}
              Paginator={InfiniteScrollPaginator}
            />
          </div>
        </Slide>
      );
    }
    return (
      <ChannelList
        EmptyStateIndicator={EmptyStateIndicator}
        LoadingErrorIndicator={ChatDown}
        List={ChannelListTeam}
        Preview={ChannelListPreview}
        filters={props.filters}
        sort={props.sort}
        lockChannelOrder
        setActiveChannelOnMount={false}
        onAddedToChannel={onAddedToChannel}
        onRemovedFromChannel={onRemovedFromChannel}
        onChannelDeleted={onChannelDeleted}
        onChannelHidden={onChannelHidden}
        onMessageNew={onMessageNew}
        Paginator={InfiniteScrollPaginator}
      />
    );
  };

  const mobileView = () => {
    const height = 46;
    return (
      <>
        {renderChannelList()}
        <Channel>
          <Window
            innerStyle={{
              height: props.height - height,
              borderRight: '1px solid rgba(220,220,220,0.5)',
              borderBottom: '1px solid rgba(220,220,220,0.5)',
            }}
          >
            <ChannelHeader />
            <MessageList
              HeaderComponent={MessageHeaderComponent}
              Message={MessageTeam}
            />
            <MessageInput Input={input} focus />
          </Window>
          <Thread
            ThreadStyle={{
              height: props.height,
            }}
          />
          <ChannelDetail width={dimensions.width} />
        </Channel>
      </>
    );
  };

  const wideView = () => {
    const height = 47;
    return (
      <React.Fragment>
        {renderChannelList()}
        <Channel>
          <Window
            innerStyle={{
              height: props.height - height,
              borderRight: '1px solid rgba(220,220,220,0.5)',
              borderBottom: '1px solid rgba(220,220,220,0.5)',
            }}
          >
            <ChannelHeader />
            <MessageList
              HeaderComponent={MessageHeaderComponent}
              Message={MessageTeam}
            />
            <MessageInput Input={input} focus />
          </Window>
          <div style={{ height: props.height - height }}>
            <Thread />
          </div>
          <ChannelDetail width={dimensions.width} />
        </Channel>
      </React.Fragment>
    );
  };

  let returnedLayout;
  if (isMobile) {
    returnedLayout = mobileView();
  } else {
    returnedLayout = wideView();
  }
  if (props.filters && props.filters.type !== ChatTypes.UGroop) {
    return null;
  }
  return (
    <Chat client={client} theme="team light" data-testid="Chat">
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      {returnedLayout}
    </Chat>
  );
}

Messenger.propTypes = {
  filters: PropTypes.object, // eslint-disable-line
  sort: PropTypes.object, // eslint-disable-line
  mobileSort: PropTypes.object, // eslint-disable-line
  height: PropTypes.number,
};

export default React.memo(Messenger);
