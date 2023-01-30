import { NOTIFICATION_NORMALISERS } from '../normalisers';
import { DATASTORE_UTILS } from '../../../../datastore';
const testData = {
  ugroopNotifications: [
    {
      content: 'made changes on Day Depart Sydney and fly into Milan Italy.',
      senderId: 99,
      type: 'templateNotification',
      nodeId: 3840,
      method: 'Node.updateNode',
      url: '/tours/3840?tab=0',
      id: 563,
      userId: 4,
      status: null,
      token: 'uKb8q5TFC2KnR6XgDAIZ3oWgzwsZp4pc',
      notificationStatus: null,
      createdAt: '2019-03-20T05:41:24.601Z',
    },
  ],
  nodes: [
    {
      content: 'Western China – Cultural Highlights',
      type: 'template',
      id: 3840,
    },
  ],
  orgs: [
    {
      content: 'Western China – Cultural Highlights',
      type: 'template',
      id: 3840,
    },
  ],
};
describe('NOTIFICATION_NORMALISERS', () => {
  it('addNotifications', () => {
    DATASTORE_UTILS.upsertObject = jest.fn().mockImplementation(o => o);
    const data = NOTIFICATION_NORMALISERS.addNotifications(testData);
    expect(data.organisations).toEqual({
      3840: {
        content: 'Western China – Cultural Highlights',
        type: 'template',
        id: 3840,
      },
    });
    expect(data.ugroopNotifications).toEqual({
      563: {
        content: 'made changes on Day Depart Sydney and fly into Milan Italy.',
        senderId: 99,
        type: 'templateNotification',
        nodeId: 3840,
        method: 'Node.updateNode',
        url: '/tours/3840?tab=0',
        id: 563,
        userId: 4,
        status: null,
        token: 'uKb8q5TFC2KnR6XgDAIZ3oWgzwsZp4pc',
        notificationStatus: null,
        createdAt: '2019-03-20T05:41:24.601Z',
      },
    });
    expect(data.nodes).toEqual({
      3840: {
        content: 'Western China – Cultural Highlights',
        type: 'template',
        id: 3840,
      },
    });
  });
});
