import { AwsLib, getTokenIfNotExpired } from '../awsLib';
import { localSave } from '../../persistlayer';
jest.mock('jwt-decode', () =>
  jest.fn(() => ({
    exp: 11111111111111111111,
  })),
);

describe('lib/awsLib', () => {
  const NODE_ENV = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = NODE_ENV;
  });

  test('returns empty object if env=test', () => {
    process.env.NODE_ENV = 'test';
    expect(AwsLib()).toEqual({});
  });

  test('uses aws-amplify if env!=test', () => {
    jest.mock('@aws-amplify/auth', () => ({
      Auth: 'Auth',
    }));
    process.env.NODE_ENV = 'not_test';
    expect(AwsLib()).toEqual({
      Auth: 'Auth',
    });
  });
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
    expect(JSON.parse(token)).toBe('a');
  });
});
