import { USER_API_HELPERS } from '../helpers';

describe('apis/User/helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const resaga = {
    dispatchTo: jest.fn(),
  };

  it('fetchMe', () => {
    USER_API_HELPERS.fetchMe(
      {
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('fetchUserPreference', () => {
    USER_API_HELPERS.fetchUserPreference(
      {
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('signOut', () => {
    USER_API_HELPERS.signOut(
      {
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('unregisterDevice', () => {
    USER_API_HELPERS.unregisterDevice(1, 'myToken', { resaga });
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('updateUserPreference', () => {
    USER_API_HELPERS.updateUserPreference(
      resaga,
      'SomePath',
      'some value',
      1,
    )();
    expect(resaga.dispatchTo).toBeCalled();
  });
  it('fetchPersonalPreference', () => {
    USER_API_HELPERS.fetchPersonalPreference(
      {
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo).toBeCalled();
  });
});
