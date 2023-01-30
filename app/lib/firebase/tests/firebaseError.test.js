import FireBase from '../firebase';
jest.mock('lib/firebase/firebaseLibWrapper', () => ({
  firebase: {
    initializeApp: jest.fn(),
    messaging: jest.fn().mockReturnValue({
      requestPermission: jest.fn().mockRejectedValue(new Error('abcd')),
      getToken: jest.fn().mockReturnValue(Promise.resolve('abcd')),
      onMessage: jest.fn(),
    }),
  },
}));

describe('FireBase', () => {
  const fireBase = new FireBase();
  it('requestFCMPermission when Error occur', async () => {
    const fn = jest.fn();
    await fireBase.requestFCMPermission(fn);
  });
});
