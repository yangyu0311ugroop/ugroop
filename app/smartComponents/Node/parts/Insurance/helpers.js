import { INSURANCE_MODES } from 'smartComponents/Node/parts/Insurance/constants';

export const isDateMode = mode => {
  switch (mode) {
    case INSURANCE_MODES.pending:
    case INSURANCE_MODES.confirmed:
      return true;

    default:
      return false;
  }
};

export const renderMode = mode => {
  switch (mode) {
    case INSURANCE_MODES.pending:
      return 'Application sent';
    case INSURANCE_MODES.confirmed:
      return 'Confirmation received';
    case INSURANCE_MODES.other:
      return 'Other';
    default:
      return null;
  }
};

export const INSURANCE_HELPERS = {
  isDateMode,
  renderMode,
};
