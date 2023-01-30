import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import m from './messages';

const name = NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.phone);
const label = <M {...m.label} />;
const placeholder = 'Click to specify phone number';

export default {
  textField: {
    name,
    label,
  },
  editable: {
    name,
    label,
    placeholder,
    inline: true,
  },
  editableValue: {
    name,
  },
  editableMenu: {
    name,
    label,
    placeholder,
  },
  editableMenuInput: {
    name,
    placeholder: 'New phone number?',
  },
};
