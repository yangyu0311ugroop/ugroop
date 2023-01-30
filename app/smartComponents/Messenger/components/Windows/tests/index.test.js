import React from 'react';
import { render, screen } from '@testing-library/react';
import { Window } from '../index';
test('windows has children', () => {
  const children = () => <div data-testid="windowchildren" />;
  render(<Window hideOnThread>{children}</Window>);
  expect(screen.queryByTestId('windowchildren')).not.toBeInTheDocument();
});
