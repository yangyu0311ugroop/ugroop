import { screen } from '@testing-library/dom';
import { PHONE_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { fromJS } from 'immutable';
import React from 'react';
import { DefaultPhoneNumber } from 'smartComponents/Person/components/DefaultPhoneNumber/index';
import { renderWithRedux } from 'utils/testUtility';

describe('DefaultPhoneNumber', () => {
  const people = {
    1: {
      id: 1,
      phones: [1, 2],
    },
    2: {
      id: 1,
    },
  };
  const phones = {
    1: {
      id: 1,
      number: '123123',
      isDefault: false,
    },
    2: {
      id: 2,
      number: '333',
      isDefault: true,
    },
  };
  const store = fromJS({
    [USER_DATA_STORE]: {
      people: {},
    },
    [PHONE_DATA_STORE]: {
      phones: {},
    },
  })
    .setIn([USER_DATA_STORE, 'people'], people)
    .setIn([PHONE_DATA_STORE, 'phones'], phones);
  describe('DEFAULT', () => {
    it('should return the default phone number of the user', () => {
      renderWithRedux(<DefaultPhoneNumber id={1} />, { initialState: store });

      expect(screen.getByText(/333/i)).toBeInTheDocument();
    });

    it('should return nothing if no default number', () => {
      renderWithRedux(<DefaultPhoneNumber id={2} />, { initialState: store });

      expect(screen.getByTestId(/default-number-empty/i)).toBeInTheDocument();
    });
  });
});
