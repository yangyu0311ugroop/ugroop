import { localSave } from '../../persistlayer';
import { getTokenIfNotExpired } from '../awsLib';

jest.mock('jwt-decode', () =>
  jest.fn(() => ({
    exp: 11,
  })),
);

test('getTokenIfNotExpired', () => {
  process.env.USER_POOL_WEB_CLIENTID = '1rpul45pa4c04e2t8hpqso18e9';
  localSave(
    'CognitoIdentityServiceProvider.1rpul45pa4c04e2t8hpqso18e9.LastAuthUser',
    1,
  );
  localSave(
    'CognitoIdentityServiceProvider.1rpul45pa4c04e2t8hpqso18e9.1.idToken',
    'a',
  );
  const token = getTokenIfNotExpired();
  expect(JSON.parse(token)).toBe(null);
});
