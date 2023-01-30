import '@testing-library/jest-dom';
import React from 'react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import Component from '../index';

describe('Test Component', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    resaga,
    classes: {},
  };

  it('should render properly by default', () => {
    renderWithReduxWithRouter(<Component {...props} />);
  });
});
