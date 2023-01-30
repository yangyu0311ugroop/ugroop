import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { ListView } from '../index';

describe('ListView', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    id: 1,
    resaga,
    classes: {},
    location: {},
    history: {},
    baseUrl: 'test',
    rootNodeIds: [1, 2],
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<ListView {...props} />);
  });
  it('should display on copy mode', () => {
    renderWithReduxWithRouter(
      <ListView
        {...props}
        addMode
        parentNodeId={1}
        sortedIds={[1, 2]}
        renderPagination="some pages"
      />,
    );
    expect(screen.getByText('some pages')).toBeInTheDocument();
  });
});
