import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { AddParticipantButton } from '../index';

describe('AddParticipantButton', () => {
  const resaga = {
    setValue: jest.fn(),
  };
  const props = {
    resaga,
    id: 2,
  };
  it('should render properly by default', () => {
    renderWithRedux(<AddParticipantButton {...props} />);

    expect(screen.getByText(/Add Pax/i)).toBeInTheDocument();
  });

  it('should open create participant dialog', () => {
    const { store } = renderWithRedux(<AddParticipantButton {...props} />);
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);

    userEvent.click(screen.getByText(/Add Pax/i));

    expect(resaga.setValue).toBeCalledWith({
      participantCreateOpen: true,
      participantCreateParentNodeId: 1,
      participantCreateMode: null,
      groupId: 2,
      participantInGroup: true,
    });
  });
});
