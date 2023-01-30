import React, { useEffect, useContext } from 'react';
import { ChatContext } from '@ugr00p/stream-chat-react';

const EmptyStateIndicator = () => {
  const { setActiveChannel } = useContext(ChatContext);
  useEffect(() => {
    setActiveChannel(null);
  }, []);
  return <p>You have no chat groups currently</p>;
};

EmptyStateIndicator.propTypes = {};

export default EmptyStateIndicator;
