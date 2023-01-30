import { NODE_STORE, TEXT } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { renderWithRedux, dispatchSetValue } from 'utils/testUtility';
import API from 'apis';
import { RemoveLinkButton } from '../index';

describe('RemoveLinkButton', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  it('should dispatch delete link action to node api', () => {
    const { store } = renderWithRedux(
      <>
        <API />
        <RemoveLinkButton nodeId={1} resaga={resaga} linkId={1} />
      </>,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        participants: [1, 2],
      },
      3: {
        id: 3,
      },
      4: {
        id: 4,
      },
    });
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        id: 1,
        prevNodeId: 3,
      },
      2: {
        id: 2,
        prevNodeId: 4,
      },
    });
    userEvent.click(
      screen.getByRole('button', {
        title: 'Delete',
      }),
    );
    expect(
      screen.getByText(/This person will be remove from/i),
    ).toBeInTheDocument();
    act(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: /Remove/i,
        }),
      );
    });

    expect(resaga.dispatchTo).toBeCalled();
  });
  it('should dispatch delete link action to node api on rendertext', () => {
    const onSuccess = jest.fn();
    const { store } = renderWithRedux(
      <>
        <API />
        <RemoveLinkButton
          nodeId={1}
          resaga={resaga}
          linkId={1}
          variant={TEXT}
          label="delete group"
          onSuccess={onSuccess}
        />
      </>,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        participants: [1, 2],
      },
      3: {
        id: 3,
      },
      4: {
        id: 4,
      },
    });
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        id: 1,
        prevNodeId: 3,
      },
      2: {
        id: 2,
        prevNodeId: 4,
      },
    });
    userEvent.click(screen.getByText(/delete/i));
    act(() => {
      userEvent.click(screen.getByText(/delete/i));
    });
    expect(resaga.dispatchTo).toBeCalled();
    resaga.dispatchTo.mock.calls[1][2].onSuccess();
    expect(onSuccess).toBeCalled();
  });
});
