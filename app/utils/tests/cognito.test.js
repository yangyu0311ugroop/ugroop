import { AwsApi } from '../cognito';
jest.mock('lib/awsLib', () => ({
  Auth: {
    signIn: jest.fn().mockReturnValue(Promise.resolve({ user: 'avcs' })),
    signOut: jest.fn().mockReturnValue(Promise.resolve({ signOut: 'avcs' })),
    forgotPassword: jest
      .fn()
      .mockReturnValue(Promise.resolve({ forgetPwd: 'avcs' })),
    forgotPasswordSubmit: jest
      .fn()
      .mockReturnValue(Promise.resolve({ resetPwd: 'avcs' })),
    resendSignUp: jest
      .fn()
      .mockReturnValue(Promise.resolve({ resendSignUp: true })),
    changePassword: jest
      .fn()
      .mockReturnValue(Promise.resolve({ changePassword: true })),
    currentAuthenticatedUser: jest
      .fn()
      .mockReturnValue(Promise.resolve({ user: 'avcd' })),
  },
}));
describe('cognito', () => {
  it('signIn', done => {
    AwsApi.signIn({ username: 'a', password: 'b' }).then(user => {
      expect(user).toEqual({ user: 'avcs' });
      done();
    });
  });
  it('signOut', done => {
    AwsApi.signOut({ username: 'a', password: 'b' }).then(user => {
      expect(user).toEqual({ signOut: 'avcs' });
      done();
    });
  });
  it('forgetPassword', done => {
    AwsApi.forgetPassword({ username: 'a' }).then(user => {
      expect(user).toEqual({ forgetPwd: 'avcs' });
      done();
    });
  });
  it('resetPassword', done => {
    AwsApi.resetPassword({ username: 'a', code: 'b', password: 'c' }).then(
      user => {
        expect(user).toEqual({ resetPwd: 'avcs' });
        done();
      },
    );
  });
  it('resendSignUp', done => {
    AwsApi.resendSignUp({ username: 'a' }).then(user => {
      expect(user).toEqual({ resendSignUp: true });
      done();
    });
  });
  it('changePassword', done => {
    AwsApi.changePassword({ oldPassword: 'a', newPassword: 'b' }).then(data => {
      expect(data).toEqual({ changePassword: true });
      done();
    });
  });
});
