import libphonenumber from 'libphonenumber-js/custom';
import metadata from 'libphonenumber-js/metadata.min.json';

export const isValidNumber = value =>
  libphonenumber.isValidNumber(value, metadata);

export const parseNumber = value => {
  try {
    return libphonenumber.parseNumber(value, metadata);
  } catch (error) {
    return null;
  }
};

export const renderNumberInternational = value =>
  libphonenumber.formatNumber(value, 'International', metadata);

export const PHONE_HELPERS = {
  isValidNumber,
  parseNumber,
  renderNumberInternational,
};
