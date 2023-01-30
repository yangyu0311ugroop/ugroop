import {
  STREAM_CHAT_STORE_IMMER,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from 'appConstants';
import createCachedSelector from 're-reselect';
import dotProp from 'dot-prop';
import { createSelector } from 'reselect';
const selectTourChatsCount = (state, props) =>
  dotProp.get(state.get(STREAM_CHAT_STORE_IMMER), `tours.${props.id}.count`);

const selectStreamChatStore = () => state => state.get(STREAM_CHAT_STORE_IMMER);

const selectUserNodes = (state, props) =>
  dotProp.get(
    state.get(STREAM_CHAT_STORE_IMMER),
    `tours.${props.id}.userNodes`,
  );

export const selectChannelDetailOpenStatus = state => {
  const streamStore = state.get(STREAM_CHAT_STORE_IMMER);
  return streamStore && streamStore.openChannelDetail;
};
const selectAddedChannel = (state, props) =>
  dotProp.get(
    state.get(STREAM_CHAT_STORE_IMMER),
    `tours.${props.templateId}.addedChannel`,
  );

const selectStreamChat = state => state.get(STREAM_CHAT_STORE_IMMER);
const selectTemplateId = state =>
  state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id');
export const selectStreamChatTours = (state, props) =>
  dotProp.get(
    state.get(STREAM_CHAT_STORE_IMMER),
    `tours.${props.id}.${props.attribute}`,
  );

export const makeSelectTourChatsCount = createCachedSelector(
  [selectTourChatsCount],
  result => result,
)((state, props) => `selectTourChatsCount${props.id}`);

export const makeSelectAddedChannel = createCachedSelector(
  [selectAddedChannel],
  result => result,
)((state, props) => `selectAddedChannel${props.templateId}`);

export const makeSelectArchivedChannels = createCachedSelector(
  [selectStreamChat, selectTemplateId],
  (state, id) => dotProp.get(state, `tours.${id}.archivedChannel`),
)(state => {
  const templateId = state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id');
  return `selectInvitedChannel${templateId}`;
});

export const makeSelectNewChannel = createCachedSelector(
  [selectStreamChat, selectTemplateId],
  (state, id) => dotProp.get(state, `tours.${id}.newChannel`),
)(state => {
  const templateId = state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id');
  return `SelectNewChannel${templateId}`;
});

export const makeSelectChannelDrawActiveChannel = createCachedSelector(
  [selectStreamChat, selectTemplateId],
  (state, id) => dotProp.get(state, `tours.${id}.channelDrawActiveChannel`),
)(state => {
  const templateId = state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id');
  return `channelDrawActiveChannel${templateId}`;
});

export const makeSelectResetActiveChannelId = createCachedSelector(
  [selectStreamChat, selectTemplateId],
  (state, id) => dotProp.get(state, `tours.${id}.resetActiveChannel`),
)(state => {
  const templateId = state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id');
  return `makeSelectResetActiveChannelId${templateId}`;
});

export const makeSelectUserNodes = createCachedSelector(
  [selectUserNodes],
  result => result,
)((state, props) => `makeSelectUserNodes.${props.id}`);

export const makeSelectChannelDraw = () =>
  createSelector(
    selectStreamChatStore(),
    streamChat => streamChat && streamChat.channelDraw,
  );
