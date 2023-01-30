import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { Header } from '../index';

describe('Header', () => {
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
    renderWithReduxWithRouter(<Header {...props} />);
  });
  it('should display organisation on header', () => {
    renderWithReduxWithRouter(<Header {...props} />);
    expect(screen.getByText('Organisation Tours')).toBeInTheDocument();
  });
  it('should display loading when fetching', () => {
    renderWithReduxWithRouter(
      <Header
        {...props}
        isFetchingInitialContent
        location={{ search: { current: 'https>//test?search=test' } }}
      />,
    );
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
