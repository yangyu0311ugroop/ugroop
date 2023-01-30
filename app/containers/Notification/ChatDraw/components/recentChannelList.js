import React, { useContext } from 'react';
import {
  Chat,
  ChannelList,
  LoadMorePaginator,
} from '@ugr00p/stream-chat-react';
import PropTypes from 'prop-types';
import { StreamChatContext } from 'lib/streamChat';
import ChatDown from 'smartComponents/Messenger/components/ChatDown';
import EmptyStateIndicator from 'smartComponents/Messenger/components/ChannelList/emptyStateIndicator';
import ChannelListDraw from './channelList';
import ChannelListPreview from './channelListPreview';

export function RecentChannelList(props) {
  const client = useContext(StreamChatContext);
  return (
    <Chat client={client} theme="team light">
      <ChannelList
        List={ChannelListDraw}
        Preview={ChannelListPreview}
        LoadingErrorIndicator={ChatDown}
        filters={props.filters}
        sort={props.sort}
        Paginator={LoadMorePaginator}
        options={{ limit: 10 }}
        setActiveChannelOnMount={false}
        EmptyStateIndicator={EmptyStateIndicator}
      />
    </Chat>
  );
}

RecentChannelList.propTypes = {
  filters: PropTypes.object,
  sort: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node,
};

export default React.memo(RecentChannelList);
