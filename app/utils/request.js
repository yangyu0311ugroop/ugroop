import 'whatwg-fetch';
import AwsLib, { getTokenIfNotExpired } from 'lib/awsLib';
import { analyse, analyseUpload } from 'utils/helpers/request';
import _ from 'lodash';
import { REFRESH_TOKEN_ERROR } from 'appConstants';
import axios from 'axios';
import { HTTP_STATUS_CODE } from './http-constant';
import { responseErrorType as ret } from './constant';

export const fetchUpload = (container, data) =>
  fetchWithAuthorisationUpload(
    'POST',
    `/FileContainers/${container}/upload`,
    data,
  );

export const fetchImage = (verb, url) => {
  const fullURL = `${process.env.COORDINATE_BASE_URL}${url}`;
  const options = {
    method: 'GET',
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Access-Control-Allow-Origin': '*',
    },
  };
  return fetch(fullURL, options)
    .then(response => ({
      blob: response.blob(),
      size: {
        width: response.headers.get('ImageWidth'),
        height: response.headers.get('ImageHeight'),
      },
    }))
    .then(
      data =>
        new Promise(resolve => {
          resolve(data);
        }),
    );
};

const makeFetch = (fullURL, options) =>
  fetch(fullURL, options)
    .then(checkStatus())
    .then(parseJSON)
    .catch(errorHandler);

const axiosUpload = (fullURL, { body, ...options } = {}, uploadOptions) =>
  axios
    .post(fullURL, body, {
      ...options,
      ...uploadOptions,
    })
    .then(checkStatus())
    .then(response => response.data)
    .catch(errorHandler);

export const appendToken = (url, token) => {
  const requestURL = new URL(url);
  const params = { access_token: token };
  Object.keys(params).forEach(key =>
    requestURL.searchParams.append(key, params[key]),
  );
  return requestURL;
};

/**
 * fetch Account Service with Authorisation Header
 * @param verb      request method
 * @param url       endpoint
 * @param body      content, optional
 * @returns {Promise|Promise.<any>|*|Request}
 */

export function fetchWithAuthorisation(verb, url, body) {
  const { fullURL, options } = analyse(verb, url, body);
  const token = getTokenIfNotExpired();
  if (token) {
    const requestURL = appendToken(fullURL, token);
    return makeFetch(requestURL, options).catch(sessionErrorHandler);
  }
  return AwsLib.Auth.currentSession()
    .then(session => {
      const requestURL = appendToken(fullURL, session.idToken.jwtToken);
      return makeFetch(requestURL, options);
    })
    .catch(sessionErrorHandler);
}

export function fetchWithAuthorisationUpload(
  verb,
  url,
  { data, uploadOptions } = {},
) {
  const { fullURL, options } = analyseUpload(verb, url, data);
  const token = getTokenIfNotExpired();
  if (token) {
    const requestURL = appendToken(fullURL, token);
    return axiosUpload(requestURL, options, uploadOptions).catch(
      sessionErrorHandler,
    );
  }
  return AwsLib.Auth.currentSession()
    .then(session => {
      const requestURL = appendToken(fullURL, session.idToken.jwtToken);
      return axiosUpload(requestURL, options);
    })
    .catch(sessionErrorHandler);
}

/**
 * fetch with URL passed in
 * @param verb      request method
 * @param url       endpoint
 * @param body      content, optional
 * @returns {Promise|Promise.<any>|*|Request}
 */
export function fetchWithURL(verb, url, body) {
  const { fullURL, options } = analyse(verb, url, body);
  return fetch(fullURL, options)
    .then(checkStatus())
    .then(parseJSON)
    .catch(errorHandler);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */
export function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Check Status now take the original Error object,
 * If original error object exists and response is success, it will rethrow as internal error.
 * @param err
 * @returns {function(*)}
 */
export const checkStatus = err => response => {
  if (response.status >= 200 && response.status < 300) {
    if (err) {
      // directly pass the service error to user.
      const internalError = new Error('internal error');
      internalError.response = err;
      internalError.statusCode = HTTP_STATUS_CODE.STATUS_SERVER_ERROR;
      throw internalError;
    }
    return response;
  }

  let promise = null;
  let code = null;

  const contentType = response.headers.get('Content-Type');
  // Possible value for `contentType` would be "application/json; charset=utf-8", etc.
  if (contentType.startsWith('application/json')) {
    promise = response.json();
    code = ret.JSON_ERROR;
  } else if (contentType.startsWith('text/html')) {
    promise = response.text(); // No such thing as `response.html()`
    code = ret.HTML_ERROR;
  } else if (contentType.startsWith('text/')) {
    promise = response.text();
    code = ret.TEXT_ERROR;
  } else {
    promise = Promise.resolve(response);
    code = ret.RAW_ERROR;
  }

  return promise
    .then(errResult => {
      const error = new Error(response.status);
      error.code = code;
      error.status = response.status;

      switch (code) {
        case ret.JSON_ERROR: {
          error.response = errResult;
          break;
        }

        case ret.HTML_ERROR: {
          // Get the title, if any
          let title = '';
          const titleRegex = /<title>(.*?)<\/title>/i;
          const match = errResult.match(titleRegex);
          if (match && match.length > 1) {
            // eslint-disable-next-line prefer-destructuring
            title = match[1];
          }
          error.response = { title, content: errResult };
          break;
        }

        case ret.TEXT_ERROR: {
          error.response = { text: errResult };
          break;
        }

        default: {
          error.response = errResult;
          break;
        }
      }

      throw error;
    })
    .catch(error => {
      // only due to the response is not a known format, then throw the original error
      if (
        [
          ret.JSON_ERROR,
          ret.HTML_ERROR,
          ret.TEXT_ERROR,
          ret.RAW_ERROR,
        ].includes(error.code)
      ) {
        throw error;
      }

      const otherError = new Error(response.statusText);
      otherError.response = response;
      throw otherError;
    });
};

export const errorHandler = error => {
  throw error;
};

export const sessionErrorHandler = error => {
  if (
    error &&
    (error === 'No current user' ||
      error.message === 'Cannot retrieve a new session. Please authenticate.' ||
      error.message === 'Refresh Token has expired')
  ) {
    // these hard code message all came from Cognito
    const err = new Error();
    err.statusCode = 400;
    err.error = REFRESH_TOKEN_ERROR;
    throw err;
  }
  throw error;
};

/**
 * Check two different format error code, one from our own Loopback response
 * one from Stormpath Response
 * @param obj
 * @returns {*}
 */

export function checkStatusCode(obj) {
  return (
    _.get(obj, 'response.error.statusCode') || _.get(obj, 'response.status')
  );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus())
    .then(parseJSON)
    .catch(errorHandler);
}

export function postJSONRequest(url, { body, credentials } = {}) {
  const postHeaders = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const bodyContent = {
    body: JSON.stringify(body),
  };
  const opts = Object.assign({}, postHeaders, credentials, bodyContent);
  return fetch(url, opts)
    .then(checkStatus())
    .then(parseJSON)
    .catch(errorHandler);
}

export function callOnce(func, state) {
  if (state.getCurrentState() === 0) {
    func();
    state.setToLimit();
  }
}

// for testing purpose, so we will be able to mock the 2 fetch functions
export const requests = {
  fetchWithURL,
  fetchWithAuthorisation,
  fetchWithAuthorisationUpload,
  fetchUpload,
  postJSONRequest,
};
