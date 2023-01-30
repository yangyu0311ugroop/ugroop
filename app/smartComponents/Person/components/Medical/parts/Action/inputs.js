import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { MEDICAL_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import m from './messages';

export default {
  textField: {
    name: PERSON_STORE_HELPERS.pathToMedicalInputName(MEDICAL_PATHS.action),
    label: <M {...m.label} />,
  },
};
