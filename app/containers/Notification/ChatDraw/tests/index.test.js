import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import { connect } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { renderWithReduxWithRouter } from '../../../../utils/testUtility';
import { MessengerProvider } from '../../../StreamChat/messengerProvider';
import ChatDrawer, { mapDispatchToProps } from '../index';
import { COGNITO_ACCOUNTSTORE } from '../../../../appConstants';
import { StreamChatComponent } from '../../../StreamChat/streamChatUserInitilize';
import { setRecentChannelDrawStatus } from '../../../StreamChat/actions';
import { sleep } from '../../../../utils/timeUtility';
import StreamChatDataImmerStore from '../../../../datastore/streamChat/streamChatDataImmerStore';

jest.mock('../components/recentChannelList', () => ({
  __esModule: true,
  // eslint-disable-next-line no-unused-vars
  default: props => (
    <div data-testid="recentChannelList" style={{ width: 10, height: 10 }}>
      content
    </div>
  ),
}));

jest.mock('lib/streamChat/context', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    __esModule: true,
    // eslint-disable-next-line no-unused-vars
    default: r.createContext({
      disconnect: () => {},
      off: () => {},
    }),
  };
});

function AnotherComponent() {
  return <div data-testid="clickOutside">click</div>;
}
function ChatTestComponent(props) {
  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      props.resaga.setValue({
        account: {
          id: 56,
          email: 'a@a.com',
        },
      });
      // eslint-disable-next-line react/prop-types
      props.setActive(true);
    }, 30);
  }, []);

  return (
    <>
      <StreamChatDataImmerStore />
      <StreamChatComponent />
      <ChatDrawer />
      <AnotherComponent />
    </>
  );
}

const WrappedChatTestComponent = compose(
  resaga({
    setValue: {
      account: [COGNITO_ACCOUNTSTORE, 'account'],
    },
  }),
  connect(
    null,
    mapDispatchToProps,
  ),
)(React.memo(ChatTestComponent));

test('Wait Drawer to be open', async () => {
  renderWithReduxWithRouter(
    <MessengerProvider>
      <WrappedChatTestComponent />
    </MessengerProvider>,
    {
      initialState: {
        cognitoAcctStore: {},
      },
    },
  );

  expect(screen.queryByTestId('recentChannelList')).toBeNull();
  await waitFor(() => {
    expect(screen.queryByTestId('recentChannelList')).toBeInTheDocument();
  });
});

test('Clickoutside', async () => {
  renderWithReduxWithRouter(
    <MessengerProvider>
      <WrappedChatTestComponent />
    </MessengerProvider>,
    {
      initialState: {
        cognitoAcctStore: {},
      },
    },
  );

  expect(screen.queryByTestId('recentChannelList')).toBeNull();
  await waitFor(() => {
    expect(screen.queryByTestId('recentChannelList')).toBeInTheDocument();
  });
  userEvent.click(screen.queryByTestId('clickOutside'));
  fireEvent.click(document);
  await sleep(10);
});

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const result = mapDispatchToProps(dispatch);
  result.setActive('data');
  expect(dispatch).toBeCalledWith(setRecentChannelDrawStatus('data'));
});
