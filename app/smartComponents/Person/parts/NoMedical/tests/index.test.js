import { PERSON_DATA_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { NoMedical } from '../index';

describe('NoMedical', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());
  /* it('should render properly by default', () => {
    renderWithRedux(<NoMedical resaga={resaga}/>);
  }); */

  it('should render properly', () => {
    const { store } = renderWithRedux(
      <NoMedical id={1} resaga={resaga} label="No Medical" />,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'people', {
      1: {
        id: 1,
        noMedical: true,
      },
      2: {
        id: 2,
        noMedical: false,
      },
    });
    act(() => {
      userEvent.click(
        screen.queryAllByTestId('noMedicalCheck')[0].childNodes[0],
      );
    });
    expect(screen.getByText(/No Medical/i)).toBeInTheDocument();
  });
});
