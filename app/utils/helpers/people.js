import { MEDICAL_SEVERITIES } from 'utils/constants/people';

export const renderSeverity = severity => {
  switch (severity) {
    case MEDICAL_SEVERITIES.mild:
      return 'Mild';
    case MEDICAL_SEVERITIES.moderate:
      return 'Moderate';
    case MEDICAL_SEVERITIES.severe:
      return 'Severe';
    default:
      return null;
  }
};

export const sortSeverity = ({ value }) => {
  switch (value) {
    case MEDICAL_SEVERITIES.mild:
      return 0;
    case MEDICAL_SEVERITIES.moderate:
      return 1;
    case MEDICAL_SEVERITIES.severe:
      return 2;
    default:
      return -1;
  }
};

export const MEDICAL_SEVERITY_HELPERS = {
  renderSeverity,
  sortSeverity,
};
