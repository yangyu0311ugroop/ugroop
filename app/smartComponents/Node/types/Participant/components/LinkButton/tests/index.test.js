import React from 'react';
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  cleanup,
} from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import '@testing-library/jest-dom/extend-expect';
import { LinkButton } from '../index';

describe('<LinkButton />', () => {
  afterEach(cleanup);

  it('should not explode', () => {
    renderWithRedux(<LinkButton id={1} />);
  });

  it('should open up the dialog when links button was pressed', () => {
    renderWithRedux(<LinkButton id={1} />);

    fireEvent.click(screen.getByTestId('link-button-participant-list'));
    expect(screen.getByTestId('follower-list-dialog')).toHaveTextContent(
      'Followers',
    );
  });

  it('should close dialog button when user pressed the close button in the dialog', async () => {
    renderWithRedux(<LinkButton id={1} />);

    fireEvent.click(screen.getByTestId('link-button-participant-list'));
    fireEvent.click(screen.getByTestId('follower-list-dialog-close-button'));
    await waitForElementToBeRemoved(() => screen.getByText('Followers'));
    expect(screen.queryByTestId('follower-list-dialog')).toBeNull();
  });
});
