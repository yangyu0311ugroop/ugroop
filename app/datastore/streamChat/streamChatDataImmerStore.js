import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { STREAM_CHAT_STORE_IMMER } from '../../appConstants';
import streamChatReducer from './reducer';

function StreamChatDataImmerStore() {
  useInjectReducer({
    key: STREAM_CHAT_STORE_IMMER,
    reducer: streamChatReducer,
  });
  return <React.Fragment />;
}

export default StreamChatDataImmerStore;
