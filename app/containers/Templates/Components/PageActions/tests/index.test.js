import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { PageActions } from '../index';

describe('PageActions', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    id: 1,
    folderId: 1,
    resaga,
    classes: {},
    location: {},
    history: { replace: jest.fn() },
    baseUrl: 'test',
    rootNodeIds: [1, 2],
    intl: { formatMessage: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<PageActions {...props} />);
  });
  it('should display sort, search and buttons', () => {
    renderWithReduxWithRouter(
      <PageActions
        {...props}
        search="some value"
        smDown
        folderChildren={[1]}
        location={{ search: '?view=list' }}
      />,
    );
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by name.../i),
    ).toBeInTheDocument();
  });
});
