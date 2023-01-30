import has from 'lodash/has';
import omit from 'lodash/omit';

export const validateData = data => {
  let formData = data;
  if (has(data, 'passportOtherType')) {
    formData.passportType = data.passportOtherType;
    formData = omit(formData, ['passportOtherType']);
  }
  return formData;
};

export const PASSPORT_UTILS = {
  validateData,
};
