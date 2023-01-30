import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from 'smartComponents/Node/components/Seats/components/AddSeat/messages';

export default {
  seatNumber: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.content),
    label: <M {...m.seatField} />,
  },
  participant: {
    name: 'participantId',
    label: <M {...m.selectParticipant} />,
  },
};
