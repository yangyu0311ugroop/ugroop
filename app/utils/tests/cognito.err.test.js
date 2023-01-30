import { AwsApi } from '../cognito';

jest.mock('lib/awsLib', () => ({
  Auth: {
    signIn: jest.fn().mockReturnValue(Promise.reject(new Error('oops'))),
    signOut: jest.fn().mockReturnValue(Promise.reject(new Error('oops'))),
    forgotPassword: jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('oops'))),
    forgotPasswordSubmit: jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('oops'))),
    resendSignUp: jest.fn().mockReturnValue(Promise.reject(new Error('oops'))),
    changePassword: jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('oops'))),
    currentAuthenticatedUser: jest
      .fn()
      .mockReturnValue(Promise.resolve({ user: 'avcd' })),
  },
}));
describe('cognito on error', () => {
  const err = new Error('oops');

  it('signIn', done => {
    AwsApi.signIn({ username: 'a', password: 'b' }).catch(e => {
      expect(e).toEqual(err);
      done();
    });
  });
  it('signOut', done => {
    AwsApi.signOut({ username: 'a', password: 'b' }).catch(e => {
      expect(e).toEqual(err);
      done();
    });
  });
  it('forgetPassword', done => {
    AwsApi.forgetPassword({ username: 'a' }).catch(e => {
      expect(e).toEqual(err);
      done();
    });
  });
  it('resetPassword', done => {
    AwsApi.resetPassword({ username: 'a', code: 'b', password: 'c' }).catch(
      e => {
        expect(e).toEqual(err);
        done();
      },
    );
  });
  it('resendSignUp', done => {
    AwsApi.resendSignUp({ username: 'a' }).catch(e => {
      expect(e).toEqual(err);
      done();
    });
  });
  it('changePassword', done => {
    AwsApi.changePassword({ username: 'a' }).catch(e => {
      expect(e).toEqual(err);
      done();
    });
  });
});
