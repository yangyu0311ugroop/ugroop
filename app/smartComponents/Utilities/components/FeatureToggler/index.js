import PropTypes from 'prop-types';
import React from 'react';
import memoize from 'memoize-one';
import { FEATURE_TOGGLER_HELPER } from 'smartComponents/Utilities/components/FeatureToggler/helpers';

const isEnabled = memoize(feature =>
  FEATURE_TOGGLER_HELPER.shouldFeatureBeUsed(feature),
);

export const FeatureToggler = ({ feature, children }) => {
  if (!isEnabled(feature)) return null;

  return children;
};

FeatureToggler.propTypes = {
  // hoc props

  // parent props
  feature: PropTypes.string.isRequired,
  children: PropTypes.node,

  // resaga props
};

FeatureToggler.defaultProps = {
  children: '',
};

export default React.memo(FeatureToggler);
