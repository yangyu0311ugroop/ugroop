import { fromJS } from 'immutable';
export const types = {
  STREAM_EVENT: 'REALTIME/STREAM_EVENT',
  STREAM_CANCEL: 'REALTIME/STREAM_CANCEL',
  STREAM_ERROR: 'REALTIME/STREAM_ERROR',
};

export const categories = {
  FEEDBACK: 'feedbacks',
  COMMENT: 'comments',
  NOTIFICATION: 'notifications',
};

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STREAM_EVENT: {
      const { change } = action;
      return state.set(change.get('category'), change);
    }

    default:
      return state;
  }
};

export const actions = {
  streamEvent: change => ({ type: types.STREAM_EVENT, change }),
  streamCancel: () => ({ type: types.STREAM_CANCEL }),
  streamError: error => ({ type: types.STREAM_ERROR, error }),
};
