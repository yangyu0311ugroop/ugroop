import {
  USER_API,
  ME,
  SIGN_OUT,
  UNREGISTER_DEVICE,
  GET_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE,
  GET_PERSONAL_PREFERENCES,
} from 'apis/constants';

const fetchMe = (obj, props) => {
  const { onSuccess, onError } = obj;
  const { resaga } = props;

  return resaga.dispatchTo(USER_API, ME, {
    onSuccess,
    onError,
  });
};
const fetchUserPreference = (obj, props, id) => {
  const { onSuccess, onError } = obj;
  const { resaga } = props;

  return resaga.dispatchTo(USER_API, GET_USER_PREFERENCE, {
    payload: { id },
    onSuccess,
    onError,
  });
};

const signOut = (obj, props) => {
  const { onSuccess, onError } = obj;
  const { resaga } = props;

  return resaga.dispatchTo(USER_API, SIGN_OUT, {
    onSuccess,
    onError,
  });
};

const unregisterDevice = (id, token, props) => {
  const { resaga } = props;
  return resaga.dispatchTo(USER_API, UNREGISTER_DEVICE, {
    payload: { id, data: { token } },
  });
};

const updateUserPreference = (
  props,
  key,
  value,
  id,
  onSuccess = null,
) => () => {
  props.dispatchTo(USER_API, UPDATE_USER_PREFERENCE, {
    payload: {
      id,
      data: {
        code: key,
        value,
      },
    },
    onSuccess,
  });
};

const fetchPersonalPreference = (obj, props, id) => {
  const { onSuccess, onError } = obj;
  const { resaga } = props;

  return resaga.dispatchTo(USER_API, GET_PERSONAL_PREFERENCES, {
    payload: { id },
    onSuccess,
    onError,
  });
};

export const USER_API_HELPERS = {
  fetchMe,
  signOut,
  unregisterDevice,
  fetchUserPreference,
  updateUserPreference,
  fetchPersonalPreference,
};
