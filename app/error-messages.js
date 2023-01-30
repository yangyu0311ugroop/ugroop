import React from 'react';
import { defineMessages, FormattedMessage as M } from 'react-intl';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import get from 'lodash/get';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';

export const HTTP_ERROR_MESSAGES_TEXT = {
  HTTP_401: 'You are not authorized to do this action.',
  GENERAL_ERROR: 'uGroop has encountered an unknown error, please try again.',
};

export const HTTP_ERROR_MESSAGES_INTL = defineMessages({
  HTTP_401: {
    id: 'app.error_messages.HTTP_401',
    defaultMessage: HTTP_ERROR_MESSAGES_TEXT.HTTP_401,
  },
  GENERAL_ERROR: {
    id: 'app.error_messages.GENERAL_ERROR',
    defaultMessage: HTTP_ERROR_MESSAGES_TEXT.GENERAL_ERROR,
  },
});

export const SHOW_ERROR_IN_SNACKBAR = resaga => err => {
  switch (err.status) {
    case HTTP_STATUS_CODE.STATUS_UNAUTHORIZED: {
      return SnackbarHelper.openErrorSnackbar(
        <M {...HTTP_ERROR_MESSAGES_INTL.HTTP_401} />,
        resaga,
      );
    }

    case HTTP_STATUS_CODE.STATUS_BAD_REQUEST: {
      const message = get(err, 'response.error.message', null);
      return SnackbarHelper.openErrorSnackbar(
        message || <M {...HTTP_ERROR_MESSAGES_INTL.GENERAL_ERROR} />,
        resaga,
      );
    }

    default: {
      return SnackbarHelper.openErrorSnackbar(
        <M {...HTTP_ERROR_MESSAGES_INTL.GENERAL_ERROR} />,
        resaga,
      );
    }
  }
};

export const SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR = resaga => err => {
  switch (err.status) {
    case HTTP_STATUS_CODE.STATUS_UNPROCESSABLE_ENTITY: {
      const details = get(err, 'response.error.details', null);
      const message = get(err, 'response.error.message', null);
      return details !== 'existed_invitation'
        ? SnackbarHelper.openErrorSnackbar(
            message || <M {...HTTP_ERROR_MESSAGES_INTL.GENERAL_ERROR} />,
            resaga,
          )
        : null;
    }

    default: {
      return SnackbarHelper.openErrorSnackbar(
        <M {...HTTP_ERROR_MESSAGES_INTL.GENERAL_ERROR} />,
        resaga,
      );
    }
  }
};

export const wrapRequestWithErrorHandler = (requests, resaga) => {
  const tempRequests = requests;
  return Object.keys(tempRequests).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        onError: SHOW_ERROR_IN_SNACKBAR(resaga),
        ...tempRequests[key],
      },
    }),
    {},
  );
};
