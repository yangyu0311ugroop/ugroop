import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { TemplateList } from '../index';

describe('TemplateList', () => {
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
    renderWithReduxWithRouter(<TemplateList {...props} />);
  });
  it('should display on copy mode', () => {
    renderWithReduxWithRouter(
      <TemplateList
        {...props}
        layout="list"
        rootNodeIds={[1]}
        folderTreeMode="copyMode"
        sortedIds={[1, 0]}
        parentNodeId={1}
      />,
    );
    expect(
      screen.getAllByText(
        /Edit and share content with your friends or family/i,
      )[0],
    ).toBeInTheDocument();
  });
  it('should display not display button content if folder is open', () => {
    renderWithReduxWithRouter(
      <TemplateList
        {...props}
        layout="list"
        rootNodeIds={[1]}
        folderTreeMode="copyMode"
        sortedIds={[1, 0]}
        folderFormOpen
      />,
    );
    const content = screen.queryByText(
      /Edit and share content with your friends or family/i,
    );
    expect(content).toBeNull(); // it doesn't exist
  });
  it('should display  display button content for org', () => {
    renderWithReduxWithRouter(
      <TemplateList
        {...props}
        layout="list"
        rootNodeIds={[1]}
        folderTreeMode="copyMode"
        sortedIds={[1, 0]}
        organisationId={1}
        parentNodeId={1}
      />,
    );
    expect(
      screen.getAllByText(
        /dit and share content with your team or the organisation/i,
      )[0],
    ).toBeInTheDocument();
  });
});
