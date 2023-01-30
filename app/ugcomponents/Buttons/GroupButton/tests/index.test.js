import React from 'react';
import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import GroupButton from '../index';

describe('GroupButton', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    initSelected: 'some value',
    btnItems: [
      { icon: 'lnr-views', value: 'some value' },
      { icon: null, value: 'some value 2' },
    ],
    iconProps: {},
    containerClassname: {},
    buttonClassname: {},
    activeClassname: {},
    noMargin: false,
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<GroupButton {...props} />);
  });
  it('should display middle borders only', () => {
    renderWithReduxWithRouter(<GroupButton {...props} middleBorderOnly />);
    const groupButtons = screen.queryAllByTestId('test-GroupButton');
    act(() => {
      userEvent.click(groupButtons[0]);
    });
  });
});
