import React, { useContext } from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { ChatContext } from '@ugr00p/stream-chat-react';
import { MessengerProvider } from 'containers/StreamChat/messengerProvider';
import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import {
  setRecentAddChannel,
  setChannelDrawActiveChannel,
} from '../../../../../containers/StreamChat/actions';
import {
  renderWithRedux,
  dispatchRequestSuccessAction,
  dispatchSetValue,
} from '../../../../../utils/testUtility';
import ChannelListPreview, { ifHidden } from '../channelListPreview';
import {
  GET_TEMPLATE_DETAIL,
  TEMPLATE_API,
} from '../../../../../apis/constants';
import { sleep } from '../../../../../utils/timeUtility';
import Template from '../../../../../apis/components/Template';
import { useInjectReducer } from '../../../../../utils/injectReducer';
import { STREAM_CHAT_STORE_IMMER } from '../../../../../appConstants';
import streamChatReducer from '../../../../../datastore/streamChat/reducer';
jest.mock('react-device-detect', () => ({
  isMobile: true,
}));
jest.mock('@ugr00p/stream-chat-react', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    ChatContext: r.createContext({
      setActiveChannel: jest.fn(),
      client: {
        activeChannels: {
          cid_1: {
            cid: 'cid_1',
            data: {
              templateId: 1,
            },
            state: {
              members: {
                'yuy0311-02042020@gmail-com-56': {},
              },
            },
            countUnread: () => 2,
          },
          cid_3: {
            cid: 'cid_3',
            data: {
              templateId: 1,
            },
            state: {
              members: {
                'yuy0311-02042020@gmail-com_56': {},
              },
            },
            countUnread: () => 1,
          },
        },
      },
    }),
  };
});
test('ChannelList Preview shall display content correctly', async () => {
  const { store } = renderWithRedux(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={{
          data: {
            name: 'abcd',
            templateId: 1,
          },
        }}
      />
    </MessengerProvider>,
    {},
  );
  dispatchRequestSuccessAction(store, TEMPLATE_API, GET_TEMPLATE_DETAIL, {
    nodes: {
      1: {
        content: 'aaa',
      },
    },
  });
  await sleep(30);
  expect(screen.getByText('# abcd')).not.toBeNull();
});

test('ChannelList Preview Mouse Interact', async () => {
  const { result } = renderHook(() => {
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'cid_1',
  };
  renderWithRedux(
    <MessengerProvider>
      <ChannelListPreview channel={channel} />
    </MessengerProvider>,
    {},
  );
  userEvent.hover(screen.getByTestId('channelListPreview'));
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('hoverOver') >= 0,
    ),
  ).not.toBeNull();
  userEvent.unhover(screen.getByTestId('channelListPreview'));
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('hoverOver') >= 0,
    ),
  ).toEqual(undefined);
  userEvent.click(screen.getByTestId('channelListPreview'));
  expect(result.current).toHaveBeenCalled();
});

test('ChannelList Preview Active Bold', async () => {
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'cid_1',
  };
  renderWithRedux(
    <MessengerProvider>
      <ChannelListPreview channel={channel} active unread={2} />
    </MessengerProvider>,
    {},
  );
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('active') >= 0,
    ),
  ).not.toBeNull();
  expect(
    _.values(screen.getByText('# abcd').classList).find(
      o => o.indexOf('black') >= 0,
    ),
  ).not.toBeNull();
});

test('ChannelList Preview useEffect has unread channel', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      activeChannelForceUpdate: {
        number: 1,
        changedActiveChannelId: 'cidd',
      },
    });
    return { state, dispatch };
  });

  const { result: result2 } = renderHook(() => {
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'acid',
  };
  let rerender = null;
  act(() => {
    const { rerenderWithRedux } = renderWithRedux(
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <ChannelListPreview channel={channel} unread={2} />
      </MessengerProvider>,
      {},
    );

    rerender = rerenderWithRedux;
  });
  expect(result2.current).toHaveBeenCalled();

  act(() => {
    rerender(
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <ChannelListPreview
          channel={channel}
          activeChannel={{
            data: {
              templateId: 2,
            },
          }}
          unread={2}
        />
      </MessengerProvider>,
    );
  });
  expect(result2.current).toHaveBeenCalled();
});

test('ChannelList Preview useEffect no unread channel', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      activeChannelForceUpdate: {
        number: 1,
        changedActiveChannelId: 'cidd',
      },
    });
    return { state, dispatch };
  });

  const { result: result2 } = renderHook(() => {
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });

  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'cid_1',
  };
  let rerender = null;
  act(() => {
    const { rerenderWithRedux } = renderWithRedux(
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <ChannelListPreview channel={channel} unread={2} />
      </MessengerProvider>,
      {},
    );

    rerender = rerenderWithRedux;
  });
  expect(result2.current).toHaveBeenCalledWith(channel);

  act(() => {
    rerender(
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <ChannelListPreview
          channel={channel}
          activeChannel={{
            data: {
              templateId: 2,
            },
          }}
          unread={2}
        />
      </MessengerProvider>,
    );
  });
  expect(result2.current).toHaveBeenCalledWith(channel);
});

function ChannelListPreviewWrapper(props) {
  useInjectReducer({
    key: STREAM_CHAT_STORE_IMMER,
    reducer: streamChatReducer,
  });
  return <ChannelListPreview {...props} />;
}

test('ChannelList Preview useEffect newChannelId', async () => {
  const { result } = renderHook(() => {
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'acid',
  };
  const { store } = renderWithRedux(
    <MessengerProvider>
      <ChannelListPreviewWrapper channel={channel} unread={2} />
    </MessengerProvider>,
    {},
  );
  dispatchSetValue(store, 'templateManagementStore', 'id', 1);
  store.dispatch(
    setRecentAddChannel({
      templateId: 1,
      channelId: 'acid',
    }),
  );
  await sleep(30);
  expect(result.current).toHaveBeenCalledWith(channel);
});

test('ChannelList Preview useEffect channelDrawActiveChannelId', async () => {
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'acid',
  };
  const { result } = renderHook(() => {
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });
  const { store } = renderWithRedux(
    <MessengerProvider>
      <ChannelListPreviewWrapper channel={channel} unread={2} />
    </MessengerProvider>,
    {},
  );
  dispatchSetValue(store, 'templateManagementStore', 'id', 1);
  store.dispatch(
    setChannelDrawActiveChannel({
      templateId: 1,
      channelId: 'acid',
    }),
  );
  await sleep(30);
  expect(result.current).toHaveBeenCalledWith(channel);
});

test('ChannelList default useEffect', async () => {
  const { store, rerenderWithRedux } = renderWithRedux(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={{
          data: {
            name: 'abcd',
            templateId: 1,
          },
        }}
      />
    </MessengerProvider>,
    {},
  );
  dispatchSetValue(store, 'cognitoAcctStore', 'account', {
    id: 56,
    email: 'yuy0311+02042020@gmail.com',
    rootnodeid: 5950,
  });
  await sleep(50);
  rerenderWithRedux(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={{
          data: {
            name: 'abcd',
            templateId: 1,
          },
          cid: 'cid_3',
        }}
      />
    </MessengerProvider>,
  );
  expect(screen.queryAllByText('# abcd')[1]).not.toBeNull();
});

test('ifHidden', () => {
  expect(ifHidden({ archivedChannels: ['c1', 'c2'], cid: 'c2' })).toBeTruthy();
  expect(ifHidden({ archivedChannels: ['c1', 'c2'], cid: 'c3' })).toBeFalsy();
});
