import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import m from './messages';

const name = NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.insuranceValue);
const label = <M {...m.label} />;
const placeholder = 'Click to specify Insurance Policy';

export default {
  editable: {
    label: <M {...m.label} />,
    placeholder: 'Click to specify Insurance Policy',
    required: true,
  },
  editableMenuInput: {
    name,
    placeholder: 'New insurance policy?',
  },
  editableMenu: {
    name,
    label,
    placeholder,
  },
  mode: {
    cleared: 'cleared',
  },
};
