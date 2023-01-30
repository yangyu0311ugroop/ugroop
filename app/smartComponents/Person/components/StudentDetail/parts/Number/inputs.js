import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { STUDENT_DETAIL_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import m from './messages';

export default {
  textField: {
    name: PERSON_STORE_HELPERS.pathToStudentDetailInputName(
      STUDENT_DETAIL_PATHS.number,
    ),
    label: <M {...m.label} />,
  },
};
