import { NODE_STORE, TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { FollowerListDialog, AddLinkDialogButton } from '../index';

describe('<FollowerListDialog />', () => {
  it('should not explode', () => {
    // I still don't get why my initialisation of redux store
    // does not work
    renderWithRedux(<FollowerListDialog open id={3} />, {
      initialState: {
        [TEMPLATE_MANAGEMENT_DATASTORE]: {
          templateId: 1,
        },
        [NODE_STORE]: {
          nodes: {
            1: {
              interestedPeople: [1, 2],
            },
            3: {
              oldFollower: {
                id: 5,
              },
              followers: [],
            },
          },
        },
      },
    });

    expect(screen.getByTestId('dialog-complex-title')).toHaveTextContent(
      'Followers',
    );
  });
});

describe('AddLinkDialogButton', () => {
  it('should not explode', () => {
    renderWithRedux(<AddLinkDialogButton />);
  });
});
