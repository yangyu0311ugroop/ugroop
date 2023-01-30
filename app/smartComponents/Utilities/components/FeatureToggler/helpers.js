import DEV_FEATURES from 'features.development';
import PROD_FEATURES from 'features.production';

// Soon we can add more feature config once we add more types of environment
export const getFeatureConfig = () =>
  process.env.NODE_ENV === 'production' ? PROD_FEATURES : DEV_FEATURES;

export const shouldFeatureBeUsed = feature =>
  getFeatureConfig().indexOf(feature) > -1;

export const FEATURE_TOGGLER_HELPER = {
  shouldFeatureBeUsed,
};
