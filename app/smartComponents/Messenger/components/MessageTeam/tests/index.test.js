import React from 'react';
import { screen } from '@testing-library/react';
import UGMessageTeam from '../index';
import { renderWithRedux } from '../../../../../utils/testUtility';
/* eslint-disable no-unused-vars */
jest.mock('@ugr00p/stream-chat-react', () => ({
  MessageSimple: props => <div data-testid="MessageSimple" />,
}));
test('UGMessageTeam', () => {
  renderWithRedux(<UGMessageTeam />);
  expect(screen.getByTestId('MessageSimple')).toBeInTheDocument();
});
