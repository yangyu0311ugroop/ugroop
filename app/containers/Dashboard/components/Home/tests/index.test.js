import React from 'react';
import { screen } from '@testing-library/dom';
import UserApi from 'apis/components/User';
import userEvent from '@testing-library/user-event';
import Home from '../index';
import { renderWithReduxWithRouter } from '../../../../../utils/testUtility';
import { sleep } from '../../../../../utils/timeUtility';

test('Home without product tour', async () => {
  renderWithReduxWithRouter(
    <>
      <UserApi />
      <Home />
    </>,
    {},
  );
  await sleep(10);
  expect(screen.queryByText('Go to itineraries')).toBeInTheDocument();
  expect(
    screen.queryByText('See a quick product tour?'),
  ).not.toBeInTheDocument();
});

test('Home product tour', async () => {
  process.env.ENV = 'live';
  const { history } = renderWithReduxWithRouter(
    <>
      <UserApi />
      <Home />
    </>,
    {},
  );
  await sleep(10);
  expect(screen.queryByText('Go to itineraries')).toBeInTheDocument();
  expect(screen.queryByText('See a quick product tour?')).toBeInTheDocument();
  const link = screen.queryByTestId('productTourLink');
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  expect(history.location.pathname).toBe('/');
  expect(history.location.search).toBe('?product_tour_id=241369');
  process.env.ENV = undefined;
});
