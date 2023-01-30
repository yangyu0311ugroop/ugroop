import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FEATURE_TOGGLER_HELPER } from 'smartComponents/Utilities/components/FeatureToggler/helpers';
import FeatureToggler from '../index';

describe('<FeatureToggler />', () => {
  const props = { classes: {}, feature: 'sample' };

  afterEach(cleanup);

  it('should exists', () => {
    expect(FeatureToggler).toBeDefined();
  });

  it('should show children if shouldFeatureBeUsed returns true', () => {
    FEATURE_TOGGLER_HELPER.shouldFeatureBeUsed = jest.fn(() => true);
    const { getByText } = TEST_HELPERS.renderWithRedux(
      <FeatureToggler {...props}>
        <div>Sample Feature</div>
      </FeatureToggler>,
    );

    expect(getByText('Sample Feature')).toBeInTheDocument();
  });

  it('should hide children if shouldFeatureBeUsed returns false', () => {
    FEATURE_TOGGLER_HELPER.shouldFeatureBeUsed = jest.fn(() => false);
    const { queryByText } = TEST_HELPERS.renderWithRedux(
      <FeatureToggler {...props} feature="sample2">
        <div>Sample Feature</div>
      </FeatureToggler>,
    );

    expect(queryByText('Sample Feature')).toEqual(null);
  });
});
