import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { ListItem } from '../index';

describe('ListItem', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    initSelected: 'some value',
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<ListItem {...props} />);
  });
  it('should display middle borders only', () => {
    renderWithReduxWithRouter(
      <ListItem
        {...props}
        hasCheckbox
        subtitle="some title"
        secondColumn="second"
        description="third"
        action="some action"
      />,
    );
    expect(screen.queryByText('some title')).toBeInTheDocument();
    expect(screen.queryByText('some action')).toBeInTheDocument();
    expect(screen.queryByText('third')).toBeInTheDocument();
  });
});
