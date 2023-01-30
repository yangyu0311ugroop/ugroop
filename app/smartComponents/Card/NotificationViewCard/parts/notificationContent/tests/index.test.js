import React from 'react';
import { renderWithRedux } from 'utils/testUtility';
import NotificationContent from '../index';

test('with name component', () => {
  const { getByText } = renderWithRedux(
    <NotificationContent
      status="read"
      content="a"
      id={1}
      method="somemethod"
    />,
    {
      initialState: {
        userDataStore: {
          people: {
            1: {
              email: 'test@test.com',
              firstName: 'a',
              lastName: 'b',
            },
          },
        },
      },
    },
  );
  expect(getByText('a')).not.toBeNull();
});

test('without name component', () => {
  const { getByText } = renderWithRedux(
    <NotificationContent
      status="read"
      content="b"
      id={1}
      method="tourInvitation"
      firstName="aa"
    />,
  );
  expect(getByText('b')).not.toBeNull();
});
