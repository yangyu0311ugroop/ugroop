import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import UGTemplateNoContent from '../index';

describe('PageActions', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    onAddFolderClicked: jest.fn(),
    onDelete: jest.fn(),
    canDelete: true,
    intl: { formatMessage: jest.fn() },
    folderId: 1,
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<UGTemplateNoContent {...props} />);
  });
  it('should display sort, search and buttons', () => {
    renderWithReduxWithRouter(
      <UGTemplateNoContent
        {...props}
        search="some value"
        smDown
        folderChildren={[1]}
      />,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('can delete button is disabled', () => {
    renderWithReduxWithRouter(
      <UGTemplateNoContent
        {...props}
        search="some value"
        smDown
        folderChildren={[1]}
        canDelete={false}
      />,
    );
  });
  it('should Loading', () => {
    renderWithReduxWithRouter(<UGTemplateNoContent {...props} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
