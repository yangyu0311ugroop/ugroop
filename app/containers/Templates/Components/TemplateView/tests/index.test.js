import React from 'react';
import '@testing-library/jest-dom';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { TemplateView } from '../index';

describe('TemplateView', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    id: 1,
    resaga,
    classes: {},
    location: {},
    history: {},
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<TemplateView {...props} />);
  });
  it('should display on screen layout = list', () => {
    renderWithReduxWithRouter(
      <TemplateView
        {...props}
        layout="list"
        sortedIds={[1]}
        folderTreeMode="copyMode"
      />,
    );
  });
});
