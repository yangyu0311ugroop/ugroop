import { NOTIFICATION_STORE_SELECTORS } from '../selectors';
import { NOTIFICATION_DATASTORE } from '../../../appConstants';

describe('NOTIFICATION_STORE_SELECTORS', () => {
  it('senderID selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.senderId({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'senderId']);
  });
  it('createdAt selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.createdAt({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'createdAt']);
  });
  it('previousCreatedAt selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.previousCreatedAt({
      previousId: 1,
    });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'createdAt']);
  });
  it('method selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.method({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'method']);
  });
  it('nodeId selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.nodeId({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'nodeId']);
  });
  it('status selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.status({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'status']);
  });
  it('notifStatus selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.notifStatus({ id: 1 });
    expect(path).toEqual([
      NOTIFICATION_DATASTORE,
      'ugroop',
      1,
      'notificationStatus',
    ]);
  });
  it('orgId selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.orgId({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'orgId']);
  });
  it('url selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.url({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'url']);
  });
  it('content selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.content({ id: 1 });
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'content']);
  });
  it('notificationStatus selector', () => {
    const path = NOTIFICATION_STORE_SELECTORS.notificationStatus(1);
    expect(path).toEqual([NOTIFICATION_DATASTORE, 'ugroop', 1, 'status']);
  });
  it('totalCountUnRead selector', () => {
    const keypath = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.keyPath({
      ids: [1, 2],
    });
    expect(keypath).toEqual([
      [NOTIFICATION_DATASTORE, 'ugroop', 1, 'status'],
      [NOTIFICATION_DATASTORE, 'ugroop', 2, 'status'],
    ]);
  });
  it('totalCountUnread selector getter', () => {
    let getter = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.getter(
      ...[null, 'read', 'read', [1, 2]],
    );
    expect(getter).toEqual(1);
    getter = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.getter(
      ...[null, 'read', [1]],
    );
    expect(getter).toEqual(1);
    getter = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.getter(
      ...['read', null, [1]],
    );
    expect(getter).toEqual(1);
    getter = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.getter(
      ...[null, []],
    );
    expect(getter).toEqual(0);
    getter = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.getter(...[]);
    expect(getter).toEqual(0);
  });
  it('cachekey', () => {
    let cachekey = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.cacheKey({
      ids: [1, 2],
    });
    expect(cachekey).toEqual('notifications.1,2.totalCountUnRead');
    cachekey = NOTIFICATION_STORE_SELECTORS.totalCountUnRead.cacheKey({
      ids: [],
    });
    expect(cachekey).toEqual('notifications.empty.totalCountUnRead');
  });
});
