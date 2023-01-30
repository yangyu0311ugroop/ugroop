import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import m from './messages';

export default {
  base: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.status),
  },
  editable: {
    placeholder: null,
  },
  label: <M {...m.label} />,
  required: <M {...m.required} />,
};
