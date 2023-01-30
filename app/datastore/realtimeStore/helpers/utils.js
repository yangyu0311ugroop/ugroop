import { fromJS } from 'immutable';
import { eventChannel, buffers } from 'redux-saga';

export const makeChangeStreamEventSource = userAccount => {
  const changeStreamUrl = '/deltas/change-stream';
  const options = `options={"where":{"or":[{"userId":"${userAccount.id}"}]}}`;
  const url = `${process.env.ACCOUNT_BASE_URL}${changeStreamUrl}?${options}`;

  return new EventSource(url);
};

export const makeChangeStreamChannel = (eventSource, initialBufferSize) =>
  eventChannel(
    emitter => changeStreamChannelHandler(emitter, eventSource),
    buffers.expanding(initialBufferSize),
  );

export const changeStreamChannelHandler = (emitter, eventSource) => {
  eventSource.addEventListener('data', emitter);

  return () => {
    eventSource.removeEventListener('data', emitter);
    eventSource.close();
  };
};

export const cleanupChangeStreamChannel = channel => {
  channel.close();
  return channel;
};

export const extractChange = changeStreamMessage => {
  const data = fromJS(JSON.parse(changeStreamMessage.data).data);
  return fromJS(JSON.parse(data.get('change')));
};
