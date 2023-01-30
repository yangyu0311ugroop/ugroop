import {
  NODE_STORE,
  PEOPLE_TAB_OPTIONS,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { ParticipantList } from '../index';

describe('ParticipantList', () => {
  it('should properly display traveling with participant in editable', () => {
    const { store } = renderWithRedux(<ParticipantList id={2} />);
    dispatchSetValue(
      store,
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'peopleTabOptionSelected',
      PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      2: {
        id: 2,
        participants: [1, 2],
        content: 'group name',
      },
      3: {
        id: 3,
        status: 'going',
        customData: {
          firstName: 'First',
          lastName: 'User',
        },
      },
      4: {
        id: 4,
        status: 'going',
        customData: {
          firstName: 'Second',
          lastName: 'User',
        },
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

    expect(screen.getByText(/First User/i)).toBeInTheDocument();
  });
});
