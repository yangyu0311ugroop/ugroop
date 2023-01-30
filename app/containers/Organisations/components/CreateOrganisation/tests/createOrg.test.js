import { renderWithReduxWithRouter } from 'utils/testUtility';
import React from 'react';
import { waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { requests } from 'utils/request';
import CreateOrganisation from '../index';
import Organisation from '../../../../../apis/components/Organisation';
requests.fetchWithAuthorisation = jest.fn();

const { List } = require('immutable');
test('Organisation Types Pop In and Pop Out Tests', async () => {
  const { getByTestId, queryByText } = renderWithReduxWithRouter(
    <>
      <Organisation />
      <CreateOrganisation />
    </>,
    {
      initialState: {
        organisationDataStore: {
          orgTypes: List([]),
        },
      },
    },
  );
  const searchText = 'Organisation Types Help';
  expect(queryByText(searchText)).toBeNull();
  const infoButton = getByTestId('orgType-InfoButton');
  fireEvent.click(infoButton);
  expect(queryByText(searchText)).toBeVisible();
  const closeButton = getByTestId('helpCloseButton');
  fireEvent.click(closeButton);
  await waitForElementToBeRemoved(() => queryByText(searchText));
});
