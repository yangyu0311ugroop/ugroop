import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { OrganisationTemplates } from '../index';

describe('OrganisationTemplates', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    id: 1,
    resaga,
    rootNodeId: 1,
    hasGroup: true,
    classes: {},
    location: {},
    history: {},
    showHeader: true,
    showExplorer: false,
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<OrganisationTemplates {...props} />);
  });

  it('should render and do nothing on loading', () => {
    renderWithReduxWithRouter(
      <OrganisationTemplates {...props} rootNodeId={0} />,
    );
  });

  it('should display traveling with people when displaying dialog', () => {
    renderWithReduxWithRouter(
      <OrganisationTemplates {...props} isLoading processId={2} />,
    );
    expect(screen.getByText(/Organisation 1/i)).toBeInTheDocument();
    expect(screen.getByText(/View organisation profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Workspaces/i)).toBeInTheDocument();
    expect(screen.getByText(/Shared Tours/i)).toBeInTheDocument();
  });
});
