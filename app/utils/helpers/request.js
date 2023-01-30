/**
 * Created by quando on 16/5/17.
 */
import urljoin from 'url-join';
import { isEmptyString } from '../stringAdditions';
/**
 * generate header
 * @param verb
 * @return object
 */
export function getHeaders(verb) {
  const method = verb.toUpperCase();
  return {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
}

/**
 * generate header for uploading
 * @param verb
 * @return object
 */
export function getHeadersUpload(verb) {
  const method = verb.toUpperCase();
  return {
    method,
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}
/**
 * generate body
 * @param verb
 * @param body
 * @returns {{body: {}}}
 */
export function getBody(verb, body) {
  const method = verb.toUpperCase();
  return method === 'GET' ? {} : { body: JSON.stringify(body) };
}

/**
 * generate body for uploading
 * @param verb
 * @param body
 * @returns {{body: {}}}
 */
export function getBodyUpload(verb, body) {
  const method = verb.toUpperCase();
  return method === 'GET' ? {} : { body };
}

/**
 * generate fetch parameters
 * @param verb
 * @param url
 * @param body
 * @returns {{fullURL: string, options: *}}
 */
export function analyse(verb, url, body = {}) {
  const fullURL =
    url.indexOf('graphql') > -1 ? url : `${process.env.ACCOUNT_BASE_URL}${url}`;
  const headers = getHeaders(verb);
  const bodyContent = getBody(verb, body);
  const options = Object.assign(headers, bodyContent);
  return { fullURL, options };
}

/**
 * generate fetch parameters for Upload
 * @param verb
 * @param url
 * @param body
 * @returns {{fullURL: string, options: *}}
 */
export function analyseUpload(verb, url, body = {}) {
  const fullURL = `${process.env.ACCOUNT_BASE_URL}${url}`;
  const headers = getHeadersUpload(verb);
  const bodyContent = getBodyUpload(verb, body);
  const options = Object.assign(headers, bodyContent);
  return { fullURL, options };
}

/**
 * Checks if a scheme prefix such as 'https:' is present in the URL
 * @param url
 * @returns {boolean}
 */
export const hasScheme = url => /^[a-zA-Z]+:/.test(url);

/**
 * generate url with BaseURL padded
 * @param url
 * @returns {url}
 */
export const padFacadeURL = url => {
  if (!hasScheme(url)) {
    const COORDINATE_BASE_URL = (process.env.COORDINATE_BASE_URL || '').trim();

    if (url && !url.startsWith(COORDINATE_BASE_URL)) {
      return urljoin(COORDINATE_BASE_URL, url.trim());
    }
  }

  return url;
};

const isNumber = x => typeof x === 'number';

export const postMetaInfo = cropMetaInfo => {
  if (!cropMetaInfo) {
    return '';
  }

  const { x, y, width, height } = cropMetaInfo;

  if (isNumber(x) && isNumber(y) && isNumber(width) && isNumber(height)) {
    return `h=${height}&w=${width}&x=${x}&y=${y}`;
  }

  return '';
};

export const queryImageURL = (
  imgSrc = '',
  facadeURLPrefix,
  resizeSize,
  cropMetaInfo,
  resizeSide = 'width',
  rotate = 0,
) => {
  let newURL = imgSrc;

  if (facadeURLPrefix) {
    newURL = padFacadeURL(imgSrc);
  }

  const qry = [];

  if (!isEmptyString(cropMetaInfo)) {
    qry.push(cropMetaInfo);
  }

  if (isNumber(resizeSize) && resizeSize !== 0) {
    let side = resizeSide || 'width';

    if (!['width', 'height'].includes(side)) {
      side = 'width';
    }

    qry.push(`${side}=${resizeSize}`);
  }

  if (isNumber(rotate) && rotate !== 0) {
    qry.push(`rotate=${rotate}`);
  }

  if (qry.length > 0) {
    // Check if the URL already has an existing query string.
    // If yes, then append the new query string to the URL using '&'.
    // Else, append it using '?'.

    let qsDelimiter = '?';

    if (newURL.indexOf('?') !== -1) {
      qsDelimiter = '&';
    }

    newURL = newURL.concat(`${qsDelimiter}${qry.join('&')}`);
  }

  return newURL;
};

export const trimContainerScheme = (url, container) =>
  !url ? '' : url.replace(`FileContainers/${container}/download/`, '');

export const horizontalSide = rotate =>
  rotate === 90 || rotate === 270 ? 'height' : 'width';
