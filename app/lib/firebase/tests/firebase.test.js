/* eslint-disable global-require */
import FireBase from '../firebase';
jest.mock('lib/firebase/firebaseLibWrapper', () => {
  const { firebaseMockData } = require('./fireLibMockData');
  return {
    firebase: firebaseMockData,
  };
});

describe('FireBase', () => {
  const fireBase = new FireBase();
  it('requestFCMPermission', async () => {
    const fn = jest.fn();
    await fireBase.requestFCMPermission(fn);
  });
  it('foregroundMessage', async () => {
    const fn = jest.fn();
    await fireBase.foregroundMessage(fn);
  });
  it('unsubscribeNotificationLiveUpdate', async () => {
    const mock = jest.fn();
    fireBase.unsubscribeNotification = mock;
    await fireBase.unsubscribeNotificationLiveUpdate();
    expect(mock).toHaveBeenCalled();
  });
  it('callUnsubscribeOnMessage', async () => {
    const fn = jest.fn();
    fireBase.unsubscribeOnMessage = fn;
    await fireBase.callUnsubscribeOnMessage();
  });
  it('listenTourChange', async () => {
    const fn = jest.fn();
    const doc = {
      docChanges: () => [{ type: 'added', doc: { data: () => 'abcd' } }],
    };
    await fireBase.listenTourChange(fn)(doc);
  });
  it('listenNotificationChange', async () => {
    const fn = jest.fn();
    const doc = {
      docChanges: () => [{ type: 'added', doc: { data: () => 'abcd' } }],
    };
    await fireBase.listenNotificationChange(fn)(doc);
  });
  it('subscribeNotificationChanges', async () => {
    const fn = jest.fn();
    fireBase.listenNotificationChange = fn;
    await fireBase.subscribeNotificationChanges(1, fn);
    expect(fn).toHaveBeenCalled();
  });
  it('subscribeTourLiveUpdate', async () => {
    const fn = jest.fn();
    fireBase.listenTourChange = fn;
    await fireBase.subscribeTourLiveUpdate(1, 1, fn);
    expect(fn).toHaveBeenCalled();
  });
  it('unsubscribeTourLiveUpdate', async () => {
    const mock = jest.fn();
    fireBase.unsubscribeTour = { 1: mock };
    await fireBase.unsubscribeTourLiveUpdate(1);
    expect(mock).toHaveBeenCalled();
  });
  it('queryAirports', async () => {
    const data = await fireBase.queryAirports('ab');
    expect(data).toEqual([['abcd'], ['abcd'], ['abcd']]);
  });
  it('endCode', async () => {
    const res = await fireBase.endCode('ab');
    expect(res).toBe('ac');
  });
});
