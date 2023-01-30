import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import Widget from 'smartComponents/Customer/components/Widget';

describe('<Widget />', () => {
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    renderAction: jest.fn(),
    renderContent: jest.fn(),
  };

  afterEach(cleanup);

  it('should exists', () => {
    expect(Widget).toBeDefined();
  });

  it('should render properly if all required props provided are given', () => {
    const { getByText } = TEST_HELPERS.renderWithRedux(
      <Widget {...props} title="Sample Widget" />,
    );

    expect(getByText(/sample widget/i)).toBeInTheDocument();
  });
});
