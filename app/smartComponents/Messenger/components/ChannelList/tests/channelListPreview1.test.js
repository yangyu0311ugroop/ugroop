import { screen } from '@testing-library/react';
import React from 'react';
import {
  dispatchSetValue,
  renderWithRedux,
} from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../../containers/StreamChat/messengerProvider';
import Template from '../../../../../apis/components/Template';
import ChannelListPreview from '../channelListPreview';
import { sleep } from '../../../../../utils/timeUtility';

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
            countUnread: () => 0,
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
            countUnread: () => 0,
          },
        },
      },
    }),
  };
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
        activeChannel={{
          data: {
            templateId: 2,
          },
        }}
      />
    </MessengerProvider>,
  );
  expect(screen.queryAllByText('# abcd')[1]).not.toBeNull();
});
