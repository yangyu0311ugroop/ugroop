// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { getItemLocalStorage } from '../persistlayer';

export const AwsLib = () => {
  const env = `${process.env.NODE_ENV}`;
  if (env === 'test') {
    return {};
  }
  // eslint-disable-next-line global-require
  const { Auth } = require('@aws-amplify/auth');
  return {
    Auth,
  };
};

export const getTokenIfNotExpired = () => {
  const clientId = `${process.env.USER_POOL_WEB_CLIENTID}`;
  const Prefix = 'CognitoIdentityServiceProvider';
  const lastUser = getItemLocalStorage(`${Prefix}.${clientId}.LastAuthUser`);
  const token = getItemLocalStorage(
    `${Prefix}.${clientId}.${lastUser}.idToken`,
  );
  if (token) {
    const decoded = jwt_decode(token);
    const currentSeconds = moment().format('X');
    if (decoded.exp - 5 * 60 > currentSeconds) {
      return token;
    }
  }
  return null;
};

const Lib = AwsLib();
export default Lib;
