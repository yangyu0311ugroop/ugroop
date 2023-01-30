import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'ugcomponents/Toast';
import toJSON from 'enzyme-to-json';
import { FireBaseComponent } from '../index';
import {
  REGISTER_DEVICE,
  USER_API,
  GET_ORGANISATION_INVITATIONS,
  GET_INVITATIONS,
  ORGANISATION_API,
  GET_ORG_MEMBERS,
  ABILITY_API,
  FIND_MY_ABILITIES,
} from '../../../apis/constants';
jest.mock('lib/firebase/firebaseLibWrapper', () => ({
  firebase: {
    initializeApp: jest.fn(),
    messaging: jest.fn().mockReturnValue({
      requestPermission: jest.fn().mockReturnValue(
        Promise.resolve({
          json: () => 'abcd',
        }),
      ),
      getToken: jest.fn().mockReturnValue(Promise.resolve('abcd')),
      onMessage: jest.fn(),
    }),
  },
}));

const makeNotification = () => ({
  notification: JSON.stringify({ type: 'avcd', ownedParentNodeId: 2233 }),
  clickUri: 'abcd',
});

describe('FireBaseComponent', () => {
  const resagaMock = {
    analyse: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  const fireBaseMock = {
    requestFCMPermission: jest.fn(),
    foregroundMessage: jest.fn(),
    subscribeNotificationChanges: jest.fn(),
    unsubscribeNotificationLiveUpdate: jest.fn(),
    callUnsubscribeOnMessage: jest.fn(),
    subscribeChatChanges: jest.fn(),
    unsubscribeChatLiveUpdate: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };
  const match = { params: { id: 1 } };
  let rendered;
  beforeEach(() => {
    rendered = shallow(
      <FireBaseComponent
        resaga={resagaMock}
        firebase={fireBaseMock}
        id={1}
        history={history}
        match={match}
      />,
    );
    jest.clearAllMocks();
  });
  it('componentDidMount', () => {
    rendered.instance().componentDidMount();
    expect(fireBaseMock.requestFCMPermission).toBeCalled();
    expect(fireBaseMock.foregroundMessage).toBeCalled();
    expect(fireBaseMock.subscribeNotificationChanges).toBeCalled();
  });
  it('shouldComponentUpdate', () => {
    const res = rendered.instance().shouldComponentUpdate();
    expect(res).toBe(false);
  });
  it('componentWillUnmount', () => {
    rendered.instance().componentWillUnmount();
    expect(fireBaseMock.unsubscribeNotificationLiveUpdate).toBeCalled();
    expect(fireBaseMock.callUnsubscribeOnMessage).toBeCalled();
  });
  it('localMessageCB', () => {
    toast.notify = jest.fn();
    rendered.instance().localMessageCB({
      data: { notification: '{ "body": "message"}', clickUri: 'abc' },
    });
    expect(toast.notify).toBeCalled();
  });
  it('localMessageCB not show if has comment', () => {
    toast.notify = jest.fn();
    rendered.instance().localMessageCB({
      data: { notification: '{ "body": "message"}', clickUri: 'comment' },
    });
    expect(toast.notify).not.toBeCalledWith('message');
  });
  it('registerDevice', () => {
    rendered.instance().registerDevice('token');
    expect(resagaMock.dispatchTo).toBeCalledWith(USER_API, REGISTER_DEVICE, {
      payload: { id: 1, data: { token: 'token' } },
    });
  });
  it('handleLiveUpdate', () => {
    rendered.instance().fetchLiveUpdateData = jest.fn();
    rendered
      .instance()
      .handleLiveUpdate({ notification: 'abcd', response: 'erfg' });
    expect(rendered.instance().fetchLiveUpdateData).toBeCalledWith(
      'abcd',
      'erfg',
    );
  });
  it('fetchLiveUpdateData', () => {
    rendered.instance().fetchLiveUpdateData({ type: 'orgInvitation' });
    expect(resagaMock.dispatchTo).toBeCalledWith(
      USER_API,
      GET_ORGANISATION_INVITATIONS,
      {},
    );
    rendered.instance().fetchLiveUpdateData({ type: 'tourInvitation' });
    expect(resagaMock.dispatchTo).toBeCalledWith(USER_API, GET_INVITATIONS, {
      payload: {
        status: 'pending',
        myUserId: 1,
      },
    });
    rendered
      .instance()
      .fetchLiveUpdateData({ type: 'acceptOrgInvitation', orgId: 1 });
    expect(resagaMock.dispatchTo).toBeCalledWith(
      ORGANISATION_API,
      GET_ORG_MEMBERS,
      {
        payload: {
          id: 1,
        },
      },
    );
    rendered.instance().fetchLiveUpdateData({ type: 'changeOrgRole' });
    expect(resagaMock.dispatchTo).toBeCalledWith(
      ORGANISATION_API,
      GET_ORG_MEMBERS,
      {
        payload: {
          id: 1,
        },
      },
    );
    rendered.instance().fetchLiveUpdateData({ type: 'changeTourRole' });
    expect(resagaMock.dispatchTo).toBeCalledWith(
      ABILITY_API,
      FIND_MY_ABILITIES,
      {},
    );
    rendered.instance().fetchLiveUpdateData({
      type: 'tourTransfer',
      nodeId: 1,
      metaInfo: JSON.stringify({ status: 'confirmed' }),
    });
    expect(resagaMock.setValue).toBeCalled();
    rendered.instance().fetchLiveUpdateData({
      type: 'tourTransfer',
      nodeId: 2,
      metaInfo: JSON.stringify({ status: 'confirmed' }),
    });
    expect(resagaMock.setValue).toBeCalled();
    rendered.instance().fetchLiveUpdateData({
      type: 'tourTransfer',
      nodeId: 2,
      metaInfo: JSON.stringify({ status: 'pending' }),
    });
    expect(resagaMock.dispatchTo).toBeCalledWith(
      ABILITY_API,
      FIND_MY_ABILITIES,
      {},
    );
  });
  it('render', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('#makeToast()', () => {
    it('still matches snapshot for comments', () => {
      rendered.instance().handleClick = () => 'handleClick';
      rendered.instance().makeToast(makeNotification());
    });
  });
  describe('handleClick()', () => {
    it('shall call right function', () => {
      rendered.instance().handleClick('url')();
      expect(history.push).toBeCalledWith('url');
    });
  });
});
