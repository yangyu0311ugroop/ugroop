import { screen } from '@testing-library/dom';
import React from 'react';
import TabMessenger from '../index';
import { renderWithRedux } from '../../../../../../utils/testUtility';

jest.mock('smartComponents/Messenger', () => ({
  __esModule: true,
  default: props => <div data-testid="Messenger" {...props} />,
}));

test('TabMessenger', () => {
  renderWithRedux(<TabMessenger />);
  expect(screen.getByTestId('Messenger')).toBeInTheDocument();
});
